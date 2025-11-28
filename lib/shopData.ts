// Sparkle Shop - Stickers available for purchase or earned through achievements

export interface ShopSticker {
  id: string;
  emoji: string;
  name: string;
  category: string;
  price: number; // Cost amount
  currency?: 'gems' | 'sparkle_points'; // Currency type (defaults to 'gems')
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
  // Starter/Free Category - For testing and new players
  { id: 'starter_witch', emoji: '🧙‍♀️', name: 'Witch', category: 'starter', price: 0, rarity: 'common' },
  { id: 'starter_sparkle', emoji: '💫', name: 'Dizzy Sparkle', category: 'starter', price: 0, rarity: 'common' },
  { id: 'starter_sprout', emoji: '🌱', name: 'Sprout', category: 'starter', price: 0, rarity: 'common' },
  { id: 'starter_party', emoji: '🥳', name: 'Party Face', category: 'starter', price: 0, rarity: 'common' },
  { id: 'starter_magic', emoji: '🎩', name: 'Magic Hat', category: 'starter', price: 0, rarity: 'common' },

  // Cute Category
  { id: 'sticker_cat', emoji: '🐱', name: 'Cute Cat', category: 'cute', price: 5, rarity: 'common' },
  { id: 'sticker_dog', emoji: '🐶', name: 'Happy Puppy', category: 'cute', price: 5, rarity: 'common' },
  { id: 'sticker_bunny', emoji: '🐰', name: 'Fluffy Bunny', category: 'cute', price: 5, rarity: 'common' },
  { id: 'sticker_bear', emoji: '🐻', name: 'Teddy Bear', category: 'cute', price: 5, rarity: 'common' },
  { id: 'sticker_fox', emoji: '🦊', name: 'Clever Fox', category: 'cute', price: 5, rarity: 'common' },
  { id: 'sticker_hamster', emoji: '🐹', name: 'Hamster', category: 'cute', price: 5, rarity: 'common' },
  { id: 'sticker_mouse', emoji: '🐭', name: 'Little Mouse', category: 'cute', price: 5, rarity: 'common' },
  { id: 'sticker_pig', emoji: '🐷', name: 'Happy Pig', category: 'cute', price: 5, rarity: 'common' },
  { id: 'sticker_chick', emoji: '🐥', name: 'Baby Chick', category: 'cute', price: 5, rarity: 'common' },
  { id: 'sticker_penguin', emoji: '🐧', name: 'Penguin', category: 'cute', price: 6, rarity: 'common' },
  { id: 'sticker_panda', emoji: '🐼', name: 'Panda Friend', category: 'cute', price: 8, rarity: 'rare' },
  { id: 'sticker_koala', emoji: '🐨', name: 'Sleepy Koala', category: 'cute', price: 8, rarity: 'rare' },
  { id: 'sticker_sloth', emoji: '🦥', name: 'Lazy Sloth', category: 'cute', price: 8, rarity: 'rare' },
  { id: 'sticker_otter', emoji: '🦦', name: 'Playful Otter', category: 'cute', price: 10, rarity: 'rare' },
  { id: 'sticker_unicorn', emoji: '🦄', name: 'Magic Unicorn', category: 'cute', price: 15, rarity: 'epic' },
  { id: 'sticker_red_panda', emoji: '🦝', name: 'Red Panda', category: 'cute', price: 15, rarity: 'epic' },
  { id: 'sticker_llama', emoji: '🦙', name: 'Lovely Llama', category: 'cute', price: 500, currency: 'sparkle_points', rarity: 'legendary' },

  // Nature Category
  { id: 'sticker_flower', emoji: '🌸', name: 'Cherry Blossom', category: 'nature', price: 5, rarity: 'common' },
  { id: 'sticker_sunflower', emoji: '🌻', name: 'Sunflower', category: 'nature', price: 5, rarity: 'common' },
  { id: 'sticker_rose', emoji: '🌹', name: 'Red Rose', category: 'nature', price: 5, rarity: 'common' },
  { id: 'sticker_tulip', emoji: '🌷', name: 'Pretty Tulip', category: 'nature', price: 5, rarity: 'common' },
  { id: 'sticker_hibiscus', emoji: '🌺', name: 'Hibiscus', category: 'nature', price: 5, rarity: 'common' },
  { id: 'sticker_leaves', emoji: '🍃', name: 'Leaves', category: 'nature', price: 5, rarity: 'common' },
  { id: 'sticker_maple_leaf', emoji: '🍁', name: 'Maple Leaf', category: 'nature', price: 5, rarity: 'common' },
  { id: 'sticker_four_leaf', emoji: '🍀', name: 'Four Leaf Clover', category: 'nature', price: 6, rarity: 'common' },
  { id: 'sticker_cactus', emoji: '🌵', name: 'Cactus', category: 'nature', price: 6, rarity: 'common' },
  { id: 'sticker_mushroom', emoji: '🍄', name: 'Mushroom', category: 'nature', price: 6, rarity: 'common' },
  { id: 'sticker_butterfly', emoji: '🦋', name: 'Butterfly', category: 'nature', price: 8, rarity: 'rare' },
  { id: 'sticker_ladybug', emoji: '🐞', name: 'Ladybug', category: 'nature', price: 8, rarity: 'rare' },
  { id: 'sticker_bee', emoji: '🐝', name: 'Busy Bee', category: 'nature', price: 8, rarity: 'rare' },
  { id: 'sticker_rainbow', emoji: '🌈', name: 'Rainbow', category: 'nature', price: 10, rarity: 'rare' },
  { id: 'sticker_sun', emoji: '☀️', name: 'Sunshine', category: 'nature', price: 10, rarity: 'rare' },
  { id: 'sticker_cloud', emoji: '☁️', name: 'Fluffy Cloud', category: 'nature', price: 8, rarity: 'rare' },
  { id: 'sticker_moon', emoji: '🌙', name: 'Crescent Moon', category: 'nature', price: 12, rarity: 'epic' },
  { id: 'sticker_full_moon', emoji: '🌕', name: 'Full Moon', category: 'nature', price: 12, rarity: 'epic' },
  { id: 'sticker_shooting_star', emoji: '🌠', name: 'Shooting Star', category: 'nature', price: 400, currency: 'sparkle_points', rarity: 'legendary' },

  // Food Category
  { id: 'sticker_cake', emoji: '🍰', name: 'Strawberry Cake', category: 'food', price: 5, rarity: 'common' },
  { id: 'sticker_cupcake', emoji: '🧁', name: 'Cupcake', category: 'food', price: 5, rarity: 'common' },
  { id: 'sticker_cookie', emoji: '🍪', name: 'Cookie', category: 'food', price: 5, rarity: 'common' },
  { id: 'sticker_donut', emoji: '🍩', name: 'Donut', category: 'food', price: 5, rarity: 'common' },
  { id: 'sticker_candy', emoji: '🍬', name: 'Candy', category: 'food', price: 5, rarity: 'common' },
  { id: 'sticker_lollipop', emoji: '🍭', name: 'Lollipop', category: 'food', price: 5, rarity: 'common' },
  { id: 'sticker_chocolate', emoji: '🍫', name: 'Chocolate Bar', category: 'food', price: 5, rarity: 'common' },
  { id: 'sticker_honey', emoji: '🍯', name: 'Honey Pot', category: 'food', price: 6, rarity: 'common' },
  { id: 'sticker_ice_cream', emoji: '🍦', name: 'Ice Cream', category: 'food', price: 6, rarity: 'common' },
  { id: 'sticker_pizza', emoji: '🍕', name: 'Pizza Slice', category: 'food', price: 6, rarity: 'common' },
  { id: 'sticker_burger', emoji: '🍔', name: 'Burger', category: 'food', price: 6, rarity: 'common' },
  { id: 'sticker_fries', emoji: '🍟', name: 'French Fries', category: 'food', price: 6, rarity: 'common' },
  { id: 'sticker_popcorn', emoji: '🍿', name: 'Popcorn', category: 'food', price: 6, rarity: 'common' },
  { id: 'sticker_taco', emoji: '🌮', name: 'Taco', category: 'food', price: 7, rarity: 'common' },
  { id: 'sticker_sushi', emoji: '🍣', name: 'Sushi', category: 'food', price: 8, rarity: 'rare' },
  { id: 'sticker_bento', emoji: '🍱', name: 'Bento Box', category: 'food', price: 10, rarity: 'rare' },
  { id: 'sticker_ramen', emoji: '🍜', name: 'Ramen Bowl', category: 'food', price: 10, rarity: 'rare' },
  { id: 'sticker_dango', emoji: '🍡', name: 'Dango', category: 'food', price: 10, rarity: 'rare' },
  { id: 'sticker_birthday_cake', emoji: '🎂', name: 'Birthday Cake', category: 'food', price: 350, currency: 'sparkle_points', rarity: 'legendary' },

  // Sparkle Category
  { id: 'sticker_sparkles', emoji: '✨', name: 'Sparkles', category: 'sparkle', price: 8, rarity: 'rare' },
  { id: 'sticker_star', emoji: '⭐', name: 'Gold Star', category: 'sparkle', price: 8, rarity: 'rare' },
  { id: 'sticker_glitter_star', emoji: '🌟', name: 'Glitter Star', category: 'sparkle', price: 8, rarity: 'rare' },
  { id: 'sticker_heart', emoji: '💖', name: 'Sparkle Heart', category: 'sparkle', price: 10, rarity: 'rare' },
  { id: 'sticker_hearts', emoji: '💕', name: 'Two Hearts', category: 'sparkle', price: 10, rarity: 'rare' },
  { id: 'sticker_ribbon', emoji: '🎀', name: 'Pink Ribbon', category: 'sparkle', price: 10, rarity: 'rare' },
  { id: 'sticker_gem', emoji: '💎', name: 'Diamond', category: 'sparkle', price: 12, rarity: 'epic' },
  { id: 'sticker_crown', emoji: '👑', name: 'Royal Crown', category: 'sparkle', price: 15, rarity: 'epic' },
  { id: 'sticker_ring', emoji: '💍', name: 'Diamond Ring', category: 'sparkle', price: 15, rarity: 'epic' },
  { id: 'sticker_trophy', emoji: '🏆', name: 'Trophy', category: 'sparkle', price: 450, currency: 'sparkle_points', rarity: 'legendary' },
  { id: 'sticker_crystal', emoji: '🔮', name: 'Crystal Ball', category: 'sparkle', price: 600, currency: 'sparkle_points', rarity: 'legendary' },

  // Magical Category
  { id: 'sticker_fairy', emoji: '🧚', name: 'Fairy', category: 'magical', price: 12, rarity: 'epic' },
  { id: 'sticker_wizard', emoji: '🧙', name: 'Wizard', category: 'magical', price: 12, rarity: 'epic' },
  { id: 'sticker_magic_wand', emoji: '🪄', name: 'Magic Wand', category: 'magical', price: 15, rarity: 'epic' },
  { id: 'sticker_mermaid', emoji: '🧜', name: 'Mermaid', category: 'magical', price: 15, rarity: 'epic' },
  { id: 'sticker_vampire', emoji: '🧛', name: 'Vampire', category: 'magical', price: 15, rarity: 'epic' },
  { id: 'sticker_genie', emoji: '🧞', name: 'Genie', category: 'magical', price: 18, rarity: 'epic' },
  { id: 'sticker_dragon', emoji: '🐉', name: 'Dragon', category: 'magical', price: 550, currency: 'sparkle_points', rarity: 'legendary' },
  { id: 'sticker_phoenix', emoji: '🔥', name: 'Phoenix', category: 'magical', price: 1000, currency: 'sparkle_points', rarity: 'legendary', isLimited: true },

  // Ocean Category
  { id: 'sticker_fish', emoji: '🐠', name: 'Tropical Fish', category: 'ocean', price: 5, rarity: 'common' },
  { id: 'sticker_blowfish', emoji: '🐡', name: 'Blowfish', category: 'ocean', price: 5, rarity: 'common' },
  { id: 'sticker_shell', emoji: '🐚', name: 'Seashell', category: 'ocean', price: 5, rarity: 'common' },
  { id: 'sticker_crab', emoji: '🦀', name: 'Crab', category: 'ocean', price: 6, rarity: 'common' },
  { id: 'sticker_octopus', emoji: '🐙', name: 'Octopus', category: 'ocean', price: 6, rarity: 'common' },
  { id: 'sticker_jellyfish', emoji: '🪼', name: 'Jellyfish', category: 'ocean', price: 8, rarity: 'rare' },
  { id: 'sticker_dolphin', emoji: '🐬', name: 'Dolphin', category: 'ocean', price: 10, rarity: 'rare' },
  { id: 'sticker_whale', emoji: '🐋', name: 'Whale', category: 'ocean', price: 12, rarity: 'epic' },
  { id: 'sticker_shark', emoji: '🦈', name: 'Shark', category: 'ocean', price: 15, rarity: 'epic' },

  // Space Category
  { id: 'sticker_planet', emoji: '🪐', name: 'Saturn', category: 'space', price: 8, rarity: 'rare' },
  { id: 'sticker_earth', emoji: '🌍', name: 'Earth', category: 'space', price: 8, rarity: 'rare' },
  { id: 'sticker_rocket', emoji: '🚀', name: 'Rocket Ship', category: 'space', price: 10, rarity: 'rare' },
  { id: 'sticker_satellite', emoji: '🛸', name: 'UFO', category: 'space', price: 12, rarity: 'epic' },
  { id: 'sticker_astronaut', emoji: '👨‍🚀', name: 'Astronaut', category: 'space', price: 15, rarity: 'epic' },
  { id: 'sticker_comet', emoji: '☄️', name: 'Comet', category: 'space', price: 15, rarity: 'epic' },
  { id: 'sticker_galaxy', emoji: '🌌', name: 'Galaxy', category: 'space', price: 500, currency: 'sparkle_points', rarity: 'legendary' },

  // Music Category
  { id: 'sticker_music_note', emoji: '🎵', name: 'Music Note', category: 'music', price: 5, rarity: 'common' },
  { id: 'sticker_notes', emoji: '🎶', name: 'Musical Notes', category: 'music', price: 6, rarity: 'common' },
  { id: 'sticker_headphones', emoji: '🎧', name: 'Headphones', category: 'music', price: 8, rarity: 'rare' },
  { id: 'sticker_microphone', emoji: '🎤', name: 'Microphone', category: 'music', price: 8, rarity: 'rare' },
  { id: 'sticker_guitar', emoji: '🎸', name: 'Guitar', category: 'music', price: 10, rarity: 'rare' },
  { id: 'sticker_saxophone', emoji: '🎷', name: 'Saxophone', category: 'music', price: 12, rarity: 'epic' },
  { id: 'sticker_trumpet', emoji: '🎺', name: 'Trumpet', category: 'music', price: 12, rarity: 'epic' },

  // Sports & Activities
  { id: 'sticker_soccer', emoji: '⚽', name: 'Soccer Ball', category: 'sports', price: 6, rarity: 'common' },
  { id: 'sticker_basketball', emoji: '🏀', name: 'Basketball', category: 'sports', price: 6, rarity: 'common' },
  { id: 'sticker_baseball', emoji: '⚾', name: 'Baseball', category: 'sports', price: 6, rarity: 'common' },
  { id: 'sticker_tennis', emoji: '🎾', name: 'Tennis Ball', category: 'sports', price: 6, rarity: 'common' },
  { id: 'sticker_volleyball', emoji: '🏐', name: 'Volleyball', category: 'sports', price: 6, rarity: 'common' },
  { id: 'sticker_bowling', emoji: '🎳', name: 'Bowling', category: 'sports', price: 8, rarity: 'rare' },
  { id: 'sticker_medal', emoji: '🥇', name: 'Gold Medal', category: 'sports', price: 300, currency: 'sparkle_points', rarity: 'legendary' },

  // Celebration Category
  { id: 'sticker_party_popper', emoji: '🎉', name: 'Party Popper', category: 'celebration', price: 6, rarity: 'common' },
  { id: 'sticker_confetti', emoji: '🎊', name: 'Confetti Ball', category: 'celebration', price: 6, rarity: 'common' },
  { id: 'sticker_balloon', emoji: '🎈', name: 'Balloon', category: 'celebration', price: 5, rarity: 'common' },
  { id: 'sticker_gift', emoji: '🎁', name: 'Gift Box', category: 'celebration', price: 8, rarity: 'rare' },
  { id: 'sticker_fireworks', emoji: '🎆', name: 'Fireworks', category: 'celebration', price: 10, rarity: 'rare' },
  { id: 'sticker_sparkler', emoji: '🎇', name: 'Sparkler', category: 'celebration', price: 10, rarity: 'rare' },

  // Seasonal Category
  { id: 'sticker_snowflake', emoji: '❄️', name: 'Snowflake', category: 'seasonal', price: 6, rarity: 'common' },
  { id: 'sticker_snowman', emoji: '⛄', name: 'Snowman', category: 'seasonal', price: 8, rarity: 'rare' },
  { id: 'sticker_jack_o_lantern', emoji: '🎃', name: 'Jack-O-Lantern', category: 'seasonal', price: 8, rarity: 'rare' },
  { id: 'sticker_christmas_tree', emoji: '🎄', name: 'Christmas Tree', category: 'seasonal', price: 10, rarity: 'rare' },
  { id: 'sticker_santa', emoji: '🎅', name: 'Santa Claus', category: 'seasonal', price: 12, rarity: 'epic' },
  { id: 'sticker_ghost', emoji: '👻', name: 'Friendly Ghost', category: 'seasonal', price: 10, rarity: 'rare' },

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
