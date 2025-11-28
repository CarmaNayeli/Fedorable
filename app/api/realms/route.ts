import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get all realms
export async function GET() {
  try {
    const magicalGirl = await prisma.magicalGirl.findFirst();
    if (!magicalGirl) {
      return NextResponse.json({ error: 'Magical girl not found' }, { status: 404 });
    }

    const realms = await prisma.realm.findMany({
      where: { magicalGirlId: magicalGirl.id },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(realms);
  } catch (error) {
    console.error('Failed to fetch realms:', error);
    return NextResponse.json({ error: 'Failed to fetch realms' }, { status: 500 });
  }
}
