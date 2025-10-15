"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ShoppingBag,
  Users,
  DollarSign,
  Settings,
  Package,
  CreditCard,
  Truck,
  Heart,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user || { name: "Guest", role: "customer" };

  /** ------------ DUMMY DATA ------------- **/
  const commonEarningsData = [
    { month: "Jan", income: 25 },
    { month: "Feb", income: 40 },
    { month: "Mar", income: 75 },
    { month: "Apr", income: 50 },
    { month: "May", income: 60 },
    { month: "Jun", income: 30 },
    { month: "Jul", income: 45 },
    { month: "Aug", income: 70 },
    { month: "Sep", income: 55 },
    { month: "Oct", income: 85 },
    { month: "Nov", income: 40 },
    { month: "Dec", income: 65 },
  ];

  const adminStats = [
    {
      title: "Total Users",
      value: "1,482",
      icon: Users,
      change: "+12%",
      color: "text-indigo-600",
    },
    {
      title: "Total Products",
      value: "987",
      icon: ShoppingBag,
      change: "+14%",
      color: "text-green-600",
    },
    {
      title: "Total Sales",
      value: "$23,870",
      icon: DollarSign,
      change: "+16%",
      color: "text-purple-600",
    },
    {
      title: "Pending Orders",
      value: "12",
      icon: Settings,
      change: "-4%",
      color: "text-red-600",
    },
  ];

  const sellerStats = [
    {
      title: "Products Listed",
      value: "72",
      icon: Package,
      change: "+8%",
      color: "text-indigo-600",
    },
    {
      title: "Orders Received",
      value: "194",
      icon: Truck,
      change: "+12%",
      color: "text-green-600",
    },
    {
      title: "Monthly Revenue",
      value: "$4,830",
      icon: DollarSign,
      change: "+5%",
      color: "text-purple-600",
    },
    {
      title: "Pending Shipments",
      value: "5",
      icon: Settings,
      change: "-2%",
      color: "text-red-600",
    },
  ];

  const customerStats = [
    {
      title: "Orders Placed",
      value: "18",
      icon: ShoppingBag,
      change: "+3%",
      color: "text-indigo-600",
    },
    {
      title: "Total Spent",
      value: "$1,240",
      icon: CreditCard,
      change: "+9%",
      color: "text-green-600",
    },
    {
      title: "Wishlist Items",
      value: "6",
      icon: Heart,
      change: "+1%",
      color: "text-pink-600",
    },
    {
      title: "Active Deliveries",
      value: "2",
      icon: Truck,
      change: "0%",
      color: "text-gray-600",
    },
  ];

  /** ------------ DASHBOARD LAYOUTS ------------- **/

  const renderStats = (stats) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className="shadow-sm border border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p
              className={`text-xs ${
                stat.change.startsWith("+")
                  ? "text-green-600"
                  : stat.change.startsWith("-")
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderChart = (title = "Earnings Overview (2025)") => (
    <Card className="shadow-sm border border-border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            income: { label: "Income", color: "hsl(var(--chart-1))" },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={commonEarningsData}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="income"
                fill="hsl(var(--chart-1))"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );

  /** ------------ CONDITIONAL DASHBOARD RENDER ------------- **/

  const renderRoleDashboard = () => {
    switch (user.role) {
      case "admin":
        return (
          <>
            {renderStats(adminStats)}
            {renderChart("Platform Revenue Overview")}
          </>
        );

      case "seller":
        return (
          <>
            {renderStats(sellerStats)}
            {renderChart("Sales Performance (2025)")}
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button>Add Product</Button>
                <Button variant="outline">View Orders</Button>
                <Button variant="outline">Manage Inventory</Button>
              </CardContent>
            </Card>
          </>
        );

      case "customer":
      default:
        return (
          <>
            {renderStats(customerStats)}
            {renderChart("Monthly Spending (2025)")}
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Discover trending gadgets and accessories tailored to your
                interests.
              </CardContent>
            </Card>
          </>
        );
    }
  };

  /** ------------ MAIN LAYOUT ------------- **/

  return (
    <div className="p-6 space-y-8">
      {/* Greeting Header */}
      <div className="bg-gradient-to-r from-primary/70 to-primary/40 text-white rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow">
        <div>
          <h1 className="text-2xl font-semibold">
            Good Morning, {user.name?.split(" ")[0] || "User"} 👋
          </h1>
          <p className="text-sm opacity-90">
            Welcome back! Here’s your {user.role} dashboard overview.
          </p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Link href={"/dashboard/profile"}>
            {" "}
            <Button variant="secondary">Profile</Button>
          </Link>
        </div>
      </div>

      {/* Role Based Dashboard */}
      {renderRoleDashboard()}
    </div>
  );
}
