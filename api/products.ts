import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({
        error: "DATABASE_URL no existe"
      });
    }

    return res.status(200).json({
      message: "Env OK",
      db: process.env.DATABASE_URL.substring(0, 30)
    });

  } catch (error: any) {
    return res.status(500).json({
      error: error.message
    });
  }
}



