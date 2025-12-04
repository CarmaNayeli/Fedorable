import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateLevel, calculateRank, getTitle } from '@/lib/gameUtils';

// Get or create magical girl
export async function GET() {
  try {
    let magicalGirl = await prisma.magicalGirl.findFirst();

    if (!magicalGirl) {
      // Create new magical girl with default values
      magicalGirl = await prisma.magicalGirl.create({
        data: {
          name: 'Rhia',
          level: 1,
          xp: 0,
          sparklePoints: 0,
          magicGems: 0,
          rank: 1,
          title: 'Junior Zookeeper',
          currentStreak: 0,
          longestStreak: 0,
          currentChapter: 0,
          totalMonstersDefeated: 0,
        },
      });

      // Create default realms
      await prisma.realm.createMany({
        data: [
          { name: 'kitchen', displayName: 'Kitchen', emoji: '🍽️', purity: 50, magicalGirlId: magicalGirl.id },
          { name: 'bathroom', displayName: 'Bathroom', emoji: '🛁', purity: 50, magicalGirlId: magicalGirl.id },
          { name: 'livingRoom', displayName: 'Living Room', emoji: '🛋️', purity: 50, magicalGirlId: magicalGirl.id },
          { name: 'basement', displayName: 'Basement', emoji: '🏚️', purity: 50, magicalGirlId: magicalGirl.id },
          { name: 'frontHallway', displayName: 'Front Hallway', emoji: '🚪', purity: 50, magicalGirlId: magicalGirl.id },
          { name: 'stairways', displayName: 'Stairways', emoji: '🪜', purity: 50, magicalGirlId: magicalGirl.id },
          { name: 'fedorasBedroom', displayName: "Fedora's Bedroom", emoji: '🛏️', purity: 50, magicalGirlId: magicalGirl.id },
        ],
      });
    }

    return NextResponse.json(magicalGirl);
  } catch (error) {
    console.error('Failed to fetch magical girl:', error);
    return NextResponse.json({ error: 'Failed to fetch magical girl' }, { status: 500 });
  }
}
