/**
 * YOU KNOW CORE — Script de Migration Idempotente vers MySQL Hostinger (youknow_core_db)
 *
 * Usage :
 *   SOURCE_DATABASE_URL="mysql://..." TARGET_DATABASE_URL="mysql://..." npx tsx scripts/migrate-to-hostinger.ts
 *
 * - Lit les données existantes depuis SOURCE_DATABASE_URL (Aiven) et/ou data/database.json
 * - Initialise le schéma complet YOU KNOW DATABASE sur TARGET_DATABASE_URL
 * - Migre sans écrasement destructif et produit un rapport de vérification des lignes
 */

import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { initCoreSchema, DEFAULT_TECH_ID } from '../server/core/db.js';
import { ensureStorageDirectories } from '../server/core/config.js';
import { registerDocumentInDb } from '../server/core/storage.js';

dotenv.config();

async function main() {
  const sourceUri = (process.env.SOURCE_DATABASE_URL || '').replace(/(\?|&)ssl-?mode=[^&]*/gi, '');
  const targetUri = (process.env.TARGET_DATABASE_URL || process.env.DATABASE_URL || '').replace(
    /(\?|&)ssl-?mode=[^&]*/gi,
    ''
  );

  if (!targetUri) {
    console.error('Erreur: TARGET_DATABASE_URL ou DATABASE_URL doit être défini.');
    process.exit(1);
  }

  ensureStorageDirectories();

  const targetPool = mysql.createPool({
    uri: targetUri,
    waitForConnections: true,
    connectionLimit: 5,
    ssl: targetUri.includes('aivencloud.com') ? { rejectUnauthorized: false } : undefined,
  });

  const conn = await targetPool.getConnection();
  try {
    console.log('[1/4] Initialisation du schéma central YOU KNOW DATABASE sur la cible...');
    await conn.query(`
      CREATE TABLE IF NOT EXISTS forum_categories (
        id VARCHAR(50) PRIMARY KEY, name VARCHAR(100) NOT NULL, description TEXT, icon VARCHAR(50), color VARCHAR(50), order_num INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS forum_topics (
        id INT AUTO_INCREMENT PRIMARY KEY, category_id VARCHAR(50) NOT NULL, title VARCHAR(255) NOT NULL, content TEXT NOT NULL,
        author_name VARCHAR(100) NOT NULL, author_role VARCHAR(100) DEFAULT 'Membre', author_avatar VARCHAR(255),
        views INT DEFAULT 0, likes INT DEFAULT 0, is_pinned TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS forum_replies (
        id INT AUTO_INCREMENT PRIMARY KEY, topic_id INT NOT NULL, content TEXT NOT NULL,
        author_name VARCHAR(100) NOT NULL, author_role VARCHAR(100) DEFAULT 'Membre', author_avatar VARCHAR(255),
        likes INT DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS requests (
        id INT AUTO_INCREMENT PRIMARY KEY, type VARCHAR(50) DEFAULT 'devis', name VARCHAR(150) NOT NULL, email VARCHAR(150) NOT NULL,
        phone VARCHAR(50), company VARCHAR(150), subject VARCHAR(255), message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'En attente', admin_notes TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS community_members (
        id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(150) NOT NULL, email VARCHAR(150) NOT NULL,
        phone VARCHAR(50), interest VARCHAR(150), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, category VARCHAR(100) NOT NULL,
        event_date VARCHAR(100) NOT NULL, event_time VARCHAR(100) NOT NULL, speaker VARCHAR(150) NOT NULL,
        speaker_role VARCHAR(150), speaker_avatar VARCHAR(255), status VARCHAR(50) DEFAULT 'UPCOMING',
        max_participants INT DEFAULT 100, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS webinar_requests (
        id INT AUTO_INCREMENT PRIMARY KEY, event_id INT NOT NULL, participant_name VARCHAR(150) NOT NULL,
        participant_email VARCHAR(150) NOT NULL, participant_role VARCHAR(100) DEFAULT 'Participant',
        status VARCHAR(50) DEFAULT 'PENDING', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS webinar_messages (
        id INT AUTO_INCREMENT PRIMARY KEY, event_id INT NOT NULL, sender_name VARCHAR(150) NOT NULL,
        sender_role VARCHAR(100) DEFAULT 'Participant', message TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS webinars (
        id INT AUTO_INCREMENT PRIMARY KEY, slug VARCHAR(100) NULL, title VARCHAR(255) NOT NULL, room_name VARCHAR(255) NOT NULL,
        description TEXT, trainer VARCHAR(150) NOT NULL, date VARCHAR(100), start_time VARCHAR(100), end_time VARCHAR(100),
        status VARCHAR(50) DEFAULT 'En attente', is_permanent TINYINT(1) DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS webinar_participants (
        id INT AUTO_INCREMENT PRIMARY KEY, webinar_id INT NOT NULL, user_id VARCHAR(150), user_name VARCHAR(150),
        user_email VARCHAR(150), join_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, leave_time TIMESTAMP NULL, duration INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS admin_settings (
        id VARCHAR(50) PRIMARY KEY, name VARCHAR(150) NOT NULL, role VARCHAR(150), email VARCHAR(150),
        phone VARCHAR(50), avatar TEXT, passcode VARCHAR(255) NOT NULL, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await initCoreSchema(conn, {
      name: 'Feus YOU KNOW',
      role: 'Fondateur & Administrateur Système',
      email: 'contact@youknowgroup.com',
      phone: '+221 70 200 72 85',
      avatar: '',
      passcode: process.env.ADMIN_PASSCODE || '7777',
    });

    if (sourceUri && sourceUri !== targetUri) {
      console.log('[2/4] Migration des tables depuis SOURCE_DATABASE_URL...');
      const sourcePool = mysql.createPool({
        uri: sourceUri,
        ssl: sourceUri.includes('aivencloud.com') ? { rejectUnauthorized: false } : undefined,
      });

      const tablesToCopy = [
        'forum_categories',
        'forum_topics',
        'forum_replies',
        'requests',
        'community_members',
        'events',
        'webinar_requests',
        'webinar_messages',
        'webinars',
        'webinar_participants',
        'admin_settings',
      ];

      for (const table of tablesToCopy) {
        const [rows]: any = await sourcePool.query(`SELECT * FROM \`${table}\``);
        if (rows.length > 0) {
          const cols = Object.keys(rows[0]);
          const placeholders = cols.map(() => '?').join(', ');
          const colList = cols.map((c) => `\`${c}\``).join(', ');
          for (const row of rows) {
            await conn.query(
              `INSERT IGNORE INTO \`${table}\` (${colList}) VALUES (${placeholders})`,
              cols.map((c) => row[c])
            );
          }
        }
        console.log(`  - ${table}: ${rows.length} ligne(s) synchronisée(s)`);
      }

      await sourcePool.end();
    } else {
      console.log('[2/4] Aucune SOURCE_DATABASE_URL distincte — vérification locale uniquement.');
    }

    console.log('[3/4] Indexation des fichiers binaires existants (YOUKNOW-DevApp/base.apk)...');
    const realApk = path.join(process.cwd(), 'YOUKNOW-DevApp', 'base.apk');
    if (fs.existsSync(realApk)) {
      const stat = fs.statSync(realApk);
      const [existingDoc]: any = await conn.query(
        `SELECT id FROM documents WHERE original_name = 'base.apk' AND size_bytes = ? LIMIT 1`,
        [stat.size]
      );
      if (existingDoc.length === 0) {
        const destPath = path.join(process.cwd(), 'storage', 'uploads', 'apps', `migrated_base.apk`);
        fs.copyFileSync(realApk, destPath);
        await registerDocumentInDb(targetPool, {
          organizationId: DEFAULT_TECH_ID,
          module: 'APPLICATIONS',
          entityId: 'youknow-devapp-zip',
          originalName: 'base.apk',
          absolutePath: destPath,
          mimeType: 'application/vnd.android.package-archive',
          sizeBytes: stat.size,
          isPublic: true,
        });
        console.log(`  - base.apk réel (${stat.size} octets) indexé dans documents.`);
      }
    }

    console.log('[4/4] Vérification des tables créées dans MySQL...');
    const [tableRows]: any = await conn.query(`SHOW TABLES`);
    console.log(`  - Total tables actives dans MySQL : ${tableRows.length}`);
  } finally {
    conn.release();
    await targetPool.end();
  }
}

main().catch((err) => {
  console.error('Migration échouée:', err);
  process.exit(1);
});
