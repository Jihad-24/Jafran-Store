"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DataTable from "@/components/dashboard/DataTable";

export default function DashboardBannersPage() {
  const [rows, setRows] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchBanners = async () => {
      try {
        const res = await axios.get(
          "https://jafran-store-server.vercel.app/banners",
        );

        if (!cancelled) {
          setRows(res.data || []);
        }
      } catch (err) {
        console.error("Failed to load banners:", err);
        toast.error("Failed to load banners");
      }
    };

    fetchBanners();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Banners
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage homepage banners with preview, filter, sorting, and delete
          actions.
        </p>
      </div>

      {/* Table */}
      <DataTable
        columns={[
          {
            key: "image",
            label: "Banner",
            render: (r) => (
              <div className="flex items-center gap-3">
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-16 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                />

                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {r.title}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                    {r.subtitle}
                  </p>
                </div>
              </div>
            ),
          },

          {
            key: "link",
            label: "Link",
            sortable: true,
            render: (r) => (
              <span className="text-sm text-blue-600 dark:text-blue-400">
                {r.link}
              </span>
            ),
          },

          {
            key: "active",
            label: "Status",
            sortable: true,
            render: (r) => (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  r.active
                    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                }`}
              >
                {r.active ? "Active" : "Inactive"}
              </span>
            ),
          },

          {
            key: "createdAt",
            label: "Created",
            sortable: true,
            render: (r) => (
              <span className="text-xs text-gray-500">
                {new Date(r.createdAt).toLocaleDateString()}
              </span>
            ),
          },
        ]}
        rows={rows}
        filterKeys={["title", "subtitle", "link"]}
        pageSize={5}
        onView={(row) => setSelectedBanner(row)}
        onDelete={async (row) => {
          toast(
            (t) => (
              <div className="space-y-3">
                <p className="text-sm">
                  Delete <b>{row.title}</b> banner?
                </p>

                <div className="flex justify-end gap-2">
                  <button
                    className="px-3 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700"
                    onClick={() => toast.dismiss(t.id)}
                  >
                    Cancel
                  </button>

                  <button
                    className="px-3 py-1 text-xs rounded bg-red-500 text-white"
                    onClick={async () => {
                      toast.dismiss(t.id);

                      const toastId = toast.loading("Deleting banner...");

                      try {
                        await axios.delete(
                          `https://jafran-store-server.vercel.app/banners/${row._id}`,
                        );

                        setRows((prev) =>
                          prev.filter((item) => item._id !== row._id),
                        );

                        toast.success("Banner deleted successfully", {
                          id: toastId,
                        });
                      } catch (err) {
                        console.error("Delete failed:", err);

                        toast.error("Failed to delete banner", {
                          id: toastId,
                        });
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ),
            {
              duration: Infinity,
            },
          );
        }}
      />

      {/* Modal */}
      {selectedBanner && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-fade">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Banner Details
              </h2>

              <button
                onClick={() => setSelectedBanner(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <img
                src={selectedBanner.image}
                alt={selectedBanner.title}
                className="w-full h-64 object-cover rounded-xl border border-gray-200 dark:border-gray-700"
              />

              <div className="space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Title</span>

                  <span className="font-medium text-right text-gray-900 dark:text-gray-100">
                    {selectedBanner.title}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Subtitle</span>

                  <span className="text-right text-gray-700 dark:text-gray-300">
                    {selectedBanner.subtitle}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Link</span>

                  <span className="text-blue-600 dark:text-blue-400">
                    {selectedBanner.link}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Status</span>

                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedBanner.active
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    }`}
                  >
                    {selectedBanner.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Created At</span>

                  <span className="text-gray-700 dark:text-gray-300">
                    {new Date(selectedBanner.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setSelectedBanner(null)}
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
