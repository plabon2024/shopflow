"use client";

import React, { useEffect } from "react";
import { SignupForm } from "./SignupFrom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

 
  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </div>
    );
  }

  return null;
}
