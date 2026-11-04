-- Migration 019: Add attachment columns to messages and allow LONGTEXT for message_attachments
-- Allows direct storage and retrieval of full-resolution and Base64 image attachments in real-time chat.

ALTER TABLE messages ADD COLUMN IF NOT EXISTS attachment_url LONGTEXT;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS attachment_name VARCHAR(255);
ALTER TABLE messages ADD COLUMN IF NOT EXISTS attachment_type VARCHAR(50);

ALTER TABLE message_attachments MODIFY COLUMN external_url LONGTEXT;
