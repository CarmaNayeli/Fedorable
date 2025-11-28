import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SHOP_STICKERS } from '@/lib/shopData';

// Get user's sticker collection
export async function GET() {
  try {
    const magicalGirl = await prisma.magicalGirl.findFirst({
      include: {
        stickers: {
          orderBy: {
            purchasedAt: 'desc',
          },
        },
      },
    });

    if (!magicalGirl) {
      return NextResponse.json({ error: 'Magical girl not found' }, { status: 404 });
    }

    // Get full sticker details
    const collection = magicalGirl.stickers.map(ownedSticker => {
      const stickerData = SHOP_STICKERS.find(s => s.id === ownedSticker.shopItemId);
      return {
        ...ownedSticker,
        ...stickerData,
      };
    });

    return NextResponse.json({
      collection,
      totalStickers: collection.length,
      totalAvailable: SHOP_STICKERS.length,
    });
  } catch (error) {
    console.error('Failed to fetch sticker collection:', error);
    return NextResponse.json({ error: 'Failed to fetch sticker collection' }, { status: 500 });
  }
}
