"use client";

import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconLogout } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "../Logo/Logo";
import ThemeToggle from "../ThemeTogglebutton/ThemeToggle";
import { useCart } from "@/context/CartContext";
export default function Navbar() {
const { setUser } = useCart();

  const { data, status } = useSession();
if(data?.user){
  console.log(data.user)
  setUser(data.user)
}
  return (
    <section className="py-4  sticky top-0 backdrop-blur-3xl bg-primary/30 z-50">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between px-4">
          <Link href={"/"}>
            <Logo></Logo>
          </Link>

          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/">Home</NavigationMenuLink>
              </NavigationMenuItem>
              {status === "authenticated" ? (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/products">
                      Products{" "}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/dashboard">
                      Dashboard
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/dashboard/add-product">
                      Add Product
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              ) : (
                <>
                  {" "}
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/products">
                      Products{" "}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/signup">
                      Sign Up
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/signin">
                      Sign In
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {status === "authenticated" ? (
              <>
                <Link href="/dashboard">
                  {" "}
                  <Button className="cursor-pointer">{data?.user?.name}</Button>
                </Link>
                <div onClick={() => signOut()} className="cursor-pointer">
                  <IconLogout className="mr-2 h-4 w-4 " />
                </div>
              </>
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
                  {status === "authenticated" ? (
                    <>
                      {" "}
                      <Link href="/products" className="font-medium">
                        Products
                      </Link>
                      <Link href="/dashboard" className="font-medium">
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/add-product"
                        className="font-medium"
                      >
                        Add Products
                      </Link>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Link href="/products" className="font-medium">
                        Products
                      </Link>
                      <Link href="/signin" className="font-medium">
                        Sign In
                      </Link>
                      <Link href="/" className="font-medium">
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {status === "authenticated" ? (
                    <Link href="/dashboard">
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
