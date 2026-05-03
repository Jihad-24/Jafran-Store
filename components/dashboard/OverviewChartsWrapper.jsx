"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { getOverviewStats, getChartData } from "@/lib/mockDashboardApi";
import OverviewCharts from "./OverviewCharts";

export default function AdminOverview() {
const { role } = useAuth();
  const { isDark } = useTheme();

  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;

    setLoading(true);

    Promise.all([
      getOverviewStats(role),
      getChartData(role),
    ])
      .then(([s, c]) => {
        if (!cancel) {
          setStats(s);
          setCharts(c);
        }
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });

    return () => (cancel = true);
  }, [role]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 rounded-2xl bg-gray-200/80 dark:bg-gray-800/80 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.cards?.map((c) => (
          <div key={c.id} className="card">
            <p className="text-xs uppercase text-gray-500">{c.label}</p>
            <p className="text-2xl font-bold mt-2">{c.value}</p>
            <p className="text-xs text-gray-400 mt-2">{c.hint}</p>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      {charts && (
        <OverviewCharts
          barData={charts.barData}
          lineData={charts.lineData}
          pieData={charts.pieData}
          isDark={isDark}
        />
      )}
    </div>
  );
}