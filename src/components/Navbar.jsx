"use client";

import { MenuIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useSession } from "next-auth/react";
export default function Navbar() {
  const { data, status } = useSession();
  console.log("nav 13:", status);
  console.log("nav 13:", data);
  return (
    <section className="py-4  sticky top-0 backdrop-blur-3xl bg-primary/30 z-50">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between px-4">
          <span>
            <Logo></Logo>
          </span>

          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/">Home</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/signup">Sign Up</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/signin">Sign In</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {status === "authenticated" ? (
              <Link href="/dashbord">
                {" "}
                <Button>{data?.user?.name}</Button>
              </Link>
            ) : (
              <>
                {" "}
                <Link href="/signin">
                  <Button>Sign in</Button>
                </Link>
              </>
            )}
            <ThemeToggle></ThemeToggle>
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Logo></Logo>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  <Link href="/" className="font-medium">
                    Home
                  </Link>
                  <Link href="/signin" className="font-medium">
                    Sign In
                  </Link>
                  <Link href="/" className="font-medium">
                    Sign Up
                  </Link>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {status === "authenticated" ? (
                    <Link href="/dashbord">
                      {" "}
                      <Button>{data?.user?.name}</Button>
                    </Link>
                  ) : (
                    <>
                      {" "}
                      <Link href="/signin">
                        <Button>Sign in</Button>
                      </Link>
                    </>
                  )}

                  <ThemeToggle></ThemeToggle>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
}
