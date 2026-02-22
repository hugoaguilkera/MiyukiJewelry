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
      .then(data => setCategories(data.result || data))
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="px-10 py-20 bg-[#faf9f6] min-h-screen">

      {/* HEADER */}
      <h1 className="text-4xl font-semibold tracking-wide text-center mb-16">
        Categorías
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {categories.map(category => (
          <Link key={category.id} href={`/catalogos/${category.id}`}>

            <div className="cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500 group relative bg-white">

              {category.image_url ? (
                <>
                  {/* IMAGE CON ENFOQUE AJUSTADO */}
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="w-full h-80 object-contain object-[center_65%] bg-[#f8f6f1] p-10 transition duration-700 group-hover:scale-105"
                  />

                  {/* OVERLAY SUAVE */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition duration-500"></div>

                  {/* TITULO SOBRE IMAGEN */}
                  <div className="absolute bottom-6 left-0 right-0 text-center">
                    <h2 className="text-2xl font-semibold tracking-wide text-gray-800">
                      {category.name}
                    </h2>
                  </div>
                </>
              ) : (
                <div className="h-80 flex items-center justify-center bg-gray-200">
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