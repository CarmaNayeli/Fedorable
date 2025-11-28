import webpush from 'web-push';
import { prisma } from './prisma';

// Configure web-push with VAPID details
webpush.setVapidDetails(
  process.env.VAPID_SUBJECT || 'mailto:rhia-minder@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || ''
);

export interface NotificationPayload {
  title: string;
  body: string;
  choreId?: string;
  icon?: string;
  badge?: string;
}

/**
 * Send a push notification to all subscribed users
 */
export async function sendPushNotification(
  magicalGirlId: string,
  payload: NotificationPayload
) {
  try {
    // Get all push subscriptions for this magical girl
    const subscriptions = await prisma.pushSubscription.findMany({
      where: { magicalGirlId },
    });

    if (subscriptions.length === 0) {
      console.log('No push subscriptions found for magical girl:', magicalGirlId);
      return { sent: 0, failed: 0 };
    }

    // Send notification to all subscriptions
    const results = await Promise.allSettled(
      subscriptions.map(async (subscription) => {
        const pushSubscription = {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.p256dh,
            auth: subscription.auth,
          },
        };

        try {
          await webpush.sendNotification(
            pushSubscription,
            JSON.stringify({
              title: payload.title,
              body: payload.body,
              icon: payload.icon || '/icon-192.png',
              badge: payload.badge || '/icon-192.png',
              choreId: payload.choreId,
            })
          );
          return { success: true };
        } catch (error: any) {
          console.error('Failed to send push notification:', error);

          // If subscription is no longer valid, remove it
          if (error.statusCode === 410 || error.statusCode === 404) {
            await prisma.pushSubscription.delete({
              where: { id: subscription.id },
            });
            console.log('Removed invalid subscription:', subscription.endpoint);
          }

          throw error;
        }
      })
    );

    const sent = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.filter((r) => r.status === 'rejected').length;

    console.log(`Push notifications sent: ${sent}, failed: ${failed}`);

    return { sent, failed };
  } catch (error) {
    console.error('Error sending push notifications:', error);
    throw error;
  }
}

/**
 * Send a chore reminder notification
 */
export async function sendChoreReminder(
  magicalGirlId: string,
  choreName: string,
  choreId: string
) {
  return sendPushNotification(magicalGirlId, {
    title: '⚔️ Battle Time!',
    body: `Time to face the ${choreName}!`,
    choreId,
  });
}

/**
 * Send a streak reminder notification
 */
export async function sendStreakReminder(magicalGirlId: string, currentStreak: number) {
  return sendPushNotification(magicalGirlId, {
    title: '🔥 Streak Alert!',
    body: `Don't break your ${currentStreak}-day streak! Complete a quest today!`,
  });
}
