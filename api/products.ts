export const config = {
  runtime: "nodejs18.x",
  regions: ["iad1"],
};

import { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import { dir } from 'console';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`SELECT 1 as test`;
    return res.status(200).json(result);
  } catch (error) {
    console.error("RAW NEON ERROR:", error);
    return res.status(500).json({ error: String(error) });
  }
}