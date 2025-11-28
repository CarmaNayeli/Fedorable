-- Add currency field to ShopItem table
-- Run this migration to support sparkle point purchases

ALTER TABLE "ShopItem" ADD COLUMN IF NOT EXISTS "currency" TEXT NOT NULL DEFAULT 'gems';

-- Update any existing sparkle point items (optional - only if you have existing data)
-- This is safe to run even if no data exists
UPDATE "ShopItem" SET "currency" = 'sparkle_points'
WHERE "id" IN (
  'sticker_llama',
  'sticker_shooting_star',
  'sticker_birthday_cake',
  'sticker_trophy',
  'sticker_crystal',
  'sticker_dragon',
  'sticker_phoenix',
  'sticker_galaxy',
  'sticker_medal'
);
