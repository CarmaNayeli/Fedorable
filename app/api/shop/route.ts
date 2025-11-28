import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SHOP_STICKERS } from '@/lib/shopData';
import { checkAchievementProgress, checkAndAwardAchievements } from '@/lib/achievementChecker';

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
          isAchievement: s.isAchievement || false,
          achievementType: s.achievementType || null,
          achievementTarget: s.achievementTarget || null,
          achievementGoal: s.achievementGoal || null,
          achievementDesc: s.achievementDesc || null,
        })),
      });
    }

    // Check and auto-award unlocked achievements
    const achievementStickers = SHOP_STICKERS.filter(s => s.isAchievement);
    const newlyUnlocked = await checkAndAwardAchievements(magicalGirl.id, achievementStickers);

    // If achievements were awarded, refresh sticker collection
    if (newlyUnlocked.length > 0) {
      const updatedGirl = await prisma.magicalGirl.findUnique({
        where: { id: magicalGirl.id },
        include: { stickers: true },
      });
      if (updatedGirl) {
        magicalGirl.stickers = updatedGirl.stickers;
      }
    }

    const shopItems = await prisma.shopItem.findMany({
      orderBy: [
        { category: 'asc' },
        { price: 'asc' },
      ],
    });

    // Get achievement progress for all achievement stickers
    const achievementProgress: Record<string, any> = {};
    for (const sticker of SHOP_STICKERS.filter(s => s.isAchievement)) {
      const progress = await checkAchievementProgress(magicalGirl.id, sticker);
      achievementProgress[sticker.id] = progress;
    }

    return NextResponse.json({
      shopItems,
      ownedStickers: magicalGirl.stickers.map(s => s.shopItemId),
      magicGems: magicalGirl.magicGems,
      sparklePoints: magicalGirl.sparklePoints,
      achievementProgress,
      newlyUnlocked,
    });
  } catch (error) {
    console.error('Failed to fetch shop:', error);
    return NextResponse.json({ error: 'Failed to fetch shop' }, { status: 500 });
  }
}
