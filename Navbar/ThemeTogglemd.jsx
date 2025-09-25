"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { IconLogout } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import ThemeToggle from "../src/components/ThemeTogglebutton/ThemeToggle";
export default function ThemeTogglemd() {
  const { data, status } = useSession();
  console.log("nav 13:", status);
  console.log("nav 13:", data);
  return (
    <div>
      {" "}
      <div className="hidden items-center gap-4 lg:flex">
        {status === "authenticated" ? (
          <>
            <Link href="/dashboard">
              {" "}
              <Button className="cursor-pointer">{data?.user?.name}</Button>
            </Link>
            <div onClick={() => signOut()} className="cursor-pointer">
              <IconLogout className="mr-2 h-4 w-4 " />
            </div>
          </>
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
    </div>
  );
}
