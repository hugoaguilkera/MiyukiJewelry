import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../server/storage";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    if (req.method === "GET") {
      const products = await storage.getProducts();
      return res.status(200).json(products);
    }

    if (req.method === "POST") {
      const newProduct = await storage.createProduct(req.body);
      return res.status(201).json(newProduct);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Products API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
