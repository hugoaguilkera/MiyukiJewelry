import { useEffect, useState } from "react";
import { Link } from "wouter";

interface Category {
  id: number;
  name: string;
}

export default function Categorias() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Categorías</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/catalogos/${category.id}`}>
            <div className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition">
              <div className="h-48 flex items-center justify-center bg-gray-100 rounded">
                <span className="text-lg font-semibold">
                  {category.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}