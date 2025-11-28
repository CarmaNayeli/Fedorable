import { RRule } from 'rrule';

export function calculateLevel(xp: number): number {
  // Simple level formula: level = floor(sqrt(xp / 100))
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function xpForNextLevel(currentLevel: number): number {
  // XP needed for next level
  return Math.pow(currentLevel, 2) * 100;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

export function getDifficultyEmoji(difficulty: number): string {
  const emojis = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];
  return emojis[difficulty - 1] || '⭐⭐⭐';
}

export function parseRecurrenceRule(ruleString: string): RRule | null {
  try {
    return RRule.fromString(ruleString);
  } catch {
    return null;
  }
}

export function getNextOccurrence(ruleString: string, after?: Date): Date | null {
  const rule = parseRecurrenceRule(ruleString);
  if (!rule) return null;

  const next = rule.after(after || new Date(), true);
  return next;
}
