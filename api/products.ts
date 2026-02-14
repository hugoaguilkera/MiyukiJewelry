import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const products = await sql`
      SELECT 
        id,
        name,
        description,
        price,
        image_url as "imageUrl",
        category_id as "categoryId",
        created_at as "createdAt"
      FROM products
      ORDER BY id DESC
    `;

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "DB error" });
  }
}