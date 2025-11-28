import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendChoreReminder } from '@/lib/push-notifications';

/**
 * Cron job endpoint to send scheduled notifications
 * This should be called periodically (e.g., every 5-15 minutes) by a cron service like Vercel Cron
 *
 * To set up on Vercel:
 * Add to vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/send-notifications",
 *     "schedule": "*/15 * * * *"
 *   }]
 * }
 */
export async function GET(request: Request) {
  try {
    // Verify cron secret if set (recommended for production)
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET) {
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    const now = new Date();

    // Find all notifications that are due and haven't been sent
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
          include: {
            magicalGirl: true,
          },
        },
      },
      take: 50, // Process max 50 at a time to avoid timeout
    });

    console.log(`Found ${dueNotifications.length} notifications to send`);

    if (dueNotifications.length === 0) {
      return NextResponse.json({
        success: true,
        sent: 0,
        message: 'No notifications due',
      });
    }

    // Send notifications and track results
    const results = await Promise.allSettled(
      dueNotifications.map(async (notification) => {
        try {
          // Send push notification
          await sendChoreReminder(
            notification.quest.magicalGirlId,
            notification.quest.monsterName,
            notification.quest.id
          );

          // Mark as sent
          await prisma.notification.update({
            where: { id: notification.id },
            data: { sent: true },
          });

          return { success: true, notificationId: notification.id };
        } catch (error) {
          console.error(`Failed to send notification ${notification.id}:`, error);
          throw error;
        }
      })
    );

    const successCount = results.filter((r) => r.status === 'fulfilled').length;
    const failureCount = results.filter((r) => r.status === 'rejected').length;

    console.log(`Sent ${successCount} notifications, ${failureCount} failed`);

    return NextResponse.json({
      success: true,
      sent: successCount,
      failed: failureCount,
      total: dueNotifications.length,
    });
  } catch (error) {
    console.error('Error in send-notifications cron:', error);
    return NextResponse.json(
      { error: 'Failed to process notifications' },
      { status: 500 }
    );
  }
}
