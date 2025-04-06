import { useEffect } from "react";
import ProductForm from "@/components/admin/ProductForm";
import ProductList from "@/components/admin/ProductList";
import SeoAudit from "@/components/admin/SeoAudit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="admin" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Panel de Administración
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Gestiona el catálogo de productos, analiza el SEO y administra tu tienda.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="products" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="seo">Auditoría SEO</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              <div className="space-y-10">
                <ProductForm />
                <ProductList />
              </div>
            </TabsContent>
            
            <TabsContent value="seo">
              <SeoAudit />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Admin;
