import {
  Headphones,
  Package,
  Shield,
  Truck
} from "lucide-react";


// ======= 1. FEATURES SECTION =======
export const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck className="w-10 h-10 text-primary" />,
      title: "Free Delivery",
      description: "Free shipping on orders over $50",
    },
    {
      icon: <Shield className="w-10 h-10 text-primary" />,
      title: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: <Headphones className="w-10 h-10 text-primary" />,
      title: "24/7 Support",
      description: "Dedicated customer support team",
    },
    {
      icon: <Package className="w-10 h-10 text-primary" />,
      title: "Easy Returns",
      description: "30-day money back guarantee",
    },
  ];

  return (
    <section className="container mx-auto px-5 md:px-10 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative w-full bg-primary/5
                       border border-transparent hover:border-primary
                      text-white text-start p-10
                       hover:bg-[radial-gradient(51.72%_51.72%_at_50%_92.16%,_rgba(31,255,165,0.2)_0%,_rgba(31,255,165,0.02)_100%)] 
                       transition-all duration-300 rounded-lg"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-card-foreground mb-2 font-sans">
              {feature.title}
            </h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
