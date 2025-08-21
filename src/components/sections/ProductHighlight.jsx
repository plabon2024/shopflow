import React from "react";
import ProductCard from "../ProductCard";

export default function ProductHighlight() {
  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <ProductCard
        image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
        name="Red Hat"
        category="Clothing"
        rating={4.5}
        description="A stylish red cap made with premium cotton, perfect for everyday wear."
        price={28.99}
        stock={true}
      />
    </div>
  );
}
