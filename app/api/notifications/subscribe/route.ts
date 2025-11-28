import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const magicalGirl = await prisma.magicalGirl.findFirst();
    if (!magicalGirl) {
      return NextResponse.json({ error: 'Magical girl not found' }, { status: 404 });
    }

    const body = await request.json();
    const { subscription } = body;

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { error: 'Invalid subscription data' },
        { status: 400 }
      );
    }

    // Extract keys from subscription
    const { endpoint, keys } = subscription;
    const { p256dh, auth } = keys;

    // Check if subscription already exists
    const existingSubscription = await prisma.pushSubscription.findUnique({
      where: { endpoint },
    });

    if (existingSubscription) {
      // Update existing subscription
      const updatedSubscription = await prisma.pushSubscription.update({
        where: { endpoint },
        data: {
          p256dh,
          auth,
        },
      });
      return NextResponse.json({ success: true, subscription: updatedSubscription });
    }

    // Create new subscription
    const pushSubscription = await prisma.pushSubscription.create({
      data: {
        endpoint,
        p256dh,
        auth,
        magicalGirlId: magicalGirl.id,
      },
    });

    return NextResponse.json({ success: true, subscription: pushSubscription });
  } catch (error) {
    console.error('Failed to save push subscription:', error);
    return NextResponse.json(
      { error: 'Failed to save subscription' },
      { status: 500 }
    );
  }
}

// Unsubscribe from push notifications
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint } = body;

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint is required' },
        { status: 400 }
      );
    }

    await prisma.pushSubscription.delete({
      where: { endpoint },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete push subscription:', error);
    return NextResponse.json(
      { error: 'Failed to delete subscription' },
      { status: 500 }
    );
  }
}
