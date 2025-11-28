import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateNotificationsForQuest } from '@/lib/notification-scheduler';

// Get all active quests
export async function GET() {
  try {
    const magicalGirl = await prisma.magicalGirl.findFirst();
    if (!magicalGirl) {
      return NextResponse.json({ error: 'Magical girl not found' }, { status: 404 });
    }

    const quests = await prisma.quest.findMany({
      where: {
        magicalGirlId: magicalGirl.id,
        isActive: true,
      },
      orderBy: [
        { questType: 'desc' }, // boss, weekly, daily, side
        { threatLevel: 'desc' },
      ],
    });

    // Filter out recurring quests that were completed today
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const availableQuests = quests.filter(quest => {
      // If quest isn't recurring or hasn't been completed yet, include it
      if (!quest.isRecurring || !quest.lastCompletedAt) {
        return true;
      }

      // For recurring quests, only show if last completed before today
      const lastCompleted = new Date(quest.lastCompletedAt);
      return lastCompleted < todayStart;
    });

    return NextResponse.json(availableQuests);
  } catch (error) {
    console.error('Failed to fetch quests:', error);
    return NextResponse.json({ error: 'Failed to fetch quests' }, { status: 500 });
  }
}

// Create a new quest
export async function POST(request: NextRequest) {
  try {
    const magicalGirl = await prisma.magicalGirl.findFirst();
    if (!magicalGirl) {
      return NextResponse.json({ error: 'Magical girl not found' }, { status: 404 });
    }

    const body = await request.json();
    const {
      monsterName,
      monsterEmoji,
      description,
      realm,
      threatLevel,
      questType,
      sparklePoints,
      magicGems,
      xpReward,
      isRecurring,
      recurrenceRule,
      notificationPreferences,
      isCustom,
      createdByPlayer,
    } = body;

    const quest = await prisma.quest.create({
      data: {
        monsterName,
        monsterEmoji,
        description,
        realm,
        threatLevel,
        questType,
        sparklePoints,
        magicGems,
        xpReward,
        isRecurring,
        recurrenceRule,
        notificationPreferences: notificationPreferences || null,
        isCustom: isCustom || false,
        createdByPlayer: createdByPlayer || false,
        magicalGirlId: magicalGirl.id,
      },
    });

    // Generate notifications if quest has recurrence and notification preferences
    if (quest.isRecurring && quest.notificationPreferences) {
      try {
        await generateNotificationsForQuest(quest.id);
      } catch (error) {
        console.error('Failed to generate notifications for quest:', error);
        // Don't fail the request if notification generation fails
      }
    }

    return NextResponse.json(quest);
  } catch (error) {
    console.error('Failed to create quest:', error);

    // Check if it's a Prisma error about unknown field
    if (error instanceof Error && error.message.includes('notificationPreferences')) {
      return NextResponse.json(
        {
          error: 'Database schema needs to be updated. Please run: npx prisma db push',
          details: 'The notificationPreferences field was added but your database needs to be migrated.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create quest', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
