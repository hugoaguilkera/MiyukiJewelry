return (
  <div style={{ padding: "80px 60px", minHeight: "70vh" }}>

    <h1 style={{
      fontSize: "32px",
      marginBottom: "40px",
      fontWeight: 600
    }}>
      Catálogos Miyuki
    </h1>

    {!selectedCategory && (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "30px"
      }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => loadProducts(cat.id)}
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              cursor: "pointer",
              textAlign: "center"
            }}
          >
            <h3 style={{
              fontSize: "20px",
              fontWeight: 500,
              letterSpacing: "1px"
            }}>
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    )}

    {selectedCategory && (
      <div style={{ marginTop: "40px" }}>

        <button
          onClick={() => setSelectedCategory(null)}
          style={{
            background: "none",
            border: "none",
            color: "#D4AF37",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "30px"
          }}
        >
          ← Volver
        </button>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px"
        }}>
          {products.map((product: any) => (
            <div key={product.id} style={{
              background: "white",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              textAlign: "center"
            }}>
              <img
                src={product.image_url}
                alt={product.name}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  marginBottom: "20px"
                }}
              />
              <h3 style={{ fontWeight: 500 }}>{product.name}</h3>
              <p style={{
                color: "#D4AF37",
                fontWeight: 600,
                marginTop: "10px"
              }}>
                ${product.price}
              </p>
            </div>
          ))}
        </div>

      </div>
    )}

  </div>
);

