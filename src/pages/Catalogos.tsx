import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";

/* =========================
   TYPES
========================= */
interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string | null;
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
      .then(data => setCategories(data.result || data))
      .catch(err => console.error(err));
  }, []);

  /* =========================
     LOAD PRODUCTS
  ========================= */
  useEffect(() => {
    if (!categoryId) return;

    fetch(`/api/products?categoryId=${categoryId}`)
      .then(res => res.json())
      .then(data => setProducts(data.result || data))
      .catch(err => console.error(err));
  }, [categoryId]);

  /* =========================
     RENDER
  ========================= */
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Categorías</h1>

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
              <div style={{ width: "100%", height: "220px" }}>
                {cat.image_url ? (
                  <img
                    src={cat.image_url}
                    alt={cat.name}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                ) : (
                  <div style={placeholderStyle}>
                    {cat.name}
                  </div>
                )}
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
                <h3 style={productTitleStyle}>{product.name}</h3>
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
  fontSize: "32px",
  marginBottom: "40px",
  fontWeight: 600
};

const gridCategoriesStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "40px"
};

const categoryCardStyle = {
  background: "white",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  cursor: "pointer"
};

const placeholderStyle = {
  width: "100%",
  height: "220px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f0f0f0",
  color: "#999",
  fontSize: "18px"
};

const categoryTitleStyle = {
  padding: "20px",
  textAlign: "center" as const,
  fontWeight: 500
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
  marginBottom: "20px"
};

const productTitleStyle = {
  fontWeight: 500
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
  cursor: "pointer",
  marginBottom: "20px"
};