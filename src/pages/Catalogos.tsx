import { useEffect, useState } from "react";

export default function Catalogos() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <section className="bg-[#f6f2ea] min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-light tracking-wide text-gray-800 mb-16 text-center">
          Catálogos Miyuki
        </h1>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >

              <img
                src={product.image}
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

