import { useEffect, useState } from "react";

export default function Catalogos() {

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    };

    loadCategories();
  }, []);

  return (
    <div style={{ padding: "60px" }}>
      <h1>Catálogos Miyuki</h1>

      {!selectedCategoryId && (
        <div style={{ display: "flex", gap: "40px", marginTop: "30px" }}>
          {categories.map((cat: any) => (
            <div
              key={cat.id}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedCategoryId(cat.id)}
            >
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

