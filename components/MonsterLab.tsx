'use client';

import { useState } from 'react';
import { MONSTER_TEMPLATES, MonsterTemplate } from '@/lib/gameData';
import { getThreatLevelStars } from '@/lib/gameUtils';
import { RRule, Frequency } from 'rrule';
import TimingModal from './TimingModal';

interface MonsterLabProps {
  onClose: () => void;
}

export default function MonsterLab({ onClose }: MonsterLabProps) {
  const [mode, setMode] = useState<'custom' | 'template'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<MonsterTemplate | null>(null);
  const [showTimingModal, setShowTimingModal] = useState(false);
  const [customQuestData, setCustomQuestData] = useState<any>(null);

  // Custom task form
  const [monsterName, setMonsterName] = useState('');
  const [monsterEmoji, setMonsterEmoji] = useState('🦁');
  const [description, setDescription] = useState('');
  const [realm, setRealm] = useState('kitchen');
  const [threatLevel, setThreatLevel] = useState(2);
  const [questType, setQuestType] = useState<'daily' | 'weekly' | 'onetime'>('daily');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceType, setRecurrenceType] = useState<'daily' | 'weekly' | 'custom'>('daily');
  const [weeklyDays, setWeeklyDays] = useState<number[]>([]);
  const [customInterval, setCustomInterval] = useState(1);
  const [loading, setLoading] = useState(false);

  const calculateRewards = (level: number) => {
    const sp = level * 10 + (level > 3 ? 20 : 0);
    const gems = level >= 4 ? Math.floor(level / 2) : 0;
    const xp = level * 5;
    return { sp, gems, xp };
  };

  const handleCreateMonster = async (
    templateData?: any,
    customRecurrenceRule?: string | null,
    notificationPreferences?: Record<string, string | null>
  ) => {
    setLoading(true);

    try {
      let data;

      if (templateData) {
        // Using template with custom timing
        const recurrenceRule = customRecurrenceRule !== undefined
          ? customRecurrenceRule
          : templateData.recurrenceRule;

        data = {
          monsterName: templateData.name,
          monsterEmoji: templateData.emoji,
          description: templateData.description,
          realm: templateData.realm,
          threatLevel: templateData.threatLevel,
          questType: templateData.questType,
          sparklePoints: templateData.sparklePoints,
          magicGems: templateData.magicGems,
          xpReward: templateData.xpReward,
          isRecurring: !!recurrenceRule,
          recurrenceRule: recurrenceRule,
          notificationPreferences: notificationPreferences || null,
          isCustom: false,
        };
      } else if (customQuestData) {
        // Custom monster with timing from modal
        console.log('Creating custom monster with timing...');

        // Use the custom recurrence rule from modal, or fall back to old logic
        const finalRecurrenceRule = customRecurrenceRule !== undefined
          ? customRecurrenceRule
          : undefined;

        const rewards = calculateRewards(customQuestData.threatLevel);

        data = {
          monsterName: customQuestData.monsterName,
          monsterEmoji: customQuestData.monsterEmoji,
          description: customQuestData.description || undefined,
          realm: customQuestData.realm,
          threatLevel: customQuestData.threatLevel,
          questType: customQuestData.questType,
          sparklePoints: rewards.sp,
          magicGems: rewards.gems,
          xpReward: rewards.xp,
          isRecurring: !!finalRecurrenceRule,
          recurrenceRule: finalRecurrenceRule,
          notificationPreferences: notificationPreferences || null,
          isCustom: true,
          createdByPlayer: true,
        };

        console.log('Sending custom monster data:', data);
      } else {
        // This shouldn't happen, but handle it gracefully
        alert('Error: No template or custom data found');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/quests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      console.log('API response status:', res.status);

      if (res.ok) {
        const responseData = await res.json();
        console.log('Quest created successfully:', responseData);
        window.location.reload();
      } else {
        const errorData = await res.json();
        console.error('API error:', errorData);
        const errorMessage = errorData.details
          ? `${errorData.error}\n\n${errorData.details}`
          : errorData.error || 'Failed to create monster';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Failed to create monster:', error);
      alert('Failed to create monster: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const rewards = calculateRewards(threatLevel);

  const toggleWeekday = (day: number) => {
    setWeeklyDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleTemplateClick = (template: MonsterTemplate) => {
    setSelectedTemplate(template);
    setShowTimingModal(true);
  };

  const handleTimingConfirm = (recurrenceRule: string | null, notificationPreferences: Record<string, string | null>) => {
    if (selectedTemplate) {
      // Creating from template
      handleCreateMonster(selectedTemplate, recurrenceRule, notificationPreferences);
      setShowTimingModal(false);
      setSelectedTemplate(null);
    } else if (customQuestData) {
      // Creating custom quest
      handleCreateMonster(undefined, recurrenceRule, notificationPreferences);
      setShowTimingModal(false);
      setCustomQuestData(null);
    }
  };

  const handleTimingCancel = () => {
    setShowTimingModal(false);
    setSelectedTemplate(null);
    setCustomQuestData(null);
  };

  const realmOptions = [
    { value: 'kitchen', label: 'Kitchen', emoji: '🍽️' },
    { value: 'bedroom', label: 'Bedroom', emoji: '🛏️' },
    { value: 'bathroom', label: 'Bathroom', emoji: '🛁' },
    { value: 'livingRoom', label: 'Living Room', emoji: '🛋️' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-2xl max-w-4xl w-full border-4 border-emerald-500 shadow-2xl my-8">
        {/* Header */}
        <div className="p-6 border-b-2 border-emerald-400">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold text-emerald-300 mb-2">
                📋 TASK PLANNER
              </h2>
              <p className="text-emerald-200">Plan your zoo care tasks and responsibilities!</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-4xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="p-6 border-b-2 border-emerald-400/30">
          <div className="flex gap-4">
            <button
              onClick={() => setMode('template')}
              className={`flex-1 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                mode === 'template'
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white border-2 border-emerald-400'
                  : 'bg-gray-800 text-gray-400 border-2 border-gray-700'
              }`}
            >
              📚 Use Template
            </button>
            <button
              onClick={() => setMode('custom')}
              className={`flex-1 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                mode === 'custom'
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white border-2 border-emerald-400'
                  : 'bg-gray-800 text-gray-400 border-2 border-gray-700'
              }`}
            >
              ✨ Create Custom
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Template Mode */}
          {mode === 'template' && (
            <div className="space-y-4">
              <p className="text-emerald-200 mb-4">
                Quick-start with pre-made animal care tasks! Click to add to your task board:
              </p>
              {MONSTER_TEMPLATES.map(template => (
                <div
                  key={template.id}
                  className="bg-black/30 border-2 border-amber-400 rounded-xl p-4 hover:border-amber-300 transition-all cursor-pointer"
                  onClick={() => handleTemplateClick(template)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{template.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-xl font-bold text-white">{template.name}</div>
                        <div className="text-yellow-300">{getThreatLevelStars(template.threatLevel)}</div>
                      </div>
                      <div className="text-sm text-gray-300 mb-2">{template.description}</div>
                      <div className="flex gap-3 text-sm">
                        <div className="text-emerald-300">
                          {realmOptions.find(r => r.value === template.realm)?.emoji} {' '}
                          {realmOptions.find(r => r.value === template.realm)?.label}
                        </div>
                        <div className="text-yellow-300">+{template.sparklePoints} 🪙</div>
                        {template.magicGems > 0 && (
                          <div className="text-orange-300">+{template.magicGems} 🍖</div>
                        )}
                        <div className="text-green-300">{template.questType}</div>
                      </div>
                    </div>
                    <button
                      disabled={loading}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors font-bold disabled:opacity-50"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Custom Mode */}
          {mode === 'custom' && (
            <div className="space-y-6">
              {/* Task Name */}
              <div>
                <label className="block text-emerald-300 font-bold mb-2">
                  Task Name *
                </label>
                <input
                  type="text"
                  value={monsterName}
                  onChange={(e) => setMonsterName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border-2 border-amber-400 rounded-lg text-white focus:outline-none focus:border-amber-300"
                  placeholder="e.g., Feed the Penguins [Make Breakfast]"
                />
              </div>

              {/* Task Emoji & Realm */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-emerald-300 font-bold mb-2">
                    Animal/Task Emoji
                  </label>
                  <input
                    type="text"
                    value={monsterEmoji}
                    onChange={(e) => setMonsterEmoji(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border-2 border-amber-400 rounded-lg text-4xl text-center focus:outline-none focus:border-amber-300"
                    maxLength={2}
                  />
                </div>

                <div>
                  <label className="block text-emerald-300 font-bold mb-2">
                    Realm
                  </label>
                  <select
                    value={realm}
                    onChange={(e) => setRealm(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border-2 border-amber-400 rounded-lg text-white focus:outline-none focus:border-amber-300"
                  >
                    {realmOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.emoji} {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-emerald-300 font-bold mb-2">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border-2 border-amber-400 rounded-lg text-white focus:outline-none focus:border-amber-300"
                  rows={2}
                  placeholder="What is this task about?"
                />
              </div>

              {/* Care Level */}
              <div>
                <label className="block text-emerald-300 font-bold mb-2">
                  Care Level (1-5) {getThreatLevelStars(threatLevel)}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setThreatLevel(level)}
                      className={`flex-1 py-3 rounded-lg transition-all font-bold ${
                        threatLevel === level
                          ? 'bg-yellow-500 text-white border-2 border-yellow-300'
                          : 'bg-black/30 text-gray-400 border-2 border-gray-700'
                      }`}
                    >
                      {level}⭐
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-sm text-emerald-200">
                  Rewards: +{rewards.sp} 🪙 Zoo Coins, +{rewards.gems} 🍖 Treats, +{rewards.xp} ⚡ XP
                </div>
              </div>

              {/* Info about next step */}
              <div className="p-4 bg-emerald-900/50 border-2 border-emerald-400 rounded-lg">
                <div className="text-sm text-emerald-200">
                  💡 <strong>Next step:</strong> You'll set the schedule and reminder times after clicking "Continue"
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {mode === 'custom' && (
          <div className="p-6 border-t-2 border-emerald-400/30 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all font-bold text-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Validate and prepare custom quest data
                if (!monsterName.trim()) {
                  alert('Please enter a task name!');
                  return;
                }

                // Store custom quest data and show timing modal
                setCustomQuestData({
                  monsterName,
                  monsterEmoji,
                  description,
                  realm,
                  threatLevel,
                  questType: 'daily', // Default, will be overridden by timing modal
                });
                setShowTimingModal(true);
              }}
              disabled={loading}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg font-bold text-lg border-2 border-emerald-400 disabled:opacity-50"
            >
              {loading ? 'Please wait...' : 'Continue to Schedule →'}
            </button>
          </div>
        )}
      </div>

      {/* Timing Modal */}
      {showTimingModal && (selectedTemplate || customQuestData) && (
        <TimingModal
          template={selectedTemplate || {
            // Create a fake template from custom quest data
            id: 'custom-temp',
            name: customQuestData?.monsterName || 'Custom Quest',
            emoji: customQuestData?.monsterEmoji || '💀',
            description: customQuestData?.description || 'Your custom quest',
            realm: customQuestData?.realm || 'custom',
            threatLevel: customQuestData?.threatLevel || 1,
            questType: customQuestData?.questType || 'daily',
            sparklePoints: 0,
            magicGems: 0,
            xpReward: 0,
          }}
          onConfirm={handleTimingConfirm}
          onCancel={handleTimingCancel}
        />
      )}
    </div>
  );
}
