import { useEffect, useState } from "react";
import { Link } from "wouter";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category: string;
}

export default function Categorias() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        const productList = data.result || data;
        setProducts(productList);

        const uniqueCategories = [
          ...new Set(productList.map((p: Product) => p.category))
        ].filter(Boolean);

        setCategories(uniqueCategories);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Categorías</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map(category => {
          const product = products.find(p => p.category === category);

          return (
            <Link key={category} href={`/categoria/${category}`}>
              <div className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition">
                <img
                  src={product?.image_url}
                  alt={category}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="mt-4 text-lg font-semibold text-center">
                  {category}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}