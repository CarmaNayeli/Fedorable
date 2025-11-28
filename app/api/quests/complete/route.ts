import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateLevel, calculateRank, getTitle, checkStreak, updateRealmPurity } from '@/lib/gameUtils';
import { isToday, differenceInDays } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const magicalGirl = await prisma.magicalGirl.findFirst();
    if (!magicalGirl) {
      return NextResponse.json({ error: 'Magical girl not found' }, { status: 404 });
    }

    const { questId, isCritical } = await request.json();

    const quest = await prisma.quest.findUnique({
      where: { id: questId },
    });

    if (!quest) {
      return NextResponse.json({ error: 'Quest not found' }, { status: 404 });
    }

    // Calculate rewards (bonus for critical hits)
    const spEarned = isCritical ? Math.floor(quest.sparklePoints * 1.5) : quest.sparklePoints;
    const gemsEarned = isCritical ? quest.magicGems + 1 : quest.magicGems;
    const xpEarned = isCritical ? Math.floor(quest.xpReward * 1.5) : quest.xpReward;

    // Create defeat record
    await prisma.monsterDefeat.create({
      data: {
        questId: quest.id,
        magicalGirlId: magicalGirl.id,
        sparklePointsEarned: spEarned,
        magicGemsEarned: gemsEarned,
        xpEarned,
        wasCriticalHit: isCritical,
      },
    });

    // Update magical girl stats
    const newXP = magicalGirl.xp + xpEarned;
    const newLevel = calculateLevel(newXP);
    const newRank = calculateRank(newLevel);
    const newTitle = getTitle(newLevel, newRank, magicalGirl.prestigeLevel);

    // Update streak
    const streakCheck = checkStreak(magicalGirl.lastActivityDate, new Date());
    let newStreak = magicalGirl.currentStreak;

    if (!magicalGirl.lastActivityDate || !isToday(magicalGirl.lastActivityDate)) {
      if (streakCheck.shouldContinue) {
        newStreak = magicalGirl.currentStreak + 1;
      } else if (streakCheck.shouldReset) {
        newStreak = 1;
      }
    }

    const newLongestStreak = Math.max(magicalGirl.longestStreak, newStreak);

    await prisma.magicalGirl.update({
      where: { id: magicalGirl.id },
      data: {
        xp: newXP,
        level: newLevel,
        rank: newRank,
        title: newTitle,
        sparklePoints: magicalGirl.sparklePoints + spEarned,
        magicGems: magicalGirl.magicGems + gemsEarned,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastActivityDate: new Date(),
        totalMonstersDefeated: magicalGirl.totalMonstersDefeated + 1,
      },
    });

    // Update realm purity
    if (quest.realm) {
      const realm = await prisma.realm.findFirst({
        where: {
          name: quest.realm,
          magicalGirlId: magicalGirl.id,
        },
      });

      if (realm) {
        const newPurity = updateRealmPurity(realm.purity, true);
        await prisma.realm.update({
          where: { id: realm.id },
          data: {
            purity: newPurity,
            lastCleaned: new Date(),
          },
        });
      }
    }

    // If not recurring, mark as completed
    if (!quest.isRecurring) {
      await prisma.quest.update({
        where: { id: quest.id },
        data: { isActive: false, completed: true },
      });
    }

    return NextResponse.json({
      success: true,
      rewards: {
        sparklePoints: spEarned,
        magicGems: gemsEarned,
        xp: xpEarned,
      },
      newLevel,
      leveledUp: newLevel > magicalGirl.level,
    });
  } catch (error) {
    console.error('Failed to complete quest:', error);
    return NextResponse.json({ error: 'Failed to complete quest' }, { status: 500 });
  }
}
