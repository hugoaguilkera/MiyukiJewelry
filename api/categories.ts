import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    // =========================================
    // GET → Obtener categorías reales de Neon
    // =========================================
    if (req.method === "GET") {

      const categories = await sql`
        SELECT id, name, slug, image_url
        FROM categories
        ORDER BY id ASC
      `;

      return res.status(200).json(categories);
    }

    // =========================================
    // POST → Crear categoría
    // =========================================
    if (req.method === "POST") {

      const { name, slug, image_url } = req.body;

      if (!name || !slug) {
        return res.status(400).json({
          error: "name and slug are required"
        });
      }

      const newCategory = await sql`
        INSERT INTO categories (name, slug, image_url)
        VALUES (${name}, ${slug}, ${image_url})
        RETURNING *
      `;

      return res.status(201).json(newCategory[0]);
    }

    return res.status(405).json({
      error: "Method not allowed"
    });

  } catch (error: any) {
    return res.status(500).json({
      error: error.message
    });
  }
}