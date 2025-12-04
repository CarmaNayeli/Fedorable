# Prisma Connector Error Fix

## Problem
The application was experiencing a `prepared statement "s0" already exists` error (PostgreSQL error code 42P05) when running in serverless environments (Lambda/Vercel).

## Root Cause
1. Prisma Client was not being properly cached in production environments, leading to multiple instances creating conflicting prepared statements
2. The connection string for PgBouncer (Supabase's transaction pooler) was missing the `?pgbouncer=true` parameter, which caused Prisma to attempt using prepared statements with PgBouncer in transaction mode

## Changes Made

### 1. Updated Prisma Client Initialization (`lib/prisma.ts`)
- **Before**: Singleton pattern only worked in development mode
- **After**: Singleton pattern now works in all environments (development and production)
- Added proper logging configuration
- Added comments explaining the serverless configuration

### 2. Updated Database URL Configuration (`.env.example`)
- Added `?pgbouncer=true` parameter to the `DATABASE_URL`
- This parameter tells Prisma to disable prepared statements when using PgBouncer
- Added explanatory comment about why this parameter is needed

## What You Need to Do

### Update Your Local `.env` File
Add the `?pgbouncer=true` parameter to your `DATABASE_URL` in your `.env` file:

```env
DATABASE_URL="postgresql://postgres.epgtaxmpbimksdgyjeto:UmoS06AxoFC0g80O@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

### Update Production Environment Variables (Vercel/Lambda)
1. Go to your Vercel project settings (or Lambda configuration)
2. Update the `DATABASE_URL` environment variable to include `?pgbouncer=true` at the end
3. Redeploy your application

## How This Fixes the Error

1. **Singleton Pattern**: By caching the Prisma Client instance globally (even in production), we ensure that the same client instance is reused across serverless function invocations within the same container, preventing duplicate connections.

2. **PgBouncer Mode**: The `?pgbouncer=true` parameter tells Prisma to:
   - Disable prepared statements (which don't work well with PgBouncer in transaction mode)
   - Use simpler query execution that's compatible with connection pooling
   - Avoid statement name conflicts

## Technical Details

### PgBouncer and Prepared Statements
PgBouncer in transaction mode doesn't preserve prepared statements across transactions. When Prisma tries to create a prepared statement with a name that was used in a previous transaction (handled by the same connection but different client), PostgreSQL throws the "prepared statement already exists" error.

### Serverless Environments
In serverless environments like AWS Lambda or Vercel Functions:
- Containers are reused for multiple invocations
- Global state persists between invocations in the same container
- Without proper singleton pattern, each invocation could create a new Prisma Client
- Multiple Prisma Clients can conflict when using the same connection pool

## Verification

### Check Vercel Logs
After deploying, check your Vercel function logs. You should see one of:

✅ **Success**: No error messages, API calls return 200 status

⚠️ **Missing Parameter**: If you see this warning in logs:
```
⚠️  WARNING: DATABASE_URL is missing "?pgbouncer=true" parameter.
   This will cause "prepared statement already exists" errors in production.
```

This means the DATABASE_URL environment variable in Vercel doesn't have the `?pgbouncer=true` parameter yet. Follow the steps above to add it.

### Troubleshooting

**If the error persists after updating the environment variable:**

1. **Verify the environment variable was saved correctly** in Vercel:
   - Go to Settings → Environment Variables
   - Click on DATABASE_URL to view it
   - Confirm it ends with `?pgbouncer=true`

2. **Force a new deployment**:
   - Vercel caches environment variables per deployment
   - Go to Deployments → Click the three dots → Redeploy
   - OR push a new commit to trigger a fresh deployment

3. **Check the function logs**:
   - Go to your project → Deployments → Click on latest deployment
   - Click "View Function Logs"
   - Look for the warning message or the actual error

4. **Verify the connection string format**:
   ```
   postgresql://USER:PASSWORD@HOST:6543/DATABASE?pgbouncer=true
   ```

   Make sure there are no extra spaces or URL encoding issues.

## Additional Resources
- [Prisma PgBouncer Guide](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management/configure-pg-bouncer)
- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [Prisma in Serverless Environments](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
