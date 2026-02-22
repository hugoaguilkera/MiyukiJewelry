import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productFormSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      imageUrl: "",
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const base64Image = await uploadImage(file);
      setPreviewImage(base64Image);
      form.setValue("imageUrl", base64Image);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cargar la imagen.",
        variant: "destructive",
      });
    }
  };

  // 🔥 CORRECCIÓN ALINEADA CON BACKEND
  const addProductMutation = useMutation({
    mutationFn: async (data: z.infer<typeof productFormSchema>) => {

      const categoryMap: Record<string, number> = {
        collares: 1,
        pulseras: 2,
        aretes: 3,
        anillos: 4,
      };

      const payload = {
        name: data.name,
        price: Number(data.price),
        image_url: data.imageUrl,
        categoryId: categoryMap[data.category],
      };

      const response = await apiRequest("POST", "/api/products", payload);

      if (!response.ok) {
        throw new Error("Error al insertar producto");
      }

      return response.json();
    },

    onSuccess: () => {
      toast({
        title: "Producto agregado",
        description: "El producto ha sido agregado exitosamente.",
      });

      form.reset();
      setPreviewImage(null);

      queryClient.invalidateQueries({
        queryKey: ["/api/products"],
      });
    },

    onError: (error) => {
      toast({
        title: "Error",
        description: "Hubo un problema al agregar el producto.",
        variant: "destructive",
      });
      console.error(error);
    },
  });

  const onSubmit = (data: z.infer<typeof productFormSchema>) => {
    addProductMutation.mutate(data);
  };

  return (
    <div className="bg-background rounded-lg shadow-md p-8">
      <h3 className="text-2xl font-display font-bold mb-6">
        Agregar nuevo producto
      </h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="collares">Collares</SelectItem>
                      <SelectItem value="pulseras">Pulseras</SelectItem>
                      <SelectItem value="aretes">Aretes</SelectItem>
                      <SelectItem value="anillos">Anillos</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio ($)</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
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
                  <FormLabel>Imagen</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Seleccionar imagen
                      </Button>
                    </>
                  </FormControl>

                  {previewImage && (
                    <div className="mt-2 h-20 w-20 overflow-hidden rounded-md">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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