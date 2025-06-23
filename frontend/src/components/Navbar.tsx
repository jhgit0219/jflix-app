"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase";
import { Bell } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="w-full bg-background text-foreground px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-30">
        <div className="text-heading">
          <Link href="/">JFlix</Link>
        </div>

        <div className="hidden md:flex gap-12">
          <Link href="#" className="nav-link">
            What's New
          </Link>
          <Link href="#" className="nav-link">
            Movies
          </Link>
          <Link href="#" className="nav-link">
            Series
          </Link>
          <Link href="#" className="nav-link">
            Kids
          </Link>
          <Link href="#" className="nav-link">
            My List
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search"
          className="bg-surface text-sm text-foreground rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-red"
        />
        <Bell className="w-5 h-5 cursor-pointer" />

        {user ? (
          <Link href="/account" className="nav-link">
            Account
          </Link>
        ) : (
          <>
            <Link href="/login" className="nav-button nav-login">
              Login
            </Link>
            <Link href="/signup" className="nav-button nav-signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
