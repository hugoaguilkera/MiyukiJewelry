import { useEffect, useState } from "react";
import { Link } from "wouter";

interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string | null;
}

export default function Categorias() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data.result || data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Categorías</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map(category => (
          <Link key={category.id} href={`/catalogos/${category.id}`}>
            <div className="cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg transition">

              <div className="h-48 w-full">
                {category.image_url ? (
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-100">
                    <span className="text-lg font-semibold">
                      {category.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 text-center font-semibold">
                {category.name}
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}