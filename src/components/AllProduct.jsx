"use client"
import { useEffect, useState } from "react";


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
            <div
              key={product.id}
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-sm mt-2">{product.description}</p>
              <p className="mt-2 font-bold">${product.price}</p>
              <button
                onClick={() => router.push(`/products/${product.id}`)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
