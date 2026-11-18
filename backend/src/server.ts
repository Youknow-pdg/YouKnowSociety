import fs from 'fs';
import path from 'path';
import { env } from './config/env.js';
import { createApp } from './app.js';
import { checkDatabaseConnection, disconnectPrisma } from './lib/prisma.js';

function ensureStorageDirectories() {
  const dirs = [
    env.resolvedStorageRoot,
    path.join(env.resolvedStorageRoot, 'uploads'),
    path.join(env.resolvedStorageRoot, 'uploads', 'apps'),
    path.join(env.resolvedStorageRoot, 'uploads', 'documents'),
    path.join(env.resolvedStorageRoot, 'backups'),
  ];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

async function bootstrap() {
  ensureStorageDirectories();

  const dbStatus = await checkDatabaseConnection();
  if (dbStatus.connected) {
    console.log(`✅ Prisma connecté à MySQL (version ${dbStatus.version ?? 'inconnue'})`);
  } else {
    console.warn(`⚠️ MySQL inaccessible au démarrage : ${dbStatus.error}`);
  }

  const app = createApp();
  const server = app.listen(env.PORT, '0.0.0.0', () => {
    console.log(`🚀 YOU KNOW CORE (/backend) démarré sur http://0.0.0.0:${env.PORT}/api/v1/health`);
  });

  const shutdown = async (signal: string) => {
    console.log(`\nArrêt propre (${signal})...`);
    server.close(async () => {
      await disconnectPrisma();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap().catch((err) => {
  console.error('❌ Échec critique au démarrage de YOU KNOW CORE :', err);
  process.exit(1);
});
