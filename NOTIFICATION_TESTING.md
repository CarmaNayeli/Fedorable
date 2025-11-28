# Push Notification Testing & Debugging Guide

## Overview

The Rhia-minder app uses push notifications to remind users when it's time to complete their chores (battle monsters). This guide explains how notifications work and how to test/debug them.

## How Notifications Work

1. **Quest Creation**: When a user creates a recurring quest with notification preferences, the system generates Notification records in the database for the next 30 days
2. **Cron Job**: A Vercel cron job runs every 15 minutes at `/api/cron/send-notifications`
3. **Sending**: The cron job finds due notifications and sends them via web push to all subscribed devices
4. **Subscription**: Users must enable push notifications in their browser for the app

## Testing Notifications

### Step 1: Check if Notifications Are Being Created

Visit the diagnostic endpoint:
```
GET /api/cron/test-notifications
```

This will show you:
- How many quests have notification preferences set
- Total notifications in the database
- Which notifications are due to be sent
- How many push subscriptions exist
- Server timezone information

### Step 2: Manually Trigger the Cron Job

Instead of waiting for the cron schedule, you can manually trigger it:
```
GET /api/cron/send-notifications?manual=true
```

This bypasses the authentication check and runs the notification sending logic immediately.

### Step 3: Check the Browser Console

When notifications are sent, you should see:
1. A push notification appear in your browser/OS
2. Console logs in the browser showing the service worker received the notification
3. Server logs showing notifications were sent

### Step 4: Verify Push Subscription

1. Open the app in your browser
2. Click on the "Push Notifications" toggle
3. Enable notifications when prompted
4. Check `/api/cron/test-notifications` to confirm a subscription was created

## Common Issues

### Issue 1: Notifications Not Being Created

**Symptoms**: `/api/cron/test-notifications` shows 0 notifications

**Possible Causes**:
- Quest doesn't have `isRecurring: true`
- Quest doesn't have `notificationPreferences` set
- `generateNotificationsForQuest()` wasn't called when the quest was created
- All generated notifications are in the past

**Fix**: Check server logs when creating a quest. You should see:
```
Generating notifications for quest <id> (<monster name>)
Created X notifications for quest <monster name>
Sample notification times: [...]
```

### Issue 2: Notifications Created But Not Sent

**Symptoms**: `/api/cron/test-notifications` shows notifications but they're not being sent

**Possible Causes**:
- Cron job isn't running (only runs on Vercel, not localhost)
- Push subscription doesn't exist
- CRON_SECRET environment variable is set but cron isn't sending it
- Notification times are scheduled for the wrong timezone

**Fix**:
1. Test manually: `GET /api/cron/send-notifications?manual=true`
2. Check server logs for errors
3. Verify push subscription exists
4. Check if notifications are actually due (compare `scheduledFor` with current server time)

### Issue 3: Timezone Issues

**Symptoms**: Notifications fire at the wrong time

**Possible Causes**:
- User enters time in their local timezone (e.g., 8:00 AM PST)
- Server interprets it as UTC or another timezone
- Notifications fire hours early/late

**Current Status**: The system uses `new Date().setHours()` which uses the server's local timezone. If the server is in UTC but users expect local time, there will be mismatches.

**Potential Fix** (not yet implemented):
- Store user's timezone
- Convert notification times to UTC when creating notifications
- Or display times in UTC when users set them

### Issue 4: Cron Authentication Failures

**Symptoms**: Cron returns 401 Unauthorized

**Possible Causes**:
- `CRON_SECRET` environment variable is set
- Cron job doesn't send the auth header

**Fix**:
- Remove `CRON_SECRET` from environment variables (not needed for Vercel crons)
- Or use `?manual=true` for testing

## Environment Variables

### Required
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY`: Public VAPID key for web push
- `VAPID_PRIVATE_KEY`: Private VAPID key for web push
- `VAPID_SUBJECT`: mailto: or https: URL for VAPID subject

### Optional
- `CRON_SECRET`: Bearer token for cron authentication (not recommended for Vercel crons)

## Monitoring Notifications in Production

1. **Check Vercel Logs**: Look for cron job execution logs every 15 minutes
2. **Monitor Errors**: Watch for push notification failures (410/404 errors mean subscription expired)
3. **Track Metrics**: Count sent vs failed notifications in `/api/cron/send-notifications` responses

## Manual Testing Workflow

1. Create a recurring quest with notification preferences set for 1-2 minutes in the future
2. Check `/api/cron/test-notifications` to confirm notification was created
3. Wait or manually trigger: `/api/cron/send-notifications?manual=true`
4. Verify notification appears in your browser
5. Check logs for any errors

## Debugging Checklist

- [ ] Quest has `isRecurring: true`
- [ ] Quest has `notificationPreferences` object with time values
- [ ] `generateNotificationsForQuest()` was called successfully
- [ ] Notification records exist in database (check `/api/cron/test-notifications`)
- [ ] Notification `scheduledFor` time is in the future or recently past
- [ ] Push subscription exists for the user
- [ ] Cron job is running (or test manually with `?manual=true`)
- [ ] No authentication errors in logs
- [ ] Web push VAPID keys are configured correctly
- [ ] Browser has granted notification permission

## Next Steps for Improvement

1. **Add timezone support**: Store user timezone and properly handle time conversions
2. **Add quest editing**: Allow users to update notification preferences after quest creation
3. **Add notification history**: Show users which notifications were sent
4. **Add retry logic**: Retry failed notifications instead of marking them sent
5. **Add notification center**: Show in-app notifications as fallback to push
