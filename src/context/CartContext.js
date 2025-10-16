"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // Set this from your auth system
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
    setLoading(false);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (!loading) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, loading]);

  // Merge local cart with server cart (for future use)
  const mergeCarts = async (serverCart, localCart) => {
    const merged = [...serverCart];

    localCart.forEach((localItem) => {
      const idx = merged.findIndex(
        (item) => item.productId === localItem.productId
      );
      if (idx > -1) {
        merged[idx].quantity += localItem.quantity;
      } else {
        merged.push(localItem);
      }
    });

    setCart(merged);
  };

  const addToCart = async (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product._id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId: product._id, quantity, ...product }];
    });
  };

  const updateQuantity = async (productId, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = async (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = async () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        setUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
