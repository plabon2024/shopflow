"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);

  // Get the id from the URL on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathId = window.location.pathname.split("/").pop();
      setId(pathId);
    }
  }, []);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/products/${id}`, { next: { revalidate: 60 } })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product || null);
      })
      .catch((err) => {
        console.error(err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

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

  return (
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
          <p className="">{product.category}</p>
          <p className="text-yellow-500 font-semibold">
            Rating: {product.rating}
          </p>
          <p className="">{product.description}</p>
          <p className="text-xl font-bold">${product.price}</p>
          {product.stock ? (
            <p className="text-green-600 font-semibold">In Stock</p>
          ) : (
            <p className="text-red-600 font-semibold">Out of Stock</p>
          )}
        </div>
      </div>
    </div>
  );
}
