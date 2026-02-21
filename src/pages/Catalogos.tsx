import { useEffect, useState } from "react";

export default function Catalogos() {

  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const loadProducts = async (categoryId: number) => {
    const res = await fetch(`/api/products?categoryId=${categoryId}`);
    const data = await res.json();
    setProducts(data);
    setSelectedCategory(categoryId);
  };

  return (
    <div style={{ padding: "60px" }}>

      <h1>Catálogos Miyuki</h1>

      {!selectedCategory && (
        <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{ cursor: "pointer" }}
              onClick={() => loadProducts(cat.id)}
            >
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      )}

      {selectedCategory && (
        <div style={{ marginTop: "40px" }}>

          <button onClick={() => setSelectedCategory(null)}>
            ← Volver
          </button>

          <div style={{ marginTop: "30px" }}>
            {products.map((product: any) => (
              <div key={product.id} style={{ marginBottom: "30px" }}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  width="250"
                />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}


