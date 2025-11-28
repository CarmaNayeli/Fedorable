import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const magicalGirl = await prisma.magicalGirl.findFirst();
    if (!magicalGirl) {
      return NextResponse.json({ error: 'Magical girl not found' }, { status: 404 });
    }

    // Check if they have shields
    if (magicalGirl.sparkleShields <= 0) {
      return NextResponse.json({ error: 'No Sparkle Shields available' }, { status: 400 });
    }

    // Use one shield and update lastActivityDate to preserve streak
    await prisma.magicalGirl.update({
      where: { id: magicalGirl.id },
      data: {
        sparkleShields: magicalGirl.sparkleShields - 1,
        lastActivityDate: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      shieldsRemaining: magicalGirl.sparkleShields - 1,
    });
  } catch (error) {
    console.error('Failed to use Sparkle Shield:', error);
    return NextResponse.json({ error: 'Failed to use Sparkle Shield' }, { status: 500 });
  }
}
