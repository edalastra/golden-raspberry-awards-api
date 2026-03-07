import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import env from "../../shared/env.js";
import { PrismaClient } from "@prisma/client";

const connectionString = env.DATABASE_URL;

const adapter = new PrismaBetterSqlite3({
  url: connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

export { prisma };