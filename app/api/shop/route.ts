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

    // Sync shop items with SHOP_STICKERS array
    // This ensures the database always matches the code, even when stickers are updated
    const existingItems = await prisma.shopItem.findMany();
    const existingIds = new Set(existingItems.map(item => item.id));
    const currentIds = new Set(SHOP_STICKERS.map(s => s.id));

    // Delete items that no longer exist in SHOP_STICKERS
    const itemsToDelete = existingItems.filter(item => !currentIds.has(item.id));
    if (itemsToDelete.length > 0) {
      await prisma.shopItem.deleteMany({
        where: {
          id: { in: itemsToDelete.map(item => item.id) }
        }
      });
    }

    // Upsert all current stickers (insert new, update existing)
    for (const sticker of SHOP_STICKERS) {
      await prisma.shopItem.upsert({
        where: { id: sticker.id },
        update: {
          emoji: sticker.emoji,
          name: sticker.name,
          category: sticker.category,
          price: sticker.price,
          currency: sticker.currency || 'gems',
          isLimited: sticker.isLimited || false,
          rarity: sticker.rarity,
          isAchievement: sticker.isAchievement || false,
          achievementType: sticker.achievementType || null,
          achievementTarget: sticker.achievementTarget || null,
          achievementGoal: sticker.achievementGoal || null,
          achievementDesc: sticker.achievementDesc || null,
        },
        create: {
          id: sticker.id,
          emoji: sticker.emoji,
          name: sticker.name,
          category: sticker.category,
          price: sticker.price,
          currency: sticker.currency || 'gems',
          isLimited: sticker.isLimited || false,
          rarity: sticker.rarity,
          isAchievement: sticker.isAchievement || false,
          achievementType: sticker.achievementType || null,
          achievementTarget: sticker.achievementTarget || null,
          achievementGoal: sticker.achievementGoal || null,
          achievementDesc: sticker.achievementDesc || null,
        },
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
