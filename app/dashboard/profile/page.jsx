"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function DashboardProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Profile
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Account summary from your session. Full profile page includes more
          mock fields.
        </p>
      </div>

      <div className="card space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center text-xl font-bold">
            {user?.email?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
              {user?.email ?? "Signed in user"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Firebase auth
            </p>
          </div>
        </div>
        <Link
          href="/profile"
          className="inline-flex text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Open full profile →
        </Link>
      </div>
    </div>
  );
}
