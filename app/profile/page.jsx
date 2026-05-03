"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const MOCK_PROFILE = {
  displayName: "Alex Rivera",
  email: "alex.rivera@example.com",
  emailVerified: true,
  photoURL:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
  uid: "mock_user_7f3a9b2e1c8d4a56",
  signInMethod: "Google",
  memberSince: "2024-06-15T10:00:00.000Z",
  lastSignIn: "2026-05-02T14:30:00.000Z",
};

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [copied, setCopied] = useState(false);
  const p = MOCK_PROFILE;

  const copyUid = async () => {
    try {
      await navigator.clipboard.writeText(p.uid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Your profile
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Preview data (mock)
              </p>
            </div>
            <Link
              href="/items"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
            >
              Browse products →
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-lg overflow-hidden">
            <div className="p-8 flex flex-col sm:flex-row gap-6 sm:items-center border-b border-gray-200 dark:border-gray-800">
              {p.photoURL ? (
                <Image
                  src={p.photoURL}
                  alt=""
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-2xl object-cover border border-gray-200 dark:border-gray-700 shrink-0"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center text-3xl font-bold shrink-0">
                  {p.email.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {p.displayName}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 truncate mt-1">
                  {p.email}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.emailVerified ? (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300">
                      Email verified
                    </span>
                  ) : (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200">
                      Email not verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            <dl className="p-8 space-y-5 text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <dt className="text-gray-500 dark:text-gray-400">User ID</dt>
                <dd className="flex items-center gap-2 min-w-0">
                  <code className="text-gray-900 dark:text-gray-100 truncate font-mono text-xs sm:text-sm">
                    {p.uid}
                  </code>
                  <button
                    type="button"
                    onClick={copyUid}
                    className="shrink-0 text-indigo-600 dark:text-indigo-400 hover:underline text-xs font-medium"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <dt className="text-gray-500 dark:text-gray-400">Sign-in method</dt>
                <dd className="text-gray-900 dark:text-gray-100">{p.signInMethod}</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <dt className="text-gray-500 dark:text-gray-400">Member since</dt>
                <dd className="text-gray-900 dark:text-gray-100">
                  {new Date(p.memberSince).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <dt className="text-gray-500 dark:text-gray-400">Last sign-in</dt>
                <dd className="text-gray-900 dark:text-gray-100">
                  {new Date(p.lastSignIn).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </dd>
              </div>
            </dl>

            {user && (
              <div className="px-8 pb-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => logout()}
                  className="cursor-pointer px-5 py-2.5 rounded-xl border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
