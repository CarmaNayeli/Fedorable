import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendPushNotification } from '@/lib/push-notifications';

/**
 * Manual endpoint to test push notifications
 * Call this endpoint to send a test notification immediately
 */
export async function POST() {
  try {
    const magicalGirl = await prisma.magicalGirl.findFirst();

    if (!magicalGirl) {
      return NextResponse.json(
        { error: 'Magical girl not found' },
        { status: 404 }
      );
    }

    // Check if user has any push subscriptions
    const subscriptions = await prisma.pushSubscription.findMany({
      where: { magicalGirlId: magicalGirl.id },
    });

    if (subscriptions.length === 0) {
      return NextResponse.json(
        {
          error: 'No push subscriptions found. Please enable notifications first.',
        },
        { status: 400 }
      );
    }

    // Send a test notification
    const result = await sendPushNotification(magicalGirl.id, {
      title: '✨ Test Notification',
      body: 'Your notifications are working! You will now receive reminders for your quests.',
      icon: '/icon-192.png',
    });

    return NextResponse.json({
      success: true,
      message: 'Test notification sent!',
      sent: result.sent,
      failed: result.failed,
      subscriptions: subscriptions.length,
    });
  } catch (error: any) {
    console.error('Error sending test notification:', error);
    return NextResponse.json(
      {
        error: 'Failed to send test notification',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
