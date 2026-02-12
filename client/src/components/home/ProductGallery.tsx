import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ui/product-card";
import { Product } from "../../types";

const ProductGallery = () => {
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("featured");
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<number>(8);

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  useEffect(() => {
    if (!products || !Array.isArray(products)) {
      setDisplayProducts([]);
      return;
    }

    let filtered = [...products];

    // Filtro por categoría
    if (categoryFilter !== null) {
      filtered = filtered.filter(
        (product) => product.categoryId === categoryFilter
      );
    }

    // Ordenamiento seguro
    switch (sortOption) {
      case "price-asc":
        filtered.sort(
          (a, b) => (a.price ?? 0) - (b.price ?? 0)
        );
        break;

      case "price-desc":
        filtered.sort(
          (a, b) => (b.price ?? 0) - (a.price ?? 0)
        );
        break;

      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime()
        );
        break;

      case "featured":
      default:
        filtered.sort((a, b) => {
          const ratingDiff = (b.rating ?? 0) - (a.rating ?? 0);
          if (ratingDiff !== 0) return ratingDiff;
          return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
        });
        break;
    }

    setDisplayProducts(filtered);
  }, [products, categoryFilter, sortOption]);

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setCategoryFilter(value === "all" ? null : parseInt(value));
  };

  const handleSortChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOption(e.target.value);
  };

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  if (isLoading) {
    return (
      <section className="py-16 text-center">
        <p>Cargando productos...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 text-center">
        <p className="text-red-500">
          Error al cargar los productos.
        </p>
      </section>
    );
  }

  if (!displayProducts.length) {
    return (
      <section className="py-16 text-center">
        <p>No hay productos disponibles.</p>
      </section>
    );
  }

  return (
    <section id="productos" className="py-16 bg-[#F8F8F8]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-3">
              Nuestros Productos
            </h2>
          </div>

          <div className="flex space-x-2 mt-4 md:mt-0">
            <select
              onChange={handleCategoryChange}
              value={
                categoryFilter === null
                  ? "all"
                  : categoryFilter.toString()
              }
              className="border rounded px-3 py-2"
            >
              <option value="all">Todos</option>
              <option value="1">Pulseras</option>
              <option value="2">Collares</option>
              <option value="3">Aretes</option>
              <option value="4">Anillos</option>
            </select>

            <select
              onChange={handleSortChange}
              value={sortOption}
              className="border rounded px-3 py-2"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio ↑</option>
              <option value="price-desc">Precio ↓</option>
              <option value="newest">Más recientes</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayProducts
            .slice(0, visibleProducts)
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
        </div>

        {visibleProducts < displayProducts.length && (
          <div className="mt-10 text-center">
            <button
              onClick={loadMoreProducts}
              className="border px-6 py-3 rounded"
            >
              Cargar más
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGallery;
