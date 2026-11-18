import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const organizationsRouter = Router();

organizationsRouter.get('/organizations', async (_req, res, next) => {
  try {
    const organizations = await prisma.organization.findMany({
      where: { deletedAt: null, isActive: true },
      orderBy: [{ type: 'asc' }, { name: 'asc' }],
    });
    res.json(organizations);
  } catch (err) {
    next(err);
  }
});
