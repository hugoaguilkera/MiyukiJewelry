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
    return <p style={{ padding: "40px" }}>Cargando productos...</p>;
  }

  return (
    <div style={{ padding: "60px" }}>
      <h1>Catálogos Miyuki</h1>
      <p>Total productos: {products.length}</p>

      {products.map((product: any) => (
        <div key={product.id} style={{ marginBottom: "30px" }}>
          <img
            src={product.image_url}
            alt={product.name}
            width="250"
          />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}


