import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@shared/schema';

// Tipo para los items del carrito
export interface CartItem {
  product: Product;
  quantity: number;
}

// Tipo para el contexto del carrito
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: string;
}

// Valor por defecto para el contexto
const defaultCartContext: CartContextType = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: '$0',
};

// Crear el contexto
const CartContext = createContext<CartContextType>(defaultCartContext);

// Hook personalizado para usar el contexto
export const useCart = () => useContext(CartContext);

// Proveedor del contexto
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado para los items del carrito
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Cargar el carrito desde localStorage cuando el componente se monta
  useEffect(() => {
    const savedCart = localStorage.getItem('miyukiCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error al cargar el carrito desde localStorage:', error);
      }
    }
  }, []);
  
  // Guardar el carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('miyukiCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Función para agregar un producto al carrito
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      // Buscar si el producto ya está en el carrito
      const existingItemIndex = prev.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcular el número total de items en el carrito
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calcular el precio total
  const calculateTotalPrice = (): string => {
    const totalNumeric = cartItems.reduce((total, item) => {
      // Extraer el valor numérico eliminando el símbolo de moneda
      const priceValue = parseFloat(item.product.price.replace(/[^0-9.-]+/g, ""));
      return total + (priceValue * item.quantity);
    }, 0);
    
    return `$${totalNumeric.toFixed(0)}`;
  };

  const totalPrice = calculateTotalPrice();

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;