'use client';

import { useEffect, useState } from 'react';
import { SHIELD_PRICE, RARITY_COLORS } from '@/lib/shopData';

interface ShopItem {
  id: string;
  emoji: string;
  name: string;
  category: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isLimited?: boolean;
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

  useEffect(() => {
    fetchShop();
  }, []);

  const fetchShop = async () => {
    try {
      const res = await fetch('/api/shop');
      if (res.ok) {
        const data = await res.json();
        setShopItems(data.shopItems);
        setOwnedStickers(data.ownedStickers);
        setMagicGems(data.magicGems);
        setSparklePoints(data.sparklePoints);
      }
    } catch (error) {
      console.error('Failed to fetch shop:', error);
    } finally {
      setLoading(false);
    }
  };

  const buyShield = async () => {
    if (sparklePoints < SHIELD_PRICE) {
      alert(`Not enough sparkle points! Need ${SHIELD_PRICE} ✨, have ${sparklePoints} ✨`);
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
        alert(`🛡️ Shield purchased! You now have ${data.totalShields} shields!`);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to buy shield');
      }
    } catch (error) {
      console.error('Failed to buy shield:', error);
      alert('Failed to buy shield');
    } finally {
      setPurchasing(false);
    }
  };

  const buySticker = async (item: ShopItem) => {
    if (ownedStickers.includes(item.id)) {
      alert('You already own this sticker!');
      return;
    }

    if (magicGems < item.price) {
      alert(`Not enough magic gems! Need ${item.price} 🔮, have ${magicGems} 🔮`);
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
        setMagicGems(data.remainingGems);
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
        <div className="text-white text-xl">Loading shop... ✨</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-gradient-to-br from-pink-900 to-purple-900 rounded-2xl max-w-4xl w-full border-4 border-pink-400 shadow-2xl my-8">
        {/* Header */}
        <div className="p-6 border-b-2 border-pink-400/50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold text-pink-300 mb-2">
                ✨ SPARKLE SHOP ✨
              </h2>
              <div className="flex gap-4 text-lg">
                <div className="text-yellow-300">💰 {sparklePoints} SP</div>
                <div className="text-purple-300">🔮 {magicGems} Gems</div>
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
          {/* Buy Shield Section */}
          <div className="mb-6 p-6 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-xl border-2 border-cyan-400">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-cyan-300 mb-2">🛡️ Sparkle Shield</h3>
                <p className="text-cyan-200 text-sm mb-2">
                  Protect your streak for one day!
                </p>
                <div className="text-yellow-300 font-semibold">
                  Cost: {SHIELD_PRICE} ✨ Sparkle Points
                </div>
              </div>
              <button
                onClick={buyShield}
                disabled={purchasing || sparklePoints < SHIELD_PRICE}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                  sparklePoints >= SHIELD_PRICE
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {purchasing ? 'Buying...' : 'Buy Shield'}
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
                    ? 'bg-pink-600 text-white'
                    : 'bg-pink-900/30 text-pink-300 hover:bg-pink-900/50'
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

              return (
                <div
                  key={item.id}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    isOwned
                      ? 'bg-green-900/30 border-green-400 opacity-60'
                      : `bg-gradient-to-br ${rarityStyle.bg} ${rarityStyle.border} hover:scale-105 cursor-pointer`
                  }`}
                  onClick={() => !isOwned && buySticker(item)}
                >
                  {isOwned && (
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                      OWNED ✓
                    </div>
                  )}
                  <div className="text-6xl mb-2 text-center bg-white rounded-lg p-2">
                    {item.emoji}
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold text-sm mb-1">{item.name}</div>
                    <div className={`text-xs ${rarityStyle.text} mb-2`}>
                      {item.rarity.toUpperCase()}
                      {item.isLimited && ' • LIMITED'}
                    </div>
                    <div className="text-purple-300 font-bold">
                      {item.price} 🔮
                    </div>
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
