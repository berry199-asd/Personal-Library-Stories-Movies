-- Migration 017: Allow custom avatars and base64 images in users.avatar_url
ALTER TABLE `users` MODIFY COLUMN `avatar_url` LONGTEXT DEFAULT NULL;
