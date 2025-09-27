"use client";
import { useState, useEffect } from "react";

export default function AddToCartButton({ productId, stock }) {
  // ✅ Initialize cart directly from localStorage
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("cart")) || [];
    }
    return [];
  });

  const [added, setAdded] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = () => {
    if (stock <= 0) return; // prevent adding out-of-stock items

    const exists = cart.find((item) => item.id === productId);

    if (exists) {
      // Increase quantity if already in cart
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // Add new product with quantity = 1
      setCart([...cart, { id: productId, quantity: 1 }]);
    }

    // Show "Added!" temporarily
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={stock <= 0}
      className={`px-6 py-2 rounded-lg text-white transition ${
        stock <= 0
          ? "bg-gray-400 cursor-not-allowed"
          : added
          ? "bg-primary"
          : "bg-accent-foreground/70  hover:bg-primary"
      }`}
    >
      {stock <= 0 ? "Out of Stock" : added ? "Added!" : "Add to Cart"}
    </button>
  );
}
