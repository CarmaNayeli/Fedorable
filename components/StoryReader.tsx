'use client';

import { useState } from 'react';
import { STORY_CHAPTERS } from '@/lib/gameData';
import { ASCII_ART } from '@/lib/gameUtils';

interface StoryReaderProps {
  magicalGirl: any;
  onClose: () => void;
}

export default function StoryReader({ magicalGirl, onClose }: StoryReaderProps) {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  if (!magicalGirl) {
    return null;
  }

  const availableChapters = STORY_CHAPTERS.filter(
    chapter => chapter.unlockLevel <= magicalGirl.level
  );

  const currentChapter = selectedChapter !== null
    ? STORY_CHAPTERS.find(c => c.number === selectedChapter)
    : null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-gradient-to-br from-teal-900 to-emerald-900 rounded-2xl max-w-4xl w-full border-4 border-amber-500 shadow-2xl my-8">
        {/* Header */}
        <div className="p-6 border-b-2 border-amber-400">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold text-amber-300 mb-2">
                📖 STORY CHAPTERS
              </h2>
              <p className="text-amber-200">Fedora&apos;s Zoo Adventure</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-4xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {!currentChapter ? (
            // Chapter List
            <div className="space-y-4">
              {availableChapters.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✨</div>
                  <div className="text-2xl font-bold text-white mb-2">
                    No Chapters Unlocked Yet!
                  </div>
                  <div className="text-gray-300">
                    Keep completing quests to unlock story chapters!
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <p className="text-white text-lg">
                      Chapters Unlocked: {availableChapters.length} / {STORY_CHAPTERS.length}
                    </p>
                    <p className="text-gray-300 text-sm mt-2">
                      Reach higher levels to unlock more chapters!
                    </p>
                  </div>

                  {availableChapters.map((chapter) => (
                    <div
                      key={chapter.number}
                      onClick={() => setSelectedChapter(chapter.number)}
                      className="bg-black/30 border-2 border-amber-400 rounded-xl p-6 hover:border-amber-300 transition-all cursor-pointer hover:bg-black/40"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-amber-300 font-bold mb-1">
                            Chapter {chapter.number}
                          </div>
                          <div className="text-2xl font-bold text-white mb-2">
                            {chapter.title}
                          </div>
                          <div className="text-sm text-gray-300">
                            Unlocked at level {chapter.unlockLevel}
                          </div>
                        </div>
                        <div className="text-4xl">📖</div>
                      </div>
                    </div>
                  ))}

                  {/* Locked Chapters Preview */}
                  {STORY_CHAPTERS.filter(c => c.unlockLevel > magicalGirl.level).length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-gray-400 mb-4">
                        🔒 Locked Chapters
                      </h3>
                      {STORY_CHAPTERS.filter(c => c.unlockLevel > magicalGirl.level).map((chapter) => (
                        <div
                          key={chapter.number}
                          className="bg-black/20 border-2 border-gray-700 rounded-xl p-6 mb-3 opacity-50"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="text-gray-500 font-bold mb-1">
                                Chapter {chapter.number}
                              </div>
                              <div className="text-xl font-bold text-gray-400 mb-2">
                                {chapter.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                Unlock at level {chapter.unlockLevel}
                              </div>
                            </div>
                            <div className="text-4xl">🔒</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            // Reading View
            <div>
              <button
                onClick={() => setSelectedChapter(null)}
                className="mb-6 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors"
              >
                ← Back to Chapters
              </button>

              <div className="bg-black/30 border-2 border-amber-400 rounded-xl p-8">
                <div className="text-center mb-6">
                  <div className="text-amber-300 font-bold text-lg mb-2">
                    Chapter {currentChapter.number}
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-4">
                    {currentChapter.title}
                  </h3>
                  <div className="inline-block bg-emerald-600/50 px-4 py-2 rounded-lg">
                    <span className="text-sm text-emerald-200">
                      Unlocked at level {currentChapter.unlockLevel}
                    </span>
                  </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  <div className="text-white text-lg leading-relaxed whitespace-pre-line">
                    {currentChapter.content}
                  </div>
                </div>

                {/* Navigation */}
                <div className="mt-8 pt-6 border-t-2 border-amber-400/30 flex justify-between">
                  {selectedChapter !== null && selectedChapter > 0 && availableChapters.find(c => c.number === selectedChapter - 1) ? (
                    <button
                      onClick={() => setSelectedChapter(selectedChapter - 1)}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-bold"
                    >
                      ← Previous Chapter
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {selectedChapter !== null && availableChapters.find(c => c.number === selectedChapter + 1) ? (
                    <button
                      onClick={() => setSelectedChapter(selectedChapter + 1)}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-bold"
                    >
                      Next Chapter →
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!currentChapter && (
          <div className="p-6 border-t-2 border-amber-400/30">
            <button
              onClick={onClose}
              className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg font-bold text-lg border-2 border-emerald-400"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
