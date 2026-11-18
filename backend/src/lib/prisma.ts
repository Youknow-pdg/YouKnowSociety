import { PrismaClient } from '@prisma/client';
import { env } from '../config/env.js';

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    datasources: {
      db: {
        url: env.DATABASE_URL,
      },
    },
  });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export async function checkDatabaseConnection(): Promise<{
  connected: boolean;
  version: string | null;
  error?: string;
}> {
  try {
    const rows = await prisma.$queryRaw<Array<{ version: string }>>`SELECT VERSION() AS version`;
    return {
      connected: true,
      version: rows[0]?.version ?? null,
    };
  } catch (err) {
    return {
      connected: false,
      version: null,
      error: err instanceof Error ? err.message : 'Erreur de connexion MySQL inconnue',
    };
  }
}

export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect();
}
