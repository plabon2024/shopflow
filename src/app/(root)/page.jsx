import { Hero } from "@/components/Home/Hero/Hero";
import ProductHighlight from "@/components/Home/ProductHighlight/ProductHighlight";
import Sale from "@/components/Home/Sale/Sale";

export default function page() {
  return (
    <div>
      <Hero></Hero>
      <div className="container mx-auto p-4">

        <ProductHighlight></ProductHighlight>
        <Sale></Sale>
      </div>
    </div>
  );
}
