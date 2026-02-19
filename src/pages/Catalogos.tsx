import { useEffect, useState } from "react";

export default function Catalogos() {

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        console.log("API RESPONSE:", data);
        setProducts(data.result || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("ERROR:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-20 text-center">
        <h2>Cargando productos...</h2>
      </div>
    );
  }

  return (
    <section className="bg-[#f6f2ea] min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-light text-center mb-6">
          Catálogos Miyuki
        </h1>

        <p className="text-center mb-10">
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


