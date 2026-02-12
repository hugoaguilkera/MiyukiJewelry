import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { ProductCategory } from "@/lib/types";
import type { Product } from "@/lib/types";

const ProductGallery = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");

  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categories: { value: ProductCategory; label: string }[] = [
    { value: "all", label: "Todos" },
    { value: "collares", label: "Collares" },
    { value: "pulseras", label: "Pulseras" },
    { value: "aretes", label: "Aretes" },
    { value: "anillos", label: "Anillos" },
  ];

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((product: Product) => product.category === activeCategory);

  return (
    <section id="productos" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Nuestra Colección
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Explora nuestra selección de bisutería artesanal, creada con pasión y
            dedicación para realzar tu belleza natural.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center mb-8 gap-2 px-2">
          <div className="w-full overflow-x-auto pb-2 sm:w-auto flex justify-start sm:justify-center space-x-2 sm:flex-wrap sm:space-x-0 sm:gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                variant={activeCategory === category.value ? "default" : "outline"}
                className={`
                  ${
                    activeCategory === category.value
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-primary hover:text-white text-foreground"
                  }
                  whitespace-nowrap text-xs sm:text-sm py-1 px-3 h-auto sm:h-10
                `}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-destructive p-4">
            Error al cargar los productos. Por favor, intenta de nuevo.
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-lg text-muted-foreground">
              {products && products.length > 0
                ? "No hay productos en esta categoría."
                : "No hay productos disponibles."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-8 px-4 sm:px-0">
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGallery;
