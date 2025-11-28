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
  if (level >= 41) return 5; // ⭐⭐⭐⭐⭐ Mythical Keeper
  if (level >= 31) return 4; // ⭐⭐⭐⭐ Legendary Guardian
  if (level >= 21) return 3; // ⭐⭐⭐ Magical Girl Commander
  if (level >= 11) return 2; // ⭐⭐ Magical Girl Captain
  return 1; // ⭐ Magical Girl
}

export function getRankStars(rank: number): string {
  return '⭐'.repeat(rank);
}

// Titles
export function getTitle(level: number, rank: number, prestigeLevel: number = 0): string {
  const rankTitles = [
    ['Magical Girl', 'Rhia the Novice', 'Rhia the Determined'],
    ['Magical Girl Captain', 'Rhia the Tidy', 'Rhia the Organized'],
    ['Magical Girl Commander', 'Rhia the Radiant', 'Rhia the Magnificent'],
    ['Legendary Guardian', 'Rhia the Glorious', 'Rhia the Immaculate'],
    ['Mythical Keeper', 'Rhia, Keeper of the Realm', 'Rhia, Eternal Guardian'],
  ];

  const titleGroup = rankTitles[rank - 1] || rankTitles[0];
  const titleIndex = Math.min(Math.floor(level / 15), titleGroup.length - 1);

  let title = titleGroup[titleIndex];

  if (prestigeLevel > 0) {
    title += ` [Prestige ${prestigeLevel}]`;
  }

  return title;
}

// Battle Text Generation
export function generateBattleText(monsterName: string, isCritical: boolean = false): string[] {
  const attacks = [
    'DISH SOAP BLAST',
    'VACUUM VORTEX',
    'SPARKLE SHINE BEAM',
    'ORGANIZATION STRIKE',
    'TIDY TORNADO',
    'CLEANING COMET',
    'PURIFICATION WAVE',
    'FRESH SCENT SURGE',
  ];

  const attack = attacks[Math.floor(Math.random() * attacks.length)];

  const battleLog: string[] = [];

  battleLog.push(`💀 ${monsterName.toUpperCase()} appeared!`);
  battleLog.push(`   HP: ████████░░ 80%`);
  battleLog.push('');

  if (isCritical) {
    battleLog.push(`⚔️ RHIA uses ${attack}!`);
    battleLog.push(`   💫✨💥 CRITICAL HIT! ✨💫`);
  } else {
    battleLog.push(`⚔️ RHIA uses ${attack}!`);
    battleLog.push(`   💥 Direct hit!`);
  }

  battleLog.push('');
  battleLog.push(`💀 ${monsterName.toUpperCase()} is weakening...`);
  battleLog.push(`   HP: ██░░░░░░░░ 20%`);
  battleLog.push('');
  battleLog.push(`⚔️ RHIA uses FINAL STRIKE!`);
  battleLog.push(`   ✨💫🌟 DEFEATED! 🌟💫✨`);

  return battleLog;
}

export function generateVictoryText(sp: number, gems: number, xp: number, isCritical: boolean = false): string[] {
  const victory: string[] = [];

  if (isCritical) {
    victory.push('✧･ﾟ: *✧･ﾟ:* PERFECT VICTORY! *:･ﾟ✧*:･ﾟ✧');
  } else {
    victory.push('✧･ﾟ: *✧･ﾟ:* VICTORY! *:･ﾟ✧*:･ﾟ✧');
  }

  victory.push('');
  victory.push(`   +${sp} ✨ Sparkle Points`);
  if (gems > 0) {
    victory.push(`   +${gems} 🔮 Magic Gems`);
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
  if (purity >= 70) return '💫'; // Clean
  if (purity >= 50) return '⭐'; // Okay
  if (purity >= 30) return '💧'; // Needs work
  return '💀'; // Chaos reigns
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
    ✨ ═══════════════════ ✨
         TRANSFORMATION!
    ✨ ═══════════════════ ✨
           ｡･:*:･ﾟ★
         💫  RHIA  💫
           ｡･:*:･ﾟ★
  `,

  victory: `
    💫 ═══════════════════ 💫
          VICTORY!!!
    💫 ═══════════════════ 💫
  `,

  levelUp: `
    🌟 ═══════════════════ 🌟
         ✨ LEVEL UP! ✨
    🌟 ═══════════════════ 🌟
  `,

  bossDefeated: `
    ⭐ ═══════════════════════ ⭐
       💫 BOSS DEFEATED! 💫
    ⭐ ═══════════════════════ ⭐
           ✧･ﾟ: *✧･ﾟ:*
         LEGENDARY VICTORY!
           *:･ﾟ✧*:･ﾟ✧
  `,
};
