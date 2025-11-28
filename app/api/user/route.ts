import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get or create user
export async function GET() {
  try {
    // For demo, we'll use a single user. In production, you'd use auth
    let user = await prisma.user.findFirst();

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: 'Rhia',
          level: 1,
          experiencePoints: 0,
          currentStreak: 0,
          longestStreak: 0,
          daysOff: JSON.stringify([0, 6]), // Weekend by default
          priorityMode: 'normal',
        },
      });
    }

    return NextResponse.json({
      ...user,
      daysOff: JSON.parse(user.daysOff),
    });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

// Update user settings
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { daysOff, priorityMode } = body;

    let user = await prisma.user.findFirst();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        daysOff: daysOff ? JSON.stringify(daysOff) : undefined,
        priorityMode: priorityMode || undefined,
      },
    });

    return NextResponse.json({
      ...user,
      daysOff: JSON.parse(user.daysOff),
    });
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
