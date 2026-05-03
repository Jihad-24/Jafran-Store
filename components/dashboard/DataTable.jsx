"use client";

import { useEffect, useMemo, useState } from "react";

function compare(a, b, key) {
  const va = a[key];
  const vb = b[key];
  if (va == null && vb == null) return 0;
  if (va == null) return 1;
  if (vb == null) return -1;
  if (typeof va === "number" && typeof vb === "number") return va - vb;
  return String(va).localeCompare(String(vb), undefined, { numeric: true });
}

export default function DataTable({
  columns,
  rows,
  filterKeys,
  pageSize = 5,
  onView,
  onEdit,
  onDelete,
}) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ key: null, dir: "asc" });

  const keys = filterKeys?.length
    ? filterKeys
    : columns.map((c) => c.key).filter(Boolean);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      keys.some((k) => String(row[k] ?? "").toLowerCase().includes(q)),
    );
  }, [rows, filter, keys]);

  const sorted = useMemo(() => {
    if (!sort.key) return filtered;
    const dir = sort.dir === "desc" ? -1 : 1;
    return [...filtered].sort((a, b) => dir * compare(a, b, sort.key));
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const safePage = Math.min(page, totalPages);
  const pageRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, safePage, pageSize]);

  const toggleSort = (key, sortable) => {
    if (!sortable) return;
    setPage(1);
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: "asc" };
      return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
    });
  };

  const showActions = onView || onEdit || onDelete;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <input
          type="search"
          placeholder="Filter…"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          className="input max-w-md text-sm py-2.5"
          aria-label="Filter table"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {sorted.length} row{sorted.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80">
              {columns.map((col) => (
                <th key={col.key} className="text-left font-semibold px-4 py-3">
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key, col.sortable)}
                      className="inline-flex items-center gap-1 text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      {col.label}
                      {sort.key === col.key && (
                        <span className="text-xs opacity-70">
                          {sort.dir === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </button>
                  ) : (
                    <span className="text-gray-800 dark:text-gray-100">
                      {col.label}
                    </span>
                  )}
                </th>
              ))}
              {showActions && (
                <th className="text-right font-semibold px-4 py-3 text-gray-800 dark:text-gray-100">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showActions ? 1 : 0)}
                  className="px-4 py-10 text-center text-gray-500 dark:text-gray-400"
                >
                  No rows match your filter.
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr
                  key={row.id ?? JSON.stringify(row)}
                  className="border-b border-gray-100 dark:border-gray-800/80 hover:bg-gray-50/80 dark:hover:bg-gray-800/40"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-gray-700 dark:text-gray-200">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {showActions && (
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="inline-flex flex-wrap justify-end gap-1.5">
                        {onView && (
                          <button
                            type="button"
                            onClick={() => onView(row)}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            View
                          </button>
                        )}
                        {onEdit && (
                          <button
                            type="button"
                            onClick={() => onEdit(row)}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-900/50"
                          >
                            Edit
                          </button>
                        )}
                        {onDelete && (
                          <button
                            type="button"
                            onClick={() => onDelete(row)}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/40"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
        <p className="text-gray-500 dark:text-gray-400">
          Page {safePage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 disabled:pointer-events-none hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 disabled:pointer-events-none hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
