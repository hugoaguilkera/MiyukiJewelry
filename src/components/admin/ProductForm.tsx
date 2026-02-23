import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productFormSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormData = z.infer<typeof productFormSchema>;

const ProductForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      imageUrl: "",
    },
  });

  const addProductMutation = useMutation({
    mutationFn: async (data: FormData) => {
      // 🔥 Conversión segura de categoría a ID real
      const categoryId = Number(data.category);

      if (!categoryId) {
        throw new Error("Categoría inválida");
      }

      const payload = {
        name: data.name.trim(),
        price: Number(data.price),
        image_url: data.imageUrl?.trim() || null,
        categoryId: categoryId,
      };

      console.log("PAYLOAD ENVIADO:", payload);

      const response = await apiRequest("POST", "/api/products", payload);

      return response.json();
    },

    onSuccess: () => {
      toast({
        title: "Producto agregado",
        description: "Guardado correctamente.",
      });

      form.reset();

      queryClient.invalidateQueries({
        queryKey: ["/api/products"],
      });
    },

    onError: (error: any) => {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Falló el guardado.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    addProductMutation.mutate(data);
  };

  return (
    <div className="bg-background rounded-lg shadow-md p-8">
      <h3 className="text-2xl font-display font-bold mb-6">
        Agregar nuevo producto
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* Nombre + Categoría */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del producto</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* 🔥 Enviamos ID REAL como value */}
                      <SelectItem value="1">Collares</SelectItem>
                      <SelectItem value="2">Pulseras</SelectItem>
                      <SelectItem value="3">Aretes</SelectItem>
                      <SelectItem value="4">Anillos</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          {/* Precio + Imagen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio ($)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de la imagen (Cloudinary)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://res.cloudinary.com/..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          {/* Descripción */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Botón */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={addProductMutation.isPending}
            >
              {addProductMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Agregar producto
            </Button>
          </div>

        </form>
      </Form>
    </div>
  );
};

export default ProductForm;