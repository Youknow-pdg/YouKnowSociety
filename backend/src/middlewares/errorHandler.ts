import type { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { env } from '../config/env.js';

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({
    error: 'Ressource API introuvable.',
  });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Erreur de validation des données.',
      details: err.flatten(),
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        error: 'Conflit : cet enregistrement existe déjà.',
        code: err.code,
      });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({
        error: 'Enregistrement introuvable.',
        code: err.code,
      });
    }
    return res.status(400).json({
      error: 'Erreur base de données.',
      code: err.code,
    });
  }

  const message = err instanceof Error ? err.message : 'Erreur interne du serveur';
  if (env.NODE_ENV !== 'production') {
    console.error('[Backend Error]', err);
  }

  return res.status(500).json({
    error: env.NODE_ENV === 'production' ? 'Erreur interne du serveur.' : message,
  });
}
