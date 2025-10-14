
import { FeaturesSection } from "@/components/Home/FeaturesSection/FeaturesSection";
import { Hero } from "@/components/Home/Hero/Hero";
import ProductHighlight from "@/components/Home/ProductHighlight/ProductHighlight";
import Sale from "@/components/Home/Sale/Sale";
import { Testimonials } from "@/components/Home/Testimonials/Testimonials";

export default function page() {
  return (
    <div>
      <Hero></Hero>
      <div className="container mx-auto p-4">
        <FeaturesSection></FeaturesSection>
        <ProductHighlight></ProductHighlight>
        <Sale></Sale>
        <Testimonials></Testimonials>
      </div>
    </div>
  );
}
