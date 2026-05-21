"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PIE_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#64748b"];

export default function OverviewCharts({ barData, lineData, pieData, isDark }) {
  const grid = isDark ? "#374151" : "#e5e7eb";
  const tick = isDark ? "#9ca3af" : "#6b7280";

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="card p-4 md:p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Weekly activity (bar)
        </h3>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={grid} />
              <XAxis dataKey="name" tick={{ fill: tick, fontSize: 12 }} />
              <YAxis tick={{ fill: tick, fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#111827" : "#fff",
                  border: `1px solid ${grid}`,
                  borderRadius: 12,
                }}
                labelStyle={{ color: tick }}
              />
              <Legend />
              <Bar
                dataKey="sales"
                name="Sales ($)"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="listings"
                name="Listings"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-4 md:p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Growth & revenue (line)
        </h3>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lineData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={grid} />
              <XAxis dataKey="month" tick={{ fill: tick, fontSize: 12 }} />
              <YAxis tick={{ fill: tick, fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#111827" : "#fff",
                  border: `1px solid ${grid}`,
                  borderRadius: 12,
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                name="Users"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-4 md:p-5 xl:col-span-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Distribution (pie)
        </h3>
        <div className="h-[300px] w-full max-w-lg mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#111827" : "#fff",
                  border: `1px solid ${grid}`,
                  borderRadius: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
