import { useEffect, useState } from "react";
import { Link } from "wouter";

export default function Catalogos() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        const productList = data.resultado || [];
        setProducts(productList);

        // Extraer categorías únicas
        const uniqueCategories = [
          ...new Set(
            productList
              .map((p: any) => p.category)
              .filter((c: string) => c)
          )
        ];

        setCategories(uniqueCategories);

      } catch (err) {
        console.error("Error cargando productos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <p style={{ padding: "40px" }}>Cargando categorías...</p>;
  }

  return (
    <div style={{ padding: "60px" }}>
      <h1>Categorías Miyuki</h1>
      <p>Total categorías: {categories.length}</p>

      {categories.map((category) => {
        const representative = products.find(
          (p: any) => p.category === category
        );

        return (
          <Link key={category} href={`/categoria/${category}`}>
            <div style={{ marginBottom: "40px", cursor: "pointer" }}>
              <img
                src={representative?.image_url}
                alt={category}
                width="250"
              />
              <h3>{category}</h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
}


