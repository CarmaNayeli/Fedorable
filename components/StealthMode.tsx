'use client';

import { useState } from 'react';

interface StealthModeProps {
  onDeactivate: () => void;
}

export default function StealthMode({ onDeactivate }: StealthModeProps) {
  const [screen, setScreen] = useState<'shopping' | 'calendar' | 'notes'>('shopping');

  const coverStories = [
    "Just making a shopping list!",
    "Checking my calendar.",
    "Taking some notes.",
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Secret return button */}
      <button
        onClick={onDeactivate}
        className="fixed bottom-8 right-8 w-16 h-16 bg-purple-600 text-white rounded-full shadow-lg opacity-20 hover:opacity-100 transition-opacity z-50"
        title="Return to Magical Girl Mode"
      >
        ✨
      </button>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b-2 border-gray-300 pb-2">
        <button
          onClick={() => setScreen('shopping')}
          className={`px-4 py-2 font-semibold ${
            screen === 'shopping'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600'
          }`}
        >
          🛒 Shopping List
        </button>
        <button
          onClick={() => setScreen('calendar')}
          className={`px-4 py-2 font-semibold ${
            screen === 'calendar'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600'
          }`}
        >
          📅 Calendar
        </button>
        <button
          onClick={() => setScreen('notes')}
          className={`px-4 py-2 font-semibold ${
            screen === 'notes'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600'
          }`}
        >
          📝 Notes
        </button>
      </div>

      {/* Shopping List */}
      {screen === 'shopping' && (
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping List</h1>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-gray-700">Milk</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-gray-700">Bread</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-gray-700">Eggs</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-gray-700">Dish soap</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-gray-700">Laundry detergent</span>
            </div>
          </div>
        </div>
      )}

      {/* Calendar */}
      {screen === 'calendar' && (
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Calendar</h1>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-bold text-gray-600 p-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => (
              <div
                key={i}
                className="aspect-square border border-gray-300 p-2 bg-gray-50 rounded text-sm text-gray-700"
              >
                {i + 1 <= 31 ? i + 1 : ''}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {screen === 'notes' && (
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Notes</h1>
          <textarea
            className="w-full h-96 p-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 text-gray-700"
            placeholder="Type your notes here..."
            defaultValue="- Clean the kitchen\n- Do laundry\n- Organize bedroom\n- Take out trash"
          />
        </div>
      )}

      {/* Easter egg: Sparkle peeking */}
      <div className="fixed bottom-4 left-4 text-xs text-gray-400 opacity-30">
        <span title="Sparkle is hiding with you! 🤫">💫</span>
      </div>
    </div>
  );
}
