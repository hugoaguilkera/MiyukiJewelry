import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../server/db';
import { products } from '../shared/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = await db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        description: products.description,
        imageUrl: products.imageUrl,
        categoryId: products.categoryId,
      })
      .from(products)
      .limit(50);

    return res.status(200).json(data);
  } catch (error) {
    console.error('Products API error:', error);
    return res.status(500).json({ message: 'Error obteniendo productos' });
  }
}