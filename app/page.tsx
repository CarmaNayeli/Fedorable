'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import StatsPanel from '@/components/StatsPanel';
import ChoreList from '@/components/ChoreList';
import AddChoreModal from '@/components/AddChoreModal';
import SettingsModal from '@/components/SettingsModal';

export default function Home() {
  const [showAddChore, setShowAddChore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { user, chores, setUser, setChores } = useStore();

  useEffect(() => {
    // Initialize user and fetch chores
    const initializeApp = async () => {
      try {
        // Fetch or create user
        const userRes = await fetch('/api/user');
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
        }

        // Fetch chores
        const choresRes = await fetch('/api/chores');
        if (choresRes.ok) {
          const choresData = await choresRes.json();
          setChores(choresData);
        }
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initializeApp();
  }, [setUser, setChores]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Rhia-minder</h1>
            <p className="text-gray-300">Your gamified chore tracker</p>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </header>

        {/* Stats Panel */}
        {user && <StatsPanel user={user} />}

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Today's Chores</h2>
            <button
              onClick={() => setShowAddChore(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg font-semibold"
            >
              + Add Chore
            </button>
          </div>

          <ChoreList chores={chores} />
        </div>
      </div>

      {/* Modals */}
      {showAddChore && <AddChoreModal onClose={() => setShowAddChore(false)} />}
      {showSettings && user && <SettingsModal user={user} onClose={() => setShowSettings(false)} />}
    </main>
  );
}
