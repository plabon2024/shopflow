"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SigninForm } from "./SigninForm";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/"); 
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  // Only render signup form if not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SigninForm />
        </div>
      </div>
    );
  }

  return null; // while redirecting
}
