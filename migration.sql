-- Fedorable Database Migration SQL
-- Complete database setup for new PostgreSQL instance
-- Zoo Animal Care Tracker - Help Fedora manage a thriving zoo!
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

-- Fedora - The Zookeeper (main player/user table)
CREATE TABLE "MagicalGirl" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Fedora',

    -- Progression
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "sparklePoints" INTEGER NOT NULL DEFAULT 0, -- Zoo Coins
    "magicGems" INTEGER NOT NULL DEFAULT 0, -- Treats
    "sparkleShields" INTEGER NOT NULL DEFAULT 0, -- Vacation Days

    -- Rank & Title
    "rank" INTEGER NOT NULL DEFAULT 1, -- 1-5 star rank
    "title" TEXT NOT NULL DEFAULT 'Junior Zookeeper',
    "prestigeLevel" INTEGER NOT NULL DEFAULT 0,

    -- Streaks
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "lastActivityDate" TIMESTAMP(3),

    -- Story Progress
    "currentChapter" INTEGER NOT NULL DEFAULT 0,
    "mainStoryComplete" BOOLEAN NOT NULL DEFAULT false,

    -- Stats
    "totalMonstersDefeated" INTEGER NOT NULL DEFAULT 0, -- Total Tasks Completed

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Realms (areas of the zoo/home)
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

-- Quests (animal care tasks)
CREATE TABLE "Quest" (
    "id" TEXT NOT NULL PRIMARY KEY,

    -- Task/Animal Info
    "monsterName" TEXT NOT NULL, -- "Feed the Penguins", "Clean Lion Habitat"
    "monsterEmoji" TEXT NOT NULL DEFAULT '🦁',
    "description" TEXT,

    -- Quest Type
    "questType" TEXT NOT NULL DEFAULT 'daily',
    "realm" TEXT, -- Which area/habitat this belongs to

    -- Difficulty (care level)
    "threatLevel" INTEGER NOT NULL DEFAULT 2, -- 1-5 stars

    -- Rewards
    "sparklePoints" INTEGER NOT NULL DEFAULT 20, -- Zoo Coins
    "magicGems" INTEGER NOT NULL DEFAULT 0, -- Treats
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

-- Task Completions (quest completions)
CREATE TABLE "MonsterDefeat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "defeatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sparklePointsEarned" INTEGER NOT NULL DEFAULT 0, -- Zoo Coins Earned
    "magicGemsEarned" INTEGER NOT NULL DEFAULT 0, -- Treats Earned
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

-- Collections (bestiary, achievements, etc.)
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

-- Shop Items (purchasable animal stickers)
CREATE TABLE "ShopItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "emoji" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'gems', -- 'gems' = Treats, 'sparkle_points' = Zoo Coins
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
-- INSERT SHOP ITEMS (143 Animal Stickers)
-- ==============================================

-- Starter/Free Category (5 items) - For new zookeepers
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity") VALUES
('starter_lion', '🦁', 'Lion', 'starter', 0, 'gems', 'common'),
('starter_parrot', '🦜', 'Parrot', 'starter', 0, 'gems', 'common'),
('starter_sprout', '🌱', 'Sprout', 'starter', 0, 'gems', 'common'),
('starter_party', '🥳', 'Party Face', 'starter', 0, 'gems', 'common'),
('starter_paw', '🐾', 'Paw Print', 'starter', 0, 'gems', 'common');

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

-- Nature Category (19 items)
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

-- Zoo Animals Category (22 items)
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity") VALUES
('sticker_lion', '🦁', 'Mighty Lion', 'zoo', 8, 'gems', 'rare'),
('sticker_tiger', '🐯', 'Tiger', 'zoo', 8, 'gems', 'rare'),
('sticker_leopard', '🐆', 'Leopard', 'zoo', 8, 'gems', 'rare'),
('sticker_elephant', '🐘', 'Gentle Giant', 'zoo', 10, 'gems', 'rare'),
('sticker_giraffe', '🦒', 'Tall Giraffe', 'zoo', 10, 'gems', 'rare'),
('sticker_zebra', '🦓', 'Striped Zebra', 'zoo', 10, 'gems', 'rare'),
('sticker_rhino', '🦏', 'Rhinoceros', 'zoo', 12, 'gems', 'epic'),
('sticker_hippo', '🦛', 'Happy Hippo', 'zoo', 12, 'gems', 'epic'),
('sticker_gorilla', '🦍', 'Gorilla', 'zoo', 12, 'gems', 'epic'),
('sticker_monkey', '🐵', 'Cheeky Monkey', 'zoo', 6, 'gems', 'common'),
('sticker_seal', '🦭', 'Playful Seal', 'zoo', 8, 'gems', 'rare'),
('sticker_polar_bear', '🐻‍❄️', 'Polar Bear', 'zoo', 15, 'gems', 'epic'),
('sticker_flamingo', '🦩', 'Pink Flamingo', 'zoo', 10, 'gems', 'rare'),
('sticker_peacock', '🦚', 'Proud Peacock', 'zoo', 12, 'gems', 'epic'),
('sticker_parrot', '🦜', 'Colorful Parrot', 'zoo', 8, 'gems', 'rare'),
('sticker_owl', '🦉', 'Wise Owl', 'zoo', 10, 'gems', 'rare'),
('sticker_eagle', '🦅', 'Majestic Eagle', 'zoo', 12, 'gems', 'epic'),
('sticker_snake', '🐍', 'Slithering Snake', 'zoo', 8, 'gems', 'rare'),
('sticker_turtle', '🐢', 'Slow Turtle', 'zoo', 6, 'gems', 'common'),
('sticker_crocodile', '🐊', 'Crocodile', 'zoo', 10, 'gems', 'rare'),
('sticker_t_rex', '🦖', 'T-Rex (Fossil)', 'zoo', 600, 'sparkle_points', 'legendary'),
('sticker_mammoth', '🦣', 'Woolly Mammoth', 'zoo', 800, 'sparkle_points', 'legendary');

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

-- Achievement Stickers (7 items) - Earned by completing zoo care challenges
INSERT INTO "ShopItem" ("id", "emoji", "name", "category", "price", "currency", "rarity", "isAchievement", "achievementType", "achievementTarget", "achievementGoal", "achievementDesc") VALUES
('achievement_penguin_care', '🐧', 'Penguin Specialist', 'achievement', 0, 'gems', 'epic', true, 'quest_streak', 'Feed the Penguins', 7, 'Feed the Penguins every day for 7 days straight'),
('achievement_habitat_master', '🧹', 'Habitat Master', 'achievement', 0, 'gems', 'rare', true, 'quest_streak', 'Clean Elephant Yard', 4, 'Complete habitat cleaning 4 times'),
('achievement_lion_expert', '🦁', 'Lion Expert', 'achievement', 0, 'gems', 'epic', true, 'quest_streak', 'Feed the Lions', 5, 'Feed the Lions 5 times'),
('achievement_streak_warrior', '🔥', 'Dedication Champion', 'achievement', 0, 'gems', 'legendary', true, 'total_streak', NULL, 30, 'Maintain a 30-day streak'),
('achievement_task_master', '✅', 'Task Master', 'achievement', 0, 'gems', 'epic', true, 'total_defeats', NULL, 100, 'Complete 100 tasks total'),
('achievement_perfect_week', '🌟', 'Perfect Week', 'achievement', 0, 'gems', 'rare', true, 'perfect_week', NULL, 1, 'Complete all tasks every day for a full week'),
('achievement_treat_collector', '🍖', 'Treat Collector', 'achievement', 0, 'gems', 'epic', true, 'total_gems_earned', NULL, 50, 'Earn 50 treats total');

-- ==============================================
-- SUMMARY
-- ==============================================
-- Tables created: 11
-- Shop items inserted: 143
-- - Starter: 5 (free for new zookeepers)
-- - Cute: 17
-- - Nature: 19
-- - Food: 19
-- - Sparkle: 11
-- - Zoo Animals: 22 (lions, tigers, elephants, giraffes, etc.)
-- - Ocean: 9
-- - Space: 7
-- - Music: 7
-- - Sports: 7
-- - Celebration: 6
-- - Seasonal: 6
-- - Achievement: 7 (unlocked through gameplay)

-- Currency System:
-- - Zoo Coins (sparklePoints): Earned from completing tasks
-- - Treats (magicGems): Earned from difficult tasks
-- - Vacation Days (sparkleShields): Streak protection

-- Database is now ready for Fedora's zoo adventure!
-- Next steps:
-- 1. Update your .env file with the new Supabase connection strings
-- 2. Run: npx prisma generate
-- 3. The app will auto-create Fedora and Realms on first access
