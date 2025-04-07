import { useCart } from "../../context/CartContext";
import { useToast } from "@/hooks/use-toast";

const CartDrawer = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    isCartOpen, 
    closeCart, 
    totalPrice 
  } = useCart();
  
  const { toast } = useToast();

  // Format price to currency
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const handleCheckout = () => {
    toast({
      title: "Procesando compra",
      description: "Tu pedido ha sido procesado correctamente.",
    });
    closeCart();
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white shadow-xl flex flex-col h-full">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-display text-xl font-bold">Carrito de Compras</h2>
          <button 
            className="text-[#333333] hover:text-[#D4AF37]" 
            onClick={closeCart}
            aria-label="Cerrar"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <i className="fas fa-shopping-bag text-4xl text-gray-300 mb-4"></i>
              <p className="text-lg font-medium mb-2">Tu carrito está vacío</p>
              <p className="text-gray-500 mb-4">Agrega algunos productos para continuar</p>
              <button 
                onClick={closeCart}
                className="px-4 py-2 border border-[#D4AF37] text-[#D4AF37] rounded-md hover:bg-[#D4AF37] hover:text-white transition-colors"
              >
                Explorar productos
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex border-b pb-4">
                  <img 
                    src={item.product.imageUrl || "https://via.placeholder.com/100x100?text=No+Image"} 
                    alt={item.product.name} 
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <button 
                        className="text-gray-400 hover:text-red-500" 
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label="Eliminar"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                    <p className="text-[#D4AF37] font-medium">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center mt-2">
                      <button 
                        className="w-6 h-6 bg-gray-200 rounded-l flex items-center justify-center hover:bg-gray-300" 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        aria-label="Disminuir cantidad"
                      >
                        -
                      </button>
                      <span className="w-8 h-6 bg-gray-100 flex items-center justify-center">{item.quantity}</span>
                      <button 
                        className="w-6 h-6 bg-gray-200 rounded-r flex items-center justify-center hover:bg-gray-300" 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subtotal:</span>
              <span className="font-medium">{formatPrice(totalPrice)}</span>
            </div>
            <button 
              className="w-full bg-[#D4AF37] hover:bg-opacity-90 text-white font-medium py-3 rounded-md shadow-md transition-colors mb-2"
              onClick={handleCheckout}
            >
              Finalizar Compra
            </button>
            <button 
              className="w-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-medium py-3 rounded-md transition-colors"
              onClick={closeCart}
            >
              Seguir Comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
