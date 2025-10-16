"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DollarSign, ShoppingCart, CheckCircle, Clock } from "lucide-react";
export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user || { name: "Guest", role: "customer" };
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user.role === "admin") {
      fetch("/api/admin/stats")
        .then((res) => res.json())
        .then((data) => setStats(data.stats));

      fetch("/api/admin/orders")
        .then((res) => res.json())
        .then((data) => setOrders(data.orders));

      fetch("/api/admin/users")
        .then((res) => res.json())
        .then((data) => setUsers(data.users));
    } else if (user._id) {
      fetch(`/api/orders?userId=${user._id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data.orders));
    }
  }, [user.role, user._id]);
 const statCards = [
      {
        title: "Total Revenue",
        value: `$${(stats.totalRevenue || 0).toLocaleString()}`,
        icon: DollarSign,
        iconColor: "text-green-600",
        bgColor: "bg-green-50",
        description: "Total earnings"
      },
      {
        title: "Total Orders",
        value: stats.totalOrders || 0,
        icon: ShoppingCart,
        iconColor: "text-blue-600",
        bgColor: "bg-blue-50",
        description: "All time orders"
      },
      {
        title: "Paid Orders",
        value: stats.paidOrders || 0,
        icon: CheckCircle,
        iconColor: "text-emerald-600",
        bgColor: "bg-emerald-50",
        description: "Completed payments"
      },
      {
        title: "Pending Orders",
        value: stats.pendingOrders || 0,
        icon: Clock,
        iconColor: "text-amber-600",
        bgColor: "bg-amber-50",
        description: "Awaiting payment"
      }
    ];
  const renderStats = () => (
    <Card className="border border-border shadow-sm">
      <CardHeader>
        <CardTitle>Stats Overview</CardTitle>
      </CardHeader>
      <CardContent>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      </CardContent>
    </Card>
  );

  const renderUsers = () => (
    <Card className="border border-border shadow-sm">
      <CardHeader>
        <CardTitle>Latest Users</CardTitle>
      </CardHeader>
      
      <CardContent>
        {users.length > 0 ? (
          <ul className="space-y-2">
            {users.map((u) => (
              <li
                key={u._id}
                className="flex items-center gap-3 border-b pb-2 text-sm"
              >
                <Avatar className="w-16 h-16 mt-4 sm:mt-0 border-2 border-white">
                  <AvatarImage src={u.image || ""} />
                  <AvatarFallback className="bg-white text-indigo-600 font-semibold">
                    {u.name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{u.name}</span>
                  <span className="text-xs text-gray-600">{u.email}</span>
                  <span className="text-xs text-gray-500">
                    Joined: {new Date(u.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No users found.</p>
        )}
      </CardContent>
    </Card>
  );

  const renderRecentOrders = () => (
    <Card className="border border-border shadow-sm">
      <CardHeader>
        <CardTitle>
          {user.role === "admin" ? "All Orders" : "Recent Orders"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <ul className="space-y-2">
            {orders.slice(0, 10).map((order) => (
              <li
                key={order._id}
                className="flex justify-between items-start border-b pb-2 text-sm"
              >
                <div className="flex-1">
                  <p className="font-medium">
                    {order.items.length === 1
                      ? order.items[0]?.name || "Unnamed product"
                      : `${order.items.length} items`}
                  </p>
                  {order.items.length > 1 && (
                    <p className="text-xs text-gray-600 mt-1">
                      {order.items.map((item) => item.name).join(", ")}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  {user.role === "admin" && (
                    <p className="text-xs font-semibold text-blue-500">
                      User: {order.userId}
                    </p>
                  )}
                </div>
                <p className="text-sm font-semibold ml-2">
                  ${order.totalAmount || order.amountTotal}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No orders found.</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-8">
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
            <Button variant="secondary">Profile</Button>
          </Link>
        </div>
      </div>

      {/* Show stats and users only for admin */}
      {user.role === "admin" && (
        <>
          {renderStats()}
          {renderUsers()}
        </>
      )}

      {renderRecentOrders()}
    </div>
  );
}
