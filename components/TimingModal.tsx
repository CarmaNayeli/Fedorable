'use client';

import React from 'react';
import { MonsterTemplate } from '@/lib/gameData';
import { RRule } from 'rrule';

interface TimingModalProps {
  template: MonsterTemplate;
  onConfirm: (recurrenceRule: string | null) => void;
  onCancel: () => void;
}

type TimingOption = 'daily' | 'weekly' | 'onetime';

const WEEKDAYS = [
  { label: 'Mon', value: RRule.MO },
  { label: 'Tue', value: RRule.TU },
  { label: 'Wed', value: RRule.WE },
  { label: 'Thu', value: RRule.TH },
  { label: 'Fri', value: RRule.FR },
  { label: 'Sat', value: RRule.SA },
  { label: 'Sun', value: RRule.SU },
];

export default function TimingModal({ template, onConfirm, onCancel }: TimingModalProps) {
  const [timingOption, setTimingOption] = React.useState<TimingOption>('daily');
  const [selectedDays, setSelectedDays] = React.useState<number[]>([
    RRule.MO.weekday,
    RRule.TU.weekday,
    RRule.WE.weekday,
    RRule.TH.weekday,
    RRule.FR.weekday,
    RRule.SA.weekday,
  ]); // All days except Sunday by default

  const toggleDay = (dayValue: number) => {
    setSelectedDays(prev =>
      prev.includes(dayValue)
        ? prev.filter(d => d !== dayValue)
        : [...prev, dayValue].sort()
    );
  };

  const handleConfirm = () => {
    let recurrenceRule: string | null = null;

    if (timingOption === 'daily') {
      recurrenceRule = new RRule({
        freq: RRule.DAILY,
      }).toString();
    } else if (timingOption === 'weekly' && selectedDays.length > 0) {
      const byweekday = selectedDays
        .map(day => {
          const weekday = WEEKDAYS.find(wd => wd.value.weekday === day);
          return weekday?.value;
        })
        .filter((day): day is typeof RRule.MO => day !== undefined);

      recurrenceRule = new RRule({
        freq: RRule.WEEKLY,
        byweekday,
      }).toString();
    }
    // onetime means recurrenceRule stays null

    onConfirm(recurrenceRule);
  };

  const isConfirmDisabled = timingOption === 'weekly' && selectedDays.length === 0;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl max-w-md w-full border-4 border-pink-400 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b-2 border-pink-400/50">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-5xl">{template.emoji}</span>
            <div>
              <h2 className="text-2xl font-bold text-white">{template.name}</h2>
              <p className="text-pink-200 text-sm">{template.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-3">
            When should this quest appear? 📅
          </h3>

          {/* Timing Options */}
          <div className="space-y-3">
            {/* Daily Option */}
            <button
              onClick={() => setTimingOption('daily')}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                timingOption === 'daily'
                  ? 'border-pink-400 bg-pink-500/20'
                  : 'border-pink-400/30 bg-pink-900/20 hover:border-pink-400/50'
              }`}
            >
              <div className="font-semibold text-white">⏰ Daily</div>
              <div className="text-sm text-pink-200">Every single day</div>
            </button>

            {/* Weekly Option */}
            <div>
              <button
                onClick={() => setTimingOption('weekly')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  timingOption === 'weekly'
                    ? 'border-cyan-400 bg-cyan-500/20'
                    : 'border-pink-400/30 bg-pink-900/20 hover:border-pink-400/50'
                }`}
              >
                <div className="font-semibold text-white">📆 Specific Days</div>
                <div className="text-sm text-pink-200">Choose which days of the week</div>
              </button>

              {/* Day Selection */}
              {timingOption === 'weekly' && (
                <div className="mt-3 p-4 bg-black/30 rounded-xl">
                  <div className="grid grid-cols-7 gap-2">
                    {WEEKDAYS.map(day => (
                      <button
                        key={day.label}
                        onClick={() => toggleDay(day.value.weekday)}
                        className={`p-2 rounded-lg text-xs font-semibold transition-all ${
                          selectedDays.includes(day.value.weekday)
                            ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                  {selectedDays.length === 0 && (
                    <p className="text-red-400 text-xs mt-2">Select at least one day</p>
                  )}
                </div>
              )}
            </div>

            {/* One-time Option */}
            <button
              onClick={() => setTimingOption('onetime')}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                timingOption === 'onetime'
                  ? 'border-pink-400 bg-pink-500/20'
                  : 'border-pink-400/30 bg-pink-900/20 hover:border-pink-400/50'
              }`}
            >
              <div className="font-semibold text-white">🎯 One-time Only</div>
              <div className="text-sm text-pink-200">Just this once</div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t-2 border-pink-400/50 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-6 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              isConfirmDisabled
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg shadow-pink-500/50'
            }`}
          >
            Add Quest ⚔️
          </button>
        </div>
      </div>
    </div>
  );
}
