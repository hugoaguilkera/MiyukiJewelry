import { useEffect, useState } from "react";

/* =========================
   TYPES
========================= */
interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

/* =========================
   COMPONENT
========================= */
export default function Catalogos() {

  /* =========================
     STATE
  ========================= */
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  /* =========================
     INIT
  ========================= */
  useEffect(() => {
    fetchCategories();
  }, []);

  /* =========================
     DATA FUNCTIONS
  ========================= */
  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const fetchProductsByCategory = async (categoryId: number) => {
    const res = await fetch(`/api/products?categoryId=${categoryId}`);
    const data = await res.json();

    // 🔥 importante porque tu API devuelve { success, result }
    setProducts(data.result || []);
    setSelectedCategory(categoryId);
  };

  const goBackToCategories = () => {
    setSelectedCategory(null);
    setProducts([]);
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>Catálogos Miyuki</h1>

      {/* =========================
         CATEGORY VIEW
      ========================= */}
      {!selectedCategory && (
        <div style={gridCategoriesStyle}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => fetchProductsByCategory(cat.id)}
              style={categoryCardStyle}
            >
              <h3 style={categoryTitleStyle}>{cat.name}</h3>
            </div>
          ))}
        </div>
      )}

      {/* =========================
         PRODUCTS VIEW
      ========================= */}
      {selectedCategory && (
        <div>

          <button onClick={goBackToCategories} style={backButtonStyle}>
            ← Volver
          </button>

          <div style={gridProductsStyle}>
            {products.map((product) => (
              <div key={product.id} style={productCardStyle}>
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={productImageStyle}
                />
                <h3>{product.name}</h3>
                <p style={priceStyle}>${product.price}</p>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}

/* =========================
   STYLES (Separados)
========================= */

const containerStyle = {
  padding: "80px 60px",
  minHeight: "70vh"
};

const titleStyle = {
  fontSize: "32px",
  marginBottom: "40px",
  fontWeight: 600
};

const gridCategoriesStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "30px"
};

const categoryCardStyle = {
  background: "white",
  padding: "40px",
  borderRadius: "16px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  cursor: "pointer",
  textAlign: "center" as const
};

const categoryTitleStyle = {
  fontSize: "20px",
  fontWeight: 500,
  letterSpacing: "1px"
};

const gridProductsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "40px",
  marginTop: "30px"
};

const productCardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  textAlign: "center" as const
};

const productImageStyle = {
  width: "100%",
  borderRadius: "12px",
  marginBottom: "20px"
};

const priceStyle = {
  color: "#D4AF37",
  fontWeight: 600,
  marginTop: "10px"
};

const backButtonStyle = {
  background: "none",
  border: "none",
  color: "#D4AF37",
  fontSize: "16px",
  cursor: "pointer",
  marginBottom: "20px"
};

