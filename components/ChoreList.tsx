'use client';

import { Chore } from '@/lib/store';
import ChoreCard from './ChoreCard';

interface ChoreListProps {
  chores: Chore[];
}

export default function ChoreList({ chores }: ChoreListProps) {
  const activeChores = chores.filter(c => c.isActive);

  if (activeChores.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 border border-white/20 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-white mb-2">No chores yet!</h3>
        <p className="text-gray-300">Add your first chore to get started</p>
      </div>
    );
  }

  // Group chores by priority
  const highPriority = activeChores.filter(c => c.priority === 3);
  const mediumPriority = activeChores.filter(c => c.priority === 2);
  const lowPriority = activeChores.filter(c => c.priority === 1);

  return (
    <div className="space-y-6">
      {highPriority.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
            <span>🔴</span> High Priority
          </h3>
          <div className="space-y-3">
            {highPriority.map(chore => <ChoreCard key={chore.id} chore={chore} />)}
          </div>
        </div>
      )}

      {mediumPriority.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
            <span>🟡</span> Medium Priority
          </h3>
          <div className="space-y-3">
            {mediumPriority.map(chore => <ChoreCard key={chore.id} chore={chore} />)}
          </div>
        </div>
      )}

      {lowPriority.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
            <span>🟢</span> Low Priority
          </h3>
          <div className="space-y-3">
            {lowPriority.map(chore => <ChoreCard key={chore.id} chore={chore} />)}
          </div>
        </div>
      )}
    </div>
  );
}
