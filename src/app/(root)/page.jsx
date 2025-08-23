import { Hero } from "@/components/sections/Hero";
import ProductHighlight from "@/components/sections/ProductHighlight";
import React from "react";

export default function page() {
  return (
    <div>
      <Hero></Hero>
      <div className="container mx-auto">
        <h1 className="text-primary font-bold text-2xl text-center">
          Highlited product
        </h1>
        <ProductHighlight></ProductHighlight>
      </div>
    </div>
  );
}
