import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Get the database connection string from environment variables
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create a SQL client
const sql = neon(databaseUrl);

// Create a Drizzle instance
export const db = drizzle(sql);
