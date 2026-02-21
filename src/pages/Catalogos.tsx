import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";

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
  const params = useParams<{ categoryId?: string }>();
  const [, setLocation] = useLocation();

  const categoryId = params?.categoryId
    ? Number(params.categoryId)
    : null;

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  /* =========================
     LOAD CATEGORIES
  ========================= */
  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  /* =========================
     LOAD PRODUCTS BY URL
  ========================= */
  useEffect(() => {
    if (!categoryId) return;

    fetch(`/api/products?categoryId=${categoryId}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.result || data);
      })
      .catch(err => console.error(err));
  }, [categoryId]);

  /* =========================
     RENDER
  ========================= */
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Catálogos Miyuki</h1>

      {/* =========================
         CATEGORY VIEW
      ========================= */}
      {!categoryId && (
        <div style={gridCategoriesStyle}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setLocation(`/catalogos/${cat.id}`)}
              style={categoryCardStyle}
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
      {categoryId && (
        <div>
          <button
            onClick={() => setLocation("/catalogos")}
            style={backButtonStyle}
          >
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
  cursor: "pointer"
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
  textAlign: "center" as const
};

const productImageStyle = {
  width: "100%",
  height: "220px",
  objectFit: "contain" as const,
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