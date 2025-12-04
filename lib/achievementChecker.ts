import { prisma } from './prisma';
import type { ShopSticker } from './shopData';

interface AchievementProgress {
  isUnlocked: boolean;
  current: number;
  goal: number;
  progressPercent: number;
}

/**
 * Check if a quest streak achievement is unlocked
 * E.g., "Defeat Kitchen Chaos Spirit 7 days in a row"
 */
async function checkQuestStreakAchievement(
  magicalGirlId: string,
  targetMonsterName: string,
  goal: number
): Promise<AchievementProgress> {
  // Find the quest by monster name
  const quest = await prisma.quest.findFirst({
    where: {
      magicalGirlId,
      monsterName: targetMonsterName,
    },
  });

  if (!quest) {
    return { isUnlocked: false, current: 0, goal, progressPercent: 0 };
  }

  // Get all defeats for this quest, ordered by date
  const defeats = await prisma.monsterDefeat.findMany({
    where: {
      questId: quest.id,
      magicalGirlId,
    },
    orderBy: {
      defeatedAt: 'desc',
    },
  });

  if (defeats.length === 0) {
    return { isUnlocked: false, current: 0, goal, progressPercent: 0 };
  }

  // Calculate current streak
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const defeat of defeats) {
    const defeatDate = new Date(defeat.defeatedAt);
    defeatDate.setHours(0, 0, 0, 0);

    // Check if this defeat is from today or yesterday (consecutive days)
    const daysDiff = Math.floor((currentDate.getTime() - defeatDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === streak) {
      streak++;
      if (streak >= goal) {
        break; // Achievement unlocked!
      }
    } else if (daysDiff > streak) {
      // Streak broken
      break;
    }
  }

  const isUnlocked = streak >= goal;
  const progressPercent = Math.min(100, Math.round((streak / goal) * 100));

  return { isUnlocked, current: streak, goal, progressPercent };
}

/**
 * Check if total defeats achievement is unlocked
 * E.g., "Defeat 100 monsters total"
 */
async function checkTotalDefeatsAchievement(
  magicalGirlId: string,
  goal: number
): Promise<AchievementProgress> {
  const magicalGirl = await prisma.magicalGirl.findUnique({
    where: { id: magicalGirlId },
    select: { totalMonstersDefeated: true },
  });

  const current = magicalGirl?.totalMonstersDefeated || 0;
  const isUnlocked = current >= goal;
  const progressPercent = Math.min(100, Math.round((current / goal) * 100));

  return { isUnlocked, current, goal, progressPercent };
}

/**
 * Check if total streak achievement is unlocked
 * E.g., "Maintain a 30-day streak"
 */
async function checkTotalStreakAchievement(
  magicalGirlId: string,
  goal: number
): Promise<AchievementProgress> {
  const magicalGirl = await prisma.magicalGirl.findUnique({
    where: { id: magicalGirlId },
    select: { currentStreak: true, longestStreak: true },
  });

  // Use longest streak so achievement is permanent once earned
  const current = magicalGirl?.longestStreak || 0;
  const isUnlocked = current >= goal;
  const progressPercent = Math.min(100, Math.round((current / goal) * 100));

  return { isUnlocked, current, goal, progressPercent };
}

/**
 * Check if perfect week achievement is unlocked
 * E.g., "Complete all quests every day for a full week"
 */
async function checkPerfectWeekAchievement(
  magicalGirlId: string,
  goal: number
): Promise<AchievementProgress> {
  // Get all active recurring quests
  const activeQuests = await prisma.quest.findMany({
    where: {
      magicalGirlId,
      isActive: true,
      isRecurring: true,
    },
    select: { id: true },
  });

  if (activeQuests.length === 0) {
    return { isUnlocked: false, current: 0, goal, progressPercent: 0 };
  }

  const questIds = activeQuests.map((q: typeof activeQuests[number]) => q.id);

  // Get defeats for the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentDefeats = await prisma.monsterDefeat.findMany({
    where: {
      magicalGirlId,
      questId: { in: questIds },
      defeatedAt: { gte: sevenDaysAgo },
    },
    orderBy: {
      defeatedAt: 'desc',
    },
  });

  // Group defeats by day and check if all quests were completed each day
  const defeatsByDay = new Map<string, Set<string>>();

  for (const defeat of recentDefeats) {
    const dateKey = defeat.defeatedAt.toISOString().split('T')[0];
    if (!defeatsByDay.has(dateKey)) {
      defeatsByDay.set(dateKey, new Set());
    }
    defeatsByDay.get(dateKey)!.add(defeat.questId);
  }

  // Count consecutive perfect days
  let perfectDays = 0;
  let currentDate = new Date();

  for (let i = 0; i < 7; i++) {
    const dateKey = currentDate.toISOString().split('T')[0];
    const defeatsToday = defeatsByDay.get(dateKey);

    if (defeatsToday && defeatsToday.size === questIds.length) {
      perfectDays++;
    } else {
      break; // Streak broken
    }

    currentDate.setDate(currentDate.getDate() - 1);
  }

  const isUnlocked = perfectDays >= 7 * goal;
  const progressPercent = Math.min(100, Math.round((perfectDays / (7 * goal)) * 100));

  return { isUnlocked, current: perfectDays, goal: 7 * goal, progressPercent };
}

/**
 * Check if total gems earned achievement is unlocked
 * E.g., "Earn 50 magic gems total"
 */
async function checkTotalGemsEarnedAchievement(
  magicalGirlId: string,
  goal: number
): Promise<AchievementProgress> {
  // Sum all magic gems ever earned from defeats
  const result = await prisma.monsterDefeat.aggregate({
    where: { magicalGirlId },
    _sum: { magicGemsEarned: true },
  });

  const current = result._sum.magicGemsEarned || 0;
  const isUnlocked = current >= goal;
  const progressPercent = Math.min(100, Math.round((current / goal) * 100));

  return { isUnlocked, current, goal, progressPercent };
}

/**
 * Main function to check achievement progress for a given sticker
 */
export async function checkAchievementProgress(
  magicalGirlId: string,
  sticker: ShopSticker
): Promise<AchievementProgress> {
  if (!sticker.isAchievement || !sticker.achievementType || !sticker.achievementGoal) {
    return { isUnlocked: false, current: 0, goal: 0, progressPercent: 0 };
  }

  switch (sticker.achievementType) {
    case 'quest_streak':
      if (!sticker.achievementTarget) {
        return { isUnlocked: false, current: 0, goal: sticker.achievementGoal, progressPercent: 0 };
      }
      return checkQuestStreakAchievement(
        magicalGirlId,
        sticker.achievementTarget,
        sticker.achievementGoal
      );

    case 'total_defeats':
      return checkTotalDefeatsAchievement(magicalGirlId, sticker.achievementGoal);

    case 'total_streak':
      return checkTotalStreakAchievement(magicalGirlId, sticker.achievementGoal);

    case 'perfect_week':
      return checkPerfectWeekAchievement(magicalGirlId, sticker.achievementGoal);

    case 'total_gems_earned':
      return checkTotalGemsEarnedAchievement(magicalGirlId, sticker.achievementGoal);

    default:
      return { isUnlocked: false, current: 0, goal: sticker.achievementGoal, progressPercent: 0 };
  }
}

/**
 * Check all achievements and auto-award unlocked ones
 */
export async function checkAndAwardAchievements(
  magicalGirlId: string,
  achievementStickers: ShopSticker[]
): Promise<string[]> {
  const newlyUnlocked: string[] = [];

  for (const sticker of achievementStickers) {
    // Check if already owned
    const existing = await prisma.stickerCollection.findUnique({
      where: {
        shopItemId_magicalGirlId: {
          shopItemId: sticker.id,
          magicalGirlId,
        },
      },
    });

    if (existing) {
      continue; // Already owned
    }

    // Check if achievement is unlocked
    const progress = await checkAchievementProgress(magicalGirlId, sticker);

    if (progress.isUnlocked) {
      // Auto-award the achievement sticker
      await prisma.stickerCollection.create({
        data: {
          shopItemId: sticker.id,
          magicalGirlId,
        },
      });

      newlyUnlocked.push(sticker.id);
    }
  }

  return newlyUnlocked;
}
