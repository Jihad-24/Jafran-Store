"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

export default function UserOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://jafran-store-server.vercel.app/orders/user?email=${user.email}`,
        );

        const orders = res.data || [];

        // stats
        const totalOrders = orders.length;

        const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);

        const pendingOrders = orders.filter(
          (o) => o.status === "pending",
        ).length;

        setStats({
          totalOrders,
          totalSpent,
          pendingOrders,
          lastOrder: orders[0] || null,
        });

        // chart transform (group by date)
        const grouped = {};

        orders.forEach((o) => {
          const date = new Date(o.placedAt).toLocaleDateString();

          if (!grouped[date]) {
            grouped[date] = {
              date,
              orders: 0,
              spent: 0,
            };
          }

          grouped[date].orders += 1;
          grouped[date].spent += o.total || 0;
        });

        setChartData(Object.values(grouped));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-gray-200/80 dark:bg-gray-800/80 animate-pulse"
            />
          ))}
        </div>

        <div className="h-64 rounded-2xl bg-gray-200/80 dark:bg-gray-800/80 animate-pulse" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-xs uppercase text-gray-500">Orders</p>
          <p className="text-2xl font-bold mt-2">{stats.totalOrders}</p>
        </div>

        <div className="card">
          <p className="text-xs uppercase text-gray-500">Spent</p>
          <p className="text-2xl font-bold mt-2">৳{stats.totalSpent}</p>
        </div>

        <div className="card">
          <p className="text-xs uppercase text-gray-500">Pending</p>
          <p className="text-2xl font-bold mt-2 text-amber-500">
            {stats.pendingOrders}
          </p>
        </div>

        <div className="card">
          <p className="text-xs uppercase text-gray-500">Last Order</p>
          <p className="text-sm mt-2">{stats.lastOrder?.id || "No orders"}</p>
        </div>
      </div>

      {/* CHARTS */}
      {chartData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ORDERS TREND */}
          <div className="card p-4 h-72">
            <p className="text-sm font-semibold mb-4">Orders Trend</p>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#6366f1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* SPENDING TREND */}
          <div className="card p-4 h-72">
            <p className="text-sm font-semibold mb-4">Spending Trend</p>

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="spent" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
