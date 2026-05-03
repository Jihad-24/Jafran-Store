"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardSectionLayout({ children }) {
  const { dashboardRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (dashboardRole !== "admin") {
      router.replace("/dashboard");
    }
  }, [dashboardRole, router]);

  if (dashboardRole !== "admin") {
    return (
      <div className="max-w-6xl mx-auto py-16 text-center text-sm text-gray-500 dark:text-gray-400">
        Redirecting to overview…
      </div>
    );
  }

  return children;
}
