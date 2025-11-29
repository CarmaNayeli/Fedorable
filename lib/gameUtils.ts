// Game Utilities: Calculations, Battle Text, Progression

// XP and Level Progression
export function calculateLevel(xp: number): number {
  // Level formula: sqrt(xp / 100) + 1
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function xpForNextLevel(currentLevel: number): number {
  // XP needed to reach next level
  return Math.pow(currentLevel, 2) * 100;
}

export function xpProgressToNextLevel(currentXP: number, currentLevel: number): number {
  const currentLevelMinXP = Math.pow(currentLevel - 1, 2) * 100;
  const nextLevelXP = xpForNextLevel(currentLevel);
  const xpIntoCurrentLevel = currentXP - currentLevelMinXP;
  const xpNeededForLevel = nextLevelXP - currentLevelMinXP;

  return (xpIntoCurrentLevel / xpNeededForLevel) * 100;
}

// Rank Progression (1-5 stars)
export function calculateRank(level: number): number {
  if (level >= 41) return 5; // ⭐⭐⭐⭐⭐ Zoo Director
  if (level >= 31) return 4; // ⭐⭐⭐⭐ Head Zookeeper
  if (level >= 21) return 3; // ⭐⭐⭐ Senior Zookeeper
  if (level >= 11) return 2; // ⭐⭐ Zookeeper
  return 1; // ⭐ Junior Zookeeper
}

export function getRankStars(rank: number): string {
  return '⭐'.repeat(rank);
}

// Titles
export function getTitle(level: number, rank: number, prestigeLevel: number = 0): string {
  const rankTitles = [
    ['Junior Zookeeper', 'Fedora the Learner', 'Fedora the Dedicated'],
    ['Zookeeper', 'Fedora the Caretaker', 'Fedora the Devoted'],
    ['Senior Zookeeper', 'Fedora the Compassionate', 'Fedora the Expert'],
    ['Head Zookeeper', 'Fedora the Magnificent', 'Fedora the Beloved'],
    ['Zoo Director', 'Fedora, Friend of All Creatures', 'Fedora, Guardian of the Wild'],
  ];

  const titleGroup = rankTitles[rank - 1] || rankTitles[0];
  const titleIndex = Math.min(Math.floor(level / 15), titleGroup.length - 1);

  let title = titleGroup[titleIndex];

  if (prestigeLevel > 0) {
    title += ` [Prestige ${prestigeLevel}]`;
  }

  return title;
}

// Task Completion Text Generation
export function generateBattleText(monsterName: string, isCritical: boolean = false): string[] {
  const actions = [
    'FEEDING TIME',
    'HABITAT CLEANING',
    'GENTLE CARE',
    'EXPERT GROOMING',
    'ENRICHMENT ACTIVITY',
    'HEALTH CHECK',
    'LOVING ATTENTION',
    'PROFESSIONAL CARE',
  ];

  const action = actions[Math.floor(Math.random() * actions.length)];

  const taskLog: string[] = [];

  taskLog.push(`🦁 ${monsterName.toUpperCase()} needs attention!`);
  taskLog.push(`   Progress: ████████░░ 80%`);
  taskLog.push('');

  if (isCritical) {
    taskLog.push(`💚 FEDORA performs ${action}!`);
    taskLog.push(`   💚✨🌟 PERFECT CARE! ✨💚`);
  } else {
    taskLog.push(`💚 FEDORA performs ${action}!`);
    taskLog.push(`   🌟 Great work!`);
  }

  taskLog.push('');
  taskLog.push(`🦁 ${monsterName.toUpperCase()} is happy...`);
  taskLog.push(`   Progress: ██████████ 100%`);
  taskLog.push('');
  taskLog.push(`💚 FEDORA completes the task!`);
  taskLog.push(`   ✨🦜🌟 COMPLETED! 🌟🦜✨`);

  return taskLog;
}

export function generateVictoryText(sp: number, gems: number, xp: number, isCritical: boolean = false): string[] {
  const victory: string[] = [];

  if (isCritical) {
    victory.push('✧･ﾟ: *✧･ﾟ:* PERFECT CARE! *:･ﾟ✧*:･ﾟ✧');
  } else {
    victory.push('✧･ﾟ: *✧･ﾟ:* TASK COMPLETE! *:･ﾟ✧*:･ﾟ✧');
  }

  victory.push('');
  victory.push(`   +${sp} 🪙 Zoo Coins`);
  if (gems > 0) {
    victory.push(`   +${gems} 🍖 Treats`);
  }
  victory.push(`   +${xp} ⚡ XP`);

  return victory;
}

// Realm purity calculations
export function updateRealmPurity(currentPurity: number, questCompleted: boolean): number {
  if (questCompleted) {
    // Completing a quest increases purity
    return Math.min(100, currentPurity + 10);
  } else {
    // Neglecting decreases purity slightly
    return Math.max(0, currentPurity - 2);
  }
}

export function getRealmPurityEmoji(purity: number): string {
  if (purity >= 90) return '✨'; // Pristine
  if (purity >= 70) return '💚'; // Well-maintained
  if (purity >= 50) return '⭐'; // Okay
  if (purity >= 30) return '💧'; // Needs attention
  return '🧹'; // Needs cleaning
}

// Check for critical hit (20% chance)
export function rollCriticalHit(): boolean {
  return Math.random() < 0.2;
}

// Format duration
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

// Get threat level emoji
export function getThreatLevelStars(level: number): string {
  return '⭐'.repeat(level);
}

// Check if should unlock new story chapter
export function shouldUnlockStoryChapter(level: number, currentChapter: number): boolean {
  // Unlock new chapter every 5 levels
  const chaptersAvailable = Math.floor(level / 5);
  return chaptersAvailable > currentChapter;
}

// Calculate streak bonus
export function getStreakBonus(streakDays: number): { sp: number; gems: number } {
  if (streakDays >= 365) return { sp: 500, gems: 20 };
  if (streakDays >= 180) return { sp: 300, gems: 15 };
  if (streakDays >= 90) return { sp: 200, gems: 10 };
  if (streakDays >= 60) return { sp: 150, gems: 8 };
  if (streakDays >= 30) return { sp: 100, gems: 5 };
  if (streakDays >= 14) return { sp: 50, gems: 3 };
  if (streakDays >= 7) return { sp: 30, gems: 1 };
  return { sp: 0, gems: 0 };
}

// Check if streak should continue
export function checkStreak(lastActivityDate: Date | null, currentDate: Date = new Date()): {
  shouldContinue: boolean;
  shouldReset: boolean;
} {
  if (!lastActivityDate) {
    return { shouldContinue: false, shouldReset: false };
  }

  const lastDate = new Date(lastActivityDate);
  const daysDiff = Math.floor(
    (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff === 0) {
    // Same day - continue current streak
    return { shouldContinue: true, shouldReset: false };
  } else if (daysDiff === 1) {
    // Next day - increment streak
    return { shouldContinue: true, shouldReset: false };
  } else {
    // More than 1 day - reset streak
    return { shouldContinue: false, shouldReset: true };
  }
}

// ASCII Art for special moments
export const ASCII_ART = {
  transformation: `
    🦁 ═══════════════════ 🦁
        SHIFT STARTED!
    🦁 ═══════════════════ 🦁
           ｡･:*:･ﾟ★
        💚 FEDORA 💚
           ｡･:*:･ﾟ★
  `,

  victory: `
    💚 ═══════════════════ 💚
      TASK COMPLETE!!!
    💚 ═══════════════════ 💚
  `,

  levelUp: `
    🌟 ═══════════════════ 🌟
         ✨ LEVEL UP! ✨
    🌟 ═══════════════════ 🌟
  `,

  bossDefeated: `
    ⭐ ═══════════════════════ ⭐
      🦁 BIG TASK DONE! 🦁
    ⭐ ═══════════════════════ ⭐
           ✧･ﾟ: *✧･ﾟ:*
        AMAZING WORK!
           *:･ﾟ✧*:･ﾟ✧
  `,
};
