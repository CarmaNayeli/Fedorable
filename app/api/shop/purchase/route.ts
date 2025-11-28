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
    const alreadyOwned = magicalGirl.stickers.some(s => s.shopItemId === shopItemId);
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

    // Check if enough magic gems
    if (magicalGirl.magicGems < shopItem.price) {
      return NextResponse.json(
        { error: `Not enough magic gems! Need ${shopItem.price}, have ${magicalGirl.magicGems}` },
        { status: 400 }
      );
    }

    // Purchase the sticker
    await prisma.$transaction([
      // Deduct gems
      prisma.magicalGirl.update({
        where: { id: magicalGirl.id },
        data: {
          magicGems: magicalGirl.magicGems - shopItem.price,
        },
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
      remainingGems: magicalGirl.magicGems - shopItem.price,
    });
  } catch (error) {
    console.error('Failed to purchase sticker:', error);
    return NextResponse.json({ error: 'Failed to purchase sticker' }, { status: 500 });
  }
}
