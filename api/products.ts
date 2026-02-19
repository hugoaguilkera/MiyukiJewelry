import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../lib/db";
import { products } from "../shared/schema";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    if (req.method === "GET") {
      const data = await db.select().from(products);
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const [newProduct] = await db
        .insert(products)
        .values(req.body)
        .returning();

      return res.status(201).json(newProduct);
    }

    return res.status(405).json({ message: "Method not allowed" });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}



