"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login"); // not logged in, redirect
        return;
      }

      const token = await firebaseUser.getIdToken();

      try {
        const res = await fetch("http://localhost:5000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUserInfo(data.user);
      } catch (err) {
        console.error("Failed to load user:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  if (loading) return <p className="p-4">Loading account...</p>;

  if (!userInfo) return <p className="p-4">User not found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Account</h1>

      <div className="border p-4 rounded space-y-2 bg-gray-50">
        <p>
          <strong>Email:</strong> {userInfo.email}
        </p>
        <p>
          <strong>Display Name:</strong> {userInfo.displayName}
        </p>
        <p>
          <strong>Firebase UID:</strong> {userInfo.firebaseUid}
        </p>
        {userInfo.photoURL && (
          <img
            src={userInfo.photoURL}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
        )}
      </div>
    </div>
  );
}
