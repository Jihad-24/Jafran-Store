"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/DataTable";
import { getCategories } from "@/lib/mockDashboardApi";

export default function AdminCategoriesPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getCategories().then((data) => {
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
          Categories
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Taxonomy maintenance (mock data).
        </p>
      </div>

      <DataTable
        columns={[
          { key: "name", label: "Name", sortable: true },
          { key: "slug", label: "Slug", sortable: true },
          {
            key: "items",
            label: "Items",
            sortable: true,
            render: (r) => <span className="tabular-nums">{r.items}</span>,
          },
          { key: "updated", label: "Updated", sortable: true },
        ]}
        rows={rows}
        filterKeys={["name", "slug"]}
        pageSize={5}
        onView={(row) => window.alert(`View category: ${row.name} (mock)`)}
        onEdit={(row) => window.alert(`Edit category: ${row.name} (mock)`)}
        onDelete={(row) => window.alert(`Delete category: ${row.name} (mock)`)}
      />
    </div>
  );
}
