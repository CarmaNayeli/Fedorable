'use client';

import { useState, useEffect } from 'react';
import { generateBattleText, generateVictoryText, rollCriticalHit, ASCII_ART } from '@/lib/gameUtils';
import { getRandomDialogue } from '@/lib/gameData';

interface BattleSequenceProps {
  quest: any;
  onComplete: () => void;
  onCancel: () => void;
}

export default function BattleSequence({ quest, onComplete, onCancel }: BattleSequenceProps) {
  const [stage, setStage] = useState<'intro' | 'battle' | 'victory'>('intro');
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isCritical, setIsCritical] = useState(false);
  const [processing, setProcessing] = useState(false);

  const startBattle = async () => {
    setStage('battle');
    const critical = rollCriticalHit();
    setIsCritical(critical);

    // Generate battle text
    const log = generateBattleText(quest.monsterName, critical);
    setBattleLog(log);

    // Wait for battle animation
    setTimeout(() => {
      setStage('victory');
    }, 3000);
  };

  const handleComplete = async () => {
    if (processing) return;
    setProcessing(true);

    try {
      const res = await fetch('/api/quests/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questId: quest.id,
          isCritical,
        }),
      });

      if (res.ok) {
        // Small delay to show victory screen
        setTimeout(() => {
          onComplete();
        }, 1000);
      } else {
        alert('Failed to complete quest');
        setProcessing(false);
      }
    } catch (error) {
      console.error('Failed to complete quest:', error);
      alert('Failed to complete quest');
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl max-w-3xl w-full border-4 border-pink-500 shadow-2xl">
        {/* Intro Stage */}
        {stage === 'intro' && (
          <div className="p-8 text-center">
            <div className="text-6xl mb-6">{quest.monsterEmoji}</div>
            <h2 className="text-4xl font-bold text-white mb-4">
              {quest.monsterName} Appeared!
            </h2>
            {quest.description && (
              <p className="text-xl text-pink-200 mb-6">{quest.description}</p>
            )}

            {quest.questType === 'boss' && (
              <div className="mb-6 bg-red-900/50 border-2 border-red-500 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="text-4xl">💫</div>
                  <div className="text-left flex-1">
                    <div className="text-red-300 font-bold mb-1">SPARKLE says:</div>
                    <div className="text-white">{getRandomDialogue('bossEncounter')}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={onCancel}
                className="flex-1 px-6 py-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all font-bold text-lg"
              >
                Retreat
              </button>
              <button
                onClick={startBattle}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg font-bold text-lg border-2 border-green-400"
              >
                ⚔️ ENGAGE IN BATTLE!
              </button>
            </div>
          </div>
        )}

        {/* Battle Stage */}
        {stage === 'battle' && (
          <div className="p-8">
            <div className="bg-black/50 rounded-xl p-6 font-mono text-sm border-2 border-pink-400">
              {battleLog.map((line, i) => (
                <div
                  key={i}
                  className={`mb-1 ${
                    line.includes('CRITICAL') || line.includes('DEFEATED')
                      ? 'text-yellow-300 font-bold text-lg'
                      : line.includes('RHIA')
                      ? 'text-cyan-300'
                      : line.includes('HP:')
                      ? 'text-red-300'
                      : 'text-white'
                  }`}
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    animation: 'fadeIn 0.5s ease-in',
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Victory Stage */}
        {stage === 'victory' && (
          <div className="p-8 text-center">
            <pre className="text-yellow-300 text-sm mb-6 whitespace-pre">
              {isCritical ? ASCII_ART.bossDefeated : ASCII_ART.victory}
            </pre>

            <div className="bg-black/50 rounded-xl p-6 mb-6 border-2 border-yellow-400">
              {generateVictoryText(
                quest.sparklePoints,
                quest.magicGems,
                quest.xpReward,
                isCritical
              ).map((line, i) => (
                <div
                  key={i}
                  className="text-white font-bold text-xl mb-2"
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Sparkle Commentary */}
            <div className="mb-6 bg-purple-900/50 border-2 border-pink-400 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="text-4xl">💫</div>
                <div className="text-left flex-1">
                  <div className="text-pink-300 font-bold mb-1">SPARKLE says:</div>
                  <div className="text-white">
                    {isCritical
                      ? getRandomDialogue('criticalHit')
                      : getRandomDialogue('questComplete')}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleComplete}
              disabled={processing}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg font-bold text-lg border-2 border-purple-400 disabled:opacity-50"
            >
              {processing ? 'Collecting Rewards...' : '✨ Claim Victory!'}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
