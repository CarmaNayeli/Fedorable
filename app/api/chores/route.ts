import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get all chores
export async function GET() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const chores = await prisma.chore.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(chores);
  } catch (error) {
    console.error('Failed to fetch chores:', error);
    return NextResponse.json({ error: 'Failed to fetch chores' }, { status: 500 });
  }
}

// Create a new chore
export async function POST(request: NextRequest) {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const {
      title,
      description,
      timeEstimateMinutes,
      difficultyScale,
      priority,
      color,
      isRecurring,
      recurrenceRule,
    } = body;

    // Calculate XP reward based on difficulty and time
    const baseXP = 10;
    const difficultyMultiplier = difficultyScale || 3;
    const timeBonus = timeEstimateMinutes ? Math.floor(timeEstimateMinutes / 15) * 5 : 0;
    const experienceReward = baseXP + (difficultyMultiplier * 5) + timeBonus;

    const chore = await prisma.chore.create({
      data: {
        title,
        description,
        timeEstimateMinutes,
        difficultyScale: difficultyScale || 3,
        priority: priority || 2,
        color: color || '#3b82f6',
        isRecurring: isRecurring || false,
        recurrenceRule,
        experienceReward,
        userId: user.id,
      },
    });

    return NextResponse.json(chore);
  } catch (error) {
    console.error('Failed to create chore:', error);
    return NextResponse.json({ error: 'Failed to create chore' }, { status: 500 });
  }
}
