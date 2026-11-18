import { Router } from 'express';
import crypto from 'crypto';
import fs from 'fs';
import { z } from 'zod';
import type mysql from 'mysql2/promise';
import { CORE_CONFIG } from './config.js';
import {
  AuthenticatedRequest,
  clearAuthCookies,
  hashPassword,
  hashToken,
  parseCookies,
  requireAdmin,
  requireAuth,
  setAuthCookies,
  signAccessToken,
  verifyPassword,
  writeAuditLog,
} from './security.js';
import { sendVerificationEmail } from './mailer.js';
import { diskUpload, registerDocumentInDb, resolveSafeStoragePath } from './storage.js';
import { DEFAULT_HOLDING_ID, mapDbRowToApplication } from './db.js';

export function createCoreV1Router(getPool: () => mysql.Pool | null, getDbStatus: () => boolean): Router {
  const router = Router();

  const ensureDb = (res: any): mysql.Pool | null => {
    const pool = getPool();
    if (!pool || !getDbStatus()) {
      res.status(503).json({ error: 'Base de données MySQL YOU KNOW DATABASE indisponible.' });
      return null;
    }
    return pool;
  };

  // =========================================================================
  // 1. HEALTH & SYSTEM INFO
  // =========================================================================
  router.get('/health', async (_req, res) => {
    const pool = getPool();
    let mysqlVersion: string | null = null;
    if (pool && getDbStatus()) {
      try {
        const [rows]: any = await pool.query('SELECT VERSION() AS version');
        mysqlVersion = rows?.[0]?.version || null;
      } catch {}
    }
    res.json({
      service: 'YOU KNOW CORE',
      version: '1.0.0',
      domain: CORE_CONFIG.primaryDomain,
      dbConnected: getDbStatus(),
      mysqlVersion,
      storageDriver: 'LOCAL_DISK',
      baseCurrency: CORE_CONFIG.defaultCurrency,
      timestamp: new Date().toISOString(),
    });
  });

  // =========================================================================
  // 2. AUTHENTICATION, EMAIL VERIFICATION & MULTI-CLIENT SESSIONS
  // =========================================================================
  const registerSchema = z.object({
    email: z.string().email().max(190),
    password: z.string().min(8).max(128),
    fullName: z.string().min(2).max(160),
    phone: z.string().max(50).optional(),
    organizationId: z.string().uuid().optional(),
  });

  router.post('/auth/register', async (req, res) => {
    const pool = ensureDb(res);
    if (!pool) return;

    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Données invalides.', details: parsed.error.flatten() });
    }

    const email = parsed.data.email.toLowerCase().trim();
    const [existing]: any = await pool.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Un compte existe déjà avec cette adresse e-mail.' });
    }

    const userId = crypto.randomUUID();
    const passwordHash = hashPassword(parsed.data.password);
    const orgId = parsed.data.organizationId || DEFAULT_HOLDING_ID;

    await pool.query(
      `INSERT INTO users (id, email, password_hash, full_name, phone, primary_organization_id, status)
       VALUES (?, ?, ?, ?, ?, ?, 'PENDING_VERIFICATION')`,
      [userId, email, passwordHash, parsed.data.fullName.trim(), parsed.data.phone || null, orgId]
    );
    await pool.query(`INSERT INTO user_profiles (user_id) VALUES (?)`, [userId]);
    await pool.query(
      `INSERT INTO user_roles (id, user_id, role_id, organization_id)
       VALUES (?, ?, '22222222-2222-4222-8222-222222222205', ?)`,
      [crypto.randomUUID(), userId, orgId]
    );

    const rawCode = crypto.randomBytes(4).toString('hex').toUpperCase();
    await pool.query(
      `INSERT INTO email_verifications (id, user_id, token_hash, purpose, expires_at)
       VALUES (?, ?, ?, 'EMAIL_VERIFY', DATE_ADD(NOW(3), INTERVAL 24 HOUR))`,
      [crypto.randomUUID(), userId, hashToken(rawCode)]
    );

    let mailResult = { sent: false, mode: 'log' as 'smtp' | 'log' };
    try {
      mailResult = await sendVerificationEmail({
        email,
        fullName: parsed.data.fullName.trim(),
        verificationCode: rawCode,
      });
    } catch (err) {
      console.error('[Auth] Email verification send error:', err);
    }

    await writeAuditLog(pool, {
      organizationId: orgId,
      actorUserId: userId,
      actorLabel: email,
      action: 'USER_REGISTERED',
      entityType: 'users',
      entityId: userId,
      afterJson: { email, fullName: parsed.data.fullName },
      req,
    });

    res.status(201).json({
      message: 'Compte créé. Veuillez vérifier votre adresse e-mail.',
      userId,
      emailDelivery: mailResult.mode,
    });
  });

  router.post('/auth/verify-email', async (req, res) => {
    const pool = ensureDb(res);
    if (!pool) return;

    const code = String(req.body?.token || req.body?.code || '').trim();
    if (!code) return res.status(400).json({ error: 'Code ou jeton de vérification requis.' });

    const tokenHash = hashToken(code);
    const [rows]: any = await pool.query(
      `SELECT id, user_id, expires_at, consumed_at FROM email_verifications
       WHERE token_hash = ? AND purpose = 'EMAIL_VERIFY' LIMIT 1`,
      [tokenHash]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Jeton de vérification invalide.' });
    }
    const record = rows[0];
    if (record.consumed_at) {
      return res.status(400).json({ error: 'Ce jeton a déjà été utilisé.' });
    }
    if (new Date(record.expires_at).getTime() < Date.now()) {
      return res.status(400).json({ error: 'Ce jeton a expiré.' });
    }

    await pool.query(`UPDATE email_verifications SET consumed_at = NOW(3) WHERE id = ?`, [record.id]);
    await pool.query(`UPDATE users SET status = 'ACTIVE', email_verified_at = NOW(3) WHERE id = ?`, [
      record.user_id,
    ]);

    res.json({ success: true, message: 'E-mail vérifié avec succès. Vous pouvez maintenant vous connecter.' });
  });

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
    clientPlatform: z
      .enum(['REACT_WEB', 'ANGULAR_WEB', 'FLUTTER_MOBILE', 'ADMIN_CONSOLE', 'API_CLIENT'])
      .optional(),
  });

  router.post('/auth/login', async (req, res) => {
    const pool = ensureDb(res);
    if (!pool) return;

    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Identifiants invalides.' });
    }

    const email = parsed.data.email.toLowerCase().trim();
    const [userRows]: any = await pool.query(
      `SELECT id, email, password_hash, full_name, primary_organization_id, status, email_verified_at
       FROM users WHERE email = ? AND deleted_at IS NULL LIMIT 1`,
      [email]
    );

    if (userRows.length === 0 || !verifyPassword(parsed.data.password, userRows[0].password_hash)) {
      return res.status(401).json({ error: 'E-mail ou mot de passe incorrect.' });
    }

    const user = userRows[0];
    if (user.status === 'PENDING_VERIFICATION' || !user.email_verified_at) {
      return res.status(403).json({ error: 'Veuillez vérifier votre adresse e-mail avant de vous connecter.' });
    }
    if (user.status !== 'ACTIVE') {
      return res.status(403).json({ error: 'Compte suspendu ou désactivé.' });
    }

    const [roleRows]: any = await pool.query(
      `SELECT r.code FROM user_roles ur JOIN roles r ON r.id = ur.role_id WHERE ur.user_id = ?`,
      [user.id]
    );
    const roles: string[] = roleRows.map((r: any) => r.code);

    const accessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      fullName: user.full_name,
      roles,
      organizationId: user.primary_organization_id,
    });

    const refreshToken = crypto.randomBytes(48).toString('hex');
    const platform = parsed.data.clientPlatform || 'REACT_WEB';
    await pool.query(
      `INSERT INTO sessions (id, user_id, client_platform, refresh_token_hash, ip_address, user_agent, expires_at)
       VALUES (?, ?, ?, ?, ?, ?, DATE_ADD(NOW(3), INTERVAL ? DAY))`,
      [
        crypto.randomUUID(),
        user.id,
        platform,
        hashToken(refreshToken),
        (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || null,
        req.headers['user-agent']?.slice(0, 500) || null,
        CORE_CONFIG.refreshTokenTtlDays,
      ]
    );
    await pool.query(`UPDATE users SET last_login_at = NOW(3) WHERE id = ?`, [user.id]);

    setAuthCookies(res, accessToken, refreshToken);

    const isFlutter = platform === 'FLUTTER_MOBILE' || req.headers['x-client-platform'] === 'flutter';
    res.json({
      accessToken,
      ...(isFlutter ? { refreshToken } : {}),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        primaryOrganizationId: user.primary_organization_id,
        roles,
      },
    });
  });

  router.post('/auth/refresh', async (req, res) => {
    const pool = ensureDb(res);
    if (!pool) return;

    const cookies = parseCookies(req);
    const rawRefresh = req.body?.refreshToken || cookies['yk_core_refresh'];
    if (!rawRefresh) return res.status(401).json({ error: 'Refresh token manquant.' });

    const [rows]: any = await pool.query(
      `SELECT s.id AS session_id, s.user_id, s.client_platform, s.expires_at, s.revoked_at,
              u.email, u.full_name, u.primary_organization_id, u.status
       FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.refresh_token_hash = ? LIMIT 1`,
      [hashToken(rawRefresh)]
    );

    if (rows.length === 0) return res.status(401).json({ error: 'Session invalide.' });
    const session = rows[0];
    if (session.revoked_at || new Date(session.expires_at).getTime() < Date.now() || session.status !== 'ACTIVE') {
      return res.status(401).json({ error: 'Session expirée ou révoquée.' });
    }

    const [roleRows]: any = await pool.query(
      `SELECT r.code FROM user_roles ur JOIN roles r ON r.id = ur.role_id WHERE ur.user_id = ?`,
      [session.user_id]
    );
    const roles: string[] = roleRows.map((r: any) => r.code);

    const nextAccess = signAccessToken({
      sub: session.user_id,
      email: session.email,
      fullName: session.full_name,
      roles,
      organizationId: session.primary_organization_id,
    });

    const nextRefresh = crypto.randomBytes(48).toString('hex');
    await pool.query(`UPDATE sessions SET revoked_at = NOW(3) WHERE id = ?`, [session.session_id]);
    await pool.query(
      `INSERT INTO sessions (id, user_id, client_platform, refresh_token_hash, ip_address, user_agent, expires_at)
       VALUES (?, ?, ?, ?, ?, ?, DATE_ADD(NOW(3), INTERVAL ? DAY))`,
      [
        crypto.randomUUID(),
        session.user_id,
        session.client_platform,
        hashToken(nextRefresh),
        req.socket.remoteAddress || null,
        req.headers['user-agent']?.slice(0, 500) || null,
        CORE_CONFIG.refreshTokenTtlDays,
      ]
    );

    setAuthCookies(res, nextAccess, nextRefresh);
    const isFlutter = session.client_platform === 'FLUTTER_MOBILE' || req.headers['x-client-platform'] === 'flutter';
    res.json({ accessToken: nextAccess, ...(isFlutter ? { refreshToken: nextRefresh } : {}) });
  });

  router.post('/auth/logout', async (req, res) => {
    const pool = getPool();
    const cookies = parseCookies(req);
    const rawRefresh = req.body?.refreshToken || cookies['yk_core_refresh'];
    if (pool && rawRefresh) {
      await pool.query(`UPDATE sessions SET revoked_at = NOW(3) WHERE refresh_token_hash = ?`, [
        hashToken(rawRefresh),
      ]);
    }
    clearAuthCookies(res);
    res.json({ success: true });
  });

  router.get('/auth/me', requireAuth, async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool || !req.authUser) return;
    const [rows]: any = await pool.query(
      `SELECT u.id, u.email, u.full_name, u.phone, u.primary_organization_id, u.status, u.email_verified_at,
              p.avatar_url, p.job_title, p.city, p.country
       FROM users u LEFT JOIN user_profiles p ON p.user_id = u.id
       WHERE u.id = ? LIMIT 1`,
      [req.authUser.sub]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Utilisateur introuvable.' });
    res.json({ ...rows[0], roles: req.authUser.roles });
  });

  // =========================================================================
  // 3. ORGANIZATIONS & PROJECTS (ISOLATION MULTI-TENANT)
  // =========================================================================
  router.get('/organizations', async (_req, res) => {
    const pool = ensureDb(res);
    if (!pool) return;
    const [rows] = await pool.query(
      `SELECT id, code, name, slug, type, parent_id AS parentId, sector, domain, email, phone, default_currency AS defaultCurrency, is_active AS isActive
       FROM organizations WHERE deleted_at IS NULL ORDER BY type ASC, name ASC`
    );
    res.json(rows);
  });

  router.post('/organizations', requireAdmin, async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool) return;
    const schema = z.object({
      code: z.string().min(2).max(40),
      name: z.string().min(2).max(160),
      slug: z.string().min(2).max(120),
      type: z.enum(['HOLDING', 'SUBSIDIARY', 'ACADEMY', 'PARTNER']).default('SUBSIDIARY'),
      parentId: z.string().uuid().nullable().optional(),
      sector: z.string().max(120).optional(),
      domain: z.string().max(190).optional(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Données invalides.', details: parsed.error.flatten() });

    const id = crypto.randomUUID();
    await pool.query(
      `INSERT INTO organizations (id, code, name, slug, type, parent_id, sector, domain)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        parsed.data.code.toUpperCase(),
        parsed.data.name,
        parsed.data.slug.toLowerCase(),
        parsed.data.type,
        parsed.data.parentId || DEFAULT_HOLDING_ID,
        parsed.data.sector || null,
        parsed.data.domain || CORE_CONFIG.primaryDomain,
      ]
    );
    res.status(201).json({ id, ...parsed.data });
  });

  router.get('/projects', requireAuth, async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool || !req.authUser) return;
    const orgId = (req.query.organizationId as string) || req.authUser.organizationId;
    const isSuper = req.authUser.roles.includes('SUPER_ADMIN');
    let query = `SELECT id, organization_id AS organizationId, code, name, description, status, manager_id AS managerId, start_date AS startDate, end_date AS endDate, created_at AS createdAt
                 FROM projects WHERE deleted_at IS NULL`;
    const params: any[] = [];
    if (!isSuper || orgId) {
      if (orgId) {
        query += ` AND organization_id = ?`;
        params.push(orgId);
      }
    }
    query += ` ORDER BY created_at DESC`;
    const [rows] = await pool.query(query, params);
    res.json(rows);
  });

  router.post('/projects', requireAuth, async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool || !req.authUser) return;
    const schema = z.object({
      organizationId: z.string().uuid().optional(),
      code: z.string().min(2).max(50),
      name: z.string().min(2).max(180),
      description: z.string().optional(),
      status: z.enum(['PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED']).default('ACTIVE'),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Données invalides.', details: parsed.error.flatten() });

    const id = crypto.randomUUID();
    const orgId = parsed.data.organizationId || req.authUser.organizationId || DEFAULT_HOLDING_ID;
    await pool.query(
      `INSERT INTO projects (id, organization_id, code, name, description, status, manager_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, orgId, parsed.data.code.toUpperCase(), parsed.data.name, parsed.data.description || null, parsed.data.status, req.authUser.sub]
    );
    await writeAuditLog(pool, {
      organizationId: orgId,
      actorUserId: req.authUser.sub,
      actorLabel: req.authUser.email,
      action: 'PROJECT_CREATED',
      entityType: 'projects',
      entityId: id,
      afterJson: parsed.data,
      req,
    });
    res.status(201).json({ id, organizationId: orgId, ...parsed.data });
  });

  // =========================================================================
  // 4. FINANCES : CATÉGORIES, BUDGETS, TRANSACTIONS & VALIDATION SIMPLE ADMIN
  // =========================================================================
  router.get('/finance/categories', requireAuth, async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool) return;
    const [rows] = await pool.query(
      `SELECT id, organization_id AS organizationId, code, name, type, is_active AS isActive
       FROM financial_categories WHERE is_active = 1 ORDER BY type ASC, name ASC`
    );
    res.json(rows);
  });

  router.get('/finance/budgets', requireAuth, async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool || !req.authUser) return;
    const orgId = (req.query.organizationId as string) || req.authUser.organizationId;
    const params: any[] = [];
    let sql = `SELECT id, organization_id AS organizationId, project_id AS projectId, category_id AS categoryId,
                      fiscal_year AS fiscalYear, fiscal_month AS fiscalMonth, allocated_amount AS allocatedAmount,
                      currency, notes, created_by AS createdBy, created_at AS createdAt
               FROM budgets WHERE 1=1`;
    if (orgId) {
      sql += ` AND organization_id = ?`;
      params.push(orgId);
    }
    sql += ` ORDER BY fiscal_year DESC, fiscal_month DESC`;
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  });

  router.post('/finance/budgets', requireAdmin, async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool || !req.authUser) return;
    const schema = z.object({
      organizationId: z.string().uuid(),
      projectId: z.string().uuid().nullable().optional(),
      categoryId: z.string().uuid().nullable().optional(),
      fiscalYear: z.number().int().min(2020).max(2100),
      fiscalMonth: z.number().int().min(1).max(12).nullable().optional(),
      allocatedAmount: z.number().positive(),
      currency: z.enum(['XOF', 'EUR', 'USD']).default('XOF'),
      notes: z.string().max(500).optional(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Budget invalide.', details: parsed.error.flatten() });

    const id = crypto.randomUUID();
    await pool.query(
      `INSERT INTO budgets (id, organization_id, project_id, category_id, fiscal_year, fiscal_month, allocated_amount, currency, notes, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        parsed.data.organizationId,
        parsed.data.projectId || null,
        parsed.data.categoryId || null,
        parsed.data.fiscalYear,
        parsed.data.fiscalMonth || null,
        parsed.data.allocatedAmount,
        parsed.data.currency,
        parsed.data.notes || null,
        req.authUser.sub,
      ]
    );
    res.status(201).json({ id, ...parsed.data });
  });

  router.get('/finance/transactions', requireAuth, async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool || !req.authUser) return;
    const orgId = (req.query.organizationId as string) || (req.authUser.roles.includes('SUPER_ADMIN') ? null : req.authUser.organizationId);
    const status = req.query.status as string | undefined;
    const type = req.query.type as string | undefined;

    let sql = `
      SELECT id, organization_id AS organizationId, project_id AS projectId, type, category_id AS categoryId,
             amount, currency, base_currency AS baseCurrency, exchange_rate AS exchangeRate,
             base_currency_amount AS baseCurrencyAmount, status, transaction_date AS transactionDate,
             reference_code AS referenceCode, description, idempotency_key AS idempotencyKey,
             created_by AS createdBy, approved_by AS approvedBy, approved_at AS approvedAt,
             rejection_reason AS rejectionReason, created_at AS createdAt, updated_at AS updatedAt
      FROM financial_transactions
      WHERE deleted_at IS NULL`;
    const params: any[] = [];
    if (orgId) {
      sql += ` AND organization_id = ?`;
      params.push(orgId);
    }
    if (status) {
      sql += ` AND status = ?`;
      params.push(status);
    }
    if (type) {
      sql += ` AND type = ?`;
      params.push(type);
    }
    sql += ` ORDER BY transaction_date DESC, created_at DESC LIMIT 200`;

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  });

  const createTxSchema = z.object({
    organizationId: z.string().uuid(),
    projectId: z.string().uuid().nullable().optional(),
    type: z.enum(['INCOME', 'EXPENSE']),
    categoryId: z.string().uuid(),
    amount: z.number().positive(),
    currency: z.enum(['XOF', 'EUR', 'USD']).default('XOF'),
    exchangeRate: z.number().positive().optional(),
    transactionDate: z.string().min(4),
    referenceCode: z.string().max(80).optional(),
    description: z.string().max(2000).optional(),
    idempotencyKey: z.string().max(100).optional(),
  });

  router.post('/finance/transactions', requireAuth, async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool || !req.authUser) return;

    const parsed = createTxSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Transaction invalide.', details: parsed.error.flatten() });
    }

    const d = parsed.data;
    if (d.idempotencyKey) {
      const [dup]: any = await pool.query(
        `SELECT id, status FROM financial_transactions WHERE organization_id = ? AND idempotency_key = ? LIMIT 1`,
        [d.organizationId, d.idempotencyKey]
      );
      if (dup.length > 0) {
        return res.status(200).json({
          id: dup[0].id,
          status: dup[0].status,
          deduplicated: true,
          message: 'Transaction déjà enregistrée (idempotencyKey).',
        });
      }
    }

    let rate = 1;
    if (d.currency === 'EUR') {
      rate = d.exchangeRate || CORE_CONFIG.eurFixedRate;
    } else if (d.currency === 'USD') {
      if (!d.exchangeRate) {
        return res.status(400).json({ error: 'Le taux de change (exchangeRate vers XOF) est requis pour USD.' });
      }
      rate = d.exchangeRate;
    }

    const baseCurrencyAmount = Number((d.amount * rate).toFixed(2));
    const id = crypto.randomUUID();
    const txDate = new Date(d.transactionDate);
    if (Number.isNaN(txDate.getTime())) {
      return res.status(400).json({ error: 'Format de transactionDate invalide.' });
    }

    await pool.query(
      `INSERT INTO financial_transactions
       (id, organization_id, project_id, type, category_id, amount, currency, base_currency, exchange_rate, base_currency_amount,
        status, transaction_date, reference_code, description, idempotency_key, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'XOF', ?, ?, 'PENDING', ?, ?, ?, ?, ?)`,
      [
        id,
        d.organizationId,
        d.projectId || null,
        d.type,
        d.categoryId,
        d.amount,
        d.currency,
        rate,
        baseCurrencyAmount,
        txDate,
        d.referenceCode || null,
        d.description || null,
        d.idempotencyKey || null,
        req.authUser.sub,
      ]
    );

    await writeAuditLog(pool, {
      organizationId: d.organizationId,
      actorUserId: req.authUser.sub,
      actorLabel: req.authUser.email,
      action: 'TRANSACTION_CREATED',
      entityType: 'financial_transactions',
      entityId: id,
      afterJson: { ...d, exchangeRate: rate, baseCurrencyAmount, status: 'PENDING' },
      req,
    });

    res.status(201).json({
      id,
      organizationId: d.organizationId,
      projectId: d.projectId || null,
      type: d.type,
      categoryId: d.categoryId,
      amount: d.amount.toFixed(2),
      currency: d.currency,
      baseCurrency: 'XOF',
      exchangeRate: rate.toFixed(6),
      baseCurrencyAmount: baseCurrencyAmount.toFixed(2),
      status: 'PENDING',
      transactionDate: txDate.toISOString(),
      createdBy: req.authUser.sub,
    });
  });

  // Simple Admin Approval
  router.post('/finance/transactions/:id/approve', requireAdmin, async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool || !req.authUser) return;
    const { id } = req.params;

    const [rows]: any = await pool.query(
      `SELECT * FROM financial_transactions WHERE id = ? AND deleted_at IS NULL LIMIT 1`,
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Transaction introuvable.' });
    const current = rows[0];
    if (current.status === 'APPROVED') {
      return res.json({ success: true, status: 'APPROVED', message: 'Transaction déjà approuvée.' });
    }
    if (current.status === 'CANCELLED') {
      return res.status(400).json({ error: 'Impossible d\'approuver une transaction annulée.' });
    }

    await pool.query(
      `UPDATE financial_transactions SET status = 'APPROVED', approved_by = ?, approved_at = NOW(3), rejection_reason = NULL WHERE id = ?`,
      [req.authUser.sub, id]
    );

    await writeAuditLog(pool, {
      organizationId: current.organization_id,
      actorUserId: req.authUser.sub,
      actorLabel: req.authUser.email,
      action: 'TRANSACTION_APPROVED',
      entityType: 'financial_transactions',
      entityId: id,
      beforeJson: { status: current.status },
      afterJson: { status: 'APPROVED', approvedBy: req.authUser.sub },
      req,
    });

    res.json({ success: true, id, status: 'APPROVED', approvedBy: req.authUser.sub });
  });

  router.post('/finance/transactions/:id/reject', requireAdmin, async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool || !req.authUser) return;
    const { id } = req.params;
    const reason = String(req.body?.reason || '').trim();
    if (!reason) return res.status(400).json({ error: 'Motif de rejet requis.' });

    const [rows]: any = await pool.query(
      `SELECT * FROM financial_transactions WHERE id = ? AND deleted_at IS NULL LIMIT 1`,
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Transaction introuvable.' });
    const current = rows[0];
    if (current.status === 'APPROVED') {
      return res.status(400).json({ error: 'Une transaction approuvée est immuable ; utilisez /cancel.' });
    }

    await pool.query(
      `UPDATE financial_transactions SET status = 'REJECTED', approved_by = ?, approved_at = NOW(3), rejection_reason = ? WHERE id = ?`,
      [req.authUser.sub, reason.slice(0, 500), id]
    );

    await writeAuditLog(pool, {
      organizationId: current.organization_id,
      actorUserId: req.authUser.sub,
      actorLabel: req.authUser.email,
      action: 'TRANSACTION_REJECTED',
      entityType: 'financial_transactions',
      entityId: id,
      beforeJson: { status: current.status },
      afterJson: { status: 'REJECTED', reason },
      req,
    });

    res.json({ success: true, id, status: 'REJECTED', rejectionReason: reason });
  });

  router.post('/finance/transactions/:id/cancel', requireAdmin, async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool || !req.authUser) return;
    const { id } = req.params;
    const reason = String(req.body?.reason || 'Annulation administrative').trim();

    const [rows]: any = await pool.query(
      `SELECT * FROM financial_transactions WHERE id = ? AND deleted_at IS NULL LIMIT 1`,
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Transaction introuvable.' });
    const current = rows[0];

    await pool.query(
      `UPDATE financial_transactions SET status = 'CANCELLED', rejection_reason = ? WHERE id = ?`,
      [reason.slice(0, 500), id]
    );

    await writeAuditLog(pool, {
      organizationId: current.organization_id,
      actorUserId: req.authUser.sub,
      actorLabel: req.authUser.email,
      action: 'TRANSACTION_CANCELLED',
      entityType: 'financial_transactions',
      entityId: id,
      beforeJson: { status: current.status },
      afterJson: { status: 'CANCELLED', reason },
      req,
    });

    res.json({ success: true, id, status: 'CANCELLED' });
  });

  router.get('/finance/summary', requireAuth, async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool || !req.authUser) return;
    const orgId = (req.query.organizationId as string) || null;

    let sql = `
      SELECT type, status, SUM(base_currency_amount) AS totalXof, COUNT(*) AS count
      FROM financial_transactions WHERE deleted_at IS NULL`;
    const params: any[] = [];
    if (orgId) {
      sql += ` AND organization_id = ?`;
      params.push(orgId);
    }
    sql += ` GROUP BY type, status`;
    const [rows]: any = await pool.query(sql, params);

    let approvedIncomeXof = 0;
    let approvedExpenseXof = 0;
    let pendingCount = 0;
    for (const r of rows) {
      if (r.status === 'APPROVED' && r.type === 'INCOME') approvedIncomeXof += Number(r.totalXof || 0);
      if (r.status === 'APPROVED' && r.type === 'EXPENSE') approvedExpenseXof += Number(r.totalXof || 0);
      if (r.status === 'PENDING') pendingCount += Number(r.count || 0);
    }

    res.json({
      baseCurrency: 'XOF',
      approvedIncomeXof,
      approvedExpenseXof,
      netBalanceXof: approvedIncomeXof - approvedExpenseXof,
      pendingCount,
      breakdown: rows,
    });
  });

  // =========================================================================
  // 5. ACADEMY : COURSES & ENROLLMENTS
  // =========================================================================
  router.get('/academy/courses', async (_req, res) => {
    const pool = ensureDb(res);
    if (!pool) return;
    const [rows] = await pool.query(
      `SELECT id, organization_id AS organizationId, code, title, category, delivery_mode AS deliveryMode,
              duration_days AS durationDays, registration_fee_xof AS registrationFeeXof,
              per_session_fee_xof AS perSessionFeeXof, description, is_published AS isPublished
       FROM courses WHERE is_published = 1 ORDER BY created_at DESC`
    );
    res.json(rows);
  });

  router.post('/academy/enrollments', async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool) return;
    const schema = z.object({
      courseId: z.string().uuid(),
      learnerName: z.string().min(2).max(160),
      learnerEmail: z.string().email().max(190),
      learnerPhone: z.string().max(50).optional(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Données d\'inscription invalides.' });

    const id = crypto.randomUUID();
    await pool.query(
      `INSERT INTO enrollments (id, course_id, user_id, learner_name, learner_email, learner_phone, status)
       VALUES (?, ?, ?, ?, ?, ?, 'PENDING')`,
      [
        id,
        parsed.data.courseId,
        req.authUser?.sub || null,
        parsed.data.learnerName,
        parsed.data.learnerEmail.toLowerCase(),
        parsed.data.learnerPhone || null,
      ]
    );
    res.status(201).json({ id, status: 'PENDING', message: 'Inscription Academy enregistrée.' });
  });

  // =========================================================================
  // 6. DOCUMENTS (STOCKAGE DISQUE LOCAL SÉCURISÉ)
  // =========================================================================
  router.get('/documents', requireAuth, async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool || !req.authUser) return;
    const orgId = (req.query.organizationId as string) || req.authUser.organizationId;
    const params: any[] = [];
    let sql = `SELECT id, organization_id AS organizationId, project_id AS projectId, uploaded_by AS uploadedBy,
                      module, entity_id AS entityId, original_name AS originalName, mime_type AS mimeType,
                      size_bytes AS sizeBytes, sha256_checksum AS sha256Checksum, is_public AS isPublic, created_at AS createdAt
               FROM documents WHERE 1=1`;
    if (orgId && !req.authUser.roles.includes('SUPER_ADMIN')) {
      sql += ` AND organization_id = ?`;
      params.push(orgId);
    }
    sql += ` ORDER BY created_at DESC LIMIT 100`;
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  });

  router.post('/documents', requireAuth, diskUpload.single('file'), async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool || !req.authUser) return;
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier envoyé.' });

    const orgId = String(req.body?.organizationId || req.authUser.organizationId || DEFAULT_HOLDING_ID);
    const registered = await registerDocumentInDb(pool, {
      organizationId: orgId,
      projectId: req.body?.projectId || null,
      uploadedBy: req.authUser.sub,
      module: String(req.body?.module || 'GENERAL').toUpperCase(),
      entityId: req.body?.entityId || null,
      originalName: req.file.originalname || req.file.filename,
      absolutePath: req.file.path,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
      isPublic: req.body?.isPublic === 'true',
    });

    res.status(201).json({
      id: registered.id,
      originalName: req.file.originalname,
      sizeBytes: req.file.size,
      sha256Checksum: registered.sha256,
      downloadUrl: `/api/v1/documents/${registered.id}/download`,
    });
  });

  router.get('/documents/:id/download', async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool) return;
    const [rows]: any = await pool.query(`SELECT * FROM documents WHERE id = ? LIMIT 1`, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Document introuvable.' });

    const doc = rows[0];
    const safePath = resolveSafeStoragePath(doc.storage_path);
    if (!safePath || !fs.existsSync(safePath)) {
      return res.status(404).json({ error: 'Fichier physique absent sur le disque.' });
    }
    res.download(safePath, doc.original_name);
  });

  // =========================================================================
  // 7. NOTIFICATIONS, AUDIT LOGS, SYSTEM SETTINGS & APPLICATIONS
  // =========================================================================
  router.get('/notifications', requireAuth, async (req: AuthenticatedRequest, res) => {
    const pool = ensureDb(res);
    if (!pool || !req.authUser) return;
    const [rows] = await pool.query(
      `SELECT id, organization_id AS organizationId, channel, type, title, body, link_url AS linkUrl,
              is_read AS isRead, read_at AS readAt, created_at AS createdAt
       FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50`,
      [req.authUser.sub]
    );
    res.json(rows);
  });

  router.get('/audit-logs', requireAdmin, async (_req, res) => {
    const pool = ensureDb(res);
    if (!pool) return;
    const [rows] = await pool.query(
      `SELECT id, organization_id AS organizationId, actor_user_id AS actorUserId, actor_label AS actorLabel,
              action, entity_type AS entityType, entity_id AS entityId, before_json AS beforeJson,
              after_json AS afterJson, ip_address AS ipAddress, created_at AS createdAt
       FROM audit_logs ORDER BY id DESC LIMIT 150`
    );
    res.json(rows);
  });

  router.get('/settings', async (_req, res) => {
    const pool = ensureDb(res);
    if (!pool) return;
    const [rows] = await pool.query(
      `SELECT setting_key AS settingKey, setting_value AS settingValue, description
       FROM system_settings WHERE is_public = 1`
    );
    res.json(rows);
  });

  router.get('/applications', async (_req, res) => {
    const pool = ensureDb(res);
    if (!pool) return;
    const [rows]: any = await pool.query(
      `SELECT * FROM applications ORDER BY is_spotlight DESC, created_at DESC`
    );
    res.json(rows.map(mapDbRowToApplication));
  });

  return router;
}
