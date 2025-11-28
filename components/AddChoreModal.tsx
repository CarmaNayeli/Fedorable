'use client';

import { useState } from 'react';
import { RRule, Frequency } from 'rrule';

interface AddChoreModalProps {
  onClose: () => void;
}

export default function AddChoreModal({ onClose }: AddChoreModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [difficulty, setDifficulty] = useState(3);
  const [priority, setPriority] = useState(2);
  const [color, setColor] = useState('#3b82f6');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceType, setRecurrenceType] = useState<'daily' | 'weekly' | 'custom'>('daily');
  const [weeklyDays, setWeeklyDays] = useState<number[]>([]);
  const [customInterval, setCustomInterval] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let recurrenceRule: string | undefined;

      if (isRecurring) {
        if (recurrenceType === 'daily') {
          recurrenceRule = new RRule({ freq: Frequency.DAILY }).toString();
        } else if (recurrenceType === 'weekly' && weeklyDays.length > 0) {
          recurrenceRule = new RRule({
            freq: Frequency.WEEKLY,
            byweekday: weeklyDays,
          }).toString();
        } else if (recurrenceType === 'custom') {
          recurrenceRule = new RRule({
            freq: Frequency.DAILY,
            interval: customInterval,
          }).toString();
        }
      }

      const res = await fetch('/api/chores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: description || undefined,
          timeEstimateMinutes: timeEstimate ? parseInt(timeEstimate) : undefined,
          difficultyScale: difficulty,
          priority,
          color,
          isRecurring,
          recurrenceRule,
        }),
      });

      if (res.ok) {
        window.location.reload();
      } else {
        alert('Failed to create chore');
      }
    } catch (error) {
      console.error('Failed to create chore:', error);
      alert('Failed to create chore');
    } finally {
      setLoading(false);
    }
  };

  const toggleWeekday = (day: number) => {
    setWeeklyDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Add New Chore</h2>
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
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Chore Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g., Do laundry"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              rows={3}
              placeholder="Add details..."
            />
          </div>

          {/* Time Estimate & Difficulty */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Time Estimate (minutes)
              </label>
              <input
                type="number"
                value={timeEstimate}
                onChange={(e) => setTimeEstimate(e.target.value)}
                min="1"
                className="w-full px-4 py-2 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Difficulty (1-5)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-2 rounded-lg transition-colors ${
                      difficulty >= d
                        ? 'bg-yellow-500 text-white'
                        : 'bg-slate-700 text-gray-400'
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Priority & Color */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value))}
                className="w-full px-4 py-2 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Color
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10 bg-slate-700 border border-white/10 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Recurring */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-5 h-5 rounded bg-slate-700 border-white/10"
              />
              <span className="text-white font-medium">Make this recurring</span>
            </label>
          </div>

          {isRecurring && (
            <div className="space-y-4 pl-7">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Recurrence Pattern
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="daily"
                      checked={recurrenceType === 'daily'}
                      onChange={(e) => setRecurrenceType(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <span className="text-white">Every day</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="weekly"
                      checked={recurrenceType === 'weekly'}
                      onChange={(e) => setRecurrenceType(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <span className="text-white">Specific days of the week</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="custom"
                      checked={recurrenceType === 'custom'}
                      onChange={(e) => setRecurrenceType(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <span className="text-white">Every N days</span>
                  </label>
                </div>
              </div>

              {recurrenceType === 'weekly' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Days
                  </label>
                  <div className="flex gap-2">
                    {weekdays.map((day, index) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleWeekday(index)}
                        className={`flex-1 py-2 rounded-lg transition-colors ${
                          weeklyDays.includes(index)
                            ? 'bg-purple-500 text-white'
                            : 'bg-slate-700 text-gray-400'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {recurrenceType === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Every N days
                  </label>
                  <input
                    type="number"
                    value={customInterval}
                    onChange={(e) => setCustomInterval(parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-full px-4 py-2 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              )}
            </div>
          )}

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
              {loading ? 'Creating...' : 'Create Chore'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
