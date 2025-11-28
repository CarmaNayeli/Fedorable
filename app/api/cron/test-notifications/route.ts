import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Test endpoint to check notification status
 * Call this to see if notifications are being created and what their status is
 */
export async function GET() {
  try {
    const now = new Date();

    // Get all quests with notification preferences
    const allQuests = await prisma.quest.findMany({
      where: {
        isRecurring: true,
      },
      select: {
        id: true,
        monsterName: true,
        recurrenceRule: true,
        notificationPreferences: true,
        isActive: true,
      },
    });

    // Filter for quests that actually have notification preferences
    const questsWithNotifs = allQuests.filter(q => q.notificationPreferences !== null);

    // Get all notifications
    const allNotifications = await prisma.notification.findMany({
      include: {
        quest: {
          select: {
            monsterName: true,
          },
        },
      },
      orderBy: {
        scheduledFor: 'asc',
      },
      take: 50,
    });

    // Get due notifications
    const dueNotifications = await prisma.notification.findMany({
      where: {
        scheduledFor: {
          lte: now,
        },
        sent: false,
        OR: [
          { snoozedUntil: null },
          { snoozedUntil: { lte: now } },
        ],
      },
      include: {
        quest: {
          select: {
            monsterName: true,
          },
        },
      },
    });

    // Get sent notifications
    const sentCount = await prisma.notification.count({
      where: { sent: true },
    });

    // Get pending notifications
    const pendingCount = await prisma.notification.count({
      where: { sent: false },
    });

    // Check for push subscriptions
    const subscriptions = await prisma.pushSubscription.findMany();

    return NextResponse.json({
      currentTime: now.toISOString(),
      serverTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      questsWithNotifications: questsWithNotifs.length,
      quests: questsWithNotifs,
      totalNotifications: allNotifications.length,
      notifications: allNotifications.map(n => ({
        id: n.id,
        quest: n.quest.monsterName,
        scheduledFor: n.scheduledFor.toISOString(),
        scheduledForLocal: n.scheduledFor.toLocaleString(),
        sent: n.sent,
        snoozedUntil: n.snoozedUntil?.toISOString() || null,
        isPast: n.scheduledFor < now,
      })),
      dueNotifications: dueNotifications.length,
      due: dueNotifications.map(n => ({
        quest: n.quest.monsterName,
        scheduledFor: n.scheduledFor.toISOString(),
      })),
      sentNotifications: sentCount,
      pendingNotifications: pendingCount,
      pushSubscriptions: subscriptions.length,
      subscriptions: subscriptions.map(s => ({
        id: s.id,
        endpoint: s.endpoint.substring(0, 50) + '...',
        createdAt: s.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Error in test-notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notification status', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
