import { Hero } from "@/components/sections/Hero";
import ProductHighlight from "@/components/sections/ProductHighlight";
import React from "react";

export default function page() {
  return (
    <div>
      <Hero></Hero>
      <div className="container mx-auto">
        <ProductHighlight></ProductHighlight>
      </div>
    </div>
  );
}
