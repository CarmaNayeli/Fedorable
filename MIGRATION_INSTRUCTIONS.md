# Database Migration Instructions

## Required Migrations

There are several new database schema changes:

### Quest Table Updates:
1. `notificationPreferences` - Stores custom notification times for each day
2. `lastCompletedAt` - Tracks when recurring quests were last completed

### New Tables (Sparkle Shop):
1. `ShopItem` - Available stickers that can be purchased with achievement fields
2. `StickerCollection` - Stickers owned by the magical girl

### ShopItem Achievement Fields:
1. `isAchievement` - Whether the sticker is earned through achievements
2. `achievementType` - Type of achievement (quest_streak, total_defeats, etc.)
3. `achievementTarget` - Target quest/monster for achievement
4. `achievementGoal` - Number required to unlock
5. `achievementDesc` - Description of how to unlock

## Solution

You need to update your database schema. Choose **ONE** of the following methods:

### Method 1: Using Prisma DB Push (Recommended for Development)

Run this command in your terminal:

```bash
npx prisma db push
```

This will:
- Add the `notificationPreferences` column to your Quest table
- Update your Prisma client

### Method 2: Using Prisma Migrate (Recommended for Production)

Run this command to create and apply a migration:

```bash
npx prisma migrate dev --name add_notification_preferences
```

### Method 3: Manual SQL (If Prisma commands don't work)

If you have direct database access, you can run this SQL command:

```sql
ALTER TABLE "Quest" ADD COLUMN IF NOT EXISTS "notificationPreferences" JSONB;
```

After running the SQL, regenerate the Prisma client:

```bash
npx prisma generate
```

## Verify the Fix

After applying the migration:

1. Restart your development server: `npm run dev`
2. Try adding a quest from a template in the app
3. The timing modal should now work without errors

## What Changed

The new `notificationPreferences` field stores custom notification times for each day:
- Format: `{"mon": "05:30", "tue": "08:00", ..., "sun": null}`
- Allows different reminder times for different days (e.g., 5:30 AM on weekdays, 7:00 AM on Saturday)
- `null` values mean no notification for that day

## Manual SQL Migration Files

If you prefer to run SQL manually, the migration files are available in `prisma/migrations/`:

1. **add_notification_preferences.sql** - Adds notificationPreferences column to Quest table
2. **add_last_completed_at.sql** - Adds lastCompletedAt column to Quest table
3. **add_sparkle_shop.sql** - Creates ShopItem and StickerCollection tables
4. **add_achievement_fields.sql** - Adds achievement fields to ShopItem table
5. **add_currency_field.sql** - Adds currency field for sparkle point purchases

Run them in order:
```bash
psql $DATABASE_URL < prisma/migrations/add_notification_preferences.sql
psql $DATABASE_URL < prisma/migrations/add_last_completed_at.sql
psql $DATABASE_URL < prisma/migrations/add_sparkle_shop.sql
psql $DATABASE_URL < prisma/migrations/add_achievement_fields.sql
psql $DATABASE_URL < prisma/migrations/add_currency_field.sql
```

## Notification Cron Job Setup

**IMPORTANT:** Push notifications require a cron job to send scheduled notifications.

### For Vercel Deployment:

The `vercel.json` file is already configured with a cron job that runs every 15 minutes:

```json
{
  "crons": [{
    "path": "/api/cron/send-notifications",
    "schedule": "*/15 * * * *"
  }]
}
```

After deploying to Vercel, the cron job will automatically:
- Run every 15 minutes
- Check for notifications that are due
- Send push notifications to subscribed users
- Mark notifications as sent

### Testing Notifications:

To test if notifications are working, you can:

1. **Send a test notification immediately:**
   ```bash
   curl -X POST https://your-app.vercel.app/api/notifications/test-send
   ```

2. **Manually trigger the cron job:**
   ```bash
   curl https://your-app.vercel.app/api/cron/send-notifications
   ```

### For Other Platforms:

If you're not using Vercel, you need to set up your own cron job to call:
`https://your-app.com/api/cron/send-notifications` every 5-15 minutes.

You can use services like:
- Cron-job.org
- EasyCron
- Your server's crontab

Example crontab entry (runs every 15 minutes):
```
*/15 * * * * curl https://your-app.com/api/cron/send-notifications
```

**Note:** For production security, set a `CRON_SECRET` environment variable and include it as a Bearer token:
```bash
curl -H "Authorization: Bearer your-secret-token" https://your-app.com/api/cron/send-notifications
```
