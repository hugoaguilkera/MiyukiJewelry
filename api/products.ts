import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({
        error: "DATABASE_URL is not defined",
      });
    }

    const sql = neon(process.env.DATABASE_URL);

    // =========================================================
    // GET → Obtener productos
    // =========================================================
    if (req.method === "GET") {
      try {
        if (req.query.categoryId) {
          const categoryId = Number(req.query.categoryId);

          if (Number.isNaN(categoryId)) {
            return res.status(400).json({
              error: "Invalid categoryId",
            });
          }

          const products = await sql`
            SELECT 
              id,
              name,
              price,
              image_url AS "imageUrl",
              category_id AS "categoryId"
            FROM products
            WHERE category_id = ${categoryId}
            ORDER BY id DESC
          `;

          return res.status(200).json({
            success: true,
            result: products,
          });
        }

        const products = await sql`
          SELECT 
            id,
            name,
            price,
            image_url AS "imageUrl",
            category_id AS "categoryId"
          FROM products
          ORDER BY id DESC
        `;

        return res.status(200).json({
          success: true,
          result: products,
        });
      } catch (error: any) {
        console.error("GET ERROR:", error);
        return res.status(500).json({
          error: error.message,
        });
      }
    }

    // =========================================================
    // POST → Crear producto
    // =========================================================
    if (req.method === "POST") {
      try {
        const { name, price, imageUrl, categoryId } = req.body;

        if (
          typeof name !== "string" ||
          name.trim() === "" ||
          typeof price !== "number" ||
          Number.isNaN(price) ||
          typeof categoryId !== "number" ||
          Number.isNaN(categoryId)
        ) {
          return res.status(400).json({
            error: "Invalid data types",
          });
        }

        const newProduct = await sql`
          INSERT INTO products (name, price, image_url, category_id)
          VALUES (
            ${name.trim()},
            ${price},
            ${imageUrl ?? null},
            ${categoryId}
          )
          RETURNING 
            id,
            name,
            price,
            image_url AS "imageUrl",
            category_id AS "categoryId"
        `;

        return res.status(201).json({
          success: true,
          result: newProduct[0],
        });
      } catch (error: any) {
        console.error("POST ERROR:", error);
        return res.status(500).json({
          error: error.message,
        });
      }
    }

    return res.status(405).json({
      error: "Method not allowed",
    });

  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
}


