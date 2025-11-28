'use client';

import { useState } from 'react';
import { User } from '@/lib/store';
import { subscribeToPushNotifications } from '@/lib/register-sw';

interface SettingsModalProps {
  user: User;
  onClose: () => void;
}

export default function SettingsModal({ user, onClose }: SettingsModalProps) {
  const [daysOff, setDaysOff] = useState<number[]>(user.daysOff);
  const [priorityMode, setPriorityMode] = useState<'light' | 'normal' | 'heavy'>(user.priorityMode);
  const [loading, setLoading] = useState(false);

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const toggleDayOff = (day: number) => {
    setDaysOff(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          daysOff,
          priorityMode,
        }),
      });

      if (res.ok) {
        window.location.reload();
      } else {
        alert('Failed to update settings');
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
      alert('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Priority Mode */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Priority Mode</h3>
            <p className="text-gray-400 text-sm mb-4">
              Adjust how many chores you want to see based on your schedule
            </p>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPriorityMode('light')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  priorityMode === 'light'
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-white/10 bg-slate-700'
                }`}
              >
                <div className="text-3xl mb-2">🌙</div>
                <div className="text-white font-semibold">Light</div>
                <div className="text-xs text-gray-400 mt-1">Low priority only</div>
              </button>

              <button
                type="button"
                onClick={() => setPriorityMode('normal')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  priorityMode === 'normal'
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-white/10 bg-slate-700'
                }`}
              >
                <div className="text-3xl mb-2">☀️</div>
                <div className="text-white font-semibold">Normal</div>
                <div className="text-xs text-gray-400 mt-1">All priorities</div>
              </button>

              <button
                type="button"
                onClick={() => setPriorityMode('heavy')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  priorityMode === 'heavy'
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-white/10 bg-slate-700'
                }`}
              >
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-white font-semibold">Heavy</div>
                <div className="text-xs text-gray-400 mt-1">Extra chores</div>
              </button>
            </div>
          </div>

          {/* Days Off */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Days Off</h3>
            <p className="text-gray-400 text-sm mb-4">
              Select days when you don&apos;t want to receive chore notifications
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {weekdays.map((day, index) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDayOff(index)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    daysOff.includes(index)
                      ? 'border-pink-500 bg-pink-500/20'
                      : 'border-white/10 bg-slate-700'
                  }`}
                >
                  <div className="text-white font-medium">{day}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Stats Display */}
          <div className="bg-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Your Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Total XP</div>
                <div className="text-2xl font-bold text-white">{user.experiencePoints}</div>
              </div>
              <div>
                <div className="text-gray-400">Level</div>
                <div className="text-2xl font-bold text-white">{user.level}</div>
              </div>
              <div>
                <div className="text-gray-400">Current Streak</div>
                <div className="text-2xl font-bold text-white">{user.currentStreak} days</div>
              </div>
              <div>
                <div className="text-gray-400">Best Streak</div>
                <div className="text-2xl font-bold text-white">{user.longestStreak} days</div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Push Notifications</h3>
            <button
              type="button"
              onClick={async () => {
                try {
                  await subscribeToPushNotifications();
                  alert('Notifications enabled! We\'ll remind you about your chores.');
                } catch (error) {
                  console.error('Failed to enable notifications:', error);
                  alert('Failed to enable notifications. Please check your browser settings.');
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              Enable Notifications
            </button>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
