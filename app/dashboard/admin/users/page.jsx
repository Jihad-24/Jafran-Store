"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/DataTable";
import { getAdminUsers } from "@/lib/mockDashboardApi";

export default function AdminUsersPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getAdminUsers().then((data) => {
      if (!cancelled) setRows(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Manage Users
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Mock directory with pagination, filtering, sorting, and row actions.
        </p>
      </div>

      <DataTable
        columns={[
          { key: "name", label: "Name", sortable: true },
          { key: "email", label: "Email", sortable: true },
          { key: "role", label: "Role", sortable: true },
          {
            key: "status",
            label: "Status",
            sortable: true,
            render: (r) => (
              <span
                className={
                  r.status === "Active"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : r.status === "Suspended"
                      ? "text-red-600 dark:text-red-400"
                      : "text-amber-600 dark:text-amber-400"
                }
              >
                {r.status}
              </span>
            ),
          },
          { key: "joined", label: "Joined", sortable: true },
        ]}
        rows={rows}
        filterKeys={["name", "email", "role", "status"]}
        pageSize={5}
        onView={(row) => window.alert(`View user: ${row.name} (mock)`)}
        onEdit={(row) => window.alert(`Edit user: ${row.name} (mock)`)}
        onDelete={(row) => window.alert(`Delete user: ${row.name} (mock)`)}
      />
    </div>
  );
}
