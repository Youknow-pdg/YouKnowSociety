-- ============================================================================
-- YOU KNOW DATABASE — Schéma SQL Central (MySQL 8.0+ & MariaDB 10.6+)
-- Infrastructure : YOU KNOW CORE (Hostinger Unlimited Web Hosting)
-- Domaine officiel : https://youknowgroup.com
-- Encodage : utf8mb4_unicode_ci | Moteur : InnoDB
-- ============================================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS `youknow_core_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `youknow_core_db`;

-- ============================================================================
-- 1. ORGANISATIONS & FILIALES (Isolation Multi-Tenant)
-- ============================================================================
CREATE TABLE IF NOT EXISTS `organizations` (
  `id` CHAR(36) NOT NULL,
  `code` VARCHAR(40) NOT NULL,
  `name` VARCHAR(160) NOT NULL,
  `slug` VARCHAR(120) NOT NULL,
  `type` ENUM('HOLDING', 'SUBSIDIARY', 'ACADEMY', 'PARTNER') NOT NULL DEFAULT 'SUBSIDIARY',
  `parent_id` CHAR(36) NULL,
  `sector` VARCHAR(120) NULL,
  `domain` VARCHAR(190) NULL,
  `email` VARCHAR(190) NULL,
  `phone` VARCHAR(50) NULL,
  `default_currency` CHAR(3) NOT NULL DEFAULT 'XOF',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `deleted_at` DATETIME(3) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_organizations_code` (`code`),
  UNIQUE KEY `uq_organizations_slug` (`slug`),
  KEY `idx_organizations_parent` (`parent_id`),
  KEY `idx_organizations_active` (`is_active`, `deleted_at`),
  CONSTRAINT `fk_organizations_parent`
    FOREIGN KEY (`parent_id`) REFERENCES `organizations` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 2. UTILISATEURS, PROFILS, VÉRIFICATION EMAIL & SESSIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id` CHAR(36) NOT NULL,
  `email` VARCHAR(190) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(160) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `primary_organization_id` CHAR(36) NULL,
  `status` ENUM('PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED', 'DELETED') NOT NULL DEFAULT 'PENDING_VERIFICATION',
  `email_verified_at` DATETIME(3) NULL,
  `last_login_at` DATETIME(3) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `deleted_at` DATETIME(3) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_email` (`email`),
  KEY `idx_users_status` (`status`, `deleted_at`),
  KEY `idx_users_primary_org` (`primary_organization_id`),
  CONSTRAINT `fk_users_primary_org`
    FOREIGN KEY (`primary_organization_id`) REFERENCES `organizations` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user_profiles` (
  `user_id` CHAR(36) NOT NULL,
  `avatar_url` VARCHAR(500) NULL,
  `job_title` VARCHAR(150) NULL,
  `bio` TEXT NULL,
  `city` VARCHAR(100) NULL DEFAULT 'Dakar',
  `country` VARCHAR(100) NULL DEFAULT 'Sénégal',
  `language` VARCHAR(10) NOT NULL DEFAULT 'fr',
  `preferences_json` JSON NULL,
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_user_profiles_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `email_verifications` (
  `id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `token_hash` VARCHAR(128) NOT NULL,
  `purpose` ENUM('EMAIL_VERIFY', 'PASSWORD_RESET') NOT NULL DEFAULT 'EMAIL_VERIFY',
  `expires_at` DATETIME(3) NOT NULL,
  `consumed_at` DATETIME(3) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_email_verifications_token` (`token_hash`),
  KEY `idx_email_verifications_user` (`user_id`, `purpose`),
  CONSTRAINT `fk_email_verifications_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `client_platform` ENUM('REACT_WEB', 'ANGULAR_WEB', 'FLUTTER_MOBILE', 'ADMIN_CONSOLE', 'API_CLIENT') NOT NULL DEFAULT 'REACT_WEB',
  `refresh_token_hash` VARCHAR(128) NOT NULL,
  `ip_address` VARCHAR(64) NULL,
  `user_agent` VARCHAR(500) NULL,
  `expires_at` DATETIME(3) NOT NULL,
  `revoked_at` DATETIME(3) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_sessions_refresh_hash` (`refresh_token_hash`),
  KEY `idx_sessions_user_active` (`user_id`, `revoked_at`, `expires_at`),
  CONSTRAINT `fk_sessions_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 3. RÔLES & PERMISSIONS (RBAC + ISOLATION ORGANISATIONNELLE)
-- ============================================================================
CREATE TABLE IF NOT EXISTS `roles` (
  `id` CHAR(36) NOT NULL,
  `code` VARCHAR(60) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `description` VARCHAR(255) NULL,
  `is_system` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_roles_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `permissions` (
  `id` CHAR(36) NOT NULL,
  `code` VARCHAR(100) NOT NULL,
  `module` VARCHAR(60) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_permissions_code` (`code`),
  KEY `idx_permissions_module` (`module`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `role_permissions` (
  `role_id` CHAR(36) NOT NULL,
  `permission_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`),
  CONSTRAINT `fk_rp_role`
    FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rp_permission`
    FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user_roles` (
  `id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `role_id` CHAR(36) NOT NULL,
  `organization_id` CHAR(36) NULL,
  `assigned_by` CHAR(36) NULL,
  `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_user_role_org` (`user_id`, `role_id`, `organization_id`),
  KEY `idx_user_roles_org` (`organization_id`),
  CONSTRAINT `fk_ur_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ur_role`
    FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ur_org`
    FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ur_assigned_by`
    FOREIGN KEY (`assigned_by`) REFERENCES `users` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 4. PROJETS & ÉQUIPES
-- ============================================================================
CREATE TABLE IF NOT EXISTS `projects` (
  `id` CHAR(36) NOT NULL,
  `organization_id` CHAR(36) NOT NULL,
  `code` VARCHAR(50) NOT NULL,
  `name` VARCHAR(180) NOT NULL,
  `description` TEXT NULL,
  `status` ENUM('PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED') NOT NULL DEFAULT 'ACTIVE',
  `manager_id` CHAR(36) NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `deleted_at` DATETIME(3) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_projects_org_code` (`organization_id`, `code`),
  KEY `idx_projects_status` (`organization_id`, `status`, `deleted_at`),
  KEY `idx_projects_manager` (`manager_id`),
  CONSTRAINT `fk_projects_org`
    FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_projects_manager`
    FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `project_members` (
  `id` CHAR(36) NOT NULL,
  `project_id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `project_role` ENUM('LEAD', 'DEVELOPER', 'DESIGNER', 'TRAINER', 'ANALYST', 'OBSERVER') NOT NULL DEFAULT 'DEVELOPER',
  `joined_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_project_member` (`project_id`, `user_id`),
  KEY `idx_pm_user` (`user_id`),
  CONSTRAINT `fk_pm_project`
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pm_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 5. FINANCES : CATÉGORIES, BUDGETS & TRANSACTIONS (AVEC CONSOLIDATION XOF)
-- ============================================================================
CREATE TABLE IF NOT EXISTS `financial_categories` (
  `id` CHAR(36) NOT NULL,
  `organization_id` CHAR(36) NULL,
  `code` VARCHAR(50) NOT NULL,
  `name` VARCHAR(140) NOT NULL,
  `type` ENUM('INCOME', 'EXPENSE') NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_fincat_org_code` (`organization_id`, `code`),
  KEY `idx_fincat_type` (`type`, `is_active`),
  CONSTRAINT `fk_fincat_org`
    FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `budgets` (
  `id` CHAR(36) NOT NULL,
  `organization_id` CHAR(36) NOT NULL,
  `project_id` CHAR(36) NULL,
  `category_id` CHAR(36) NULL,
  `fiscal_year` INT NOT NULL,
  `fiscal_month` TINYINT NULL,
  `allocated_amount` DECIMAL(18, 2) NOT NULL,
  `currency` CHAR(3) NOT NULL DEFAULT 'XOF',
  `notes` VARCHAR(500) NULL,
  `created_by` CHAR(36) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_budget_scope` (`organization_id`, `project_id`, `category_id`, `fiscal_year`, `fiscal_month`),
  KEY `idx_budgets_year` (`organization_id`, `fiscal_year`),
  CONSTRAINT `fk_budgets_org`
    FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_budgets_project`
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_budgets_category`
    FOREIGN KEY (`category_id`) REFERENCES `financial_categories` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_budgets_creator`
    FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `financial_transactions` (
  `id` CHAR(36) NOT NULL,
  `organization_id` CHAR(36) NOT NULL,
  `project_id` CHAR(36) NULL,
  `type` ENUM('INCOME', 'EXPENSE') NOT NULL,
  `category_id` CHAR(36) NOT NULL,
  `amount` DECIMAL(18, 2) NOT NULL,
  `currency` CHAR(3) NOT NULL DEFAULT 'XOF',
  `base_currency` CHAR(3) NOT NULL DEFAULT 'XOF',
  `exchange_rate` DECIMAL(14, 6) NOT NULL DEFAULT 1.000000,
  `base_currency_amount` DECIMAL(18, 2) NOT NULL,
  `status` ENUM('DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
  `transaction_date` DATETIME(3) NOT NULL,
  `reference_code` VARCHAR(80) NULL,
  `description` TEXT NULL,
  `idempotency_key` VARCHAR(100) NULL,
  `created_by` CHAR(36) NOT NULL,
  `approved_by` CHAR(36) NULL,
  `approved_at` DATETIME(3) NULL,
  `rejection_reason` VARCHAR(500) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `deleted_at` DATETIME(3) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_fintx_org_idempotency` (`organization_id`, `idempotency_key`),
  UNIQUE KEY `uq_fintx_org_ref` (`organization_id`, `reference_code`),
  KEY `idx_fintx_org_date` (`organization_id`, `transaction_date`, `status`),
  KEY `idx_fintx_project` (`project_id`, `type`, `status`),
  KEY `idx_fintx_category` (`category_id`),
  KEY `idx_fintx_creator` (`created_by`),
  KEY `idx_fintx_approver` (`approved_by`),
  CONSTRAINT `fk_fintx_org`
    FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_fintx_project`
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_fintx_category`
    FOREIGN KEY (`category_id`) REFERENCES `financial_categories` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_fintx_creator`
    FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_fintx_approver`
    FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 6. YOU KNOW ACADEMY : FORMATIONS, COURS & INSCRIPTIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS `courses` (
  `id` CHAR(36) NOT NULL,
  `organization_id` CHAR(36) NOT NULL,
  `code` VARCHAR(50) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `category` ENUM('BUREAUTIQUE', 'IA_TECH', 'DEV_WEB', 'ENTREPRENEURIAT', 'AUTRE') NOT NULL DEFAULT 'IA_TECH',
  `delivery_mode` ENUM('ONLINE', 'HYBRID', 'IN_PERSON') NOT NULL DEFAULT 'ONLINE',
  `duration_days` INT NOT NULL DEFAULT 21,
  `registration_fee_xof` DECIMAL(12, 2) NOT NULL DEFAULT 5000.00,
  `per_session_fee_xof` DECIMAL(12, 2) NOT NULL DEFAULT 1475.00,
  `description` TEXT NULL,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_courses_code` (`code`),
  KEY `idx_courses_org` (`organization_id`, `is_published`),
  CONSTRAINT `fk_courses_org`
    FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `enrollments` (
  `id` CHAR(36) NOT NULL,
  `course_id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NULL,
  `learner_name` VARCHAR(160) NOT NULL,
  `learner_email` VARCHAR(190) NOT NULL,
  `learner_phone` VARCHAR(50) NULL,
  `status` ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
  `certificate_code` VARCHAR(80) NULL,
  `enrolled_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `completed_at` DATETIME(3) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_enrollments_cert` (`certificate_code`),
  KEY `idx_enrollments_course` (`course_id`, `status`),
  KEY `idx_enrollments_user` (`user_id`),
  CONSTRAINT `fk_enrollments_course`
    FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_enrollments_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 7. APPLICATIONS / CATALOGUE LOGICIEL (REMPLACE LE STOCKAGE JSON PUR)
-- ============================================================================
CREATE TABLE IF NOT EXISTS `applications` (
  `id` VARCHAR(120) NOT NULL,
  `organization_id` CHAR(36) NULL,
  `name` VARCHAR(160) NOT NULL,
  `subtitle` VARCHAR(255) NOT NULL,
  `category` VARCHAR(120) NOT NULL,
  `subsidiary` VARCHAR(120) NOT NULL DEFAULT 'YOU KNOW TECH',
  `app_type` ENUM('file', 'link') NOT NULL DEFAULT 'link',
  `platform` VARCHAR(120) NOT NULL,
  `file_url` VARCHAR(500) NULL,
  `file_name` VARCHAR(255) NULL,
  `file_size` VARCHAR(60) NULL,
  `size_bytes` BIGINT UNSIGNED NULL DEFAULT 0,
  `url` VARCHAR(500) NULL,
  `is_iframe_previewable` TINYINT(1) NOT NULL DEFAULT 1,
  `target_audience` VARCHAR(255) NULL,
  `description` TEXT NOT NULL,
  `highlights_json` JSON NULL,
  `tech_stack_json` JSON NULL,
  `status` VARCHAR(80) NOT NULL DEFAULT 'En ligne',
  `badge_text` VARCHAR(100) NULL,
  `is_spotlight` TINYINT(1) NOT NULL DEFAULT 0,
  `image_placeholder_gradient` VARCHAR(120) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_applications_org` (`organization_id`, `app_type`),
  KEY `idx_applications_spotlight` (`is_spotlight`),
  CONSTRAINT `fk_applications_org`
    FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 8. COMMUNAUTÉ, FORUM, ÉVÉNEMENTS, WEBINAIRES & DEMANDES
-- ============================================================================
CREATE TABLE IF NOT EXISTS `forum_categories` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `icon` VARCHAR(50) NULL,
  `color` VARCHAR(50) NULL,
  `order_num` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `forum_topics` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_id` VARCHAR(50) NOT NULL,
  `author_user_id` CHAR(36) NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `author_name` VARCHAR(100) NOT NULL,
  `author_role` VARCHAR(100) NOT NULL DEFAULT 'Membre',
  `author_avatar` VARCHAR(255) NULL,
  `views` INT NOT NULL DEFAULT 0,
  `likes` INT NOT NULL DEFAULT 0,
  `is_pinned` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_forum_topics_cat` (`category_id`, `is_pinned`, `created_at`),
  CONSTRAINT `fk_topics_category`
    FOREIGN KEY (`category_id`) REFERENCES `forum_categories` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_topics_author`
    FOREIGN KEY (`author_user_id`) REFERENCES `users` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `forum_replies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `topic_id` INT NOT NULL,
  `author_user_id` CHAR(36) NULL,
  `content` TEXT NOT NULL,
  `author_name` VARCHAR(100) NOT NULL,
  `author_role` VARCHAR(100) NOT NULL DEFAULT 'Membre',
  `author_avatar` VARCHAR(255) NULL,
  `likes` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_forum_replies_topic` (`topic_id`, `created_at`),
  CONSTRAINT `fk_replies_topic`
    FOREIGN KEY (`topic_id`) REFERENCES `forum_topics` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_replies_author`
    FOREIGN KEY (`author_user_id`) REFERENCES `users` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `requests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `organization_id` CHAR(36) NULL,
  `type` VARCHAR(50) NOT NULL DEFAULT 'devis',
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `company` VARCHAR(150) NULL,
  `subject` VARCHAR(255) NULL,
  `message` TEXT NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'En attente',
  `admin_notes` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_requests_status_type` (`status`, `type`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `community_members` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` CHAR(36) NULL,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `interest` VARCHAR(150) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_community_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `events` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `organization_id` CHAR(36) NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `event_date` VARCHAR(100) NOT NULL,
  `event_time` VARCHAR(100) NOT NULL,
  `speaker` VARCHAR(150) NOT NULL,
  `speaker_role` VARCHAR(150) NULL,
  `speaker_avatar` VARCHAR(255) NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'UPCOMING',
  `max_participants` INT NOT NULL DEFAULT 100,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_events_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `webinar_requests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `event_id` INT NOT NULL,
  `participant_name` VARCHAR(150) NOT NULL,
  `participant_email` VARCHAR(150) NOT NULL,
  `participant_role` VARCHAR(100) NOT NULL DEFAULT 'Participant',
  `status` VARCHAR(50) NOT NULL DEFAULT 'PENDING',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_webinar_req_event` (`event_id`, `status`),
  CONSTRAINT `fk_webinar_req_event`
    FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `webinar_messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `event_id` INT NOT NULL,
  `sender_name` VARCHAR(150) NOT NULL,
  `sender_role` VARCHAR(100) NOT NULL DEFAULT 'Participant',
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_webinar_msg_event` (`event_id`, `id`),
  CONSTRAINT `fk_webinar_msg_event`
    FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `webinars` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(100) NULL,
  `title` VARCHAR(255) NOT NULL,
  `room_name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `trainer` VARCHAR(150) NOT NULL,
  `date` VARCHAR(100) NULL,
  `start_time` VARCHAR(100) NULL,
  `end_time` VARCHAR(100) NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'En attente',
  `is_permanent` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_webinars_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `webinar_participants` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `webinar_id` INT NOT NULL,
  `user_id` VARCHAR(150) NULL,
  `user_name` VARCHAR(150) NULL,
  `user_email` VARCHAR(150) NULL,
  `join_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `leave_time` TIMESTAMP NULL,
  `duration` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_wp_webinar` (`webinar_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 9. DOCUMENTS (STOCKAGE DISQUE LOCAL), NOTIFICATIONS, AUDIT & PARAMÈTRES
-- ============================================================================
CREATE TABLE IF NOT EXISTS `documents` (
  `id` CHAR(36) NOT NULL,
  `organization_id` CHAR(36) NOT NULL,
  `project_id` CHAR(36) NULL,
  `uploaded_by` CHAR(36) NULL,
  `module` VARCHAR(60) NOT NULL DEFAULT 'GENERAL',
  `entity_id` VARCHAR(120) NULL,
  `original_name` VARCHAR(255) NOT NULL,
  `storage_path` VARCHAR(500) NOT NULL,
  `mime_type` VARCHAR(160) NOT NULL,
  `size_bytes` BIGINT UNSIGNED NOT NULL,
  `sha256_checksum` CHAR(64) NOT NULL,
  `is_public` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_documents_org_module` (`organization_id`, `module`),
  KEY `idx_documents_project` (`project_id`),
  CONSTRAINT `fk_documents_org`
    FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_documents_project`
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_documents_uploader`
    FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `notifications` (
  `id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `organization_id` CHAR(36) NULL,
  `channel` ENUM('IN_APP', 'EMAIL', 'BOTH') NOT NULL DEFAULT 'IN_APP',
  `type` VARCHAR(80) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `body` TEXT NOT NULL,
  `link_url` VARCHAR(500) NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `read_at` DATETIME(3) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_notifications_user_read` (`user_id`, `is_read`, `created_at`),
  CONSTRAINT `fk_notifications_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_notifications_org`
    FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `organization_id` CHAR(36) NULL,
  `actor_user_id` CHAR(36) NULL,
  `actor_label` VARCHAR(160) NULL,
  `action` VARCHAR(100) NOT NULL,
  `entity_type` VARCHAR(80) NOT NULL,
  `entity_id` VARCHAR(120) NOT NULL,
  `before_json` JSON NULL,
  `after_json` JSON NULL,
  `ip_address` VARCHAR(64) NULL,
  `user_agent` VARCHAR(500) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_audit_entity` (`entity_type`, `entity_id`),
  KEY `idx_audit_org_date` (`organization_id`, `created_at`),
  KEY `idx_audit_actor` (`actor_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `system_settings` (
  `setting_key` VARCHAR(120) NOT NULL,
  `setting_value` TEXT NOT NULL,
  `is_public` TINYINT(1) NOT NULL DEFAULT 0,
  `description` VARCHAR(255) NULL,
  `updated_by` CHAR(36) NULL,
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `admin_settings` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `role` VARCHAR(150) NULL,
  `email` VARCHAR(150) NULL,
  `phone` VARCHAR(50) NULL,
  `avatar` TEXT NULL,
  `passcode` VARCHAR(255) NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 10. DONNÉES DE RÉFÉRENCE INITIALES (SEED IDEMPOTENT)
-- ============================================================================
INSERT IGNORE INTO `organizations` (`id`, `code`, `name`, `slug`, `type`, `parent_id`, `sector`, `domain`, `email`, `phone`, `default_currency`) VALUES
  ('11111111-1111-4111-8111-111111111101', 'YKS-HOLDING', 'YOU KNOW SOCIETY', 'you-know-society', 'HOLDING', NULL, 'Holding Technologique & Innovation', 'https://youknowgroup.com', 'contact@youknowgroup.com', '+221 70 200 72 85', 'XOF'),
  ('11111111-1111-4111-8111-111111111102', 'YKT-TECH', 'YOU KNOW TECH', 'you-know-tech', 'SUBSIDIARY', '11111111-1111-4111-8111-111111111101', 'Logiciels, IA & Solutions SaaS', 'https://youknowgroup.com', 'contact@youknowgroup.com', '+221 70 200 72 85', 'XOF'),
  ('11111111-1111-4111-8111-111111111103', 'YKA-ACADEMY', 'YOU KNOW ACADEMY', 'you-know-academy', 'ACADEMY', '11111111-1111-4111-8111-111111111101', 'Formations Numériques & IA', 'https://youknowgroup.com', 'contact@youknowgroup.com', '+221 70 200 72 85', 'XOF');

INSERT IGNORE INTO `roles` (`id`, `code`, `name`, `description`) VALUES
  ('22222222-2222-4222-8222-222222222201', 'SUPER_ADMIN', 'Super Administrateur Holding', 'Accès complet à toutes les filiales, finances et paramètres'),
  ('22222222-2222-4222-8222-222222222202', 'ADMIN', 'Administrateur Système', 'Validation simple des transactions, gestion contenus et utilisateurs'),
  ('22222222-2222-4222-8222-222222222203', 'PROJECT_MANAGER', 'Chef de Projet', 'Gestion des projets, équipes et soumission des dépenses/revenus'),
  ('22222222-2222-4222-8222-222222222204', 'TRAINER', 'Formateur Academy', 'Gestion des cours, webinaires et apprenants'),
  ('22222222-2222-4222-8222-222222222205', 'MEMBER', 'Membre Vérifié', 'Accès communauté, forum et inscriptions Academy');

INSERT IGNORE INTO `permissions` (`id`, `code`, `module`, `description`) VALUES
  ('33333333-3333-4333-8333-333333333301', 'finance.transaction.create', 'FINANCE', 'Soumettre un revenu ou une dépense'),
  ('33333333-3333-4333-8333-333333333302', 'finance.transaction.approve', 'FINANCE', 'Approuver ou rejeter une transaction depuis l''espace Admin'),
  ('33333333-3333-4333-8333-333333333303', 'finance.budget.manage', 'FINANCE', 'Créer et ajuster les budgets'),
  ('33333333-3333-4333-8333-333333333304', 'project.manage', 'PROJECTS', 'Créer et gérer des projets et équipes'),
  ('33333333-3333-4333-8333-333333333305', 'academy.manage', 'ACADEMY', 'Gérer les cours et webinaires'),
  ('33333333-3333-4333-8333-333333333306', 'system.settings.manage', 'SYSTEM', 'Modifier les paramètres système et consulter les journaux d''audit');

INSERT IGNORE INTO `financial_categories` (`id`, `organization_id`, `code`, `name`, `type`) VALUES
  ('44444444-4444-4444-8444-444444444401', NULL, 'INC-SAAS', 'Abonnements SaaS & Logiciels (SASTOCK, etc.)', 'INCOME'),
  ('44444444-4444-4444-8444-444444444402', NULL, 'INC-DEV', 'Prestations Développement Web / Mobile / IA', 'INCOME'),
  ('44444444-4444-4444-8444-444444444403', NULL, 'INC-ACADEMY', 'Frais d''inscription & Cours YOU KNOW ACADEMY', 'INCOME'),
  ('44444444-4444-4444-8444-444444444404', NULL, 'EXP-INFRA', 'Hébergement Cloud, Domaines & Serveurs', 'EXPENSE'),
  ('44444444-4444-4444-8444-444444444405', NULL, 'EXP-OPS', 'Frais Opérationnels, Équipements & Maintenance', 'EXPENSE'),
  ('44444444-4444-4444-8444-444444444406', NULL, 'EXP-MARKETING', 'Communication, Publicité & Événements', 'EXPENSE');

INSERT IGNORE INTO `system_settings` (`setting_key`, `setting_value`, `is_public`, `description`) VALUES
  ('primary_domain', 'https://youknowgroup.com', 1, 'Domaine officiel principal du groupe YOU KNOW'),
  ('legacy_domain', 'https://youknow.click', 1, 'Domaine historique et services filiales'),
  ('base_currency', 'XOF', 1, 'Devise de consolidation comptable'),
  ('eur_xof_fixed_rate', '655.957', 1, 'Taux de conversion fixe EUR -> XOF'),
  ('smtp_provider', 'Hostinger Mail (smtp.hostinger.com)', 0, 'Fournisseur SMTP officiel'),
  ('storage_driver', 'LOCAL_DISK', 0, 'Stockage des fichiers sur disque local persistant');

SET FOREIGN_KEY_CHECKS = 1;
