'use client';

import React from 'react';
import { MonsterTemplate } from '@/lib/gameData';
import { RRule } from 'rrule';

interface TimingModalProps {
  template: MonsterTemplate;
  onConfirm: (recurrenceRule: string | null, notificationPreferences: Record<string, string | null>) => void;
  onCancel: () => void;
}

type TimingOption = 'daily' | 'weekly' | 'onetime';

const WEEKDAYS = [
  { label: 'Mon', value: RRule.MO, key: 'mon' },
  { label: 'Tue', value: RRule.TU, key: 'tue' },
  { label: 'Wed', value: RRule.WE, key: 'wed' },
  { label: 'Thu', value: RRule.TH, key: 'thu' },
  { label: 'Fri', value: RRule.FR, key: 'fri' },
  { label: 'Sat', value: RRule.SA, key: 'sat' },
  { label: 'Sun', value: RRule.SU, key: 'sun' },
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

  // Notification times for each day (null means no notification)
  const [notificationTimes, setNotificationTimes] = React.useState<Record<string, string | null>>({
    mon: '08:00',
    tue: '08:00',
    wed: '08:00',
    thu: '08:00',
    fri: '08:00',
    sat: '08:00',
    sun: null,
  });
  const [bulkTime, setBulkTime] = React.useState<string>('08:00');

  const toggleDay = (dayValue: number) => {
    setSelectedDays(prev =>
      prev.includes(dayValue)
        ? prev.filter(d => d !== dayValue)
        : [...prev, dayValue].sort()
    );
  };

  const updateNotificationTime = (dayKey: string, time: string | null) => {
    setNotificationTimes(prev => ({
      ...prev,
      [dayKey]: time,
    }));
  };

  const applyBulkTime = () => {
    const updates: Record<string, string | null> = {};

    WEEKDAYS.forEach(day => {
      const isDaySelected = timingOption === 'daily' ||
        (timingOption === 'weekly' && selectedDays.includes(day.value.weekday));

      if (isDaySelected) {
        updates[day.key] = bulkTime;
      }
    });

    setNotificationTimes(prev => ({
      ...prev,
      ...updates,
    }));
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

    // Convert local times to UTC before sending
    const timezoneOffsetMinutes = new Date().getTimezoneOffset();
    const convertedTimes: Record<string, string | null> = {};

    Object.entries(notificationTimes).forEach(([day, time]) => {
      if (time) {
        // Parse the time
        const [hours, minutes] = time.split(':').map(Number);

        // Create a date in local timezone
        const localDate = new Date();
        localDate.setHours(hours, minutes, 0, 0);

        // Convert to UTC
        const utcDate = new Date(localDate.getTime() + timezoneOffsetMinutes * 60000);

        // Format back to HH:MM
        const utcHours = utcDate.getUTCHours().toString().padStart(2, '0');
        const utcMinutes = utcDate.getUTCMinutes().toString().padStart(2, '0');
        convertedTimes[day] = `${utcHours}:${utcMinutes}`;
      } else {
        convertedTimes[day] = null;
      }
    });

    onConfirm(recurrenceRule, convertedTimes);
  };

  const isConfirmDisabled = timingOption === 'weekly' && selectedDays.length === 0;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl max-w-md w-full border-4 border-pink-400 shadow-2xl my-8">
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
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
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

          {/* Notification Times */}
          {timingOption !== 'onetime' && (
            <div className="mt-6 pt-6 border-t-2 border-pink-400/30">
              <h3 className="text-lg font-semibold text-white mb-3">
                Reminder Times ⏰
              </h3>

              {/* Timezone Info */}
              <div className="mb-4 p-3 bg-green-900/50 border-2 border-green-500/70 rounded-lg">
                <div className="text-sm text-green-200">
                  <span className="font-bold">✓ Timezone:</span> Enter times in <span className="font-semibold">your local time</span>.
                  {typeof Intl !== 'undefined' && (
                    <>
                      {' '}They'll be automatically converted to UTC.
                      <br />
                      Current local time: <span className="font-semibold">{new Date().toLocaleTimeString()} ({Intl.DateTimeFormat().resolvedOptions().timeZone})</span>
                    </>
                  )}
                </div>
              </div>

              {/* Bulk Time Setter */}
              <div className="mb-4 p-4 bg-gradient-to-r from-cyan-900/50 to-purple-900/50 rounded-xl border-2 border-cyan-400/50">
                <div className="text-sm font-semibold text-cyan-200 mb-2">
                  Set time for all days at once:
                </div>
                <div className="flex gap-3">
                  <input
                    type="time"
                    value={bulkTime}
                    onChange={(e) => setBulkTime(e.target.value)}
                    className="flex-1 px-3 py-2 bg-black/50 border border-cyan-400/50 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-300"
                  />
                  <button
                    onClick={applyBulkTime}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-semibold text-sm transition-all shadow-lg"
                  >
                    Apply to All
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {WEEKDAYS.map(day => {
                  const isDaySelected = timingOption === 'daily' ||
                    (timingOption === 'weekly' && selectedDays.includes(day.value.weekday));

                  return (
                    <div
                      key={day.key}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        isDaySelected
                          ? 'bg-black/30 border border-cyan-400/50'
                          : 'bg-black/10 opacity-50'
                      }`}
                    >
                      <div className="w-12 text-sm font-semibold text-white">
                        {day.label}
                      </div>
                      <input
                        type="time"
                        value={notificationTimes[day.key] || ''}
                        onChange={(e) => updateNotificationTime(day.key, e.target.value || null)}
                        disabled={!isDaySelected}
                        className="flex-1 px-3 py-2 bg-black/50 border border-pink-400/50 rounded-lg text-white text-sm focus:outline-none focus:border-pink-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <button
                        onClick={() => updateNotificationTime(day.key, null)}
                        disabled={!isDaySelected}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                          isDaySelected && notificationTimes[day.key]
                            ? 'bg-red-600/80 hover:bg-red-600 text-white'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        }`}
                        title="No reminder"
                      >
                        🔕
                      </button>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-pink-200 mt-3">
                💡 Set different times for each day, or click 🔕 to disable reminders for specific days
              </p>
            </div>
          )}
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
