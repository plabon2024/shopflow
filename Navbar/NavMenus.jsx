'use client'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useSession } from "next-auth/react";
export default function NavMenus() {
  const { data, status } = useSession();
  console.log("nav 13:", status);
  console.log("nav 13:", data);
  return (
    <div>
      {" "}
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
                <NavigationMenuLink href="/signup">Sign Up</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/signin">Sign In</NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
