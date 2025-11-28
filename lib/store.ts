import { create } from 'zustand';

export interface Chore {
  id: string;
  title: string;
  description?: string;
  timeEstimateMinutes?: number;
  difficultyScale: number;
  color: string;
  priority: number;
  isRecurring: boolean;
  recurrenceRule?: string;
  experienceReward: number;
  isActive: boolean;
}

export interface User {
  id: string;
  name?: string;
  level: number;
  experiencePoints: number;
  currentStreak: number;
  longestStreak: number;
  daysOff: number[];
  priorityMode: 'light' | 'normal' | 'heavy';
}

interface AppState {
  user: User | null;
  chores: Chore[];
  setUser: (user: User) => void;
  setChores: (chores: Chore[]) => void;
  addChore: (chore: Chore) => void;
  updateChore: (id: string, updates: Partial<Chore>) => void;
  deleteChore: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  chores: [],
  setUser: (user) => set({ user }),
  setChores: (chores) => set({ chores }),
  addChore: (chore) => set((state) => ({ chores: [...state.chores, chore] })),
  updateChore: (id, updates) =>
    set((state) => ({
      chores: state.chores.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),
  deleteChore: (id) =>
    set((state) => ({ chores: state.chores.filter((c) => c.id !== id) })),
}));
