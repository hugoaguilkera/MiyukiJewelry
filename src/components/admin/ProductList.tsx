import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, AlertCircle } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Product } from "@/lib/types";

const ProductList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["/api/products"],
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest("DELETE", `/api/products/${productId}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado exitosamente.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Hubo un problema al eliminar el producto. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
      console.error("Delete product error:", error);
    },
  });

  const handleDelete = (product: Product) => {
    setProductToDelete(product);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProductMutation.mutate(productToDelete.id);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-display font-bold mb-6">Productos actuales</h3>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-4" />
          <p className="text-lg font-medium text-destructive">
            Error al cargar los productos
          </p>
          <p className="text-muted-foreground mt-2">
            Por favor, intenta de nuevo más tarde.
          </p>
        </div>
      ) : products?.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-lg text-muted-foreground">
            No hay productos registrados.
          </p>
          <p className="text-muted-foreground mt-2">
            Agrega productos utilizando el formulario de arriba.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader className="bg-primary text-white">
              <TableRow>
                <TableHead className="py-3 px-4">Imagen</TableHead>
                <TableHead className="py-3 px-4">Nombre</TableHead>
                <TableHead className="py-3 px-4">Categoría</TableHead>
                <TableHead className="py-3 px-4">Precio</TableHead>
                <TableHead className="py-3 px-4">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: Product) => (
                <TableRow key={product.id} className="border-b border-gray-200">
                  <TableCell className="py-3 px-4">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="py-3 px-4">{product.name}</TableCell>
                  <TableCell className="py-3 px-4 capitalize">{product.category}</TableCell>
                  <TableCell className="py-3 px-4">{product.price}</TableCell>
                  <TableCell className="py-3 px-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-secondary hover:text-destructive transition duration-300"
                      onClick={() => handleDelete(product)}
                      disabled={deleteProductMutation.isPending}
                    >
                      {deleteProductMutation.isPending && productToDelete?.id === product.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={productToDelete !== null} onOpenChange={cancelDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el producto 
              "{productToDelete?.name}" de tu catálogo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductList;
