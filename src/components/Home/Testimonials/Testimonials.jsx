"use client";

import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";

//  import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Verified Buyer",
      rating: 5,
      comment:
        "Amazing quality products and fast delivery! I've been shopping here for months and never disappointed.",
      avatar: "/avatar1.jpg",
    },
    {
      name: "Michael Chen",
      role: "Regular Customer",
      rating: 5,
      comment:
        "Best online shopping experience. The customer service team is incredibly helpful and responsive.",
      avatar: "/avatar2.jpg",
    },
    {
      name: "Emma Williams",
      role: "Premium Member",
      rating: 5,
      comment:
        "Great prices and authentic products. The return process is hassle-free. Highly recommended!",
      avatar: "/avatar3.jpg",
    },
    {
      name: "Sarah Johnson",
      role: "Verified Buyer",
      rating: 5,
      comment:
        "Amazing quality products and fast delivery! I've been shopping here for months and never disappointed.",
      avatar: "/avatar1.jpg",
    },
    {
      name: "Michael Chen",
      role: "Regular Customer",
      rating: 5,
      comment:
        "Best online shopping experience. The customer service team is incredibly helpful and responsive.",
      avatar: "/avatar2.jpg",
    },
    {
      name: "Emma Williams",
      role: "Premium Member",
      rating: 5,
      comment:
        "Great prices and authentic products. The return process is hassle-free. Highly recommended!",
      avatar: "/avatar3.jpg",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-5 md:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-sans">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it – hear from our satisfied customers
          </p>
        </div>

        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={3}
          spaceBetween={30}
          coverflowEffect={{
            rotate: -10,
            stretch: 0,
            depth: 70,
            modifier: 2,
            slideShadows: false,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={false}
          navigation={false}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="bg-card rounded-2xl p-6 shadow-md border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-4">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground font-sans">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground italic leading-relaxed">
                "{testimonial.comment}"
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
