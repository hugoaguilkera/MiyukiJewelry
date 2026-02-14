import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../server/db';
import { products } from '../shared/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = await db.select().from(products);

    // Transformamos nombre -> name para que el frontend funcione
    const formatted = data.map((p) => ({
      id: p.id,
      name: p.nombre,
      price: p.price,
      imageUrl: p.imageUrl,
      category: p.category,
      description: p.description,
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error obteniendo productos' });
  }
}