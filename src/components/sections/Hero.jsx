import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "../ProductCard";

export const Hero = () => {
  return (
    <>
      <section className=" flex justify-center items-center mx-auto relative overflow-hidden py-32 bg-gradient-to-b from-primary/30">
        <div className="relative z-10 container">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="flex flex-col items-center gap-6 text-center">
              <div>
                <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                  Discover Amazing Tech Products with
                  <span className="text-primary"> ShopFlow</span>
                </h1>
                <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                  Browse the latest gadgets and manage your store effortlessly
                  with ShopFlow.
                </p>
              </div>
              <div className="mt-6 flex justify-center gap-3">
                <Link href={"/products"}>
                  <Button className="shadow-sm transition-shadow hover:shadow">
                    Get Started
                  </Button>
                </Link>
                <Button variant="outline" className="group">
                  Learn more{" "}
                  <Link href={"/about"}>
                    <ExternalLink className="cursor-pointer ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
