import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { choreId, reason } = await request.json();

    const chore = await prisma.chore.findUnique({
      where: { id: choreId },
    });

    if (!chore) {
      return NextResponse.json({ error: 'Chore not found' }, { status: 404 });
    }

    // Create skip record
    await prisma.choreSkip.create({
      data: {
        choreId: chore.id,
        scheduledFor: new Date(),
        reason,
      },
    });

    // If not recurring, deactivate the chore
    if (!chore.isRecurring) {
      await prisma.chore.update({
        where: { id: chore.id },
        data: { isActive: false },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to skip chore:', error);
    return NextResponse.json({ error: 'Failed to skip chore' }, { status: 500 });
  }
}
