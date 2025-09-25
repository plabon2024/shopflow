"use client";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "../src/components/ThemeTogglebutton/ThemeToggle";
export default function Logedinuser() {
  const { data, status } = useSession();
  console.log("nav 13:", status);
  console.log("nav 13:", data);
  return (
    <>
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
            <Link href="/dashboard/add-product" className="font-medium">
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
      </div>{" "}
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
    </>
  );
}
