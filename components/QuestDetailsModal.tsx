'use client';

import { useState } from 'react';
import { rrulestr } from 'rrule';
import TimingModal from './TimingModal';
import { MonsterTemplate } from '@/lib/gameData';

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
  isRecurring?: boolean;
  recurrenceRule?: string | null;
  notificationPreferences?: Record<string, string | null> | null;
}

interface QuestDetailsModalProps {
  quest: Quest;
  onClose: () => void;
  onQuestUpdated?: () => void;
}

export default function QuestDetailsModal({ quest, onClose, onQuestUpdated }: QuestDetailsModalProps) {
  const [showTimingModal, setShowTimingModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Handle updating notification preferences
  const handleTimingUpdate = async (
    recurrenceRule: string | null,
    notificationPreferences: Record<string, string | null>
  ) => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/quests/${quest.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationPreferences }),
      });

      if (res.ok) {
        setShowTimingModal(false);
        if (onQuestUpdated) {
          onQuestUpdated();
        }
        // Optionally close the details modal or refresh
        onClose();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update quest timing');
      }
    } catch (error) {
      console.error('Failed to update quest timing:', error);
      alert('Failed to update quest timing');
    } finally {
      setIsSaving(false);
    }
  };

  // Create a fake MonsterTemplate for TimingModal
  const fakeTemplate: MonsterTemplate = {
    id: quest.id,
    name: quest.monsterName,
    emoji: quest.monsterEmoji,
    description: quest.description || '',
    realm: quest.realm || 'home',
    threatLevel: quest.threatLevel,
    questType: quest.questType as any,
    sparklePoints: quest.sparklePoints,
    magicGems: quest.magicGems,
    xpReward: 0,
  };

  // Parse recurrence rule to human-readable text
  const getRecurrenceText = () => {
    if (!quest.isRecurring || !quest.recurrenceRule) {
      return 'This is a one-time quest';
    }

    try {
      const rule = rrulestr(quest.recurrenceRule);
      const ruleObj = rule.origOptions;

      // Get frequency
      const freqMap: Record<number, string> = {
        0: 'Yearly',
        1: 'Monthly',
        2: 'Weekly',
        3: 'Daily',
      };
      const frequency = (ruleObj.freq !== undefined && freqMap[ruleObj.freq]) || 'Custom';

      // Get interval
      const interval = ruleObj.interval || 1;
      const intervalText = interval > 1 ? `Every ${interval} ` : '';

      // Get days of week for weekly recurrence
      if (ruleObj.freq === 2 && ruleObj.byweekday) { // Weekly
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const byweekdayArray = Array.isArray(ruleObj.byweekday) ? ruleObj.byweekday : [ruleObj.byweekday];
        const days = byweekdayArray.map((day: any) => {
          // RRule uses 0=Monday, convert to day names
          const weekdayNum = typeof day === 'number' ? day : day.weekday;
          return dayNames[weekdayNum];
        });
        return `${intervalText}${frequency} on ${days.join(', ')}`;
      }

      return `${intervalText}${frequency}`;
    } catch (error) {
      console.error('Error parsing recurrence rule:', error);
      return 'Custom recurrence pattern';
    }
  };

  // Format notification times
  const formatTime = (time: string | null) => {
    if (!time) return null;

    try {
      // Time is stored in UTC, convert to local time for display
      const [hours, minutes] = time.split(':').map(Number);
      const utcDate = new Date();
      utcDate.setUTCHours(hours, minutes, 0, 0);

      return utcDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch (error) {
      return time;
    }
  };

  const dayLabels: Record<string, string> = {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday',
  };

  const hasNotifications = quest.notificationPreferences &&
    Object.values(quest.notificationPreferences).some(time => time !== null);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl max-w-2xl w-full border-4 border-purple-400 shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{quest.monsterEmoji}</div>
          <h3 className="text-3xl font-bold text-purple-300 mb-2">
            {quest.monsterName}
          </h3>
          {quest.description && (
            <p className="text-purple-100 text-lg mb-2">{quest.description}</p>
          )}
          <div className="flex justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-purple-600/50 rounded-full text-purple-200">
              {quest.questType.charAt(0).toUpperCase() + quest.questType.slice(1)} Quest
            </span>
            {quest.realm && (
              <span className="px-3 py-1 bg-cyan-600/50 rounded-full text-cyan-200">
                {quest.realm.charAt(0).toUpperCase() + quest.realm.slice(1)} Realm
              </span>
            )}
          </div>
        </div>

        {/* Rewards */}
        <div className="bg-black/30 rounded-xl p-4 mb-6">
          <h4 className="text-xl font-bold text-yellow-300 mb-3">Rewards</h4>
          <div className="flex gap-4 flex-wrap">
            <div className="text-yellow-200">
              ✨ {quest.sparklePoints} Sparkle Points
            </div>
            {quest.magicGems > 0 && (
              <div className="text-purple-200">
                🔮 {quest.magicGems} Magic Gems
              </div>
            )}
          </div>
        </div>

        {/* Recurrence Info */}
        <div className="bg-black/30 rounded-xl p-4 mb-6">
          <h4 className="text-xl font-bold text-cyan-300 mb-3">Schedule</h4>
          <div className="text-cyan-100 text-lg">
            {getRecurrenceText()}
          </div>
        </div>

        {/* Notification Times */}
        {hasNotifications && (
          <div className="bg-black/30 rounded-xl p-4 mb-6">
            <h4 className="text-xl font-bold text-pink-300 mb-3">Reminder Times</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(dayLabels).map(([key, label]) => {
                const time = quest.notificationPreferences?.[key];
                if (!time) return null;

                return (
                  <div key={key} className="flex justify-between items-center bg-pink-900/30 rounded-lg p-2">
                    <span className="text-pink-200 font-semibold">{label}</span>
                    <span className="text-pink-100">{formatTime(time)}</span>
                  </div>
                );
              })}
            </div>
            {!Object.values(quest.notificationPreferences || {}).some(t => t !== null) && (
              <div className="text-pink-200 italic">No notification times set</div>
            )}
          </div>
        )}

        {!hasNotifications && quest.isRecurring && (
          <div className="bg-yellow-900/30 border-2 border-yellow-600 rounded-xl p-4 mb-6">
            <div className="text-yellow-200">
              ℹ️ No reminder notifications set for this quest
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          {quest.isRecurring && (
            <button
              onClick={() => setShowTimingModal(true)}
              disabled={isSaving}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all font-bold text-lg disabled:opacity-50"
            >
              ⏰ Edit Timing
            </button>
          )}
          <button
            onClick={onClose}
            disabled={isSaving}
            className={`${quest.isRecurring ? 'flex-1' : 'w-full'} px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-bold text-lg disabled:opacity-50`}
          >
            Close
          </button>
        </div>
      </div>

      {/* TimingModal for editing */}
      {showTimingModal && (
        <TimingModal
          template={fakeTemplate}
          onConfirm={handleTimingUpdate}
          onCancel={() => setShowTimingModal(false)}
          initialNotificationPreferences={quest.notificationPreferences}
        />
      )}
    </div>
  );
}
