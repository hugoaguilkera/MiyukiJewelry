import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { insertProductSchema } from "@shared/schema";
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

type FormData = z.infer<typeof insertProductSchema>;

const ProductForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // 🔥 Cargar categorías reales desde Neon
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Error loading categories");
      return res.json();
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      categoryId: undefined as unknown as number,
      description: "",
      imageUrl: "",
    },
  });

  const addProductMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        name: data.name.trim(),
        price: Number(data.price),
        description: data.description?.trim() || null,
        imageUrl: data.imageUrl?.trim() || null,
        categoryId: Number(data.categoryId),
      };

      console.log("CATEGORY ENVIADA:", payload.categoryId);

      const response = await apiRequest("POST", "/api/products", payload);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al insertar producto");
      }

      return response.json();
    },

    onSuccess: () => {
      toast({
        title: "Producto agregado",
        description: "Guardado correctamente.",
      });

      form.reset({
        name: "",
        price: 0,
        categoryId: undefined as unknown as number,
        description: "",
        imageUrl: "",
      });

      queryClient.invalidateQueries({
        queryKey: ["/api/products"],
      });
    },

    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
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

          {/* Nombre */}
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

          {/* Categoría dinámica */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) =>
                      field.onChange(Number(value))
                    }
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((cat: any) => (
                        <SelectItem
                          key={cat.id}
                          value={String(cat.id)}
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Precio */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Imagen */}
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL de la imagen</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            <Button type="submit" disabled={addProductMutation.isPending}>
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