'use client';

import { useEffect, useState } from 'react';
import { SHIELD_PRICE, RARITY_COLORS } from '@/lib/shopData';

interface ShopItem {
  id: string;
  emoji: string;
  name: string;
  category: string;
  price: number;
  currency?: 'gems' | 'sparkle_points';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isLimited?: boolean;
  isAchievement?: boolean;
  achievementType?: string;
  achievementTarget?: string;
  achievementGoal?: number;
  achievementDesc?: string;
}

interface AchievementProgress {
  isUnlocked: boolean;
  current: number;
  goal: number;
  progressPercent: number;
}

interface SparkleShopProps {
  onClose: () => void;
}

export default function SparkleShop({ onClose }: SparkleShopProps) {
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [ownedStickers, setOwnedStickers] = useState<string[]>([]);
  const [magicGems, setMagicGems] = useState(0);
  const [sparklePoints, setSparklePoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [achievementProgress, setAchievementProgress] = useState<Record<string, AchievementProgress>>({});
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([]);

  useEffect(() => {
    fetchShop();
  }, []);

  // Show notification for newly unlocked achievements
  useEffect(() => {
    if (newlyUnlocked.length > 0) {
      const unlockedNames = newlyUnlocked
        .map(id => {
          const item = shopItems.find(s => s.id === id);
          return item ? `${item.emoji} ${item.name}` : '';
        })
        .filter(Boolean)
        .join(', ');

      if (unlockedNames) {
        alert(`🎉 Achievement Unlocked! 🎉\n\n${unlockedNames}\n\nCheck your Sticker Book!`);
      }
    }
  }, [newlyUnlocked, shopItems]);

  const fetchShop = async () => {
    try {
      const res = await fetch('/api/shop');
      if (res.ok) {
        const data = await res.json();
        setShopItems(data.shopItems);
        setOwnedStickers(data.ownedStickers);
        setMagicGems(data.magicGems);
        setSparklePoints(data.sparklePoints);
        setAchievementProgress(data.achievementProgress || {});
        setNewlyUnlocked(data.newlyUnlocked || []);
      }
    } catch (error) {
      console.error('Failed to fetch shop:', error);
    } finally {
      setLoading(false);
    }
  };

  const buyShield = async () => {
    if (sparklePoints < SHIELD_PRICE) {
      alert(`Not enough zoo coins! Need ${SHIELD_PRICE} 🪙, have ${sparklePoints} 🪙`);
      return;
    }

    setPurchasing(true);
    try {
      const res = await fetch('/api/shop/buy-shield', {
        method: 'POST',
      });

      if (res.ok) {
        const data = await res.json();
        setSparklePoints(data.remainingPoints);
        alert(`🏖️ Vacation Day purchased! You now have ${data.totalShields} vacation days!`);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to buy vacation day');
      }
    } catch (error) {
      console.error('Failed to buy vacation day:', error);
      alert('Failed to buy vacation day');
    } finally {
      setPurchasing(false);
    }
  };

  const buySticker = async (item: ShopItem) => {
    // Achievement stickers cannot be purchased
    if (item.isAchievement) {
      alert('This is an achievement sticker! Complete the challenge to unlock it.');
      return;
    }

    if (ownedStickers.includes(item.id)) {
      alert('You already own this sticker!');
      return;
    }

    // Check balance based on currency
    const currency = item.currency || 'gems';
    const currentBalance = currency === 'sparkle_points' ? sparklePoints : magicGems;
    const currencyIcon = currency === 'sparkle_points' ? '🪙' : '🍖';
    const currencyName = currency === 'sparkle_points' ? 'zoo coins' : 'treats';

    if (currentBalance < item.price) {
      alert(`Not enough ${currencyName}! Need ${item.price} ${currencyIcon}, have ${currentBalance} ${currencyIcon}`);
      return;
    }

    setPurchasing(true);
    try {
      const res = await fetch('/api/shop/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shopItemId: item.id }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.remainingGems !== undefined) {
          setMagicGems(data.remainingGems);
        }
        if (data.remainingPoints !== undefined) {
          setSparklePoints(data.remainingPoints);
        }
        setOwnedStickers([...ownedStickers, item.id]);
        alert(`${item.emoji} ${item.name} added to your collection!`);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to purchase sticker');
      }
    } catch (error) {
      console.error('Failed to purchase sticker:', error);
      alert('Failed to purchase sticker');
    } finally {
      setPurchasing(false);
    }
  };

  const categories = ['all', ...new Set(shopItems.map(item => item.category))];
  const filteredItems = selectedCategory === 'all'
    ? shopItems
    : shopItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
        <div className="text-white text-xl">Loading shop... 🦁</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-gradient-to-br from-amber-900 to-orange-900 rounded-2xl max-w-4xl w-full border-4 border-amber-400 shadow-2xl my-8">
        {/* Header */}
        <div className="p-6 border-b-2 border-amber-400/50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold text-amber-300 mb-2">
                🦁 ANIMAL SHOP 🦁
              </h2>
              <div className="flex gap-4 text-lg">
                <div className="text-yellow-300">🪙 {sparklePoints} Zoo Coins</div>
                <div className="text-orange-300">🍖 {magicGems} Treats</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-4xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Buy Vacation Day Section */}
          <div className="mb-6 p-6 bg-gradient-to-r from-teal-900/50 to-cyan-900/50 rounded-xl border-2 border-teal-400">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-teal-300 mb-2">🏖️ Vacation Day</h3>
                <p className="text-teal-200 text-sm mb-2">
                  Protect your streak for one day - take a break!
                </p>
                <div className="text-yellow-300 font-semibold">
                  Cost: {SHIELD_PRICE} 🪙 Zoo Coins
                </div>
              </div>
              <button
                onClick={buyShield}
                disabled={purchasing || sparklePoints < SHIELD_PRICE}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                  sparklePoints >= SHIELD_PRICE
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-lg'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {purchasing ? 'Buying...' : 'Buy Vacation Day'}
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-4 flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-900/30 text-amber-300 hover:bg-amber-900/50'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Stickers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredItems.map(item => {
              const isOwned = ownedStickers.includes(item.id);
              const rarityStyle = RARITY_COLORS[item.rarity];
              const isAchievement = item.isAchievement;
              const progress = achievementProgress[item.id];
              const isLocked = isAchievement && !isOwned;

              return (
                <div
                  key={item.id}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    isOwned
                      ? 'bg-green-900/30 border-green-400 opacity-80'
                      : isLocked
                      ? `bg-gradient-to-br ${rarityStyle.bg} ${rarityStyle.border} opacity-50`
                      : `bg-gradient-to-br ${rarityStyle.bg} ${rarityStyle.border} hover:scale-105 cursor-pointer`
                  }`}
                  onClick={() => !isOwned && !isLocked && buySticker(item)}
                  title={isAchievement ? item.achievementDesc : ''}
                >
                  {isOwned && (
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-bold z-10">
                      {isAchievement ? 'EARNED ✓' : 'OWNED ✓'}
                    </div>
                  )}
                  {isLocked && (
                    <div className="absolute top-2 left-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-full font-bold z-10 shadow-lg">
                      🔒 LOCKED
                    </div>
                  )}
                  <div className={`text-6xl mb-2 text-center bg-white rounded-lg p-2 ${isLocked ? 'filter grayscale' : ''}`}>
                    {item.emoji}
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold text-sm mb-1">{item.name}</div>
                    <div className={`text-xs ${rarityStyle.text} mb-2`}>
                      {item.rarity.toUpperCase()}
                      {item.isLimited && ' • LIMITED'}
                      {isAchievement && ' • ACHIEVEMENT'}
                    </div>
                    {isAchievement ? (
                      <>
                        {isLocked && progress && (
                          <div className="mt-2">
                            <div className="text-xs text-gray-300 mb-1">
                              Progress: {progress.current}/{progress.goal}
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all"
                                style={{ width: `${progress.progressPercent}%` }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="text-xs text-gray-300 mt-2 italic">
                          {item.achievementDesc}
                        </div>
                      </>
                    ) : (
                      <div className="text-orange-300 font-bold">
                        {item.price} {item.currency === 'sparkle_points' ? '🪙' : '🍖'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No stickers in this category yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
