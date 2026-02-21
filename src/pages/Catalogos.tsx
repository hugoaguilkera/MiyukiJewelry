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
  categoryId?: number;
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
    setProducts(data.result || data);
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
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
              }}
            >
              <div style={categoryImageStyle}>
                <span style={{ color: "#aaa" }}>Miyuki</span>
              </div>

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
              <div
                key={product.id}
                style={productCardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
                }}
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={productImageStyle}
                />
                <h3 style={{ fontWeight: 500 }}>{product.name}</h3>
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
   STYLES
========================= */

const containerStyle = {
  padding: "100px 60px",
  minHeight: "70vh",
  backgroundColor: "#faf9f6"
};

const titleStyle = {
  fontSize: "34px",
  marginBottom: "50px",
  fontWeight: 600,
  letterSpacing: "1px"
};

const gridCategoriesStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "40px"
};

const categoryCardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "20px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  textAlign: "center" as const,
  cursor: "pointer",
  transition: "all 0.3s ease"
};

const categoryImageStyle = {
  width: "100%",
  height: "160px",
  borderRadius: "14px",
  marginBottom: "15px",
  backgroundColor: "#f0f0f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const categoryTitleStyle = {
  fontSize: "18px",
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
  borderRadius: "20px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  textAlign: "center" as const,
  transition: "all 0.3s ease",
  cursor: "pointer"
};

const productImageStyle = {
  width: "100%",
  height: "220px",
  objectFit: "contain",
  backgroundColor: "#f5f5f5",
  borderRadius: "14px",
  marginBottom: "20px",
  padding: "10px"
};

const priceStyle = {
  color: "#D4AF37",
  fontWeight: 600,
  marginTop: "10px",
  fontSize: "16px"
};

const backButtonStyle = {
  background: "none",
  border: "none",
  color: "#D4AF37",
  fontSize: "16px",
  cursor: "pointer",
  marginBottom: "30px"
};
