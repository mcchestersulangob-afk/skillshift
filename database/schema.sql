CREATE DATABASE IF NOT EXISTS skillshift_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE skillshift_db;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('learner', 'admin', 'author') NOT NULL DEFAULT 'learner',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS learner_progress (
  user_id BIGINT UNSIGNED NOT NULL,
  module_id INT UNSIGNED NOT NULL,
  completed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, module_id),
  CONSTRAINT fk_learner_progress_user FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB;
