import crypto from 'crypto';
import type { Request, Response, NextFunction } from 'express';
import type mysql from 'mysql2/promise';
import { CORE_CONFIG } from './config.js';

export interface AuthTokenPayload {
  sub: string;
  email: string;
  fullName: string;
  roles: string[];
  organizationId: string | null;
  type: 'access';
  iat: number;
  exp: number;
}

export interface AuthenticatedRequest extends Request {
  authUser?: AuthTokenPayload;
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${derived}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash) return false;
  if (!storedHash.startsWith('scrypt:')) {
    // Legacy plaintext fallback check during migration only
    return password === storedHash;
  }
  const parts = storedHash.split(':');
  if (parts.length !== 3) return false;
  const [, salt, originalHex] = parts;
  const derived = crypto.scryptSync(password, salt, 64);
  const original = Buffer.from(originalHex, 'hex');
  if (derived.length !== original.length) return false;
  return crypto.timingSafeEqual(derived, original);
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function base64UrlEncode(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(input: string): string {
  const pad = 4 - (input.length % 4 || 4);
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(pad === 4 ? 0 : pad);
  return Buffer.from(normalized, 'base64').toString('utf-8');
}

export function signAccessToken(
  payload: Omit<AuthTokenPayload, 'type' | 'iat' | 'exp'>,
  ttlSec = CORE_CONFIG.accessTokenTtlSec
): string {
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: AuthTokenPayload = {
    ...payload,
    type: 'access',
    iat: now,
    exp: now + ttlSec,
  };
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64UrlEncode(JSON.stringify(fullPayload));
  const signature = base64UrlEncode(
    crypto.createHmac('sha256', CORE_CONFIG.jwtSecret).update(`${header}.${body}`).digest()
  );
  return `${header}.${body}.${signature}`;
}

export function verifyAccessToken(token: string): AuthTokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts;
    const expectedSig = base64UrlEncode(
      crypto.createHmac('sha256', CORE_CONFIG.jwtSecret).update(`${header}.${body}`).digest()
    );
    const sigBuf = Buffer.from(sig);
    const expBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }
    const decoded = JSON.parse(base64UrlDecode(body)) as AuthTokenPayload;
    if (!decoded.exp || decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export function parseCookies(req: Request): Record<string, string> {
  const header = req.headers.cookie;
  if (!header) return {};
  const result: Record<string, string> = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const val = decodeURIComponent(part.slice(idx + 1).trim());
    result[key] = val;
  }
  return result;
}

export function extractBearerOrCookieToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  const cookies = parseCookies(req);
  return cookies['yk_core_access'] || null;
}

export function setAuthCookies(res: Response, accessToken: string, refreshToken?: string) {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('yk_core_access', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: CORE_CONFIG.accessTokenTtlSec * 1000,
    path: '/',
  });
  if (refreshToken) {
    res.cookie('yk_core_refresh', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: CORE_CONFIG.refreshTokenTtlDays * 24 * 60 * 60 * 1000,
      path: '/',
    });
  }
}

export function clearAuthCookies(res: Response) {
  res.clearCookie('yk_core_access', { path: '/' });
  res.clearCookie('yk_core_refresh', { path: '/' });
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = extractBearerOrCookieToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Authentification requise.' });
  }
  const payload = verifyAccessToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Session expirée ou invalide.' });
  }
  req.authUser = payload;
  next();
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = extractBearerOrCookieToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Accès administrateur requis.' });
  }
  const payload = verifyAccessToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Session administrateur expirée ou invalide.' });
  }
  const isAdmin = payload.roles.some((r) => r === 'SUPER_ADMIN' || r === 'ADMIN');
  if (!isAdmin) {
    return res.status(403).json({ error: 'Permissions administrateur insuffisantes.' });
  }
  req.authUser = payload;
  next();
}

export function isSafeExternalUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host === '::1' ||
      host.endsWith('.local') ||
      host.endsWith('.internal')
    ) {
      return false;
    }
    // Block RFC1918 & link-local IPv4 ranges
    if (/^(10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host)) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function writeAuditLog(
  pool: mysql.Pool | null,
  params: {
    organizationId?: string | null;
    actorUserId?: string | null;
    actorLabel?: string | null;
    action: string;
    entityType: string;
    entityId: string;
    beforeJson?: unknown;
    afterJson?: unknown;
    req?: Request;
  }
) {
  if (!pool) return;
  try {
    const ip =
      (params.req?.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      params.req?.socket?.remoteAddress ||
      null;
    const ua = params.req?.headers['user-agent']?.slice(0, 500) || null;
    await pool.query(
      `INSERT INTO audit_logs
       (organization_id, actor_user_id, actor_label, action, entity_type, entity_id, before_json, after_json, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        params.organizationId || null,
        params.actorUserId || null,
        params.actorLabel || null,
        params.action,
        params.entityType,
        params.entityId,
        params.beforeJson !== undefined ? JSON.stringify(params.beforeJson) : null,
        params.afterJson !== undefined ? JSON.stringify(params.afterJson) : null,
        ip,
        ua,
      ]
    );
  } catch (err) {
    console.error('[AuditLog] Failed to record audit entry:', err);
  }
}
