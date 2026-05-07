"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/DataTable";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function DashboardMyItemsPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchOrders = async () => {
      if (!user?.email) return;

      try {
        const res = await axios.get(
          `https://jafran-store-server.vercel.app/orders/user?email=${user.email}`,
        );

        console.log(res);
        if (!cancelled) {
          // backend returns { success, total, data }
          setRows(res.data || []);
        }
      } catch (err) {
        console.error("Failed to load orders:", err);
      }
    };

    fetchOrders();

    return () => {
      cancelled = true;
    };
  }, [user?.email]);
  console.log(rows);
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          My Orders
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Your listings. Table supports pagination, filter, and sort.
        </p>
      </div>

      <DataTable
        columns={[
          {
            key: "id",
            label: "Order ID",
            sortable: true,
          },

          {
            key: "status",
            label: "Status",
            sortable: true,
            render: (r) => (
              <span className="font-medium capitalize">{r.status}</span>
            ),
          },

          {
            key: "total",
            label: "Total",
            sortable: true,
            render: (r) => <span className="tabular-nums">৳{r.total}</span>,
          },

          {
            key: "items",
            label: "Items",
            render: (r) => (
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {r.items?.map((i) => i.title).join(", ")}
              </span>
            ),
          },

          {
            key: "placedAt",
            label: "Date",
            sortable: true,
            render: (r) => (
              <span className="text-xs text-gray-500">
                {new Date(r.placedAt).toLocaleDateString()}
              </span>
            ),
          },
        ]}
        rows={rows}
        filterKeys={["title", "status"]}
        pageSize={5}
        onView={(row) => setSelectedOrder(row)}
        // onView={(row) => window.alert(`View: ${row.title} (mock)`)}
        // onEdit={(row) => window.alert(`Edit: ${row.title} (mock)`)}
        // onDelete={(row) => window.alert(`Delete: ${row.title} (mock)`)}
      />
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-fade">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Order Details
              </h2>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID</span>
                <span className="font-mono text-gray-900 dark:text-gray-100">
                  {selectedOrder.id}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300 capitalize">
                  {selectedOrder.status}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Total</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  ৳{selectedOrder.total}
                </span>
              </div>

              {/* Items */}
              <div className="pt-4">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Items
                </h3>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedOrder.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                    >
                      <span className="text-gray-700 dark:text-gray-200">
                        {item.title} × {item.qty}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        ৳{item.price * item.qty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm font-medium hover:opacity-90 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
