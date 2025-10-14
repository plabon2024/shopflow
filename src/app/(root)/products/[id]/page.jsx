"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { Star, ShoppingCart, ChevronLeft } from "lucide-react";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { addToCart } = useCart();

  // Get product ID from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathId = window.location.pathname.split("/").pop();
      setId(pathId);
    }
  }, []);

  // Fetch product details
  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetch(`/api/products/${id}`, { next: { revalidate: 60 } })
      .then((res) => res.json())
      .then((data) => setProduct(data.product || null))
      .catch((err) => {
        console.error(err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch other products
  useEffect(() => {
    fetch(`/api/products/popular`, { next: { revalidate: 60 } })
      .then((res) => res.json())
      .then((data) => setOtherProducts(data.data || []))
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center bg-background">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product.stock || quantity < 1) return;
    addToCart(product, quantity);
    alert(`${product.name} added to cart!`);
  };

  // Mock thumbnail images (use product.images array if available)
  const thumbnails = product.images || [product.image];

  // Calculate discount percentage
  const originalPrice = product.originalPrice || product.price * 1.14;
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDEBAR: Other products */}
          <aside className="w-full lg:w-64 flex-shrink-0 order-2 lg:order-1">
            <div className="sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-foreground font-sans">
                Similar Products
              </h2>
              {otherProducts.length === 0 ? (
                <p className="text-muted-foreground text-sm">No other products.</p>
              ) : (
                <div className="space-y-3">
                  {otherProducts.slice(0, 5).map((item) => (
                    <Link key={item._id} href={`/products/${item._id}`}>
                      <div className="flex gap-3 items-center p-3 bg-card border border-border rounded-lg hover:shadow-md hover:border-primary/50 cursor-pointer transition">
                        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-card-foreground truncate">
                            {item.name}
                          </p>
                          <p className="text-sm text-primary font-bold">
                            ${item.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* MAIN PRODUCT DETAIL */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="bg-muted rounded-2xl p-8 flex items-center justify-center aspect-square">
                  <Image
                    src={thumbnails[selectedImage]}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Thumbnail Images */}
                {thumbnails.length > 1 && (
                  <div className="flex gap-3">
                    {thumbnails.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`bg-muted rounded-lg p-3 aspect-square w-24 flex items-center justify-center transition ${
                          selectedImage === index
                            ? "ring-2 ring-primary"
                            : "hover:ring-2 hover:ring-border"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column - Product Details */}
              <div className="space-y-6">
                {/* Product Name */}
                <h1 className="text-4xl md:text-5xl font-bold text-foreground font-sans">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : i < product.rating
                            ? "fill-primary/50 text-primary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground font-semibold">
                    ({product.rating.toFixed(1)})
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {discount > 0 && (
                    <span className="text-2xl text-muted-foreground line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Product Details Table */}
                <div className="space-y-4 py-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground font-semibold">Brand</span>
                      <span className="text-foreground">{product.brand || "Generic"}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground font-semibold">Color</span>
                      <span className="text-foreground">{product.color || "Multi"}</span>
                    </div>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground font-semibold">Category</span>
                    <span className="text-foreground">{product.category}</span>
                  </div>
                </div>

                {/* Stock Status */}
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-primary font-semibold">
                      In Stock ({product.stock} available)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span className="text-destructive font-semibold">Out of Stock</span>
                  </div>
                )}

                {/* Quantity Selector */}
                {product.stock > 0 && (
                  <div className="space-y-3">
                    <label className="text-muted-foreground font-semibold block">
                      Quantity
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border-2 border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="px-6 py-3 bg-muted hover:bg-muted/80 text-foreground font-bold transition"
                        >
                          -
                        </button>
                        <span className="px-8 py-3 bg-background text-foreground font-bold text-lg">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            setQuantity((q) => (q < product.stock ? q + 1 : q))
                          }
                          className="px-6 py-3 bg-muted hover:bg-muted/80 text-foreground font-bold transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 bg-card hover:bg-muted border-2 border-border text-foreground font-bold py-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    disabled={product.stock === 0}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}