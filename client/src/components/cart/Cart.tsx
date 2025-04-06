import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Minus, Plus, X, ShoppingBag } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

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

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label="Abrir carrito"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Carrito de Compras
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-auto py-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10 text-muted-foreground">
              <ShoppingBag className="h-12 w-12 mb-3 opacity-20" />
              <h3 className="text-lg font-medium mb-1">Tu carrito está vacío</h3>
              <p className="text-sm max-w-xs">
                Parece que aún no has agregado ningún producto a tu carrito de compras.
              </p>
              <SheetClose asChild>
                <Button variant="outline" className="mt-6" onClick={() => setIsOpen(false)}>
                  Continuar Comprando
                </Button>
              </SheetClose>
            </div>
          ) : (
            <ul className="space-y-5">
              {cartItems.map((item) => (
                <li 
                  key={item.product.id}
                  className="flex items-start gap-3 pb-4 border-b last:border-0"
                >
                  <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-base truncate pr-6 relative">
                      {item.product.name}
                      <button 
                        onClick={() => handleRemove(item.product.id)}
                        className="absolute right-0 top-0 text-gray-400 hover:text-red-500"
                        aria-label="Eliminar producto"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </h4>
                    <p className="text-muted-foreground text-sm mb-2">
                      {item.product.price}
                    </p>
                    
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => handleDecrement(item.product.id, item.quantity)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => handleIncrement(item.product.id, item.quantity)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <SheetFooter className="flex-col border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total</span>
              <span className="text-lg font-bold">{totalPrice}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <SheetClose asChild>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Continuar Comprando
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild>
                  <Link href="/checkout">
                    Finalizar Compra
                  </Link>
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;