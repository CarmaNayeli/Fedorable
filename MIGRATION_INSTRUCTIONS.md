# Database Migration Instructions

## Issue
The timing modal feature added a new `notificationPreferences` field to the Quest table, but your database doesn't have this column yet. This causes the "Failed to create monster" error.

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
