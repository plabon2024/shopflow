"use client";

import { useCart } from "@/context/CartContext";
import { ChevronLeft, ChevronRight, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { data: session } = useSession();
  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxRate = 0.02;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Stripe

  const handleCheckout = async () => {
    if (!selectedAddress || selectedAddress.trim() === "") {
      toast.warning("Please enter your address before proceeding to checkout.");
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          userId: session?.user?._id,
          address: selectedAddress,
          promoCode: promoCode,
        }),
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url; // redirect to Stripe
      } else {
        toast.warning("Checkout error:", data);
        toast.warning("Could not start checkout. Try again.");
      }
    } catch (err) {
      toast.warning(err);
      toast.warning("Checkout failed. Try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Add some products to get started!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition font-semibold"
          >
            <ChevronLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-foreground">
                Your <span className="text-primary">Cart</span>
              </h1>
              <span className="text-muted-foreground text-lg">
                {cart.length} Items
              </span>
            </div>

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border mb-4">
              <div className="col-span-5 text-muted-foreground font-semibold">
                Product Details
              </div>
              <div className="col-span-2 text-muted-foreground font-semibold">
                Price
              </div>
              <div className="col-span-3 text-muted-foreground font-semibold">
                Quantity
              </div>
              <div className="col-span-2 text-muted-foreground font-semibold">
                Subtotal
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="bg-card rounded-lg p-4 border border-border hover:shadow-md transition"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Product Details */}
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={
                            item.image ||
                            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-card-foreground">
                          {item.name}
                        </h3>
                        {item.category && (
                          <p className="text-sm text-muted-foreground">
                            {item.category}
                          </p>
                        )}
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-destructive text-sm flex items-center gap-1 mt-1 hover:underline"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2">
                      <span className="text-card-foreground font-semibold">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="w-8 h-8 rounded bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground transition"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold text-card-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground transition"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-2">
                      <span className="text-card-foreground font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <Link
                href="/products"
                className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition"
              >
                <ChevronLeft className="w-5 h-5" />
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="px-6 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">
                Order Summary
              </h2>

              {/* Address Selection */}
              <div className="mb-6">
                <label className="text-muted-foreground font-semibold mb-2 block">
                  TYPE ADDRESS
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedAddress}
                    required
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    placeholder="Enter your address"
                    className="w-full bg-background border border-border rounded-lg p-3 pr-10 text-sm text-card-foreground focus:border-primary outline-none transition"
                  />
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="text-muted-foreground font-semibold mb-2 block">
                  PROMO CODE
                </label>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="w-full bg-background border border-border rounded-lg p-3 mb-3 text-card-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition">
                  Apply
                </button>
              </div>

              {/* Summary Details */}
              <div className="space-y-4 border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    ITEMS {cart.length}
                  </span>
                  <span className="text-card-foreground font-bold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Shipping Fee</span>
                  <span className="text-primary font-semibold">Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Tax (2%)</span>
                  <span className="text-card-foreground font-semibold">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="text-card-foreground font-bold text-lg">
                    Total
                  </span>
                  <span className="text-card-foreground font-bold text-2xl">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-lg mt-6 hover:bg-primary/90 transition shadow-md hover:shadow-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
