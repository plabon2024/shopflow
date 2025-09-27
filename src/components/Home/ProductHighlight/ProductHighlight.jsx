"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "../../product/ProductCard";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

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
        setProducts(topRated);
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

  // react-slick settings
 const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],}


  return (
    <>
      <h1 className="text-primary font-bold text-2xl text-center">
        Highlited product
      </h1>
      <div className="w-full overflow-visible py-10 mx-auto ">
        <Slider {...settings} >
          {products.map((product) => (
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
        </Slider>
      </div>
      {/* </div> */}
    </>
  );
}
