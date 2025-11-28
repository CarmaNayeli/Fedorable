// Sparkle Shop - Stickers available for purchase or earned through achievements

export interface ShopSticker {
  id: string;
  emoji: string;
  name: string;
  category: string;
  price: number; // Cost in magic gems (0 for achievements)
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isLimited?: boolean;
  // Achievement fields
  isAchievement?: boolean;
  achievementType?: string;
  achievementTarget?: string; // Quest/monster name or ID
  achievementGoal?: number;
  achievementDesc?: string;
}

export const SHOP_STICKERS: ShopSticker[] = [
  // Cute Category
  { id: 'sticker_cat', emoji: '🐱', name: 'Cute Cat', category: 'cute', price: 5, rarity: 'common' },
  { id: 'sticker_dog', emoji: '🐶', name: 'Happy Puppy', category: 'cute', price: 5, rarity: 'common' },
  { id: 'sticker_bunny', emoji: '🐰', name: 'Fluffy Bunny', category: 'cute', price: 5, rarity: 'common' },
  { id: 'sticker_bear', emoji: '🐻', name: 'Teddy Bear', category: 'cute', price: 5, rarity: 'common' },
  { id: 'sticker_panda', emoji: '🐼', name: 'Panda Friend', category: 'cute', price: 8, rarity: 'rare' },
  { id: 'sticker_koala', emoji: '🐨', name: 'Sleepy Koala', category: 'cute', price: 8, rarity: 'rare' },
  { id: 'sticker_unicorn', emoji: '🦄', name: 'Magic Unicorn', category: 'cute', price: 15, rarity: 'epic' },

  // Nature Category
  { id: 'sticker_flower', emoji: '🌸', name: 'Cherry Blossom', category: 'nature', price: 5, rarity: 'common' },
  { id: 'sticker_sunflower', emoji: '🌻', name: 'Sunflower', category: 'nature', price: 5, rarity: 'common' },
  { id: 'sticker_rose', emoji: '🌹', name: 'Red Rose', category: 'nature', price: 5, rarity: 'common' },
  { id: 'sticker_tulip', emoji: '🌷', name: 'Pretty Tulip', category: 'nature', price: 5, rarity: 'common' },
  { id: 'sticker_butterfly', emoji: '🦋', name: 'Butterfly', category: 'nature', price: 8, rarity: 'rare' },
  { id: 'sticker_rainbow', emoji: '🌈', name: 'Rainbow', category: 'nature', price: 10, rarity: 'rare' },
  { id: 'sticker_moon', emoji: '🌙', name: 'Crescent Moon', category: 'nature', price: 12, rarity: 'epic' },

  // Food Category
  { id: 'sticker_cake', emoji: '🍰', name: 'Strawberry Cake', category: 'food', price: 5, rarity: 'common' },
  { id: 'sticker_cupcake', emoji: '🧁', name: 'Cupcake', category: 'food', price: 5, rarity: 'common' },
  { id: 'sticker_cookie', emoji: '🍪', name: 'Cookie', category: 'food', price: 5, rarity: 'common' },
  { id: 'sticker_donut', emoji: '🍩', name: 'Donut', category: 'food', price: 5, rarity: 'common' },
  { id: 'sticker_ice_cream', emoji: '🍦', name: 'Ice Cream', category: 'food', price: 6, rarity: 'common' },
  { id: 'sticker_pizza', emoji: '🍕', name: 'Pizza Slice', category: 'food', price: 6, rarity: 'common' },
  { id: 'sticker_bento', emoji: '🍱', name: 'Bento Box', category: 'food', price: 10, rarity: 'rare' },

  // Sparkle Category
  { id: 'sticker_sparkles', emoji: '✨', name: 'Sparkles', category: 'sparkle', price: 8, rarity: 'rare' },
  { id: 'sticker_star', emoji: '⭐', name: 'Gold Star', category: 'sparkle', price: 8, rarity: 'rare' },
  { id: 'sticker_heart', emoji: '💖', name: 'Sparkle Heart', category: 'sparkle', price: 10, rarity: 'rare' },
  { id: 'sticker_gem', emoji: '💎', name: 'Diamond', category: 'sparkle', price: 12, rarity: 'epic' },
  { id: 'sticker_crown', emoji: '👑', name: 'Royal Crown', category: 'sparkle', price: 15, rarity: 'epic' },
  { id: 'sticker_crystal', emoji: '🔮', name: 'Crystal Ball', category: 'sparkle', price: 20, rarity: 'legendary' },

  // Magical Category
  { id: 'sticker_fairy', emoji: '🧚', name: 'Fairy', category: 'magical', price: 12, rarity: 'epic' },
  { id: 'sticker_wizard', emoji: '🧙', name: 'Wizard', category: 'magical', price: 12, rarity: 'epic' },
  { id: 'sticker_magic_wand', emoji: '🪄', name: 'Magic Wand', category: 'magical', price: 15, rarity: 'epic' },
  { id: 'sticker_dragon', emoji: '🐉', name: 'Dragon', category: 'magical', price: 20, rarity: 'legendary' },
  { id: 'sticker_phoenix', emoji: '🔥🦅', name: 'Phoenix', category: 'magical', price: 25, rarity: 'legendary', isLimited: true },

  // Achievement Stickers - Earned by completing challenges
  {
    id: 'achievement_dishwasher_master',
    emoji: '🍽️',
    name: 'Dishwasher Master',
    category: 'achievement',
    price: 0,
    rarity: 'epic',
    isAchievement: true,
    achievementType: 'quest_streak',
    achievementTarget: 'Kitchen Chaos Spirit', // Monster name
    achievementGoal: 7,
    achievementDesc: 'Defeat the Kitchen Chaos Spirit every day for 7 days straight'
  },
  {
    id: 'achievement_clean_sweep',
    emoji: '🧹',
    name: 'Clean Sweep Champion',
    category: 'achievement',
    price: 0,
    rarity: 'rare',
    isAchievement: true,
    achievementType: 'quest_streak',
    achievementTarget: 'Sweep & Mop Monster',
    achievementGoal: 4,
    achievementDesc: 'Complete Sweep & Mop Monster 4 times'
  },
  {
    id: 'achievement_bathroom_hero',
    emoji: '🛁',
    name: 'Bathroom Hero',
    category: 'achievement',
    price: 0,
    rarity: 'epic',
    isAchievement: true,
    achievementType: 'quest_streak',
    achievementTarget: 'Bathroom Banshee',
    achievementGoal: 5,
    achievementDesc: 'Defeat any Bathroom Banshee 5 times'
  },
  {
    id: 'achievement_streak_warrior',
    emoji: '🔥',
    name: 'Streak Warrior',
    category: 'achievement',
    price: 0,
    rarity: 'legendary',
    isAchievement: true,
    achievementType: 'total_streak',
    achievementGoal: 30,
    achievementDesc: 'Maintain a 30-day streak'
  },
  {
    id: 'achievement_monster_slayer',
    emoji: '⚔️',
    name: 'Monster Slayer',
    category: 'achievement',
    price: 0,
    rarity: 'epic',
    isAchievement: true,
    achievementType: 'total_defeats',
    achievementGoal: 100,
    achievementDesc: 'Defeat 100 monsters total'
  },
  {
    id: 'achievement_perfect_week',
    emoji: '🌟',
    name: 'Perfect Week',
    category: 'achievement',
    price: 0,
    rarity: 'rare',
    isAchievement: true,
    achievementType: 'perfect_week',
    achievementGoal: 1,
    achievementDesc: 'Complete all quests every day for a full week'
  },
  {
    id: 'achievement_gem_collector',
    emoji: '💠',
    name: 'Gem Collector',
    category: 'achievement',
    price: 0,
    rarity: 'epic',
    isAchievement: true,
    achievementType: 'total_gems_earned',
    achievementGoal: 50,
    achievementDesc: 'Earn 50 magic gems total'
  },
];

export const SHIELD_PRICE = 50; // Sparkle points to buy one shield

export function getCategorizedStickers() {
  const categories: Record<string, ShopSticker[]> = {};

  SHOP_STICKERS.forEach(sticker => {
    if (!categories[sticker.category]) {
      categories[sticker.category] = [];
    }
    categories[sticker.category].push(sticker);
  });

  return categories;
}

export function getStickerById(id: string): ShopSticker | undefined {
  return SHOP_STICKERS.find(s => s.id === id);
}

export const RARITY_COLORS = {
  common: { bg: 'from-gray-600 to-gray-700', border: 'border-gray-400', text: 'text-gray-300' },
  rare: { bg: 'from-blue-600 to-blue-700', border: 'border-blue-400', text: 'text-blue-300' },
  epic: { bg: 'from-purple-600 to-purple-700', border: 'border-purple-400', text: 'text-purple-300' },
  legendary: { bg: 'from-yellow-500 to-orange-600', border: 'border-yellow-400', text: 'text-yellow-300' },
};
