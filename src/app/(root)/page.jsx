import { Hero } from "@/components/Home/Hero/Hero";
import ProductHighlight from "@/components/Home/ProductHighlight/ProductHighlight";
import Sale from "@/components/Home/Sale/Sale";

export default function page() {
  return (
    <div>
      <Hero></Hero>
      <div className="container mx-auto">
        <ProductHighlight></ProductHighlight>
        <Sale></Sale>
      </div>
    </div>
  );
}
