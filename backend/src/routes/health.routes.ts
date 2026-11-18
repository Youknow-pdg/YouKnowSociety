import { Router } from 'express';
import { checkDatabaseConnection } from '../lib/prisma.js';
import { env } from '../config/env.js';

export const healthRouter = Router();

healthRouter.get('/health', async (_req, res, next) => {
  try {
    const db = await checkDatabaseConnection();
    const statusCode = db.connected ? 200 : 503;
    res.status(statusCode).json({
      service: 'YOU KNOW CORE',
      status: db.connected ? 'ok' : 'degraded',
      domain: env.PRIMARY_DOMAIN,
      environment: env.NODE_ENV,
      dbConnected: db.connected,
      mysqlVersion: db.version,
      ...(db.error ? { dbError: db.error } : {}),
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});
