"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

import congratulation from "../../assets/congratulation";
import Lottie from "lottie-react";

export const dynamic = "force-dynamic";

function SuccessContent() {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setIsValid(false);
      return;
    }

    const verifySession = async () => {
      try {
        const res = await fetch(`/api/verify-session?session_id=${sessionId}`);
        const data = await res.json();
        setIsValid(data.valid);
      } catch (error) {
        console.error("Error verifying session:", error);
        setIsValid(false);
      }
    };

    verifySession();
  }, [sessionId]);

  if (isValid === null)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p>Checking payment status...</p>
      </div>
    );

  if (!isValid)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-semibold mb-2">Invalid or expired link</h1>
        <Button onClick={() => router.push("/")}>Go to Home</Button>
      </div>
    );

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center space-y-6">
    
  <div className="absolute inset-0 z-10">
    <Lottie
      animationData={congratulation}
      loop={false}
      className="h-screen w-full object-cover"
    />
  </div>
      <h1 className="text-3xl font-semibold">Payment Successful 🎉</h1>
      <p className="text-lg text-gray-600">
        Your payment was processed successfully.
      </p>

      <Button className={"cursor-pointer z-50"} onClick={() => router.push("/")}>Go to Home</Button>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SuccessContent />
    </Suspense>
  );
}
