"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

export default function ProductHighlight() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products", {
      next: { revalidate: 60 },
    })
      .then((res) => res.json())
      .then((data) => {
        const topRated = (data.data || []).filter((p) => p.rating >= 4);
        setProducts(topRated.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="h-40 flex justify-center items-center">
        Loading products...
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="h-40 flex justify-center items-center text-gray-500">
        No top-rated products found.
      </p>
    );
  }

  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
      {products.slice(0, 4).map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          image={product.image}
          name={product.name}
          category={product.category}
          rating={product.rating}
          description={product.description}
          price={product.price}
          stock={product.stock}
        />
      ))}
    </div>
  );
}
