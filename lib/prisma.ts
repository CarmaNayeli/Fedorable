import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Configure PrismaClient for serverless environments
// This prevents prepared statement conflicts in Lambda/Edge environments
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

// Always cache the Prisma Client instance to prevent connection issues
// This is crucial for serverless environments to reuse connections
globalForPrisma.prisma = prisma
