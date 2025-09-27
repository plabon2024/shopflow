"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

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

  if (loading)
    return (
      <p className="h-screen flex justify-center items-center">Loading...</p>
    );

  if (!product)
    return (
      <p className="h-screen flex justify-center items-center text-gray-500">
        Product not found.
      </p>
    );

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product.stock || quantity < 1) return;
    addToCart(product, quantity);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-[80vh] container mx-auto p-10 flex flex-col md:flex-row gap-8">
      {/* LEFT SIDEBAR: Other products */}
      <aside className="w-full md:w-1/4 flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4">Other Products</h2>
        {otherProducts.length === 0 ? (
          <p className="text-gray-500 text-sm">No other products.</p>
        ) : (
          otherProducts.map((item) => (
            <Link key={item._id} href={`/products/${item._id}`}>
              <div className="flex gap-3 items-center p-2 border rounded hover:shadow-md cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="object-cover rounded"
                />
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">${item.price}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </aside>

      {/* MAIN PRODUCT DETAIL */}
      <div className="min-h-[60vh] flex justify-center items-center p-10 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 shadow-md p-4">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="w-full md:w-1/2 h-auto object-cover rounded-lg"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p>{product.category}</p>
            <p className="text-yellow-500 font-semibold">
              Rating: {product.rating}
            </p>
            <p>{product.description}</p>
            <p className="text-xl font-bold">${product.price}</p>

            {product.stock ? (
              <p className="text-green-600 font-semibold">
                In Stock: {product.stock}
              </p>
            ) : (
              <p className="text-red-600 font-semibold">Out of Stock</p>
            )}

            {/* Quantity selector */}
            {product.stock > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 border rounded"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) =>
                      q < product.stock ? q + 1 : q
                    )
                  }
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>
            )}

            {/* Add to Cart */}
            {product.stock > 0 && (
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
