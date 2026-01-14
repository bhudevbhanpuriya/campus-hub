// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// 1. Extend the NodeJS global type definition
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 2. Use the extended global object
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ["error"],
});

// 3. Save the instance in development to prevent connection exhaustion
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}