import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  PRIMARY_DOMAIN: z.string().url().default('https://youknowgroup.com'),
  CORS_ALLOWED_ORIGINS: z
    .string()
    .default(
      'https://youknowgroup.com,https://www.youknowgroup.com,https://admin.youknowgroup.com,https://academy.youknowgroup.com,https://api.youknowgroup.com,http://localhost:3000,http://localhost:5173,http://localhost:4200'
    ),
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL est obligatoire pour connecter Prisma à MySQL.')
    .refine((val) => val.startsWith('mysql://'), {
      message: 'DATABASE_URL doit commencer par "mysql://" (vérifiez qu\'il n\'y a pas de préfixe en double).',
    }),
  JWT_SECRET: z
    .string()
    .min(16, 'JWT_SECRET doit contenir au moins 16 caractères.')
    .default('dev_only_replace_with_64_char_secret'),
  STORAGE_ROOT: z.string().default('./storage'),
  SMTP_HOST: z.string().default('smtp.hostinger.com'),
  SMTP_PORT: z.coerce.number().int().positive().default(465),
  SMTP_USER: z.string().default('contact@youknowgroup.com'),
  SMTP_PASS: z.string().optional().default(''),
  SMTP_FROM: z.string().default('YOU KNOW GROUP <contact@youknowgroup.com>'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Configuration d\'environnement invalide dans /backend/.env :');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  ...parsed.data,
  corsOrigins: parsed.data.CORS_ALLOWED_ORIGINS.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  resolvedStorageRoot: path.resolve(process.cwd(), parsed.data.STORAGE_ROOT),
};
