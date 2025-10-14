"use client";

import { MenuIcon, ShoppingCart, Search, User } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconLogout, IconUser, IconDashboard } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "../Logo/Logo";
import ThemeToggle from "../ThemeTogglebutton/ThemeToggle";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart, setUser } = useCart();
  const { data, status } = useSession();

  // Calculate total items in cart
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (data?.user) {

    setUser(data.user);
  }

  return (
    <section className="py-4  sticky top-0 backdrop-blur-3xl bg-primary/30 z-50">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between px-4">
          {/* Logo */}
          <Link href={"/"}>
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/"
                  className="px-4 py-2 rounded-lg hover:bg-muted transition font-semibold"
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/products"
                  className="px-4 py-2 rounded-lg hover:bg-muted transition font-semibold"
                >
                  Products
                </NavigationMenuLink>
              </NavigationMenuItem>
              {status === "authenticated" && (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="/dashboard"
                      className="px-4 py-2 rounded-lg hover:bg-muted transition font-semibold"
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="/dashboard/add-product"
                      className="px-4 py-2 rounded-lg hover:bg-muted transition font-semibold"
                    >
                      Add Product
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Search Button */}
            {/* <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button> */}

            {/* Cart Button */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {status === "authenticated" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-2">
                    <p className="text-sm font-semibold">{data?.user?.name}</p>
                    <p className="text-xs text-muted-foreground">{data?.user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <IconDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <IconUser className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => signOut()} 
                    className="cursor-pointer text-destructive"
                  >
                    <IconLogout className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/signin">
                <Button>Sign in</Button>
              </Link>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="max-h-screen overflow-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-4">
                  {/* User Info */}
                  {status === "authenticated" && (
                    <div className="mb-6 p-4 bg-muted rounded-lg">
                      <p className="font-semibold">{data?.user?.name}</p>
                      <p className="text-sm text-muted-foreground">{data?.user?.email}</p>
                    </div>
                  )}

                  {/* Navigation Links */}
                  <div className="flex flex-col gap-4">
                    <Link href="/" className="font-medium py-2 hover:text-primary transition">
                      Home
                    </Link>
                    <Link href="/products" className="font-medium py-2 hover:text-primary transition">
                      Products
                    </Link>
                    {status === "authenticated" ? (
                      <>
                        <Link href="/dashboard" className="font-medium py-2 hover:text-primary transition">
                          Dashboard
                        </Link>
                        <Link href="/dashboard/add-product" className="font-medium py-2 hover:text-primary transition">
                          Add Products
                        </Link>
                        <Link href="/profile" className="font-medium py-2 hover:text-primary transition">
                          Profile
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href="/signin" className="font-medium py-2 hover:text-primary transition">
                          Sign In
                        </Link>
                        <Link href="/signup" className="font-medium py-2 hover:text-primary transition">
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>

                  {/* Mobile Actions */}
                  <div className="mt-6 flex flex-col gap-4 pt-4 border-t border-border">
                    {status === "authenticated" ? (
                      <Button 
                        onClick={() => signOut()} 
                        variant="destructive"
                        className="w-full"
                      >
                        <IconLogout className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    ) : (
                      <Link href="/signin">
                        <Button className="w-full">Sign in</Button>
                      </Link>
                    )}
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </section>
  );
}