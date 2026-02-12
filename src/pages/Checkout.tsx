import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLocation, useRoute } from 'wouter';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus, ShoppingBag } from 'lucide-react';

// Esquema de validación para el formulario de checkout
const checkoutFormSchema = z.object({
  fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Por favor introduce un email válido'),
  phone: z.string().min(8, 'El teléfono debe tener al menos 8 dígitos'),
  street: z.string().min(3, 'La dirección debe tener al menos 3 caracteres'),
  neighborhood: z.string().min(3, 'La colonia debe tener al menos 3 caracteres'),
  city: z.string().min(2, 'La ciudad debe tener al menos 2 caracteres'),
  state: z.string().min(2, 'El estado debe tener al menos 2 caracteres'),
  zipCode: z.string().min(5, 'El código postal debe tener al menos 5 caracteres'),
  additionalInfo: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const Checkout = () => {
  const [, setLocation] = useLocation();
  const { cartItems, updateQuantity, removeFromCart, totalItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Si el carrito está vacío, redirige a la página principal
  useEffect(() => {
    if (cartItems.length === 0) {
      setLocation('/');
    }
    window.scrollTo(0, 0);
  }, [cartItems, setLocation]);

  // Inicializar el formulario
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      additionalInfo: '',
    },
  });

  // Manejador para enviar el formulario
  const onSubmit = (data: CheckoutFormValues) => {
    setIsSubmitting(true);

    // Simulación de envío
    setTimeout(() => {
      console.log('Datos del formulario:', data);
      console.log('Productos en el carrito:', cartItems);
      console.log('Total a pagar:', totalPrice);

      // Mostrar mensaje de éxito
      toast({
        title: '¡Pedido realizado con éxito!',
        description: 'Hemos recibido tu pedido y te contactaremos pronto.',
        duration: 5000,
      });

      // Limpiar el carrito y redirigir
      clearCart();
      setLocation('/');
      setIsSubmitting(false);
    }, 1500);
  };

  const handleIncrement = (productId: number, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Finalizar Compra
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Complete los detalles de envío para finalizar su pedido
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-medium mb-4">Información de Envío</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre completo</FormLabel>
                            <FormControl>
                              <Input placeholder="María González" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Correo electrónico</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="maria@ejemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input placeholder="55 1234 5678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Calle y número</FormLabel>
                          <FormControl>
                            <Input placeholder="Av. Siempreviva 742" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="neighborhood"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Colonia</FormLabel>
                            <FormControl>
                              <Input placeholder="Del Valle" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Código postal</FormLabel>
                            <FormControl>
                              <Input placeholder="03100" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ciudad</FormLabel>
                            <FormControl>
                              <Input placeholder="Ciudad de México" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                              <Input placeholder="CDMX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Información adicional (opcional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Instrucciones de entrega, referencias, etc."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full py-6"
                      >
                        {isSubmitting ? 'Procesando...' : 'Finalizar Pedido'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            
            {/* Resumen del pedido */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h3 className="text-xl font-medium mb-4">Resumen del Pedido</h3>
                
                {cartItems.length > 0 ? (
                  <>
                    <ul className="divide-y">
                      {cartItems.map((item) => (
                        <li 
                          key={item.product.id}
                          className="flex py-4 first:pt-0 items-center"
                        >
                          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                            <img 
                              src={item.product.imageUrl} 
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="ml-3 flex-1">
                            <h4 className="text-sm font-medium">{item.product.name}</h4>
                            <p className="text-sm text-gray-500">{item.product.price}</p>
                            
                            <div className="flex items-center mt-1">
                              <button 
                                onClick={() => handleDecrement(item.product.id, item.quantity)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="mx-2 text-sm">{item.quantity}</span>
                              <button 
                                onClick={() => handleIncrement(item.product.id, item.quantity)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="ml-auto font-medium">
                            {`$${parseFloat(item.product.price.replace(/[^0-9.-]+/g, "")) * item.quantity}`}
                          </div>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="border-t mt-4 pt-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Subtotal:</span>
                        <span>{totalPrice}</span>
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>Envío:</span>
                        <span>Calculado al finalizar</span>
                      </div>
                      <div className="flex justify-between mt-4 text-lg font-bold">
                        <span>Total:</span>
                        <span>{totalPrice}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
                    <ShoppingBag className="h-12 w-12 mb-3 opacity-20" />
                    <p>Tu carrito está vacío</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;