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
    <div className="px-8 py-16 bg-[#faf9f6] min-h-screen">
      
      {/* TITLE */}
      <h1 className="text-4xl font-semibold tracking-wide mb-12 text-center">
        Categorías
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {categories.map(category => (
          <Link key={category.id} href={`/catalogos/${category.id}`}>
            
            <div className="cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500 group relative">

              {category.image_url ? (
                <>
                  {/* IMAGE */}
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-700"
                  />

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-500"></div>

                  {/* TITLE OVER IMAGE */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-white text-3xl font-semibold tracking-wide drop-shadow-lg">
                      {category.name}
                    </h2>
                  </div>
                </>
              ) : (
                <div className="h-72 flex items-center justify-center bg-gray-200">
                  <span className="text-xl font-semibold text-gray-600">
                    {category.name}
                  </span>
                </div>
              )}

            </div>

          </Link>
        ))}
      </div>
    </div>
  );
}