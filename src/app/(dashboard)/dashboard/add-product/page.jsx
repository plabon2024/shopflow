"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AddProduct from "./AddProduct";
import { Loader2 } from "lucide-react";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      // Only allow admins or sellers
      const role = session.user?.role;
      if (role !== "admin" && role !== "seller") {
        router.push("/"); // redirect unauthorized users
      } else {
        setCheckingAccess(false); // user is allowed
      }
    }
    if (status === "unauthenticated") {
      router.push("/"); // redirect unauthenticated users
    }
  }, [status, session, router]);

  if (status === "loading" || checkingAccess) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <AddProduct />;
}
