'use client';

import { Chore, useStore } from '@/lib/store';
import { formatDuration, getDifficultyEmoji } from '@/lib/utils';
import { useState } from 'react';

interface ChoreCardProps {
  chore: Chore;
}

export default function ChoreCard({ chore }: ChoreCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const { updateChore } = useStore();

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      const res = await fetch('/api/chores/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choreId: chore.id }),
      });

      if (res.ok) {
        // Refresh or update state
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to complete chore:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleSkip = async () => {
    setIsSkipping(true);
    try {
      const res = await fetch('/api/chores/skip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choreId: chore.id }),
      });

      if (res.ok) {
        // Refresh or update state
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to skip chore:', error);
    } finally {
      setIsSkipping(false);
    }
  };

  return (
    <div
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
      style={{ borderLeftColor: chore.color, borderLeftWidth: '4px' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="text-xl font-semibold text-white mb-1">{chore.title}</h4>
          {chore.description && (
            <p className="text-gray-300 text-sm">{chore.description}</p>
          )}
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={handleSkip}
            disabled={isSkipping}
            className="p-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors disabled:opacity-50"
            title="Skip this chore"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={handleComplete}
            disabled={isCompleting}
            className="p-2 rounded-lg bg-green-600 hover:bg-green-500 transition-colors disabled:opacity-50"
            title="Complete this chore"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        {chore.timeEstimateMinutes && (
          <div className="flex items-center gap-1 text-gray-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDuration(chore.timeEstimateMinutes)}
          </div>
        )}

        <div className="flex items-center gap-1 text-gray-300">
          <span>Difficulty:</span>
          <span>{getDifficultyEmoji(chore.difficultyScale)}</span>
        </div>

        <div className="flex items-center gap-1 text-gray-300">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          +{chore.experienceReward} XP
        </div>

        {chore.isRecurring && (
          <div className="flex items-center gap-1 text-purple-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Recurring
          </div>
        )}
      </div>
    </div>
  );
}
