import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import multer from 'multer';
import type mysql from 'mysql2/promise';
import { CORE_CONFIG, ensureStorageDirectories } from './config.js';

ensureStorageDirectories();

export const diskUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      const targetDir = path.join(CORE_CONFIG.storageRoot, 'uploads', 'documents');
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
      cb(null, targetDir);
    },
    filename: (_req, file, cb) => {
      const safeName = (file.originalname || 'file.bin').replace(/[^a-zA-Z0-9._-]/g, '_');
      cb(null, `${Date.now()}_${crypto.randomBytes(4).toString('hex')}_${safeName}`);
    },
  }),
  limits: { fileSize: 250 * 1024 * 1024 },
});

export async function computeFileSha256(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

export function resolveSafeStoragePath(relativeStoragePath: string): string | null {
  const resolved = path.resolve(CORE_CONFIG.storageRoot, relativeStoragePath);
  if (!resolved.startsWith(path.resolve(CORE_CONFIG.storageRoot) + path.sep)) {
    return null;
  }
  return resolved;
}

export async function registerDocumentInDb(
  pool: mysql.Pool | null,
  params: {
    id?: string;
    organizationId: string;
    projectId?: string | null;
    uploadedBy?: string | null;
    module: string;
    entityId?: string | null;
    originalName: string;
    absolutePath: string;
    mimeType: string;
    sizeBytes: number;
    isPublic?: boolean;
  }
): Promise<{ id: string; sha256: string; relativePath: string }> {
  const id = params.id || crypto.randomUUID();
  const sha256 = await computeFileSha256(params.absolutePath);
  const relativePath = path.relative(CORE_CONFIG.storageRoot, params.absolutePath).replace(/\\/g, '/');

  if (pool) {
    await pool.query(
      `INSERT INTO documents
       (id, organization_id, project_id, uploaded_by, module, entity_id, original_name, storage_path, mime_type, size_bytes, sha256_checksum, is_public)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        params.organizationId,
        params.projectId || null,
        params.uploadedBy || null,
        params.module,
        params.entityId || null,
        params.originalName,
        relativePath,
        params.mimeType || 'application/octet-stream',
        params.sizeBytes,
        sha256,
        params.isPublic ? 1 : 0,
      ]
    );
  }

  return { id, sha256, relativePath };
}
