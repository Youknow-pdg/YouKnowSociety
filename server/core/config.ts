import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

export const CORE_CONFIG = {
  primaryDomain: process.env.PRIMARY_DOMAIN || 'https://youknowgroup.com',
  legacyDomain: process.env.LEGACY_DOMAIN || 'https://youknow.click',
  defaultCurrency: 'XOF' as const,
  eurFixedRate: 655.957,
  storageRoot: process.env.STORAGE_ROOT
    ? path.resolve(process.env.STORAGE_ROOT)
    : path.join(process.cwd(), 'storage'),
  jwtSecret:
    process.env.JWT_SECRET ||
    crypto.createHash('sha256').update(`yk-core-dev-${process.cwd()}`).digest('hex'),
  accessTokenTtlSec: 15 * 60, // 15 minutes
  refreshTokenTtlDays: 30,
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: (process.env.SMTP_PORT || '465') === '465',
    user: process.env.SMTP_USER || 'noreply@youknowgroup.com',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'YOU KNOW GROUP <noreply@youknowgroup.com>',
  },
  corsAllowedOrigins: (
    process.env.CORS_ALLOWED_ORIGINS ||
    [
      'https://youknowgroup.com',
      'https://www.youknowgroup.com',
      'https://admin.youknowgroup.com',
      'https://academy.youknowgroup.com',
      'https://api.youknowgroup.com',
      'https://app.youknowgroup.com',
      'https://youknow.click',
      'https://www.youknow.click',
      'https://sastock.youknow.click',
      'https://monbudget.youknow.click',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:4200',
    ].join(',')
  )
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
};

export function ensureStorageDirectories() {
  const dirs = [
    CORE_CONFIG.storageRoot,
    path.join(CORE_CONFIG.storageRoot, 'uploads'),
    path.join(CORE_CONFIG.storageRoot, 'uploads', 'apps'),
    path.join(CORE_CONFIG.storageRoot, 'uploads', 'documents'),
    path.join(CORE_CONFIG.storageRoot, 'backups'),
  ];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

export function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return true; // Mobile apps (Flutter) & server-to-server requests
  if (CORE_CONFIG.corsAllowedOrigins.includes(origin)) return true;
  if (origin.endsWith('.youknowgroup.com') || origin.endsWith('.youknow.click')) return true;
  if (origin.endsWith('.run.app')) return true;
  return false;
}
