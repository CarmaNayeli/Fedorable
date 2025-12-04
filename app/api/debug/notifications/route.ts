import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const now = new Date();

    // Get magical girl
    const magicalGirl = await prisma.magicalGirl.findFirst();
    if (!magicalGirl) {
      return NextResponse.json({ error: 'No magical girl found' }, { status: 404 });
    }

    // Get all quests with notifications enabled
    // Note: Prisma's JSON field filtering doesn't support NOT for null checks in TypeScript,
    // so we fetch all recurring quests and filter in JavaScript
    const allRecurringQuests = await prisma.quest.findMany({
      where: {
        magicalGirlId: magicalGirl.id,
        isActive: true,
        isRecurring: true,
      },
      select: {
        id: true,
        monsterName: true,
        notificationPreferences: true,
        recurrenceRule: true,
      },
    });

    const questsWithNotifications = allRecurringQuests.filter(
      (q: typeof allRecurringQuests[number]) => q.notificationPreferences !== null
    );

    // Get all notifications
    const allNotifications = await prisma.notification.findMany({
      where: {
        quest: {
          magicalGirlId: magicalGirl.id,
        },
      },
      select: {
        id: true,
        scheduledFor: true,
        sent: true,
        snoozedUntil: true,
        quest: {
          select: {
            monsterName: true,
          },
        },
      },
      orderBy: {
        scheduledFor: 'asc',
      },
      take: 20,
    });

    // Get due notifications (what should be sent now)
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
        quest: {
          magicalGirlId: magicalGirl.id,
        },
      },
      include: {
        quest: {
          select: {
            monsterName: true,
          },
        },
      },
    });

    // Get push subscriptions
    const pushSubscriptions = await prisma.pushSubscription.findMany({
      where: {
        magicalGirlId: magicalGirl.id,
      },
      select: {
        id: true,
        endpoint: true,
        createdAt: true,
      },
    });

    // Check environment variables
    const envCheck = {
      hasVapidPublicKey: !!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      hasVapidPrivateKey: !!process.env.VAPID_PRIVATE_KEY,
      hasVapidSubject: !!process.env.VAPID_SUBJECT,
      hasCronSecret: !!process.env.CRON_SECRET,
    };

    return NextResponse.json({
      serverTime: now.toISOString(),
      serverTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      envCheck,
      questsWithNotifications: questsWithNotifications.map((q: typeof questsWithNotifications[number]) => ({
        id: q.id,
        name: q.monsterName,
        preferences: q.notificationPreferences,
        recurrenceRule: q.recurrenceRule,
      })),
      pushSubscriptions: pushSubscriptions.map((s: typeof pushSubscriptions[number]) => ({
        id: s.id,
        endpoint: s.endpoint.substring(0, 50) + '...',
        createdAt: s.createdAt,
      })),
      notificationStats: {
        total: allNotifications.length,
        sent: allNotifications.filter((n: typeof allNotifications[number]) => n.sent).length,
        pending: allNotifications.filter((n: typeof allNotifications[number]) => !n.sent).length,
        due: dueNotifications.length,
      },
      nextNotifications: allNotifications.slice(0, 10).map((n: typeof allNotifications[number]) => ({
        questName: n.quest.monsterName,
        scheduledFor: n.scheduledFor,
        sent: n.sent,
        snoozedUntil: n.snoozedUntil,
        isDue: n.scheduledFor <= now && !n.sent,
      })),
      dueNow: dueNotifications.map((n: typeof dueNotifications[number]) => ({
        questName: n.quest.monsterName,
        scheduledFor: n.scheduledFor,
        sent: n.sent,
      })),
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({
      error: 'Failed to get debug info',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
