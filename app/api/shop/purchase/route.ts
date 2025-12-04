import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Purchase a sticker
export async function POST(request: NextRequest) {
  try {
    const { shopItemId } = await request.json();

    const magicalGirl = await prisma.magicalGirl.findFirst({
      include: {
        stickers: true,
      },
    });

    if (!magicalGirl) {
      return NextResponse.json({ error: 'Magical girl not found' }, { status: 404 });
    }

    // Check if already owned
    const alreadyOwned = magicalGirl.stickers.some((s: typeof magicalGirl.stickers[number]) => s.shopItemId === shopItemId);
    if (alreadyOwned) {
      return NextResponse.json({ error: 'You already own this sticker!' }, { status: 400 });
    }

    // Get shop item
    const shopItem = await prisma.shopItem.findUnique({
      where: { id: shopItemId },
    });

    if (!shopItem) {
      return NextResponse.json({ error: 'Shop item not found' }, { status: 404 });
    }

    // Check currency and balance
    const currency = shopItem.currency || 'gems';
    let currentBalance: number;
    let updateData: any;

    if (currency === 'sparkle_points') {
      currentBalance = magicalGirl.sparklePoints;
      if (currentBalance < shopItem.price) {
        return NextResponse.json(
          { error: `Not enough sparkle points! Need ${shopItem.price} ✨, have ${currentBalance} ✨` },
          { status: 400 }
        );
      }
      updateData = { sparklePoints: currentBalance - shopItem.price };
    } else {
      currentBalance = magicalGirl.magicGems;
      if (currentBalance < shopItem.price) {
        return NextResponse.json(
          { error: `Not enough magic gems! Need ${shopItem.price} 🔮, have ${currentBalance} 🔮` },
          { status: 400 }
        );
      }
      updateData = { magicGems: currentBalance - shopItem.price };
    }

    // Purchase the sticker
    await prisma.$transaction([
      // Deduct currency
      prisma.magicalGirl.update({
        where: { id: magicalGirl.id },
        data: updateData,
      }),
      // Add to collection
      prisma.stickerCollection.create({
        data: {
          shopItemId: shopItem.id,
          magicalGirlId: magicalGirl.id,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      sticker: shopItem,
      remainingGems: currency === 'gems' ? currentBalance - shopItem.price : magicalGirl.magicGems,
      remainingPoints: currency === 'sparkle_points' ? currentBalance - shopItem.price : magicalGirl.sparklePoints,
    });
  } catch (error) {
    console.error('Failed to purchase sticker:', error);
    return NextResponse.json({ error: 'Failed to purchase sticker' }, { status: 500 });
  }
}
