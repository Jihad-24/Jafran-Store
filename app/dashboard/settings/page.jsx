"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardSettingsPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Settings
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Your account settings and role info.
        </p>
      </div>

      <div className="card space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Your Account Role
        </h2>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Role from database
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              user?.role === "admin"
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
            }`}
          >
            {user?.role || "user"}
          </span>
        </div>
      </div>
    </div>
  );
}
