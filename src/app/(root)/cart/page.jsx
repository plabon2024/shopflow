"use client";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  if (cart.length === 0)
    return <p className="p-10 text-center">Your cart is empty</p>;

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between items-center p-4 border rounded"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p>${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                }
                className="px-3 py-1 border rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity + 1)
                }
                className="px-3 py-1 border rounded"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.productId)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
