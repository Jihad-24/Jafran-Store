"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col md:flex-row">
      <DashboardSidebar />
      <main className="flex-1 min-w-0 p-4 md:p-8 pb-16">{children}</main>
    </div>
  );
}
