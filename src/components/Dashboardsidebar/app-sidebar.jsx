"use client";

import {
  IconDashboard,
  IconInnerShadowTop,
  IconListDetails,
  IconUser,
  IconSettings,
} from "@tabler/icons-react";

import { NavMain } from "@/components/Dashboardsidebar/nav-main";
import { NavUser } from "@/components/Dashboardsidebar/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "../Logo/Logo";

export function AppSidebar({ ...props }) {
  const { data: session } = useSession();

  const user = {
    name: session?.user?.name || "Guest",
    email: session?.user?.email || "guest@example.com",
    avatar: session?.user?.image || "",
    role: session?.user?.role || "user",
  };

  // Role-based menu items
  const menuItems = [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    // Add Product only for admin and seller
    ...(user.role === "admin" || user.role === "seller"
      ? [
          {
            title: "Add Product",
            url: "/dashboard/add-product",
            icon: IconListDetails,
          },
        ]
      : []),
    { title: "Profile", url: "/dashboard/profile", icon: IconUser },
  ];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <Logo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={menuItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
