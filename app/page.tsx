'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import QuestBoard from '@/components/QuestBoard';
import BattleSequence from '@/components/BattleSequence';
import MonsterLab from '@/components/MonsterLab';
import StoryReader from '@/components/StoryReader';
import StealthMode from '@/components/StealthMode';
import SparkleShop from '@/components/SparkleShop';
import StickerBook from '@/components/StickerBook';
import { getRandomDialogue } from '@/lib/gameData';

// Import NotificationSettings only on client-side to avoid SSR issues
const NotificationSettings = dynamic(
  () => import('@/components/NotificationSettings'),
  { ssr: false }
);

export default function Home() {
  const [showMonsterLab, setShowMonsterLab] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showStickerBook, setShowStickerBook] = useState(false);
  const [battleQuest, setBattleQuest] = useState<any>(null);
  const [stealthActive, setStealthActive] = useState(false);
  const [magicalGirl, setMagicalGirl] = useState<any>(null);

  useEffect(() => {
    // Initialize magical girl data
    const initializeApp = async () => {
      try {
        const res = await fetch('/api/magical-girl');
        if (res.ok) {
          const data = await res.json();
          setMagicalGirl(data);

          // Show welcome message for new players
          if (data.level === 1 && data.totalMonstersDefeated === 0) {
            setShowStory(true);
          }
        }
      } catch (error) {
        console.error('Failed to initialize:', error);
      }
    };

    initializeApp();
  }, []);

  const handleQuestBattle = (quest: any) => {
    setBattleQuest(quest);
  };

  const handleBattleComplete = () => {
    setBattleQuest(null);
    // Refresh data
    window.location.reload();
  };

  if (stealthActive) {
    return <StealthMode onDeactivate={() => setStealthActive(false)} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-4 md:p-8">
      {/* Quick Stealth Button */}
      <button
        onClick={() => setStealthActive(true)}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all shadow-lg opacity-50 hover:opacity-100 text-sm"
        title="Quick Hide (Boss Key)"
      >
        🤫 Hide
      </button>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="mb-4">
            <div className="text-6xl mb-2">🦁</div>
            <h1 className="text-5xl font-bold text-white mb-2 tracking-wider">
              FEDORABLE
            </h1>
            <p className="text-emerald-300 text-lg italic">
              Zoo Animal Care Adventure
            </p>
          </div>

          {magicalGirl && (
            <div className="mt-6 inline-block bg-black/30 backdrop-blur-lg border-2 border-emerald-400 rounded-xl px-6 py-3">
              <div className="text-yellow-300 font-bold text-lg">
                {magicalGirl.title}
              </div>
              <div className="text-emerald-200 text-sm mt-1">
                Level {magicalGirl.level} {' '}
                <span className="text-yellow-400">
                  {'⭐'.repeat(magicalGirl.rank)}
                </span>
              </div>
            </div>
          )}
        </header>

        {/* Zoo Guide Greeting */}
        {magicalGirl && (
          <div className="mb-6 bg-emerald-800/50 border-2 border-amber-400 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-4xl">🦜</div>
              <div className="flex-1">
                <div className="text-amber-300 font-bold mb-1">ZOOEY says:</div>
                <div className="text-white">
                  {getRandomDialogue('morning')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        <NotificationSettings />

        {/* Main Content */}
        <QuestBoard
          magicalGirl={magicalGirl}
          onQuestBattle={handleQuestBattle}
          onOpenMonsterLab={() => setShowMonsterLab(true)}
          onOpenStory={() => setShowStory(true)}
          onOpenShop={() => setShowShop(true)}
          onOpenStickerBook={() => setShowStickerBook(true)}
        />
      </div>

      {/* Modals */}
      {battleQuest && (
        <BattleSequence
          quest={battleQuest}
          onComplete={handleBattleComplete}
          onCancel={() => setBattleQuest(null)}
        />
      )}

      {showMonsterLab && (
        <MonsterLab onClose={() => setShowMonsterLab(false)} />
      )}

      {showStory && (
        <StoryReader
          magicalGirl={magicalGirl}
          onClose={() => setShowStory(false)}
        />
      )}

      {showShop && (
        <SparkleShop onClose={() => setShowShop(false)} />
      )}

      {showStickerBook && (
        <StickerBook onClose={() => setShowStickerBook(false)} />
      )}
    </main>
  );
}
