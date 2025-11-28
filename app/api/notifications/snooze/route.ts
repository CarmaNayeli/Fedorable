import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { choreId, snoozeMinutes = 15 } = body;

    if (!choreId) {
      return NextResponse.json(
        { error: 'choreId is required' },
        { status: 400 }
      );
    }

    // Find or create notification for this quest
    let notification = await prisma.notification.findFirst({
      where: {
        questId: choreId,
        sent: false,
      },
      orderBy: {
        scheduledFor: 'desc',
      },
    });

    const snoozedUntil = new Date(Date.now() + snoozeMinutes * 60 * 1000);

    if (notification) {
      // Update existing notification
      notification = await prisma.notification.update({
        where: { id: notification.id },
        data: {
          snoozedUntil,
          snoozeCount: { increment: 1 },
          scheduledFor: snoozedUntil,
        },
      });
    } else {
      // Create new notification
      notification = await prisma.notification.create({
        data: {
          questId: choreId,
          scheduledFor: snoozedUntil,
          snoozedUntil,
          snoozeCount: 1,
        },
      });
    }

    return NextResponse.json({
      success: true,
      notification,
      message: `Snoozed for ${snoozeMinutes} minutes`,
    });
  } catch (error) {
    console.error('Failed to snooze notification:', error);
    return NextResponse.json(
      { error: 'Failed to snooze notification' },
      { status: 500 }
    );
  }
}
