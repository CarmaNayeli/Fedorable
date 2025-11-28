import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Delete a quest
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const questId = params.id;

    // Delete the quest (this will cascade delete notifications and defeats)
    await prisma.quest.delete({
      where: { id: questId },
    });

    return NextResponse.json({ success: true, message: 'Quest deleted successfully' });
  } catch (error) {
    console.error('Failed to delete quest:', error);
    return NextResponse.json(
      { error: 'Failed to delete quest', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
