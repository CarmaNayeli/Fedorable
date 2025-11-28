import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendChoreReminder } from '@/lib/push-notifications';

/**
 * Cron job endpoint to send scheduled notifications
 * This should be called periodically (e.g., every 5-15 minutes) by a cron service like Vercel Cron
 *
 * To set up on Vercel, add this to vercel.json:
 * "crons": [{ "path": "/api/cron/send-notifications", "schedule": "every 15 minutes" }]
 *
 * For manual testing, you can call this endpoint directly or use the ?manual=true parameter
 */
export async function GET(request: Request) {
  try {
    // Check for manual trigger parameter (for testing)
    const url = new URL(request.url);
    const isManualTrigger = url.searchParams.get('manual') === 'true';

    // Verify cron secret only in production and only if explicitly set
    // Vercel cron jobs are authenticated differently, so we don't need CRON_SECRET
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && !isManualTrigger && process.env.NODE_ENV === 'production') {
      const cronSecret = request.headers.get('x-vercel-cron-secret');
      if (cronSecret !== process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // Log auth failure for debugging
        console.log('Cron auth failed - expected CRON_SECRET in x-vercel-cron-secret header or Bearer token');
        console.log('Auth header:', authHeader ? 'present' : 'missing');
        console.log('Cron secret header:', cronSecret ? 'present' : 'missing');
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    // Log the execution
    console.log(`Cron job started at ${new Date().toISOString()} ${isManualTrigger ? '(manual trigger)' : ''}`);


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
    console.log(`Cron job completed at ${new Date().toISOString()}`);

    return NextResponse.json({
      success: true,
      sent: successCount,
      failed: failureCount,
      total: dueNotifications.length,
      timestamp: new Date().toISOString(),
      message: dueNotifications.length === 0
        ? 'No notifications were due to be sent'
        : `Processed ${dueNotifications.length} notifications: ${successCount} sent, ${failureCount} failed`,
    });
  } catch (error) {
    console.error('Error in send-notifications cron:', error);
    return NextResponse.json(
      {
        error: 'Failed to process notifications',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
