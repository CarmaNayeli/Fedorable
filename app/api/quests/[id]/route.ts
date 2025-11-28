import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { regenerateNotificationsForQuest } from '@/lib/notification-scheduler';

// Update quest notification preferences
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: questId } = await params;
    const body = await request.json();
    const { notificationPreferences } = body;

    // Update the quest with new notification preferences
    const quest = await prisma.quest.update({
      where: { id: questId },
      data: {
        notificationPreferences: notificationPreferences || null,
      },
    });

    // Regenerate notifications with new preferences
    if (quest.isRecurring && notificationPreferences) {
      try {
        await regenerateNotificationsForQuest(questId);
      } catch (error) {
        console.error('Failed to regenerate notifications:', error);
        // Don't fail the request if notification regeneration fails
      }
    }

    return NextResponse.json(quest);
  } catch (error) {
    console.error('Failed to update quest:', error);
    return NextResponse.json(
      { error: 'Failed to update quest', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Delete a quest
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: questId } = await params;

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
