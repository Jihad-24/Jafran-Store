"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardSettingsPage() {
  const { dashboardRole, setDashboardRole } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Demo role switcher until your backend assigns roles.
        </p>
      </div>

      <div className="card space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Dashboard role (mock)
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Choose <strong>User</strong> for the 4-item sidebar or <strong>Admin</strong> for the
          6-item sidebar and admin-only sections.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setDashboardRole("user")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              dashboardRole === "user"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setDashboardRole("admin")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              dashboardRole === "admin"
                ? "bg-amber-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            }`}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}
