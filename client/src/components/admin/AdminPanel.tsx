import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertProductSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Product } from "../../types";

// Product form schema (based on the insertProductSchema but with string validation)
const productFormSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  price: z.coerce.number().positive("El precio debe ser mayor a 0"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  imageUrl: z.string().url("Ingresa una URL válida para la imagen").or(z.literal("")),
  categoryId: z.coerce.number().int().positive("Selecciona una categoría válida")
});

type ProductFormData = z.infer<typeof productFormSchema>;

const AdminPanel = () => {
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Fetch products
  const { data: products, isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  const { 
    register, 
    handleSubmit, 
    reset,
    setValue,
    formState: { errors, isSubmitting } 
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      imageUrl: "",
      categoryId: 0
    }
  });
  
  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: (data: ProductFormData) => 
      apiRequest('POST', '/api/products', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      reset();
      toast({
        title: "Producto creado",
        description: "El producto ha sido creado exitosamente."
      });
    },
    onError: (error) => {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al crear el producto.",
        variant: "destructive"
      });
    }
  });
  
  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductFormData }) => 
      apiRequest('PUT', `/api/products/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      reset();
      setEditingProductId(null);
      toast({
        title: "Producto actualizado",
        description: "El producto ha sido actualizado exitosamente."
      });
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al actualizar el producto.",
        variant: "destructive"
      });
    }
  });
  
  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest('DELETE', `/api/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado exitosamente."
      });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al eliminar el producto.",
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: ProductFormData) => {
    if (editingProductId) {
      updateProductMutation.mutate({ id: editingProductId, data });
    } else {
      createProductMutation.mutate(data);
    }
  };
  
  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("description", product.description || "");
    setValue("imageUrl", product.imageUrl || "");
    setValue("categoryId", product.categoryId);
    
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDeleteProduct = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      deleteProductMutation.mutate(id);
    }
  };
  
  const handleCancelEdit = () => {
    setEditingProductId(null);
    reset();
  };

  return (
    <section className="py-16 bg-[#F8F8F8]">
      <div className="container mx-auto px-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="font-display text-3xl font-bold mb-6">Panel de Administración</h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Management Form */}
            <div className="md:w-1/2">
              <h3 className="font-display text-xl font-medium mb-4">
                {editingProductId ? "Editar Producto" : "Agregar Nuevo Producto"}
              </h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="product-name" className="block mb-2 font-medium">Nombre del Producto</label>
                  <input 
                    type="text" 
                    id="product-name" 
                    className={`w-full border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
                    placeholder="Nombre del producto"
                    {...register("name")}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="product-price" className="block mb-2 font-medium">Precio ($)</label>
                  <input 
                    type="number" 
                    id="product-price" 
                    step="0.01"
                    className={`w-full border ${errors.price ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
                    placeholder="0.00"
                    {...register("price")}
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="product-category" className="block mb-2 font-medium">Categoría</label>
                  <select 
                    id="product-category" 
                    className={`w-full border ${errors.categoryId ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
                    {...register("categoryId")}
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="1">Pulseras</option>
                    <option value="2">Collares</option>
                    <option value="3">Aretes</option>
                    <option value="4">Anillos</option>
                  </select>
                  {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="product-description" className="block mb-2 font-medium">Descripción</label>
                  <textarea 
                    id="product-description" 
                    rows={3} 
                    className={`w-full border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
                    placeholder="Descripción del producto"
                    {...register("description")}
                  ></textarea>
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="product-image" className="block mb-2 font-medium">URL de la Imagen</label>
                  <input 
                    type="text" 
                    id="product-image" 
                    className={`w-full border ${errors.imageUrl ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    {...register("imageUrl")}
                  />
                  {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>}
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    type="submit" 
                    className="flex-1 bg-[#D4AF37] hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md shadow-md transition-colors disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting 
                      ? "Guardando..." 
                      : editingProductId 
                        ? "Actualizar Producto" 
                        : "Agregar Producto"
                    }
                  </button>
                  
                  {editingProductId && (
                    <button 
                      type="button" 
                      className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-md transition-colors hover:bg-gray-100"
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
            
            {/* Product List */}
            <div className="md:w-1/2">
              <h3 className="font-display text-xl font-medium mb-4">Productos Existentes</h3>
              
              <div className="bg-[#F8F8F8] p-4 rounded-lg max-h-96 overflow-y-auto">
                {isLoadingProducts ? (
                  <div className="text-center py-4">Cargando productos...</div>
                ) : !products || products.length === 0 ? (
                  <div className="text-center py-4">No hay productos disponibles.</div>
                ) : (
                  products.map((product) => (
                    <div key={product.id} className="bg-white rounded-md shadow-sm p-4 mb-4 flex items-center">
                      <img 
                        src={product.imageUrl || "https://via.placeholder.com/100x100?text=No+Image"} 
                        alt={product.name} 
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div className="flex-grow">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-[#333333] text-opacity-70 text-sm">${product.price}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          className="text-[#5F9EA0] hover:text-opacity-80 transition-colors" 
                          onClick={() => handleEditProduct(product)}
                          aria-label="Editar"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          className="text-red-500 hover:text-opacity-80 transition-colors" 
                          onClick={() => handleDeleteProduct(product.id)}
                          aria-label="Eliminar"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
