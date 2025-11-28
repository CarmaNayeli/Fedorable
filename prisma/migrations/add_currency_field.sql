-- Add currency field to ShopItem table
-- Run this migration to support sparkle point purchases

ALTER TABLE "ShopItem" ADD COLUMN IF NOT EXISTS "currency" TEXT NOT NULL DEFAULT 'gems';

-- Update any existing sparkle point items with correct currency and prices
-- This is safe to run even if no data exists
UPDATE "ShopItem" SET "currency" = 'sparkle_points', "price" = 500 WHERE "id" = 'sticker_llama';
UPDATE "ShopItem" SET "currency" = 'sparkle_points', "price" = 400 WHERE "id" = 'sticker_shooting_star';
UPDATE "ShopItem" SET "currency" = 'sparkle_points', "price" = 350 WHERE "id" = 'sticker_birthday_cake';
UPDATE "ShopItem" SET "currency" = 'sparkle_points', "price" = 450 WHERE "id" = 'sticker_trophy';
UPDATE "ShopItem" SET "currency" = 'sparkle_points', "price" = 600 WHERE "id" = 'sticker_crystal';
UPDATE "ShopItem" SET "currency" = 'sparkle_points', "price" = 550 WHERE "id" = 'sticker_dragon';
UPDATE "ShopItem" SET "currency" = 'sparkle_points', "price" = 1000 WHERE "id" = 'sticker_phoenix';
UPDATE "ShopItem" SET "currency" = 'sparkle_points', "price" = 500 WHERE "id" = 'sticker_galaxy';
UPDATE "ShopItem" SET "currency" = 'sparkle_points', "price" = 300 WHERE "id" = 'sticker_medal';
