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
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="px-12 py-24 bg-[#f9f8f4] min-h-screen">

      <h1 className="text-4xl font-light tracking-[0.25em] uppercase text-center mb-20">
        Categorías
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">

        {categories.map((category) => (
          <Link key={category.id} href={`/catalogos/${category.id}`}>

            <div className="group cursor-pointer text-center animate-fadeInUp">

              {/* CARD */}
              <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-500 overflow-hidden border border-[#d4af37]/30">

                {category.image_url && (
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="w-full h-96 object-contain object-[center_65%] bg-[#f8f6f1] p-10 transition duration-700 group-hover:scale-105"
                  />
                )}

              </div>

              {/* TITLE */}
              <h2 className="mt-8 text-lg tracking-[0.3em] font-light uppercase text-gray-800 group-hover:text-[#b89b5e] transition duration-300">
                {category.name}
              </h2>

            </div>

          </Link>
        ))}

      </div>
    </div>
  );
}