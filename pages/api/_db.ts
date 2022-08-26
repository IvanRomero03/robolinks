import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  global.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
