-- Add achievement fields to ShopItem table
-- Run this migration to add achievement tracking to shop stickers

ALTER TABLE "ShopItem" ADD COLUMN IF NOT EXISTS "isAchievement" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "ShopItem" ADD COLUMN IF NOT EXISTS "achievementType" TEXT;
ALTER TABLE "ShopItem" ADD COLUMN IF NOT EXISTS "achievementTarget" TEXT;
ALTER TABLE "ShopItem" ADD COLUMN IF NOT EXISTS "achievementGoal" INTEGER;
ALTER TABLE "ShopItem" ADD COLUMN IF NOT EXISTS "achievementDesc" TEXT;

-- Create index for faster achievement queries
CREATE INDEX IF NOT EXISTS "ShopItem_isAchievement_idx" ON "ShopItem"("isAchievement");
