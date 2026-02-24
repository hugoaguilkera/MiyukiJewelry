if (req.method === "POST") {

  const { name, price, imageUrl, categoryId } = req.body;

  if (!name || !price || !categoryId) {
    return res.status(400).json({
      error: "name, price and categoryId are required"
    });
  }

  const newProduct = await sql`
    INSERT INTO products (name, price, image_url, category_id)
    VALUES (${name}, ${price}, ${imageUrl}, ${categoryId})
    RETURNING *
  `;

  return res.status(201).json({
    success: true,
    result: newProduct[0]
  });
}



