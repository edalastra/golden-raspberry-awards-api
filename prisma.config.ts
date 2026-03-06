import "dotenv/config";
import { defineConfig } from "prisma/config";
import { join } from "node:path";
import env from './src/shared/env.js';

const pathConfig = 'src/config/database'

export default defineConfig({
  schema: join(pathConfig, 'prisma/schema.prisma'),
  migrations: {
    path: join(pathConfig, "prisma/migrations"),
  },
  datasource: {
    url: env.DATABASE_URL,
  },
});
