"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { getUsers, getOrders, getBanners } from "@/lib/adminApi";
import OverviewCharts from "./OverviewCharts";

export default function AdminOverview() {
  const { role, user } = useAuth();
  const { isDark } = useTheme();

  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      setLoading(true);

      try {
        const [users, orders, banners] = await Promise.all([
          getUsers(user?.email),
          getOrders(user?.email),
          getBanners(user?.email),
        ]);

        if (cancel) return;

        // ---------------- STATS ----------------
        const revenue = orders.reduce((sum, o) => sum + o.total, 0);

        setStats({
          cards: [
            {
              id: 1,
              label: "Users",
              value: users.length,
              hint: "Total users",
            },
            {
              id: 2,
              label: "Orders",
              value: orders.length,
              hint: "Total orders",
            },
            {
              id: 3,
              label: "Revenue",
              value: `$${revenue}`,
              hint: "Total earnings",
            },
            {
              id: 4,
              label: "Banners",
              value: banners.length,
              hint: "CMS banners",
            },
          ],
        });

        // ---------------- PIE CHART ----------------
        const pieDataRaw = [
          {
            name: "Pending",
            value: orders.filter((o) => o.status === "pending").length,
          },
          {
            name: "Processing",
            value: orders.filter((o) => o.status === "processing").length,
          },
          {
            name: "Completed",
            value: orders.filter((o) => o.status === "completed").length,
          },
          {
            name: "Cancelled",
            value: orders.filter((o) => o.status === "cancelled").length,
          },
        ];

        // remove empty values
        const pieData = pieDataRaw.filter((p) => p.value > 0);

        // fallback so chart never breaks
        const finalPieData =
          pieData.length > 0 ? pieData : [{ name: "No Orders", value: 1 }];

        const monthlyMap = {};

        orders.forEach((o) => {
          const date = new Date(o.createdAt || o.placedAt);
          const month = date.toLocaleString("default", { month: "short" });

          if (!monthlyMap[month]) {
            monthlyMap[month] = {
              month,
              users: 0,
              revenue: 0,
            };
          }

          monthlyMap[month].revenue += o.total;
        });

        users.forEach((u) => {
          const date = new Date(u.createdAt);
          const month = date.toLocaleString("default", { month: "short" });

          if (!monthlyMap[month]) {
            monthlyMap[month] = {
              month,
              users: 0,
              revenue: 0,
            };
          }

          monthlyMap[month].users += 1;
        });

        const lineData = Object.values(monthlyMap);

        // ---------------- CHARTS ----------------
        setCharts({
          barData: [
            {
              name: "Orders",
              sales: orders.length,
              listings: users.length,
            },
          ],
          lineData,
          pieData: finalPieData,
        });
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancel = true;
    };
  }, [user?.email]);

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
