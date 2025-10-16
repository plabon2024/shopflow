"use client";
import { useEffect, useState, useMemo } from "react";
import ProductCard from "./ProductCard";

export default function AllProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  // Sort state
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetch("/api/products", { next: { revalidate: 60 } })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Get unique categories dynamically
  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return Array.from(unique);
  }, [products]);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) =>
        selectedCategory ? product.category === selectedCategory : true
      )
      .filter((product) =>
        selectedRating ? product.rating >= Number(selectedRating) : true
      )
      .filter((product) => (inStockOnly ? product.stock > 0 : true));
  }, [products, searchTerm, selectedCategory, selectedRating, inStockOnly]);

  // Sorting logic
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "rating") return b.rating - a.rating;
      if (sortOption === "stock") return b.stock - a.stock;
      return 0;
    });
  }, [filteredProducts, sortOption]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedRating("");
    setInStockOnly(false);
  };

  if (loading) {
    return (
      <p className="h-screen flex justify-center items-center text-lg font-medium">
        Loading products...
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 flex gap-8">
      {/* ======= LEFT SIDEBAR FILTERS ======= */}
      <div className="w-64 bg-secondary rounded-lg p-4 shadow h-fit">
        <h2 className="text-lg font-semibold mb-4 ">Filters</h2>

        {/* Search */}
        <div className="mb-4">
          <label className="block text-sm font-medium  mb-1">Search</label>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium 0 mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm bg-secondary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium  mb-1">
            Minimum Rating
          </label>
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="w-full rounded-md border px-3 py-2 bg-secondary text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="1">1+ Stars</option>
          </select>
        </div>

        {/* In Stock Checkbox */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm ">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4 w-4"
            />
            In Stock Only
          </label>
        </div>

        {/* Clear All Filters */}
        <button
          onClick={clearFilters}
          className="w-full bg-accent cursor-pointer active:scale-95 rounded-md py-2 text-sm font-medium"
        >
          Clear All Filters
        </button>
      </div>

      {/* ======= MAIN PRODUCT CONTENT ======= */}
      <div className="flex-1">
        {/* Header with Sorting */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">
            Products ({sortedProducts.length})
          </h1>

          <div className="flex items-center bg-accent gap-2">
            <label
              htmlFor="sort"
              className="px-2 rounded-sm text-sm font-medium"
            >
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="rounded-md border bg-secondary text-primary border-gray-300 px-3 py-1 text-sm focus:outline-none"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating: High to Low</option>
              <option value="stock">Stock: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No products found matching your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[70vh]">
            {sortedProducts.map((product) => (
              <div key={product._id}>
                <ProductCard
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  category={product.category}
                  rating={product.rating}
                  description={product.description}
                  price={product.price}
                  stock={product.stock}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
