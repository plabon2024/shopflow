"use client";

import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Settings,
  User,
  ShieldCheck,
  Globe,
  Loader2,
} from "lucide-react";

export default function SettingsPage() {
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
        Please log in to access your settings.
      </div>
    );
  }

  const user = session.user || {};
  const role = user.role || "user";

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-md flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Settings className="w-6 h-6" /> Account Settings
          </h1>
          <p className="text-sm opacity-90">
            Manage your preferences and privacy options.
          </p>
        </div>
      </div>

      {/* Account Settings */}
      <Card className="border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-indigo-500" /> Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <p className="text-muted-foreground">Full Name</p>
              <p className="font-medium">{user.name || "Not provided"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Role</p>
              <p
                className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full ${
                  role === "admin"
                    ? "bg-red-100 text-red-700"
                    : role === "seller"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Provider</p>
              <p className="font-medium capitalize">
                {user.provider || "credentials"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="w-5 h-5 text-indigo-500" /> Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <Separator />
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-muted-foreground text-xs">
                Receive updates and offers via email.
              </p>
            </div>
            <Switch disabled defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Order Updates</p>
              <p className="text-muted-foreground text-xs">
                Get real-time order tracking and status alerts.
              </p>
            </div>
            <Switch disabled defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Messages</p>
              <p className="text-muted-foreground text-xs">
                Get the latest deals and promotions.
              </p>
            </div>
            <Switch disabled />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="w-5 h-5 text-indigo-500" /> Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <Separator />
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-muted-foreground text-xs">
                Default: Light Mode
              </p>
            </div>
            <Switch disabled />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Language</p>
              <p className="text-muted-foreground text-xs">
                Default: English (US)
              </p>
            </div>
            <p className="text-muted-foreground text-xs italic">Static</p>
          </div>
        </CardContent>
      </Card>

      {/* Role-Based Section */}
      <Card className="border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldCheck className="w-5 h-5 text-indigo-500" /> Role-Based
            Access
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          {role === "admin" && (
            <p>
              As an <strong>Admin</strong>, you can manage platform users,
              moderate sellers, and review overall business analytics.
            </p>
          )}
          {role === "seller" && (
            <p>
              As a <strong>Seller</strong>, you can manage your inventory,
              handle customer orders, and track your sales performance.
            </p>
          )}
          {role === "user" && (
            <p>
              As a <strong>Customer</strong>, you can browse, purchase, and
              track your favorite tech products easily.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
