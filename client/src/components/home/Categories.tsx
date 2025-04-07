import { useQuery } from "@tanstack/react-query";
import CategoryCard from "../ui/category-card";
import { Category } from "../../types";

const Categories = () => {
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Nuestras Categorías</h2>
            <p className="max-w-xl mx-auto text-[#333333] text-opacity-70">Cargando categorías...</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-[#F5F5DC] rounded-lg overflow-hidden shadow-md animate-pulse">
                <div className="h-40 md:h-52 bg-gray-300"></div>
                <div className="p-4 bg-white">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Nuestras Categorías</h2>
            <p className="text-red-500">Error al cargar las categorías. Por favor, intenta de nuevo más tarde.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Nuestras Categorías</h2>
          <p className="max-w-xl mx-auto text-[#333333] text-opacity-70">
            Explora nuestra variedad de estilos y diseños, cada uno creado con atención al detalle.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories && categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
