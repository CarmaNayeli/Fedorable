-- Add lastCompletedAt column to Quest table
-- This tracks when a recurring quest was last completed, so we can hide it until the next day

ALTER TABLE "Quest" ADD COLUMN IF NOT EXISTS "lastCompletedAt" TIMESTAMP;
