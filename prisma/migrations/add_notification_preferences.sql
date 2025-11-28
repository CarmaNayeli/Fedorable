-- Add notificationPreferences column to Quest table
-- This allows storing custom notification times for each day of the week
-- Format: {"mon": "05:30", "tue": "05:30", ..., "sun": null}

ALTER TABLE "Quest" ADD COLUMN IF NOT EXISTS "notificationPreferences" JSONB;
