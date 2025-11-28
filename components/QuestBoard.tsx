'use client';

import { useEffect, useState } from 'react';
import { getThreatLevelStars } from '@/lib/gameUtils';

interface Quest {
  id: string;
  monsterName: string;
  monsterEmoji: string;
  description?: string;
  questType: string;
  realm?: string;
  threatLevel: number;
  sparklePoints: number;
  magicGems: number;
  deadline?: string;
  isActive: boolean;
}

interface Realm {
  name: string;
  displayName: string;
  emoji: string;
  purity: number;
}

interface QuestBoardProps {
  magicalGirl: any;
  onQuestBattle: (quest: Quest) => void;
  onOpenMonsterLab: () => void;
  onOpenStory: () => void;
}

export default function QuestBoard({
  magicalGirl,
  onQuestBattle,
  onOpenMonsterLab,
  onOpenStory,
}: QuestBoardProps) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [realms, setRealms] = useState<Realm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questsRes, realmsRes] = await Promise.all([
          fetch('/api/quests'),
          fetch('/api/realms'),
        ]);

        if (questsRes.ok) {
          const questsData = await questsRes.json();
          setQuests(questsData);
        }

        if (realmsRes.ok) {
          const realmsData = await realmsRes.json();
          setRealms(realmsData);
        }
      } catch (error) {
        console.error('Failed to fetch quest data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (magicalGirl) {
      fetchData();
    }
  }, [magicalGirl]);

  if (!magicalGirl) {
    return (
      <div className="text-center text-white text-xl">
        Loading magical girl data... ✨
      </div>
    );
  }

  const dailyQuests = quests.filter(q => q.questType === 'daily' && q.isActive);
  const weeklyQuests = quests.filter(q => q.questType === 'weekly' && q.isActive);
  const bossQuests = quests.filter(q => q.questType === 'boss' && q.isActive);

  return (
    <div className="space-y-6">
      {/* Stats Display */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl p-6 border-2 border-yellow-400 shadow-lg">
          <div className="text-yellow-100 text-sm mb-1">Sparkle Points</div>
          <div className="text-4xl font-bold text-white">{magicalGirl.sparklePoints} ✨</div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 border-2 border-purple-400 shadow-lg">
          <div className="text-purple-100 text-sm mb-1">Magic Gems</div>
          <div className="text-4xl font-bold text-white">{magicalGirl.magicGems} 🔮</div>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-xl p-6 border-2 border-red-400 shadow-lg">
          <div className="text-red-100 text-sm mb-1">Streak</div>
          <div className="text-4xl font-bold text-white">{magicalGirl.currentStreak} 🔥</div>
          <div className="text-sm text-red-100 mt-1">Best: {magicalGirl.longestStreak}</div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl p-6 border-2 border-green-400 shadow-lg">
          <div className="text-green-100 text-sm mb-1">Monsters Defeated</div>
          <div className="text-4xl font-bold text-white">{magicalGirl.totalMonstersDefeated} ⚔️</div>
        </div>
      </div>

      {/* Realm Purity */}
      {realms.length > 0 && (
        <div className="bg-black/30 backdrop-blur-lg rounded-xl p-6 border-2 border-cyan-400">
          <h3 className="text-2xl font-bold text-cyan-300 mb-4">REALM PURITY</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {realms.map(realm => (
              <div key={realm.name} className="text-center">
                <div className="text-3xl mb-2">{realm.emoji}</div>
                <div className="text-white font-semibold mb-1">{realm.displayName}</div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-1">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      realm.purity >= 80
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                        : realm.purity >= 50
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                        : 'bg-gradient-to-r from-red-400 to-pink-500'
                    }`}
                    style={{ width: `${realm.purity}%` }}
                  />
                </div>
                <div className="text-sm text-gray-300">{realm.purity}%</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={onOpenMonsterLab}
          className="flex-1 min-w-[200px] px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg font-bold text-lg border-2 border-purple-400"
        >
          🧪 Monster Laboratory
        </button>

        <button
          onClick={onOpenStory}
          className="flex-1 min-w-[200px] px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg font-bold text-lg border-2 border-cyan-400"
        >
          📖 Story Chapters
        </button>
      </div>

      {/* Quest Board */}
      <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border-4 border-pink-500">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-pink-300 mb-2">
            🌟 RHIA&apos;S QUEST BOARD 🌟
          </h2>
          <div className="text-pink-200">Your daily missions await, Magical Girl!</div>
        </div>

        {/* Boss Quests */}
        {bossQuests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-red-400 mb-3 flex items-center gap-2">
              ⚔️ BOSS BATTLES
            </h3>
            <div className="space-y-3">
              {bossQuests.map(quest => (
                <QuestCard key={quest.id} quest={quest} onBattle={onQuestBattle} />
              ))}
            </div>
          </div>
        )}

        {/* Daily Quests */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-yellow-400 mb-3">📋 DAILY PATROLS</h3>
          {dailyQuests.length === 0 ? (
            <div className="bg-green-900/30 border-2 border-green-500 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <div className="text-2xl font-bold text-green-300 mb-2">
                All Daily Quests Complete!
              </div>
              <div className="text-green-200">The realm is safe... for now!</div>
            </div>
          ) : (
            <div className="space-y-3">
              {dailyQuests.map(quest => (
                <QuestCard key={quest.id} quest={quest} onBattle={onQuestBattle} />
              ))}
            </div>
          )}
        </div>

        {/* Weekly Quests */}
        {weeklyQuests.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-purple-400 mb-3">⚡ WEEKLY MISSIONS</h3>
            <div className="space-y-3">
              {weeklyQuests.map(quest => (
                <QuestCard key={quest.id} quest={quest} onBattle={onQuestBattle} />
              ))}
            </div>
          </div>
        )}

        {quests.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✨</div>
            <div className="text-2xl font-bold text-white mb-2">No Quests Yet!</div>
            <div className="text-gray-300 mb-6">
              Visit the Monster Laboratory to create your first quest!
            </div>
            <button
              onClick={onOpenMonsterLab}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg font-bold text-lg"
            >
              🧪 Open Monster Lab
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function QuestCard({ quest, onBattle }: { quest: Quest; onBattle: (quest: Quest) => void }) {
  return (
    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-2 border-pink-400 rounded-xl p-4 hover:border-pink-300 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="text-5xl">{quest.monsterEmoji}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-xl font-bold text-white">{quest.monsterName}</div>
              <div className="text-yellow-300">{getThreatLevelStars(quest.threatLevel)}</div>
            </div>
            {quest.description && (
              <div className="text-sm text-gray-300 mb-2">{quest.description}</div>
            )}
            <div className="flex flex-wrap gap-3 text-sm">
              {quest.realm && (
                <div className="text-cyan-300">
                  Realm: {quest.realm.charAt(0).toUpperCase() + quest.realm.slice(1)}
                </div>
              )}
              <div className="text-yellow-300">
                +{quest.sparklePoints} ✨ SP
              </div>
              {quest.magicGems > 0 && (
                <div className="text-purple-300">
                  +{quest.magicGems} 🔮
                </div>
              )}
              {quest.deadline && (
                <div className="text-red-300">
                  ⏰ Deadline: {new Date(quest.deadline).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => onBattle(quest)}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg font-bold border-2 border-green-400"
        >
          ⚔️ BATTLE!
        </button>
      </div>
    </div>
  );
}
