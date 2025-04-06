import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import { useInMemoryStorage } from '@shared/env';

// Setup database only if we're not using in-memory storage
let pool: Pool | null = null;
let db: any = null;

if (!useInMemoryStorage) {
  try {
    neonConfig.webSocketConstructor = ws;
    
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not set. Falling back to in-memory storage.");
    } else {
      pool = new Pool({ connectionString: process.env.DATABASE_URL });
      db = drizzle({ client: pool, schema });
      console.log("Database connection established successfully");
    }
  } catch (error) {
    console.error("Error connecting to database:", error);
    console.warn("Falling back to in-memory storage");
  }
} else {
  console.log("Using in-memory storage instead of database");
}

export { pool, db };
