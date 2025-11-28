import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { startOfDay, isToday, differenceInDays } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { choreId } = await request.json();

    const chore = await prisma.chore.findUnique({
      where: { id: choreId },
    });

    if (!chore) {
      return NextResponse.json({ error: 'Chore not found' }, { status: 404 });
    }

    // Create completion record
    await prisma.choreCompletion.create({
      data: {
        choreId: chore.id,
        userId: user.id,
        experienceEarned: chore.experienceReward,
        scheduledFor: new Date(),
      },
    });

    // Update user XP and streak
    const newXP = user.experiencePoints + chore.experienceReward;
    const newLevel = Math.floor(Math.sqrt(newXP / 100)) + 1;

    let newStreak = user.currentStreak;
    const lastCompletion = user.lastCompletionDate;

    if (!lastCompletion || !isToday(lastCompletion)) {
      // Check if it's consecutive days
      if (lastCompletion && differenceInDays(new Date(), lastCompletion) === 1) {
        newStreak += 1;
      } else if (!lastCompletion || differenceInDays(new Date(), lastCompletion) > 1) {
        newStreak = 1;
      }
    }

    const newLongestStreak = Math.max(user.longestStreak, newStreak);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        experiencePoints: newXP,
        level: newLevel,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastCompletionDate: new Date(),
      },
    });

    // If not recurring, deactivate the chore
    if (!chore.isRecurring) {
      await prisma.chore.update({
        where: { id: chore.id },
        data: { isActive: false },
      });
    }

    return NextResponse.json({ success: true, xpEarned: chore.experienceReward });
  } catch (error) {
    console.error('Failed to complete chore:', error);
    return NextResponse.json({ error: 'Failed to complete chore' }, { status: 500 });
  }
}
