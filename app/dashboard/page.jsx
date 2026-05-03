"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { getOverviewStats, getChartData } from "@/lib/mockDashboardApi";
import OverviewCharts from "@/components/dashboard/OverviewCharts";

export default function DashboardOverviewPage() {
  const { dashboardRole } = useAuth();
  const { isDark } = useTheme();
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([getOverviewStats(dashboardRole), getChartData(dashboardRole)])
      .then(([s, c]) => {
        if (!cancelled) {
          setStats(s);
          setCharts(c);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [dashboardRole]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Overview
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Mock data loaded asynchronously — swap{" "}
          <code className="text-xs bg-gray-200 dark:bg-gray-800 px-1 rounded">mockDashboardApi</code>{" "}
          for real API calls later.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-gray-200/80 dark:bg-gray-800/80 animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.cards.map((c) => (
            <div key={c.id} className="card">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {c.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-50 mt-2 tabular-nums">
                {c.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{c.hint}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && charts && (
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
