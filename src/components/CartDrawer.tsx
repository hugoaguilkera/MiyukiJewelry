import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      
      {/* Overlay */}
      <div
        className="flex-1 bg-black/40"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="w-96 bg-white p-6 shadow-xl overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Carrito</h2>
          <button onClick={closeCart} className="text-gray-600">
            ✖
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío.</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.product.id} className="mb-4 border-b pb-4">
                <h3 className="font-medium">
                  {item.product.name}
                </h3>

                <p className="text-sm text-gray-600">
                  ${Number(item.product.price)}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="px-2 border rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="px-2 border rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      removeFromCart(item.product.id)
                    }
                    className="ml-auto text-red-500 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 border-t pt-4">
              <p className="text-lg font-semibold">
                Total: ${totalPrice}
              </p>

              <button
                onClick={clearCart}
                className="mt-4 w-full bg-gray-200 py-2 rounded"
              >
                Vaciar carrito
              </button>

              <button className="mt-3 w-full bg-black text-white py-2 rounded">
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
