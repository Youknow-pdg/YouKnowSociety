import { Router } from 'express';
import { healthRouter } from './health.routes.js';
import { organizationsRouter } from './organizations.routes.js';

export const v1Router = Router();

v1Router.use(healthRouter);
v1Router.use(organizationsRouter);
