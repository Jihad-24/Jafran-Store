"use client";

import { useAuth } from "@/context/AuthContext";
import AdminOverview from "@/components/dashboard/OverviewChartsWrapper";
import UserOverview from "@/components/dashboard/UserOverview";

export default function DashboardPage() {
  const { isAdmin, user } = useAuth();

  if (!user) return null;

  return isAdmin ? <AdminOverview /> : <UserOverview />;
}