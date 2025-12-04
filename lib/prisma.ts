import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Configure PrismaClient for serverless environments
// This prevents prepared statement conflicts in Lambda/Edge environments
// CRITICAL: DATABASE_URL must include ?pgbouncer=true parameter for Supabase pooler
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

// Log warning if DATABASE_URL doesn't have pgbouncer parameter
if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('pgbouncer=true')) {
  console.warn(
    '⚠️  WARNING: DATABASE_URL is missing "?pgbouncer=true" parameter.\n' +
    '   This will cause "prepared statement already exists" errors in production.\n' +
    '   Update your DATABASE_URL environment variable to include: ?pgbouncer=true'
  )
}

// Always cache the Prisma Client instance to prevent connection issues
// This is crucial for serverless environments to reuse connections
globalForPrisma.prisma = prisma
