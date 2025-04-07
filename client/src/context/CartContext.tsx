import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../types";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("miyuki-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing saved cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("miyuki-cart", JSON.stringify(items));
  }, [items]);

  // Calculate total items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Add product to cart
  const addToCart = (product: Product) => {
    setItems(prevItems => {
      // Check if product is already in cart
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Increment quantity if product already exists
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new product with quantity 1
        return [...prevItems, { product, quantity: 1 }];
      }
    });
    
    toast({
      title: "Producto agregado",
      description: `${product.name} ha sido agregado al carrito.`,
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Update product quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
  };

  // Open cart
  const openCart = () => {
    setIsCartOpen(true);
  };

  // Close cart
  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
