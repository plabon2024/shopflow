"use client";

import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../product/ProductCard";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

export default function ProductHighlight() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
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

  return (
    <div className="w-full py-10">
      <h1 className="text-primary font-bold text-2xl text-center mb-8">
        Highlighted Products
      </h1>
      <div className="container  mx-auto px-4">
        <Swiper
          modules={[Navigation, Autoplay]}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1536: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}{" "}
          <div ref={prevRef}>
            <PrevArrow />
          </div>
          <div ref={nextRef}>
            <NextArrow />
          </div>
        </Swiper>
      </div>
    </div>
  );
}
