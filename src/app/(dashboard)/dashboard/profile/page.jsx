"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Mail, User, Shield, LogIn, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-muted-foreground">
        Please log in to view your profile.
      </div>
    );
  }

  const user = session.user || {};
  const role = user.role || "customer";
  const provider = user.provider || "credentials";

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/70 to-primary/30 text-white rounded-xl p-6 shadow-md flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome back, {user.name?.split(" ")[0] || "User"} 👋
          </h1>
          <p className="text-sm opacity-90">
            Here’s your profile summary and account details.
          </p>
        </div>
        <Avatar className="w-16 h-16 mt-4 sm:mt-0 border-2 border-white">
          <AvatarImage src={user.image || ""} />
          <AvatarFallback className="bg-white text-indigo-600 font-semibold">
            {user.name?.[0] || "U"}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Profile Info */}
      <Card className="border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-500" /> Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="text-base font-medium">
                {user.name || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="text-base font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-500" />
                {user.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p
                className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full ${
                  role === "admin"
                    ? "bg-red-100 text-red-700"
                    : role === "seller"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                <Shield className="w-4 h-4" />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Auth Provider</p>
              <p className="text-base font-medium flex items-center gap-2">
                <LogIn className="w-4 h-4 text-indigo-500" />
                {provider.charAt(0).toUpperCase() + provider.slice(1)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role-based Summary */}
      <Card className="border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {role === "admin"
              ? "Admin Overview"
              : role === "seller"
              ? "Seller Summary"
              : "Customer Summary"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          {role === "admin" && (
            <p>
              You have full access to manage users, products, and system
              reports. Monitor performance and ensure smooth operation across
              the platform.
            </p>
          )}
          {role === "seller" && (
            <p>
              You can manage your tech listings, track sales, and view order
              performance to improve your store results.
            </p>
          )}
          {role === "user" && (
            <p>
              You can explore tech products, view your order history, and
              receive personalized recommendations based on your interests.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
