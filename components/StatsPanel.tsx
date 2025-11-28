'use client';

import { User } from '@/lib/store';
import { calculateLevel, xpForNextLevel } from '@/lib/utils';

interface StatsPanelProps {
  user: User;
}

export default function StatsPanel({ user }: StatsPanelProps) {
  const nextLevelXP = xpForNextLevel(user.level);
  const xpProgress = (user.experiencePoints % nextLevelXP) / nextLevelXP * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Level Card */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300">Level</span>
          <span className="text-3xl">🏆</span>
        </div>
        <div className="text-4xl font-bold text-white mb-2">{user.level}</div>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
        <div className="text-sm text-gray-400">
          {user.experiencePoints % nextLevelXP} / {nextLevelXP} XP
        </div>
      </div>

      {/* Streak Card */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300">Current Streak</span>
          <span className="text-3xl">🔥</span>
        </div>
        <div className="text-4xl font-bold text-white mb-2">{user.currentStreak}</div>
        <div className="text-sm text-gray-400">
          Best: {user.longestStreak} days
        </div>
      </div>

      {/* Priority Mode Card */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300">Priority Mode</span>
          <span className="text-3xl">
            {user.priorityMode === 'light' ? '🌙' : user.priorityMode === 'heavy' ? '⚡' : '☀️'}
          </span>
        </div>
        <div className="text-2xl font-bold text-white capitalize">{user.priorityMode}</div>
        <div className="text-sm text-gray-400">
          {user.priorityMode === 'light' && 'Taking it easy'}
          {user.priorityMode === 'normal' && 'Balanced schedule'}
          {user.priorityMode === 'heavy' && 'Full productivity'}
        </div>
      </div>
    </div>
  );
}
