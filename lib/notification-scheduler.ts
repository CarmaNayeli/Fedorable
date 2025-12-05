import { prisma } from './prisma';
import { RRule, RRuleSet, rrulestr } from 'rrule';

/**
 * Generate notifications for a quest based on its recurrence rule and notification preferences
 * Creates notifications for the next 30 days
 *
 * IMPORTANT: Notification times are stored in UTC in the database.
 * The TimingModal component handles conversion from user's local time to UTC,
 * so a user setting 09:00 in EST will have notifications fire at 09:00 EST (14:00 UTC).
 */
export async function generateNotificationsForQuest(questId: string) {
  const quest = await prisma.quest.findUnique({
    where: { id: questId },
    include: { notifications: true },
  });

  if (!quest) {
    throw new Error(`Quest not found: ${questId}`);
  }

  // Skip if quest doesn't have recurrence or notification preferences
  if (!quest.recurrenceRule || !quest.notificationPreferences) {
    console.log(`Quest ${questId} (${quest.monsterName}) skipped - no recurrence or notification preferences`);
    return { created: 0 };
  }

  console.log(`Generating notifications for quest ${questId} (${quest.monsterName})`);
  const notificationPrefs = quest.notificationPreferences as Record<string, string | null>;
  console.log('Notification preferences:', notificationPrefs);

  // Parse the recurrence rule
  const rrule = rrulestr(quest.recurrenceRule);

  // Generate occurrences for the next 30 days
  const now = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(now.getDate() + 30);

  const occurrences = rrule.between(now, thirtyDaysFromNow, true);

  // Create notifications for each occurrence
  const notificationsToCreate: Array<{ scheduledFor: Date; questId: string }> = [];

  for (const occurrence of occurrences) {
    const dayOfWeek = occurrence.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Map day of week to our day keys
    const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dayKey = dayKeys[dayOfWeek];

    const notificationTime = notificationPrefs[dayKey];

    // Skip if no notification time set for this day
    if (!notificationTime) {
      continue;
    }

    // Parse the time (format: "HH:MM")
    const [hours, minutes] = notificationTime.split(':').map(Number);

    // Create a date for the notification
    const notificationDate = new Date(occurrence);
    notificationDate.setHours(hours, minutes, 0, 0);

    // Skip if notification is in the past
    if (notificationDate < now) {
      continue;
    }

    // Check if notification already exists
    const existingNotification = quest.notifications.find((n: typeof quest.notifications[number]) => {
      const scheduledTime = new Date(n.scheduledFor);
      return (
        scheduledTime.getTime() === notificationDate.getTime() &&
        !n.sent
      );
    });

    if (!existingNotification) {
      notificationsToCreate.push({
        scheduledFor: notificationDate,
        questId: quest.id,
      });
    }
  }

  // Bulk create notifications
  if (notificationsToCreate.length > 0) {
    await prisma.notification.createMany({
      data: notificationsToCreate,
    });
    console.log(`Created ${notificationsToCreate.length} notifications for quest ${quest.monsterName}`);
    // Log the first few notification times for debugging
    const sampleNotifs = notificationsToCreate.slice(0, 3).map(n => n.scheduledFor.toISOString());
    console.log('Sample notification times:', sampleNotifs);
  } else {
    console.log(`No new notifications created for quest ${quest.monsterName} (may already exist or all in past)`);
  }

  return { created: notificationsToCreate.length };
}

/**
 * Delete all pending notifications for a quest
 */
export async function deleteQuestNotifications(questId: string) {
  await prisma.notification.deleteMany({
    where: {
      questId,
      sent: false,
    },
  });
}

/**
 * Regenerate notifications for a quest (deletes old ones and creates new ones)
 */
export async function regenerateNotificationsForQuest(questId: string) {
  await deleteQuestNotifications(questId);
  return await generateNotificationsForQuest(questId);
}
