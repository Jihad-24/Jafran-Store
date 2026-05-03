"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/DataTable";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function AdminItemsPage() {
  const [rows, setRows] = useState([]);
  const { user } = useAuth();
  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [deleteOrder, setDeleteOrder] = useState(null);

  const [form, setForm] = useState({
    status: "",
    payment: "",
  });

  const getAdminOrders = async () => {
    const res = await axios.get(
      `https://jafran-store-server.vercel.app/orders?email=${user?.email}`,
    );

    return res.data.data.map((o) => ({
      id: o.id,
      customer: o.customer,
      customerName: o.customer?.name,
      email: o.customer?.email,
      total: o.total,
      payment: o.payment,
      status: o.status,

      placedAt: new Date(o.placedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),

      itemCount: o.items?.length || 0,

      items: o.items, // 👈 ADD THIS
    }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAdminOrders();
        setRows(data);
      } catch (err) {
        console.error("Failed to load users:", err);
      }
    };

    fetchUsers();
  }, [user?.email]);

  const handleUpdateOrder = async () => {
    try {
      await axios.patch(
        `https://jafran-store-server.vercel.app/orders/${editOrder.id}?email=${user?.email}`,
        {
          status: form.status,
          payment: form.payment,
        },
      );

      // update UI instantly
      setRows((prev) =>
        prev.map((o) => (o.id === editOrder.id ? { ...o, ...form } : o)),
      );

      setEditOrder(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      await axios.delete(
        `https://jafran-store-server.vercel.app/orders/${deleteOrder.id}?email=${user?.email}`,
      );

      // remove from UI instantly
      setRows((prev) => prev.filter((o) => o.id !== deleteOrder.id));

      setDeleteOrder(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Manage Orders
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Catalog overview (mock). Use filter to search title, SKU, or category.
        </p>
      </div>

      <DataTable
        columns={[
          { key: "id", label: "Order ID", sortable: true },

          { key: "customerName", label: "Customer", sortable: true },

          { key: "email", label: "Email", sortable: true },

          {
            key: "total",
            label: "Total",
            sortable: true,
            render: (r) => <span className="tabular-nums">${r.total}</span>,
          },

          {
            key: "payment",
            label: "Payment",
            sortable: true,
          },

          {
            key: "status",
            label: "Status",
            sortable: true,
            render: (r) => (
              <span
                className={
                  r.status === "pending"
                    ? "text-amber-500"
                    : r.status === "paid"
                      ? "text-emerald-500"
                      : "text-red-500"
                }
              >
                {r.status}
              </span>
            ),
          },

          { key: "itemCount", label: "Items", sortable: true },

          { key: "placedAt", label: "Date", sortable: true },
        ]}
        rows={rows}
        filterKeys={["title", "sku", "category", "status"]}
        pageSize={5}
        onView={(row) => setViewOrder(row)}
        onEdit={(row) => {
          setEditOrder(row);
          setForm({
            status: row.status,
            payment: row.payment,
          });
        }}
        onDelete={(row) => setDeleteOrder(row)}
      />

      {viewOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-[550px] max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Order Details
              </h2>

              <button
                onClick={() => setViewOrder(null)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Order ID</p>
                  <p className="font-medium">{viewOrder.id}</p>
                </div>

                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">{viewOrder.placedAt}</p>
                </div>

                <div>
                  <p className="text-gray-500">Payment</p>
                  <p className="font-medium">{viewOrder.payment}</p>
                </div>

                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="font-medium capitalize">{viewOrder.status}</p>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Total Amount
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${viewOrder.total}
                </span>
              </div>

              {/* Customer */}
              <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                  Customer Info
                </h3>

                <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  <p>
                    <b>Name:</b> {viewOrder?.customer?.name}
                  </p>
                  <p>
                    <b>Email:</b> {viewOrder?.customer?.email}
                  </p>
                  <p>
                    <b>Phone:</b> {viewOrder?.customer?.phone}
                  </p>
                  <p>
                    <b>Address:</b> {viewOrder?.customer?.address},{" "}
                    {viewOrder?.customer?.city}
                  </p>

                  {viewOrder.customer?.notes && (
                    <p>
                      <b>Notes:</b> {viewOrder.customer.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                  Items ({viewOrder.items?.length || 0})
                </h3>

                <div className="space-y-2">
                  {viewOrder.items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                      </div>

                      <p className="font-semibold text-sm">${item.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setViewOrder(null)}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-96 space-y-4">
            <h2 className="text-lg font-semibold">Update Order</h2>

            <div className="space-y-2">
              <label className="text-sm">Status</label>
              <select
                className="w-full p-2 border rounded bg-white dark:bg-gray-800"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Payment</label>
              <select
                className="w-full p-2 border rounded bg-white dark:bg-gray-800"
                value={form.payment}
                onChange={(e) => setForm({ ...form, payment: e.target.value })}
                disabled
              >
                <option value="cod">COD</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditOrder(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateOrder}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-80 space-y-4">
            <h2 className="text-lg font-semibold">Delete Order?</h2>

            <p className="text-sm text-gray-500">
              Are you sure you want to delete order <b>{deleteOrder.id}</b>?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteOrder(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteOrder}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
