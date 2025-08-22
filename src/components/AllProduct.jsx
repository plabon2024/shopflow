"use client"
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";


export default function AllProduct() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary">Products</h1>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
      <ProductCard
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
      )}
    </div>
  );
}
