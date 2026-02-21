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

      // 🔎 Si viene categoryId en la query
      if (req.query.categoryId) {

        const categoryId = Number(req.query.categoryId);

        // 1️⃣ Obtener nombre real de la categoría
        const categoryRow = await sql`
          SELECT name FROM categories WHERE id = ${categoryId}
        `;

        const categoryName = categoryRow[0]?.name;

        // 2️⃣ Filtrar productos por nombre de categoría
        const products = await sql`
          SELECT id, name, price, image_url, category
          FROM products
          WHERE category = ${categoryName}
          ORDER BY id DESC
        `;

        return res.status(200).json({
          success: true,
          result: products
        });
      }

      // 🔎 Si NO hay filtro → traer todos los productos
      const products = await sql`
        SELECT id, name, price, image_url, category
        FROM products
        ORDER BY id DESC
      `;

      return res.status(200).json({
        success: true,
        result: products
      });
    }

    // =========================================================
    // POST → Crear producto
    // =========================================================
    if (req.method === "POST") {

      const { name, price, image_url, category } = req.body;

      if (!name || !price || !category) {
        return res.status(400).json({
          error: "name, price and category are required"
        });
      }

      const newProduct = await sql`
        INSERT INTO products (name, price, image_url, category)
        VALUES (${name}, ${price}, ${image_url}, ${category})
        RETURNING *
      `;

      return res.status(201).json({
        success: true,
        result: newProduct[0]
      });
    }

    // =========================================================
    // METHOD NOT ALLOWED
    // =========================================================
    return res.status(405).json({
      error: "Method not allowed"
    });

  } catch (error: any) {
    return res.status(500).json({
      error: error.message
    });
  }
}




