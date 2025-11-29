'use client';

import { useEffect, useState } from 'react';
import { getThreatLevelStars } from '@/lib/gameUtils';
import QuestDetailsModal from './QuestDetailsModal';

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
  isRecurring?: boolean;
  recurrenceRule?: string | null;
  notificationPreferences?: Record<string, string | null> | null;
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
  onOpenShop: () => void;
  onOpenStickerBook: () => void;
}

export default function QuestBoard({
  magicalGirl,
  onQuestBattle,
  onOpenMonsterLab,
  onOpenStory,
  onOpenShop,
  onOpenStickerBook,
}: QuestBoardProps) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [realms, setRealms] = useState<Realm[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShieldDialog, setShowShieldDialog] = useState(false);
  const [isUsingShield, setIsUsingShield] = useState(false);
  const [questToDelete, setQuestToDelete] = useState<Quest | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [questDetailsToShow, setQuestDetailsToShow] = useState<Quest | null>(null);

  const handleDeleteQuest = async () => {
    if (!questToDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/quests/${questToDelete.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Remove quest from state
        setQuests(quests.filter(q => q.id !== questToDelete.id));
        setQuestToDelete(null);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete quest');
      }
    } catch (error) {
      console.error('Failed to delete quest:', error);
      alert('Failed to delete quest');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUseShield = async () => {
    setIsUsingShield(true);
    try {
      const res = await fetch('/api/sparkle-shield/use', {
        method: 'POST',
      });

      if (res.ok) {
        // Reload the page to refresh magical girl data
        window.location.reload();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to use Sparkle Shield');
      }
    } catch (error) {
      console.error('Failed to use shield:', error);
      alert('Failed to use Sparkle Shield');
    } finally {
      setIsUsingShield(false);
      setShowShieldDialog(false);
    }
  };

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

  useEffect(() => {
    if (magicalGirl) {
      fetchData();
    }
  }, [magicalGirl]);

  if (!magicalGirl) {
    return (
      <div className="text-center text-white text-xl">
        Loading zookeeper data... 🦁
      </div>
    );
  }

  const dailyQuests = quests.filter(q => q.questType === 'daily' && q.isActive);
  const weeklyQuests = quests.filter(q => q.questType === 'weekly' && q.isActive);
  const bossQuests = quests.filter(q => q.questType === 'boss' && q.isActive);
  const onetimeQuests = quests.filter(q => q.questType === 'onetime' && q.isActive);
  const sideQuests = quests.filter(q => q.questType === 'side' && q.isActive);

  return (
    <div className="space-y-6">
      {/* Stats Display */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl p-6 border-2 border-yellow-400 shadow-lg">
          <div className="text-yellow-100 text-sm mb-1">Zoo Coins</div>
          <div className="text-4xl font-bold text-white">{magicalGirl.sparklePoints} 🪙</div>
        </div>

        <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl p-6 border-2 border-amber-400 shadow-lg">
          <div className="text-amber-100 text-sm mb-1">Treats</div>
          <div className="text-4xl font-bold text-white">{magicalGirl.magicGems} 🍖</div>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-xl p-6 border-2 border-red-400 shadow-lg">
          <div className="text-red-100 text-sm mb-1">Streak</div>
          <div className="text-4xl font-bold text-white">{magicalGirl.currentStreak} 🔥</div>
          <div className="text-sm text-red-100 mt-1">Best: {magicalGirl.longestStreak}</div>
        </div>

        <div className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl p-6 border-2 border-cyan-400 shadow-lg">
          <div className="text-cyan-100 text-sm mb-1">Vacation Days</div>
          <div className="text-4xl font-bold text-white">{magicalGirl.sparkleShields || 0} 🏖️</div>
          <div className="text-sm text-cyan-100 mt-1">Streak Protection</div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl p-6 border-2 border-green-400 shadow-lg">
          <div className="text-green-100 text-sm mb-1">Tasks Completed</div>
          <div className="text-4xl font-bold text-white">{magicalGirl.totalMonstersDefeated} ✅</div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={onOpenMonsterLab}
          className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg font-bold text-lg border-2 border-emerald-400"
        >
          📋 Task Planner
        </button>

        <button
          onClick={onOpenStory}
          className="px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg font-bold text-lg border-2 border-cyan-400"
        >
          📖 Story Chapters
        </button>

        <button
          onClick={onOpenShop}
          className="px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg font-bold text-lg border-2 border-amber-400"
        >
          🦁 Animal Shop
        </button>

        <button
          onClick={onOpenStickerBook}
          className="px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg font-bold text-lg border-2 border-purple-400"
        >
          📖 Sticker Book
        </button>

        {magicalGirl.sparkleShields > 0 && (
          <button
            onClick={() => setShowShieldDialog(true)}
            className="px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg font-bold text-lg border-2 border-blue-400"
          >
            🏖️ Use Vacation Day
          </button>
        )}
      </div>

      {/* Quest Board */}
      <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border-4 border-emerald-500">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-emerald-300 mb-2">
            🦁 FEDORA&apos;S TASK BOARD 🦁
          </h2>
          <div className="text-emerald-200">Your daily animal care tasks await!</div>
        </div>

        {/* Boss Quests */}
        {bossQuests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-red-400 mb-3 flex items-center gap-2">
              🦁 BIG PROJECTS
            </h3>
            <div className="space-y-3">
              {bossQuests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onBattle={onQuestBattle}
                  onDelete={() => setQuestToDelete(quest)}
                  onShowDetails={() => setQuestDetailsToShow(quest)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Daily Quests */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-yellow-400 mb-3">📋 DAILY CARE TASKS</h3>
          {dailyQuests.length === 0 ? (
            <div className="bg-green-900/30 border-2 border-green-500 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <div className="text-2xl font-bold text-green-300 mb-2">
                All Daily Tasks Complete!
              </div>
              <div className="text-green-200">All animals are happy and healthy!</div>
            </div>
          ) : (
            <div className="space-y-3">
              {dailyQuests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onBattle={onQuestBattle}
                  onDelete={() => setQuestToDelete(quest)}
                  onShowDetails={() => setQuestDetailsToShow(quest)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Weekly Quests */}
        {weeklyQuests.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-purple-400 mb-3">⚡ WEEKLY CARE TASKS</h3>
            <div className="space-y-3">
              {weeklyQuests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onBattle={onQuestBattle}
                  onDelete={() => setQuestToDelete(quest)}
                  onShowDetails={() => setQuestDetailsToShow(quest)}
                />
              ))}
            </div>
          </div>
        )}

        {/* One-Time Quests */}
        {onetimeQuests.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-green-400 mb-3">🎯 ONE-TIME QUESTS</h3>
            <div className="space-y-3">
              {onetimeQuests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onBattle={onQuestBattle}
                  onDelete={() => setQuestToDelete(quest)}
                  onShowDetails={() => setQuestDetailsToShow(quest)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Side Quests */}
        {sideQuests.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-3">📌 SIDE QUESTS</h3>
            <div className="space-y-3">
              {sideQuests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onBattle={onQuestBattle}
                  onDelete={() => setQuestToDelete(quest)}
                  onShowDetails={() => setQuestDetailsToShow(quest)}
                />
              ))}
            </div>
          </div>
        )}

        {quests.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🦁</div>
            <div className="text-2xl font-bold text-white mb-2">No Tasks Yet!</div>
            <div className="text-gray-300 mb-6">
              Visit the Task Planner to create your first task!
            </div>
            <button
              onClick={onOpenMonsterLab}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg font-bold text-lg"
            >
              📋 Open Task Planner
            </button>
          </div>
        )}
      </div>

      {/* Delete Quest Confirmation Dialog */}
      {questToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-red-900 to-pink-900 rounded-2xl max-w-md w-full border-4 border-red-400 shadow-2xl p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{questToDelete.monsterEmoji}</div>
              <h3 className="text-3xl font-bold text-red-300 mb-2">
                Delete Quest?
              </h3>
              <div className="text-red-100 space-y-2">
                <p className="font-semibold text-xl">{questToDelete.monsterName}</p>
                <p className="text-sm">
                  Are you sure you want to delete this quest? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setQuestToDelete(null)}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors font-bold disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteQuest}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-500 hover:to-pink-500 transition-colors font-bold disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Quest'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vacation Day Confirmation Dialog */}
      {showShieldDialog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-cyan-900 to-blue-900 rounded-2xl max-w-md w-full border-4 border-cyan-400 shadow-2xl p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🏖️</div>
              <h3 className="text-3xl font-bold text-cyan-300 mb-2">
                Use Vacation Day?
              </h3>
              <div className="text-cyan-100 space-y-2">
                <p>
                  A Vacation Day will protect your streak today, even if you don&apos;t complete any tasks!
                </p>
                <p className="text-sm text-cyan-200">
                  Days Remaining: {magicalGirl.sparkleShields}
                </p>
                <p className="text-xs text-cyan-300 mt-4">
                  🏖️ Earn more vacation days at streak milestones: 7, 14, 30, 60, 90 days!
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowShieldDialog(false)}
                disabled={isUsingShield}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors font-bold disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUseShield}
                disabled={isUsingShield}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-colors font-bold disabled:opacity-50"
              >
                {isUsingShield ? 'Using...' : 'Use Day Off'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quest Details Modal */}
      {questDetailsToShow && (
        <QuestDetailsModal
          quest={questDetailsToShow}
          onClose={() => setQuestDetailsToShow(null)}
          onQuestUpdated={fetchData}
        />
      )}
    </div>
  );
}

function QuestCard({
  quest,
  onBattle,
  onDelete,
  onShowDetails,
}: {
  quest: Quest;
  onBattle: (quest: Quest) => void;
  onDelete: () => void;
  onShowDetails: () => void;
}) {
  return (
    <div
      className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 border-2 border-emerald-400 rounded-xl p-4 hover:border-emerald-300 transition-all cursor-pointer"
      onClick={onShowDetails}
    >
      <div className="flex items-center justify-between gap-4">
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
                  Area: {quest.realm.charAt(0).toUpperCase() + quest.realm.slice(1)}
                </div>
              )}
              <div className="text-yellow-300">
                +{quest.sparklePoints} 🪙 Coins
              </div>
              {quest.magicGems > 0 && (
                <div className="text-amber-300">
                  +{quest.magicGems} 🍖 Treats
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

        <div className="flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBattle(quest);
            }}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg font-bold border-2 border-green-400"
          >
            ✅ START!
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="px-6 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-all font-semibold text-sm border-2 border-red-400"
            title="Delete quest"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}
