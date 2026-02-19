import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
}

export default function Catalogos() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (data.success && Array.isArray(data.result)) {
          setProducts(data.result);
        } else {
          setProducts([]);
        }

      } catch (err) {
        console.error("Error cargando productos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        <h2>Cargando productos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        <h2>Error cargando productos</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "60px", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "20px" }}>Catálogos Miyuki</h1>

      <p style={{ marginBottom: "40px" }}>
        Total productos: {products.length}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px"
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #e5e5e5",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
            }}
          >
            <img
              src={product.image_url}
              alt={product.name}
              style={{ width: "100%", maxWidth: "250px" }}
            />

            <h3 style={{ marginTop: "15px" }}>
              {product.name}
            </h3>

            <p style={{ fontWeight: "bold", marginTop: "8px" }}>
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
