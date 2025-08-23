"use client";

import { useSession } from "next-auth/react";

export default function page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading profile...</p>;
  }

  if (!session) {
    return <p>You need to log in to see your profile.</p>;
  }

  const user = session.user;

  return (
    <div className="max-w-md mx-auto p-6 shadow-secondary shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      
      <div className="space-y-3">
        <div>
          <strong>Name:</strong> {user.name}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Role:</strong> {user.role || "Not assigned"}
        </div>
        <div>
          <strong>Provider:</strong> {user.provider || "Credentials"}
        </div>
      </div>
    </div>
  );
}
