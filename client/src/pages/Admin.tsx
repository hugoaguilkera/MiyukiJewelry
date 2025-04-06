import { useEffect } from "react";
import ProductForm from "@/components/admin/ProductForm";
import ProductList from "@/components/admin/ProductList";

const Admin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="admin" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Administración de Productos
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Gestiona el catálogo de productos, agrega nuevos artículos o elimina existentes.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <ProductForm />
          <ProductList />
        </div>
      </div>
    </section>
  );
};

export default Admin;
