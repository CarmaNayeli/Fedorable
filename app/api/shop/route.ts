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

    // Sync shop items with SHOP_STICKERS array (lightweight check first)
    // This ensures the database always matches the code, even when stickers are updated
    const existingItems = await prisma.shopItem.findMany();
    const existingIds = new Set(existingItems.map((item: typeof existingItems[number]) => item.id));
    const currentIds = new Set(SHOP_STICKERS.map((s: typeof SHOP_STICKERS[number]) => s.id));

    // Only run sync if there are differences (items missing or extras in DB)
    const needsSync = existingItems.length !== SHOP_STICKERS.length ||
      SHOP_STICKERS.some((s: typeof SHOP_STICKERS[number]) => !existingIds.has(s.id)) ||
      existingItems.some((item: typeof existingItems[number]) => !currentIds.has(item.id));

    if (needsSync) {
      console.log('Shop items need sync - updating database...');

      // Delete items that no longer exist in SHOP_STICKERS
      const itemsToDelete = existingItems.filter((item: typeof existingItems[number]) => !currentIds.has(item.id));
      if (itemsToDelete.length > 0) {
        await prisma.shopItem.deleteMany({
          where: {
            id: { in: itemsToDelete.map((item: typeof itemsToDelete[number]) => item.id) }
          }
        });
      }

      // Find new items to insert
      const newStickers = SHOP_STICKERS.filter((s: typeof SHOP_STICKERS[number]) => !existingIds.has(s.id));
      if (newStickers.length > 0) {
        await prisma.shopItem.createMany({
          data: newStickers.map((s: typeof newStickers[number]) => ({
            id: s.id,
            emoji: s.emoji,
            name: s.name,
            category: s.category,
            price: s.price,
            currency: s.currency || 'gems',
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

      console.log(`Shop sync complete: deleted ${itemsToDelete.length}, added ${newStickers.length}`);
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

    // Get achievement progress for all achievement stickers (parallel for speed)
    const progressChecks = await Promise.all(
      achievementStickers.map(sticker =>
        checkAchievementProgress(magicalGirl.id, sticker).then(progress => ({
          id: sticker.id,
          progress,
        }))
      )
    );

    const achievementProgress: Record<string, any> = {};
    progressChecks.forEach(({ id, progress }) => {
      achievementProgress[id] = progress;
    });

    return NextResponse.json({
      shopItems,
      ownedStickers: magicalGirl.stickers.map((s: typeof magicalGirl.stickers[number]) => s.shopItemId),
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
