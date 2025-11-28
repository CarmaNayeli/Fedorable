'use client';

import { useEffect, useState } from 'react';
import { RARITY_COLORS } from '@/lib/shopData';

interface Sticker {
  id: string;
  shopItemId: string;
  emoji: string;
  name: string;
  category: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isLimited?: boolean;
  purchasedAt: string;
}

interface StickerBookProps {
  onClose: () => void;
}

export default function StickerBook({ onClose }: StickerBookProps) {
  const [collection, setCollection] = useState<Sticker[]>([]);
  const [totalStickers, setTotalStickers] = useState(0);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchCollection();
  }, []);

  const fetchCollection = async () => {
    try {
      const res = await fetch('/api/stickers');
      if (res.ok) {
        const data = await res.json();
        setCollection(data.collection);
        setTotalStickers(data.totalStickers);
        setTotalAvailable(data.totalAvailable);
      }
    } catch (error) {
      console.error('Failed to fetch sticker collection:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(collection.map(s => s.category))];
  const filteredStickers = selectedCategory === 'all'
    ? collection
    : collection.filter(s => s.category === selectedCategory);

  const completionPercent = totalAvailable > 0
    ? Math.round((totalStickers / totalAvailable) * 100)
    : 0;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
        <div className="text-white text-xl">Loading sticker book... 📖</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl max-w-4xl w-full border-4 border-purple-400 shadow-2xl my-8">
        {/* Header */}
        <div className="p-6 border-b-2 border-purple-400/50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold text-purple-300 mb-2">
                📖 STICKER BOOK 📖
              </h2>
              <div className="text-purple-200">
                Collection: {totalStickers} / {totalAvailable} ({completionPercent}%)
              </div>
              <div className="w-full bg-purple-900/50 rounded-full h-3 mt-2">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                  style={{ width: `${completionPercent}%` }}
                />
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
          {collection.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <div className="text-2xl font-bold text-white mb-2">
                No Stickers Yet!
              </div>
              <div className="text-purple-200 mb-4">
                Visit the Sparkle Shop to start your collection!
              </div>
            </div>
          ) : (
            <>
              {/* Category Tabs */}
              <div className="mb-4 flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              {/* Stickers Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredStickers.map(sticker => {
                  const rarityStyle = RARITY_COLORS[sticker.rarity];

                  return (
                    <div
                      key={sticker.id}
                      className={`p-4 rounded-xl border-2 bg-gradient-to-br ${rarityStyle.bg} ${rarityStyle.border} transition-all hover:scale-105`}
                    >
                      <div className="text-6xl mb-2 text-center bg-white rounded-lg p-2 shadow-lg">
                        {sticker.emoji}
                      </div>
                      <div className="text-center">
                        <div className="text-white font-semibold text-sm mb-1">
                          {sticker.name}
                        </div>
                        <div className={`text-xs ${rarityStyle.text} mb-1`}>
                          {sticker.rarity.toUpperCase()}
                          {sticker.isLimited && ' • LIMITED'}
                        </div>
                        <div className="text-xs text-purple-200">
                          {new Date(sticker.purchasedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredStickers.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  No stickers in this category yet!
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
