import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SHOP_STICKERS } from '@/lib/shopData';

// Get shop items and user's collection
export async function GET() {
  try {
    const magicalGirl = await prisma.magicalGirl.findFirst({
      include: {
        stickers: true,
      },
    });

    if (!magicalGirl) {
      return NextResponse.json({ error: 'Magical girl not found' }, { status: 404 });
    }

    // Seed shop items if they don't exist
    const existingItems = await prisma.shopItem.findMany();
    if (existingItems.length === 0) {
      await prisma.shopItem.createMany({
        data: SHOP_STICKERS.map(s => ({
          id: s.id,
          emoji: s.emoji,
          name: s.name,
          category: s.category,
          price: s.price,
          isLimited: s.isLimited || false,
          rarity: s.rarity,
        })),
      });
    }

    const shopItems = await prisma.shopItem.findMany({
      orderBy: [
        { category: 'asc' },
        { price: 'asc' },
      ],
    });

    return NextResponse.json({
      shopItems,
      ownedStickers: magicalGirl.stickers.map(s => s.shopItemId),
      magicGems: magicalGirl.magicGems,
      sparklePoints: magicalGirl.sparklePoints,
    });
  } catch (error) {
    console.error('Failed to fetch shop:', error);
    return NextResponse.json({ error: 'Failed to fetch shop' }, { status: 500 });
  }
}
