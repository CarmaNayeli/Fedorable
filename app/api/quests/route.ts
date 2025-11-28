import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    return NextResponse.json(quests);
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
        isCustom: isCustom || false,
        createdByPlayer: createdByPlayer || false,
        magicalGirlId: magicalGirl.id,
      },
    });

    return NextResponse.json(quest);
  } catch (error) {
    console.error('Failed to create quest:', error);
    return NextResponse.json({ error: 'Failed to create quest' }, { status: 500 });
  }
}
