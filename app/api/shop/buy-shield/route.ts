import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SHIELD_PRICE } from '@/lib/shopData';

// Buy a Sparkle Shield with sparkle points
export async function POST() {
  try {
    const magicalGirl = await prisma.magicalGirl.findFirst();

    if (!magicalGirl) {
      return NextResponse.json({ error: 'Magical girl not found' }, { status: 404 });
    }

    // Check if enough sparkle points
    if (magicalGirl.sparklePoints < SHIELD_PRICE) {
      return NextResponse.json(
        { error: `Not enough sparkle points! Need ${SHIELD_PRICE} ✨, have ${magicalGirl.sparklePoints} ✨` },
        { status: 400 }
      );
    }

    // Purchase the shield
    await prisma.magicalGirl.update({
      where: { id: magicalGirl.id },
      data: {
        sparklePoints: magicalGirl.sparklePoints - SHIELD_PRICE,
        sparkleShields: magicalGirl.sparkleShields + 1,
      },
    });

    return NextResponse.json({
      success: true,
      remainingPoints: magicalGirl.sparklePoints - SHIELD_PRICE,
      totalShields: magicalGirl.sparkleShields + 1,
    });
  } catch (error) {
    console.error('Failed to buy shield:', error);
    return NextResponse.json({ error: 'Failed to buy shield' }, { status: 500 });
  }
}
