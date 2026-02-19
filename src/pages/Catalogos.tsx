import { useEffect, useState } from "react";

export default function Catalogos() {

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.result || []);
      } catch (err) {
        console.error("Error cargando productos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <p className="p-10 text-center">Cargando productos...</p>;
  }

  return (
    <section className="bg-[#f6f2ea] min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-light text-center mb-10">
          Catálogos Miyuki
        </h1>

        <p className="text-center mb-6">
          Total productos: {products.length}
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-64 object-contain bg-white"
              />

              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-500 text-sm">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


