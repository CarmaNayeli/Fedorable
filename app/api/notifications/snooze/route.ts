import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { addMinutes } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const { choreId, snoozeMinutes } = await request.json();

    const notification = await prisma.notification.findFirst({
      where: {
        choreId,
        sent: false,
      },
    });

    if (notification) {
      await prisma.notification.update({
        where: { id: notification.id },
        data: {
          snoozedUntil: addMinutes(new Date(), snoozeMinutes || 15),
          snoozeCount: notification.snoozeCount + 1,
        },
      });
    } else {
      // Create a new notification
      await prisma.notification.create({
        data: {
          choreId,
          scheduledFor: addMinutes(new Date(), snoozeMinutes || 15),
          snoozedUntil: addMinutes(new Date(), snoozeMinutes || 15),
          snoozeCount: 1,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to snooze notification:', error);
    return NextResponse.json({ error: 'Failed to snooze' }, { status: 500 });
  }
}
