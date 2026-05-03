"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/DataTable";
import { getMyItems } from "@/lib/mockDashboardApi";

export default function DashboardMyItemsPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getMyItems().then((data) => {
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
          My Items
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Your listings (mock). Table supports pagination, filter, and sort.
        </p>
      </div>

      <DataTable
        columns={[
          { key: "title", label: "Title", sortable: true },
          {
            key: "status",
            label: "Status",
            sortable: true,
            render: (r) => (
              <span className="font-medium capitalize">{r.status}</span>
            ),
          },
          {
            key: "price",
            label: "Price",
            sortable: true,
            render: (r) => <span className="tabular-nums">${r.price}</span>,
          },
          {
            key: "views",
            label: "Views",
            sortable: true,
            render: (r) => <span className="tabular-nums">{r.views}</span>,
          },
        ]}
        rows={rows}
        filterKeys={["title", "status"]}
        pageSize={5}
        onView={(row) => window.alert(`View: ${row.title} (mock)`)}
        onEdit={(row) => window.alert(`Edit: ${row.title} (mock)`)}
        onDelete={(row) => window.alert(`Delete: ${row.title} (mock)`)}
      />
    </div>
  );
}
