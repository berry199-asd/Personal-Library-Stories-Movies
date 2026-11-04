-- Migration 018: Add client_message_id to messages table for chat deduplication
-- Prevents message senders from seeing duplicate messages when optimistic UI and server polling reconcile.

ALTER TABLE messages ADD COLUMN IF NOT EXISTS client_message_id VARCHAR(100);
CREATE INDEX IF NOT EXISTS idx_messages_client_id ON messages (client_message_id);
