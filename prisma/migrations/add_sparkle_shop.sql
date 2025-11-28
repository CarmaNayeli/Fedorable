-- Add Sparkle Shop tables for stickers

-- Create ShopItem table for available stickers
CREATE TABLE IF NOT EXISTS "ShopItem" (
  "id" TEXT PRIMARY KEY,
  "emoji" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "price" INTEGER NOT NULL,
  "isLimited" BOOLEAN NOT NULL DEFAULT false,
  "rarity" TEXT NOT NULL DEFAULT 'common',
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create StickerCollection table for owned stickers
CREATE TABLE IF NOT EXISTS "StickerCollection" (
  "id" TEXT PRIMARY KEY,
  "shopItemId" TEXT NOT NULL,
  "magicalGirlId" TEXT NOT NULL,
  "purchasedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("magicalGirlId") REFERENCES "MagicalGirl"("id") ON DELETE CASCADE,
  UNIQUE("shopItemId", "magicalGirlId")
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS "StickerCollection_magicalGirlId_idx" ON "StickerCollection"("magicalGirlId");
CREATE INDEX IF NOT EXISTS "StickerCollection_shopItemId_idx" ON "StickerCollection"("shopItemId");
CREATE INDEX IF NOT EXISTS "ShopItem_category_idx" ON "ShopItem"("category");
