import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { pgTable, serial, text, real, integer, timestamp } from 'drizzle-orm/pg-core'

// Definimos schema mínimo SOLO para esta función
const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  categoryId: integer("category_id").notNull(),
  rating: real("rating"),
  reviewCount: integer("review_count"),
  createdAt: timestamp("created_at")
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const sql = neon(process.env.DATABASE_URL!)
    const db = drizzle(sql)

    const data = await db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        description: products.description,
        imageUrl: products.imageUrl,
        categoryId: products.categoryId
      })
      .from(products)
      .limit(50)

    return res.status(200).json(data)
  } catch (error) {
    console.error("🔥 PRODUCTS ERROR:", error)
    return res.status(500).json({ error: String(error) })
  }
}