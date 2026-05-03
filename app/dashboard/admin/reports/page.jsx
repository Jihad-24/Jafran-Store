"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "@/context/ThemeContext";
import { getReportMetrics } from "@/lib/mockDashboardApi";

export default function AdminReportsPage() {
  const { isDark } = useTheme();
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getReportMetrics().then((d) => {
      if (!cancelled) setData(d);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const grid = isDark ? "#374151" : "#e5e7eb";
  const tick = isDark ? "#9ca3af" : "#6b7280";

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Reports
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Extra operational chart from mock API (orders vs refunds by week).
        </p>
      </div>

      {!data && (
        <div className="h-64 rounded-2xl bg-gray-200/80 dark:bg-gray-800/80 animate-pulse" />
      )}

      {data && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card">
              <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Conversion
              </p>
              <p className="text-2xl font-bold tabular-nums mt-2 text-gray-900 dark:text-gray-50">
                {data.conversionRate}%
              </p>
            </div>
            <div className="card">
              <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                AOV
              </p>
              <p className="text-2xl font-bold tabular-nums mt-2 text-gray-900 dark:text-gray-50">
                ${data.avgOrderValue}
              </p>
            </div>
            <div className="card">
              <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Return rate
              </p>
              <p className="text-2xl font-bold tabular-nums mt-2 text-gray-900 dark:text-gray-50">
                {data.returnRate}%
              </p>
            </div>
          </div>

          <div className="card p-4 md:p-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Orders vs refunds (bar)
            </h2>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={grid} />
                  <XAxis dataKey="week" tick={{ fill: tick, fontSize: 12 }} />
                  <YAxis tick={{ fill: tick, fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#111827" : "#fff",
                      border: `1px solid ${grid}`,
                      borderRadius: 12,
                    }}
                  />
                  <Legend />
                  <Bar dataKey="orders" name="Orders" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="refunds" name="Refunds" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
