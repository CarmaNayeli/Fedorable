# Supabase Setup Guide for Rhia-minder

This guide will help you set up Supabase as your database for deployment on Vercel.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in the details:
   - **Name**: `rhia-minder` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest to your users
   - **Pricing Plan**: Free tier works great
5. Click **"Create new project"** and wait ~2 minutes for setup

## Step 2: Get Your Database Connection Strings

1. In your Supabase project, go to **Settings** (gear icon) → **Database**
2. Scroll down to **Connection string** section
3. You'll need TWO connection strings:

### Connection String (with connection pooling)
- Select **"URI"** tab
- Copy the connection string that looks like:
  ```
  postgresql://postgres.xxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
  ```
- This is your `DATABASE_URL`

### Direct Connection String
- Click **"Direct connection"** toggle
- Copy this connection string (looks similar but different port):
  ```
  postgresql://postgres.xxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres
  ```
- This is your `DIRECT_URL`

**Important**: Replace `[YOUR-PASSWORD]` in both strings with the database password you created in Step 1!

## Step 3: Update Your .env File

Update your `.env` file (or create one from `.env.example`):

```bash
# Database - Supabase PostgreSQL
DATABASE_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

# Web Push - Copy these from your existing .env
NEXT_PUBLIC_VAPID_PUBLIC_KEY="BIRVUasoljkV_aBpat9Qlg7xikhAl7Bw7XX6eU5yNjsygnweavgiFYpSofyN2K5qiPl_FcVgfZKiie19Bh0JY4k"
VAPID_PRIVATE_KEY="vR-gFSTLz0TNKhFTmaZsRXWMEXa8evYFN2owq-pLfmk"
VAPID_SUBJECT="mailto:your-email@example.com"
```

## Step 4: Set Environment Variables on Vercel

1. Go to your Vercel project
2. Go to **Settings** → **Environment Variables**
3. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `DATABASE_URL` | Your connection string with pooling | All (Production, Preview, Development) |
| `DIRECT_URL` | Your direct connection string | All |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Your VAPID public key | All |
| `VAPID_PRIVATE_KEY` | Your VAPID private key | All |
| `VAPID_SUBJECT` | `mailto:your-email@example.com` | All |

## Step 5: Deploy to Vercel

Your Vercel deployment will automatically:
1. Run `prisma generate` to create the Prisma client
2. Run `prisma db push` to create all tables in your Supabase database
3. Build and deploy your app

## Step 6: Verify Database Tables

After deployment, verify tables were created:

1. Go to Supabase → **Table Editor**
2. You should see all tables:
   - `MagicalGirl`
   - `Realm`
   - `Quest`
   - `MonsterDefeat`
   - `StoryChapter`
   - `Collection`
   - `Notification`
   - `PushSubscription`

## Troubleshooting

### Build fails with "Can't reach database server"
- Check that your `DATABASE_URL` and `DIRECT_URL` are correct in Vercel
- Make sure you replaced `[YOUR-PASSWORD]` with your actual password
- Ensure there are no extra spaces or quotes in the environment variables

### Tables not created
- Check the build logs in Vercel
- Manually run migrations from Vercel's function logs or Supabase SQL editor

### Need to reset database
Go to Supabase → SQL Editor and run:
```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```
Then redeploy on Vercel to recreate tables.

## Optional: Local Development with Supabase

If you want to test locally with Supabase:

```bash
# Update your local .env with Supabase credentials
npx prisma generate
npx prisma db push

# Run dev server
npm run dev
```

## Next Steps

Once deployed, your app will:
- ✅ Use PostgreSQL on Supabase (serverless-ready)
- ✅ Support push notifications via VAPID keys
- ✅ Persist data across deployments
- ✅ Scale automatically with Vercel and Supabase

Enjoy your Magical Girl Chore Adventure! ✨
