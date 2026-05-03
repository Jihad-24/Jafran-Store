"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/DataTable";
import { getAdminItems } from "@/lib/mockDashboardApi";

export default function AdminItemsPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getAdminItems().then((data) => {
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
          Manage Items
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Catalog overview (mock). Use filter to search title, SKU, or category.
        </p>
      </div>

      <DataTable
        columns={[
          { key: "title", label: "Title", sortable: true },
          { key: "sku", label: "SKU", sortable: true },
          { key: "category", label: "Category", sortable: true },
          {
            key: "price",
            label: "Price",
            sortable: true,
            render: (r) => <span className="tabular-nums">${r.price}</span>,
          },
          {
            key: "stock",
            label: "Stock",
            sortable: true,
            render: (r) => <span className="tabular-nums">{r.stock}</span>,
          },
          { key: "status", label: "Status", sortable: true },
        ]}
        rows={rows}
        filterKeys={["title", "sku", "category", "status"]}
        pageSize={5}
        onView={(row) => window.alert(`View item: ${row.title} (mock)`)}
        onEdit={(row) => window.alert(`Edit item: ${row.title} (mock)`)}
        onDelete={(row) => window.alert(`Delete item: ${row.title} (mock)`)}
      />
    </div>
  );
}
