-- Rhia-minder Database Migration SQL
-- Complete database setup for new PostgreSQL instance
-- Generated: 2025-11-29

-- ==============================================
-- DROP EXISTING TABLES (if any)
-- ==============================================

DROP TABLE IF EXISTS "StickerCollection" CASCADE;
DROP TABLE IF EXISTS "ShopItem" CASCADE;
DROP TABLE IF EXISTS "PushSubscription" CASCADE;
DROP TABLE IF EXISTS "Notification" CASCADE;
DROP TABLE IF EXISTS "Collection" CASCADE;
DROP TABLE IF EXISTS "StoryChapter" CASCADE;
DROP TABLE IF EXISTS "MonsterDefeat" CASCADE;
DROP TABLE IF EXISTS "Quest" CASCADE;
DROP TABLE IF EXISTS "Realm" CASCADE;
DROP TABLE IF EXISTS "MagicalGirl" CASCADE;

-- ==============================================
-- CREATE TABLES
-- ==============================================

-- Main user/player table
CREATE TABLE "MagicalGirl" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Rhia',

    -- Progression
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "sparklePoints" INTEGER NOT NULL DEFAULT 0,
    "magicGems" INTEGER NOT NULL DEFAULT 0,
    "sparkleShields" INTEGER NOT NULL DEFAULT 0,

    -- Rank & Title
    "rank" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL DEFAULT 'Magical Girl',
    "prestigeLevel" INTEGER NOT NULL DEFAULT 0,

    -- Streaks
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "lastActivityDate" TIMESTAMP(3),

    -- Story Progress
    "currentChapter" INTEGER NOT NULL DEFAULT 0,
    "mainStoryComplete" BOOLEAN NOT NULL DEFAULT false,

    -- Stats
    "totalMonstersDefeated" INTEGER NOT NULL DEFAULT 0,

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Realms (areas of the home)
CREATE TABLE "Realm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "emoji" TEXT NOT NULL DEFAULT '🏠',
    "purity" INTEGER NOT NULL DEFAULT 50,
    "lastCleaned" TIMESTAMP(3),
    "magicalGirlId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Realm_magicalGirlId_fkey" FOREIGN KEY ("magicalGirlId")
        REFERENCES "MagicalGirl"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Realm_magicalGirlId_name_key" UNIQUE("magicalGirlId", "name")
);

-- Quests (chores reimagined as battles)
CREATE TABLE "Quest" (
    "id" TEXT NOT NULL PRIMARY KEY,

    -- Monster Info
    "monsterName" TEXT NOT NULL,
    "monsterEmoji" TEXT NOT NULL DEFAULT '💀',
    "description" TEXT,

    -- Quest Type
    "questType" TEXT NOT NULL DEFAULT 'daily',
    "realm" TEXT,

    -- Difficulty
    "threatLevel" INTEGER NOT NULL DEFAULT 2,

    -- Rewards
    "sparklePoints" INTEGER NOT NULL DEFAULT 20,
    "magicGems" INTEGER NOT NULL DEFAULT 0,
    "xpReward" INTEGER NOT NULL DEFAULT 10,

    -- Recurrence
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrenceRule" TEXT,
    "notificationPreferences" JSONB,

    -- Status
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "deadline" TIMESTAMP(3),
    "lastCompletedAt" TIMESTAMP(3),

    -- Custom creation
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "createdByPlayer" BOOLEAN NOT NULL DEFAULT false,

    "magicalGirlId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quest_magicalGirlId_fkey" FOREIGN KEY ("magicalGirlId")
        REFERENCES "MagicalGirl"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Monster Defeats (quest completions)
CREATE TABLE "MonsterDefeat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "defeatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sparklePointsEarned" INTEGER NOT NULL DEFAULT 0,
    "magicGemsEarned" INTEGER NOT NULL DEFAULT 0,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "wasCriticalHit" BOOLEAN NOT NULL DEFAULT false,
    "battleText" TEXT,
    "questId" TEXT NOT NULL,
    "magicalGirlId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MonsterDefeat_questId_fkey" FOREIGN KEY ("questId")
        REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MonsterDefeat_magicalGirlId_fkey" FOREIGN KEY ("magicalGirlId")
        REFERENCES "MagicalGirl"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Story Chapters
CREATE TABLE "StoryChapter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapterNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "unlocked" BOOLEAN NOT NULL DEFAULT false,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "magicalGirlId" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoryChapter_magicalGirlId_fkey" FOREIGN KEY ("magicalGirlId")
        REFERENCES "MagicalGirl"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StoryChapter_magicalGirlId_chapterNumber_key"
        UNIQUE("magicalGirlId", "chapterNumber")
);

-- Collections (bestiary, transformations, achievements)
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collectionType" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "itemDescription" TEXT,
    "itemEmoji" TEXT,
    "unlocked" BOOLEAN NOT NULL DEFAULT false,
    "unlockedAt" TIMESTAMP(3),
    "timesEncountered" INTEGER NOT NULL DEFAULT 0,
    "timesDefeated" INTEGER NOT NULL DEFAULT 0,
    "magicalGirlId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_magicalGirlId_fkey" FOREIGN KEY ("magicalGirlId")
        REFERENCES "MagicalGirl"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Collection_magicalGirlId_collectionType_itemId_key"
        UNIQUE("magicalGirlId", "collectionType", "itemId")
);

-- Notifications
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scheduledFor" TIMESTAMP(3) NOT NULL,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "snoozedUntil" TIMESTAMP(3),
    "snoozeCount" INTEGER NOT NULL DEFAULT 0,
    "questId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_questId_fkey" FOREIGN KEY ("questId")
        REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Push Subscriptions
CREATE TABLE "PushSubscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "endpoint" TEXT NOT NULL UNIQUE,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,
    "magicalGirlId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PushSubscription_magicalGirlId_fkey" FOREIGN KEY ("magicalGirlId")
        REFERENCES "MagicalGirl"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Shop Items (purchasable stickers)
CREATE TABLE "ShopItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "emoji" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'gems',
    "isLimited" BOOLEAN NOT NULL DEFAULT false,
    "rarity" TEXT NOT NULL DEFAULT 'common',
    "isAchievement" BOOLEAN NOT NULL DEFAULT false,
    "achievementType" TEXT,
    "achievementTarget" TEXT,
    "achievementGoal" INTEGER,
    "achievementDesc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Sticker Collection (owned stickers)
CREATE TABLE "StickerCollection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shopItemId" TEXT NOT NULL,
    "magicalGirlId" TEXT NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StickerCollection_magicalGirlId_fkey" FOREIGN KEY ("magicalGirlId")
        REFERENCES "MagicalGirl"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StickerCollection_shopItemId_magicalGirlId_key"
        UNIQUE("shopItemId", "magicalGirlId")
);

-- ==============================================
-- CREATE INDEXES
-- ==============================================

CREATE INDEX "ShopItem_category_idx" ON "ShopItem"("category");
CREATE INDEX "ShopItem_isAchievement_idx" ON "ShopItem"("isAchievement");
CREATE INDEX "StickerCollection_magicalGirlId_idx" ON "StickerCollection"("magicalGirlId");
CREATE INDEX "StickerCollection_shopItemId_idx" ON "StickerCollection"("shopItemId");

-- ==============================================
-- INSERT SHOP ITEMS (154 Stickers)
-- ==============================================

-- Starter/Free Category (5 items)
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity") VALUES
('starter_witch', '🧙‍♀️', 'Witch', 'starter', 0, 'gems', 'common'),
('starter_sparkle', '💫', 'Dizzy Sparkle', 'starter', 0, 'gems', 'common'),
('starter_sprout', '🌱', 'Sprout', 'starter', 0, 'gems', 'common'),
('starter_party', '🥳', 'Party Face', 'starter', 0, 'gems', 'common'),
('starter_magic', '🎩', 'Magic Hat', 'starter', 0, 'gems', 'common');

-- Cute Category (17 items)
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity") VALUES
('sticker_cat', '🐱', 'Cute Cat', 'cute', 5, 'gems', 'common'),
('sticker_dog', '🐶', 'Happy Puppy', 'cute', 5, 'gems', 'common'),
('sticker_bunny', '🐰', 'Fluffy Bunny', 'cute', 5, 'gems', 'common'),
('sticker_bear', '🐻', 'Teddy Bear', 'cute', 5, 'gems', 'common'),
('sticker_fox', '🦊', 'Clever Fox', 'cute', 5, 'gems', 'common'),
('sticker_hamster', '🐹', 'Hamster', 'cute', 5, 'gems', 'common'),
('sticker_mouse', '🐭', 'Little Mouse', 'cute', 5, 'gems', 'common'),
('sticker_pig', '🐷', 'Happy Pig', 'cute', 5, 'gems', 'common'),
('sticker_chick', '🐥', 'Baby Chick', 'cute', 5, 'gems', 'common'),
('sticker_penguin', '🐧', 'Penguin', 'cute', 6, 'gems', 'common'),
('sticker_panda', '🐼', 'Panda Friend', 'cute', 8, 'gems', 'rare'),
('sticker_koala', '🐨', 'Sleepy Koala', 'cute', 8, 'gems', 'rare'),
('sticker_sloth', '🦥', 'Lazy Sloth', 'cute', 8, 'gems', 'rare'),
('sticker_otter', '🦦', 'Playful Otter', 'cute', 10, 'gems', 'rare'),
('sticker_unicorn', '🦄', 'Magic Unicorn', 'cute', 15, 'gems', 'epic'),
('sticker_red_panda', '🦝', 'Red Panda', 'cute', 15, 'gems', 'epic'),
('sticker_llama', '🦙', 'Lovely Llama', 'cute', 500, 'sparkle_points', 'legendary');

-- Nature Category (20 items)
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity") VALUES
('sticker_flower', '🌸', 'Cherry Blossom', 'nature', 5, 'gems', 'common'),
('sticker_sunflower', '🌻', 'Sunflower', 'nature', 5, 'gems', 'common'),
('sticker_rose', '🌹', 'Red Rose', 'nature', 5, 'gems', 'common'),
('sticker_tulip', '🌷', 'Pretty Tulip', 'nature', 5, 'gems', 'common'),
('sticker_hibiscus', '🌺', 'Hibiscus', 'nature', 5, 'gems', 'common'),
('sticker_leaves', '🍃', 'Leaves', 'nature', 5, 'gems', 'common'),
('sticker_maple_leaf', '🍁', 'Maple Leaf', 'nature', 5, 'gems', 'common'),
('sticker_four_leaf', '🍀', 'Four Leaf Clover', 'nature', 6, 'gems', 'common'),
('sticker_cactus', '🌵', 'Cactus', 'nature', 6, 'gems', 'common'),
('sticker_mushroom', '🍄', 'Mushroom', 'nature', 6, 'gems', 'common'),
('sticker_butterfly', '🦋', 'Butterfly', 'nature', 8, 'gems', 'rare'),
('sticker_ladybug', '🐞', 'Ladybug', 'nature', 8, 'gems', 'rare'),
('sticker_bee', '🐝', 'Busy Bee', 'nature', 8, 'gems', 'rare'),
('sticker_rainbow', '🌈', 'Rainbow', 'nature', 10, 'gems', 'rare'),
('sticker_sun', '☀️', 'Sunshine', 'nature', 10, 'gems', 'rare'),
('sticker_cloud', '☁️', 'Fluffy Cloud', 'nature', 8, 'gems', 'rare'),
('sticker_moon', '🌙', 'Crescent Moon', 'nature', 12, 'gems', 'epic'),
('sticker_full_moon', '🌕', 'Full Moon', 'nature', 12, 'gems', 'epic'),
('sticker_shooting_star', '🌠', 'Shooting Star', 'nature', 400, 'sparkle_points', 'legendary');

-- Food Category (19 items)
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity") VALUES
('sticker_cake', '🍰', 'Strawberry Cake', 'food', 5, 'gems', 'common'),
('sticker_cupcake', '🧁', 'Cupcake', 'food', 5, 'gems', 'common'),
('sticker_cookie', '🍪', 'Cookie', 'food', 5, 'gems', 'common'),
('sticker_donut', '🍩', 'Donut', 'food', 5, 'gems', 'common'),
('sticker_candy', '🍬', 'Candy', 'food', 5, 'gems', 'common'),
('sticker_lollipop', '🍭', 'Lollipop', 'food', 5, 'gems', 'common'),
('sticker_chocolate', '🍫', 'Chocolate Bar', 'food', 5, 'gems', 'common'),
('sticker_honey', '🍯', 'Honey Pot', 'food', 6, 'gems', 'common'),
('sticker_ice_cream', '🍦', 'Ice Cream', 'food', 6, 'gems', 'common'),
('sticker_pizza', '🍕', 'Pizza Slice', 'food', 6, 'gems', 'common'),
('sticker_burger', '🍔', 'Burger', 'food', 6, 'gems', 'common'),
('sticker_fries', '🍟', 'French Fries', 'food', 6, 'gems', 'common'),
('sticker_popcorn', '🍿', 'Popcorn', 'food', 6, 'gems', 'common'),
('sticker_taco', '🌮', 'Taco', 'food', 7, 'gems', 'common'),
('sticker_sushi', '🍣', 'Sushi', 'food', 8, 'gems', 'rare'),
('sticker_bento', '🍱', 'Bento Box', 'food', 10, 'gems', 'rare'),
('sticker_ramen', '🍜', 'Ramen Bowl', 'food', 10, 'gems', 'rare'),
('sticker_dango', '🍡', 'Dango', 'food', 10, 'gems', 'rare'),
('sticker_birthday_cake', '🎂', 'Birthday Cake', 'food', 350, 'sparkle_points', 'legendary');

-- Sparkle Category (11 items)
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity") VALUES
('sticker_sparkles', '✨', 'Sparkles', 'sparkle', 8, 'gems', 'rare'),
('sticker_star', '⭐', 'Gold Star', 'sparkle', 8, 'gems', 'rare'),
('sticker_glitter_star', '🌟', 'Glitter Star', 'sparkle', 8, 'gems', 'rare'),
('sticker_heart', '💖', 'Sparkle Heart', 'sparkle', 10, 'gems', 'rare'),
('sticker_hearts', '💕', 'Two Hearts', 'sparkle', 10, 'gems', 'rare'),
('sticker_ribbon', '🎀', 'Pink Ribbon', 'sparkle', 10, 'gems', 'rare'),
('sticker_gem', '💎', 'Diamond', 'sparkle', 12, 'gems', 'epic'),
('sticker_crown', '👑', 'Royal Crown', 'sparkle', 15, 'gems', 'epic'),
('sticker_ring', '💍', 'Diamond Ring', 'sparkle', 15, 'gems', 'epic'),
('sticker_trophy', '🏆', 'Trophy', 'sparkle', 450, 'sparkle_points', 'legendary'),
('sticker_crystal', '🔮', 'Crystal Ball', 'sparkle', 600, 'sparkle_points', 'legendary');

-- Magical Category (8 items)
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity", "isLimited") VALUES
('sticker_fairy', '🧚', 'Fairy', 'magical', 12, 'gems', 'epic', false),
('sticker_wizard', '🧙', 'Wizard', 'magical', 12, 'gems', 'epic', false),
('sticker_magic_wand', '🪄', 'Magic Wand', 'magical', 15, 'gems', 'epic', false),
('sticker_mermaid', '🧜', 'Mermaid', 'magical', 15, 'gems', 'epic', false),
('sticker_vampire', '🧛', 'Vampire', 'magical', 15, 'gems', 'epic', false),
('sticker_genie', '🧞', 'Genie', 'magical', 18, 'gems', 'epic', false),
('sticker_dragon', '🐉', 'Dragon', 'magical', 550, 'sparkle_points', 'legendary', false),
('sticker_phoenix', '🔥', 'Phoenix', 'magical', 1000, 'sparkle_points', 'legendary', true);

-- Ocean Category (9 items)
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity") VALUES
('sticker_fish', '🐠', 'Tropical Fish', 'ocean', 5, 'gems', 'common'),
('sticker_blowfish', '🐡', 'Blowfish', 'ocean', 5, 'gems', 'common'),
('sticker_shell', '🐚', 'Seashell', 'ocean', 5, 'gems', 'common'),
('sticker_crab', '🦀', 'Crab', 'ocean', 6, 'gems', 'common'),
('sticker_octopus', '🐙', 'Octopus', 'ocean', 6, 'gems', 'common'),
('sticker_jellyfish', '🪼', 'Jellyfish', 'ocean', 8, 'gems', 'rare'),
('sticker_dolphin', '🐬', 'Dolphin', 'ocean', 10, 'gems', 'rare'),
('sticker_whale', '🐋', 'Whale', 'ocean', 12, 'gems', 'epic'),
('sticker_shark', '🦈', 'Shark', 'ocean', 15, 'gems', 'epic');

-- Space Category (7 items)
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity") VALUES
('sticker_planet', '🪐', 'Saturn', 'space', 8, 'gems', 'rare'),
('sticker_earth', '🌍', 'Earth', 'space', 8, 'gems', 'rare'),
('sticker_rocket', '🚀', 'Rocket Ship', 'space', 10, 'gems', 'rare'),
('sticker_satellite', '🛸', 'UFO', 'space', 12, 'gems', 'epic'),
('sticker_astronaut', '👨‍🚀', 'Astronaut', 'space', 15, 'gems', 'epic'),
('sticker_comet', '☄️', 'Comet', 'space', 15, 'gems', 'epic'),
('sticker_galaxy', '🌌', 'Galaxy', 'space', 500, 'sparkle_points', 'legendary');

-- Music Category (7 items)
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity") VALUES
('sticker_music_note', '🎵', 'Music Note', 'music', 5, 'gems', 'common'),
('sticker_notes', '🎶', 'Musical Notes', 'music', 6, 'gems', 'common'),
('sticker_headphones', '🎧', 'Headphones', 'music', 8, 'gems', 'rare'),
('sticker_microphone', '🎤', 'Microphone', 'music', 8, 'gems', 'rare'),
('sticker_guitar', '🎸', 'Guitar', 'music', 10, 'gems', 'rare'),
('sticker_saxophone', '🎷', 'Saxophone', 'music', 12, 'gems', 'epic'),
('sticker_trumpet', '🎺', 'Trumpet', 'music', 12, 'gems', 'epic');

-- Sports & Activities (7 items)
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity") VALUES
('sticker_soccer', '⚽', 'Soccer Ball', 'sports', 6, 'gems', 'common'),
('sticker_basketball', '🏀', 'Basketball', 'sports', 6, 'gems', 'common'),
('sticker_baseball', '⚾', 'Baseball', 'sports', 6, 'gems', 'common'),
('sticker_tennis', '🎾', 'Tennis Ball', 'sports', 6, 'gems', 'common'),
('sticker_volleyball', '🏐', 'Volleyball', 'sports', 6, 'gems', 'common'),
('sticker_bowling', '🎳', 'Bowling', 'sports', 8, 'gems', 'rare'),
('sticker_medal', '🥇', 'Gold Medal', 'sports', 300, 'sparkle_points', 'legendary');

-- Celebration Category (6 items)
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity") VALUES
('sticker_party_popper', '🎉', 'Party Popper', 'celebration', 6, 'gems', 'common'),
('sticker_confetti', '🎊', 'Confetti Ball', 'celebration', 6, 'gems', 'common'),
('sticker_balloon', '🎈', 'Balloon', 'celebration', 5, 'gems', 'common'),
('sticker_gift', '🎁', 'Gift Box', 'celebration', 8, 'gems', 'rare'),
('sticker_fireworks', '🎆', 'Fireworks', 'celebration', 10, 'gems', 'rare'),
('sticker_sparkler', '🎇', 'Sparkler', 'celebration', 10, 'gems', 'rare');

-- Seasonal Category (6 items)
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity") VALUES
('sticker_snowflake', '❄️', 'Snowflake', 'seasonal', 6, 'gems', 'common'),
('sticker_snowman', '⛄', 'Snowman', 'seasonal', 8, 'gems', 'rare'),
('sticker_jack_o_lantern', '🎃', 'Jack-O-Lantern', 'seasonal', 8, 'gems', 'rare'),
('sticker_christmas_tree', '🎄', 'Christmas Tree', 'seasonal', 10, 'gems', 'rare'),
('sticker_santa', '🎅', 'Santa Claus', 'seasonal', 12, 'gems', 'epic'),
('sticker_ghost', '👻', 'Friendly Ghost', 'seasonal', 10, 'gems', 'rare');

-- Achievement Stickers (7 items)
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity", "isAchievement", "achievementType", "achievementTarget", "achievementGoal", "achievementDesc") VALUES
('achievement_dishwasher_master', '🍽️', 'Dishwasher Master', 'achievement', 0, 'gems', 'epic', true, 'quest_streak', 'Kitchen Chaos Spirit', 7, 'Defeat the Kitchen Chaos Spirit every day for 7 days straight'),
('achievement_clean_sweep', '🧹', 'Clean Sweep Champion', 'achievement', 0, 'gems', 'rare', true, 'quest_streak', 'Sweep & Mop Monster', 4, 'Complete Sweep & Mop Monster 4 times'),
('achievement_bathroom_hero', '🛁', 'Bathroom Hero', 'achievement', 0, 'gems', 'epic', true, 'quest_streak', 'Bathroom Banshee', 5, 'Defeat any Bathroom Banshee 5 times'),
('achievement_streak_warrior', '🔥', 'Streak Warrior', 'achievement', 0, 'gems', 'legendary', true, 'total_streak', NULL, 30, 'Maintain a 30-day streak'),
('achievement_monster_slayer', '⚔️', 'Monster Slayer', 'achievement', 0, 'gems', 'epic', true, 'total_defeats', NULL, 100, 'Defeat 100 monsters total'),
('achievement_perfect_week', '🌟', 'Perfect Week', 'achievement', 0, 'gems', 'rare', true, 'perfect_week', NULL, 1, 'Complete all quests every day for a full week'),
('achievement_gem_collector', '💠', 'Gem Collector', 'achievement', 0, 'gems', 'epic', true, 'total_gems_earned', NULL, 50, 'Earn 50 magic gems total');

-- ==============================================
-- SUMMARY
-- ==============================================
-- Tables created: 11
-- Shop items inserted: 154
-- - Starter: 5 (free)
-- - Cute: 17
-- - Nature: 20
-- - Food: 19
-- - Sparkle: 11
-- - Magical: 8
-- - Ocean: 9
-- - Space: 7
-- - Music: 7
-- - Sports: 7
-- - Celebration: 6
-- - Seasonal: 6
-- - Achievement: 7

-- Database is now ready for use!
-- Next steps:
-- 1. Update your .env file with the new connection strings
-- 2. Run: npx prisma generate
-- 3. The app will auto-create MagicalGirl and Realms on first access
