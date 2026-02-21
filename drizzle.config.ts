import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_CnuYH6g0VvFP@ep-blue-hall-afi6n0rs-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});