import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const result = await sql`SELECT 1 as ok`;

    return res.status(200).json({
      success: true,
      result
    });

  } catch (error: any) {
    return res.status(500).json({
      error: error.message
    });
  }
}




