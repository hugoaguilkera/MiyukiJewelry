import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    // =========================================================
    // GET → Obtener productos (con filtro opcional por categoría)
    // =========================================================
    if (req.method === "GET") {

      if (req.query.categoryId) {

        const categoryId = Number(req.query.categoryId);

        const products = await sql`
          SELECT id, name, price, image_url, category_id
          FROM products
          WHERE category_id = ${categoryId}
          ORDER BY id DESC
        `;

        return res.status(200).json({
          success: true,
          result: products
        });
      }

      const products = await sql`
        SELECT id, name, price, image_url, category_id
        FROM products
        ORDER BY id DESC
      `;

      return res.status(200).json({
        success: true,
        result: products
      });
    }

    // =========================================================
    // POST → Crear producto (CORREGIDO)
    // =========================================================
    if (req.method === "POST") {

      const { name, price, imageUrl, categoryId } = req.body;

      // 🔥 Validación estricta de tipos
      if (
        typeof name !== "string" ||
        typeof price !== "number" ||
        typeof categoryId !== "number"
      ) {
        return res.status(400).json({
          error: "Invalid data types"
        });
      }

      const newProduct = await sql`
        INSERT INTO products (name, price, image_url, category_id)
        VALUES (
          ${name},
          ${price},
          ${imageUrl ?? null},
          ${categoryId}
        )
        RETURNING *
      `;

      return res.status(201).json({
        success: true,
        result: newProduct[0]
      });
    }

    return res.status(405).json({
      error: "Method not allowed"
    });

  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({
      error: error.message
    });
  }
}



