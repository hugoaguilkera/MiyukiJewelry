import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ui/product-card";
import { Product } from "../../types";

const ProductGallery = () => {
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("featured");
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<number>(8);

  // Fetch products
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Update displayed products when products, filters, or sort changes
  useEffect(() => {
    if (!products) return;

    let filtered = [...products];
    
    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(product => product.categoryId === categoryFilter);
    }
    
    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "featured":
      default:
        // Sort by rating and then review count for featured
        filtered.sort((a, b) => {
          if (b.rating !== a.rating) return b.rating - a.rating;
          return b.reviewCount - a.reviewCount;
        });
        break;
    }
    
    setDisplayProducts(filtered);
  }, [products, categoryFilter, sortOption]);

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategoryFilter(value === "all" ? null : parseInt(value));
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Load more products
  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + 4);
  };

  if (isLoading) {
    return (
      <section id="productos" className="py-16 bg-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Nuestros Productos</h2>
              <p className="text-[#333333] text-opacity-70">Cargando productos...</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  </div>
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
      <section id="productos" className="py-16 bg-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Nuestros Productos</h2>
            <p className="text-red-500">Error al cargar los productos. Por favor, intenta de nuevo más tarde.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="productos" className="py-16 bg-[#F8F8F8]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Nuestros Productos</h2>
            <p className="text-[#333333] text-opacity-70 max-w-xl">
              Descubre nuestra colección de piezas únicas hechas a mano.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <select 
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                onChange={handleCategoryChange}
                value={categoryFilter === null ? "all" : categoryFilter.toString()}
              >
                <option value="all">Todos los productos</option>
                <option value="1">Pulseras</option>
                <option value="2">Collares</option>
                <option value="3">Aretes</option>
                <option value="4">Anillos</option>
              </select>
              <select 
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                onChange={handleSortChange}
                value={sortOption}
              >
                <option value="featured">Ordenar por: Destacados</option>
                <option value="price-asc">Precio: Menor a mayor</option>
                <option value="price-desc">Precio: Mayor a menor</option>
                <option value="newest">Más recientes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.slice(0, visibleProducts).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {visibleProducts < displayProducts.length && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={loadMoreProducts}
              className="bg-white border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-medium py-3 px-8 rounded-md transition-colors"
            >
              Cargar más productos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGallery;
