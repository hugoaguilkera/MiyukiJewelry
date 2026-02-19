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

  // 🔄 Cargar carrito desde localStorage
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

  // 💾 Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("miyuki-cart", JSON.stringify(items));
  }, [items]);

  // 🧮 Total de productos
  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // 💰 Total precio (FORZAMOS Number)
  const totalPrice = items.reduce(
    (sum, item) => sum + (Number(item.product.price) * item.quantity),
    0
  );

  // ➕ Agregar al carrito
  const addToCart = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.product.id === product.id
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { product, quantity: 1 }];
    });

    toast({
      title: "Producto agregado",
      description: `${product.name} ha sido agregado al carrito.`,
    });
  };

  // ➖ Remover producto
  const removeFromCart = (productId: number) => {
    setItems(prevItems =>
      prevItems.filter(item => item.product.id !== productId)
    );
  };

  // 🔢 Actualizar cantidad
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

  // 🧹 Limpiar carrito
  const clearCart = () => {
    setItems([]);
  };

  // 🛒 Control visual
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

