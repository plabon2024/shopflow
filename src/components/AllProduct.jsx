"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function AllProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products",{
  next: { revalidate: 60 }})
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []); // ensure it's an array
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="h-screen flex justify-center items-center">
        Loading products...
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="h-screen flex justify-center items-center text-gray-500">
        No products found.
      </p>
    );
  }
console.log(products)
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4 text-primary">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
        {products.map((product) => (
          <ProductCard
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
    </div>
  );
}
