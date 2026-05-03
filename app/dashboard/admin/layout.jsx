"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardSectionLayout({ children }) {
const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== "admin") {
      router.replace("/dashboard");
    }
  }, [role, router]);

  if (role !== "admin") {
    return (
      <div className="max-w-6xl mx-auto py-16 text-center text-sm text-gray-500 dark:text-gray-400">
        Redirecting to overview…
      </div>
    );
  }

  return children;
}
