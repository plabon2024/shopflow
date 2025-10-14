"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // Set this from your auth system
  const [loading, setLoading] = useState(true);
  console.log(user, "from context");
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

  // Fetch server cart when user logs in
  useEffect(() => {
    if (user) {
      axios
        .get("/api/cart")
        .then((res) => {
          const serverCart = res.data.cart || [];
          mergeCarts(serverCart, cart);
        })
        .catch(console.error);
    }
  }, [user]);

  // Merge local cart with server cart
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

    // Send merged cart to server
    await axios.post("/api/cart/merge", { items: merged });
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

    if (user) {
      try {
        await axios.post("/api/cart/add", {
          productId: product._id,
          quantity,
        });
      } catch (err) {
        console.error("Server cart sync failed", err);
      }
    }
  };

  const updateQuantity = async (productId, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );

    if (user) {
      try {
        await axios.patch("/api/cart/update", { productId, quantity });
      } catch (err) {
        console.error("Server cart update failed", err);
      }
    }
  };

  const removeFromCart = async (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));

    if (user) {
      try {
        await axios.delete(`/api/cart/item/${productId}`);
      } catch (err) {
        console.error("Server cart remove failed", err);
      }
    }
  };

  const clearCart = async () => {
    setCart([]);
    if (user) {
      try {
        await axios.post("/api/cart/clear");
      } catch (err) {
        console.error(err);
      }
    }
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
