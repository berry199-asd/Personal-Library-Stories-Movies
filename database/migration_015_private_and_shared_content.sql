-- Migration 015: Support Private Content & Private Sharing in MySQL
-- Date: 05-11-2026
-- Adds shared_users TEXT column to contents table to store allowed user handles for SHARED visibility

ALTER TABLE `contents` ADD COLUMN IF NOT EXISTS `shared_users` TEXT DEFAULT NULL AFTER `visibility`;
