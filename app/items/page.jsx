"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const PRODUCTS_URL = "http://localhost:5001/products";
const PAGE_SIZE = 9;

const StarIcon = ({ half = false, empty = false }) => (
  <span className="relative inline-block h-4 w-4 shrink-0">
    <svg
      className={`h-4 w-4 ${empty ? "text-gray-300 dark:text-gray-600" : "text-amber-400"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.956c.3.921-.755 1.688-1.538 1.118l-3.37-2.45a1 1 0 00-1.176 0l-3.37 2.45c-.783.57-1.838-.197-1.538-1.118l1.287-3.956a1 1 0 00-.364-1.118l-3.37-2.45c-.783-.57-.38-1.81.588-1.81h4.16a1 1 0 00.95-.69l1.286-3.956z" />
    </svg>
    {half && (
      <span className="absolute inset-0 w-1/2 overflow-hidden">
        <svg
          className="h-4 w-4 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.956c.3.921-.755 1.688-1.538 1.118l-3.37-2.45a1 1 0 00-1.176 0l-3.37 2.45c-.783.57-1.838-.197-1.538-1.118l1.287-3.956a1 1 0 00-.364-1.118l-3.37-2.45c-.783-.57-.38-1.81.588-1.81h4.16a1 1 0 00.95-.69l1.286-3.956z" />
        </svg>
      </span>
    )}
  </span>
);

function RatingStars({ rating = 0, count }) {
  const stars = Array.from({ length: 5 }).map((_, i) => {
    const v = rating - i;
    if (v >= 1) return <StarIcon key={i} />;
    if (v >= 0.5) return <StarIcon key={i} half />;
    return <StarIcon key={i} empty />;
  });
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <div className="flex items-center gap-0.5">{stars}</div>
      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
        {rating}
      </span>
      {count != null && (
        <span className="text-xs text-gray-400 dark:text-gray-500">
          ({count} reviews)
        </span>
      )}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="aspect-4/3 animate-pulse bg-gray-200 dark:bg-gray-800" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, onPageChange, disabled }) {
  const go = (p) => {
    if (disabled || p < 1 || p > totalPages) return;
    onPageChange(p);
  };

  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  let end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  const nums = [];
  for (let i = start; i <= end; i += 1) nums.push(i);

  const btn =
    "min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-40 disabled:pointer-events-none";
  const idle =
    "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800";
  const active =
    "border border-indigo-600 bg-indigo-600 text-white dark:border-indigo-500 dark:bg-indigo-500";

  return (
    <nav
      className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
      aria-label="Pagination"
    >
      <div className="flex flex-wrap items-center justify-center gap-1">
        <button
          type="button"
          className={`${btn} ${idle}`}
          disabled={disabled || page <= 1}
          onClick={() => go(page - 1)}
        >
          Previous
        </button>
        {start > 1 && (
          <>
            <button
              type="button"
              className={`${btn} ${page === 1 ? active : idle}`}
              disabled={disabled}
              onClick={() => go(1)}
            >
              1
            </button>
            {start > 2 && (
              <span className="px-1 text-gray-400 dark:text-gray-500">…</span>
            )}
          </>
        )}
        {nums.map((n) => (
          <button
            key={n}
            type="button"
            className={`${btn} ${n === page ? active : idle}`}
            disabled={disabled}
            onClick={() => go(n)}
            aria-current={n === page ? "page" : undefined}
          >
            {n}
          </button>
        ))}
        {end < totalPages && (
          <>
            {end < totalPages - 1 && (
              <span className="px-1 text-gray-400 dark:text-gray-500">…</span>
            )}
            <button
              type="button"
              className={`${btn} ${page === totalPages ? active : idle}`}
              disabled={disabled}
              onClick={() => go(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          type="button"
          className={`${btn} ${idle}`}
          disabled={disabled || page >= totalPages}
          onClick={() => go(page + 1)}
        >
          Next
        </button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Page {page} of {totalPages}
      </p>
    </nav>
  );
}

export default function Items() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const catalogTopRef = useRef(null);
  const catalogReadyRef = useRef(false);

  useEffect(() => {
    const ac = new AbortController();
    fetch(PRODUCTS_URL, { signal: ac.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => {
        setError(null);
        setItems(data);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    for (const item of items) {
      if (item.category) set.add(item.category);
    }
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = items.filter((item) => {
      const title = item.title?.toLowerCase() ?? "";
      const matchesSearch = !q || title.includes(q);
      const matchesCategory = !category || item.category === category;
      return matchesSearch && matchesCategory;
    });
    if (price === "low")
      list = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    else if (price === "high")
      list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    return list;
  }, [items, search, category, price]);

  const totalPages =
    filtered.length === 0 ? 0 : Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage =
    totalPages === 0 ? 1 : Math.min(Math.max(1, page), totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const rangeLabel = useMemo(() => {
    const total = filtered.length;
    if (total === 0) return null;
    const from = (currentPage - 1) * PAGE_SIZE + 1;
    const to = Math.min(currentPage * PAGE_SIZE, total);
    return { from, to, total };
  }, [filtered.length, currentPage]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setPage(1));
    return () => cancelAnimationFrame(id);
  }, [search, category, price]);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      const id = requestAnimationFrame(() => setPage(totalPages));
      return () => cancelAnimationFrame(id);
    }
  }, [page, totalPages]);

  useEffect(() => {
    if (loading) return;
    if (!catalogReadyRef.current) {
      catalogReadyRef.current = true;
      return;
    }
    catalogTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentPage, loading]);

  const hasActiveFilters = Boolean(search.trim() || category || price);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-6 py-3 text-xs text-gray-500 dark:text-gray-400">
            <Link
              href="/"
              className="transition hover:text-gray-800 dark:hover:text-gray-200"
            >
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              Items
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-10">
          <header className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Browse items
              </h1>
              <p className="mt-1 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                Search and filter the catalog. Prices in ৳ (BDT).
              </p>
            </div>
            {!loading && (
              <p className="text-right text-sm text-gray-500 dark:text-gray-400">
                {rangeLabel ? (
                  <>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {rangeLabel.from}–{rangeLabel.to}
                    </span>
                    <span> of </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {rangeLabel.total}
                    </span>
                    <span>{rangeLabel.total === 1 ? " item" : " items"}</span>
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {filtered.length}
                    </span>
                    {filtered.length === 1 ? " item" : " items"}
                  </>
                )}
                {hasActiveFilters && items.length !== filtered.length && (
                  <span className="text-gray-400 dark:text-gray-500">
                    {" "}
                    · {items.length} total
                  </span>
                )}
              </p>
            )}
          </header>

          <section
            aria-label="Filters"
            className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-5"
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="block sm:col-span-1">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Search
                </span>
                <input
                  type="search"
                  className="input"
                  placeholder="Search by title…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoComplete="off"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Category
                </span>
                <select
                  className="input cursor-pointer appearance-none bg-size-[1rem] bg-position-[right_0.75rem_center] bg-no-repeat pr-10 dark:bg-gray-900"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Sort by price
                </span>
                <select
                  className="input cursor-pointer appearance-none bg-size-[1rem] bg-position-[right_0.75rem_center] bg-no-repeat pr-10 dark:bg-gray-900"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  }}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="low">Low to high</option>
                  <option value="high">High to low</option>
                </select>
              </label>
            </div>
          </section>

          {error && (
            <div
              className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
              role="alert"
            >
              {error}
            </div>
          )}

          <div ref={catalogTopRef} className="scroll-mt-24">
            <div
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              aria-busy={loading}
            >
              {loading &&
                Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}

              {!loading &&
                paginated.map((item) => (
                  <Link
                    key={item._id}
                    href={`/items/${item._id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm outline-none transition hover:border-indigo-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-500/40 dark:focus-visible:ring-offset-gray-950"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-gray-100 dark:bg-gray-800">
                      {item.images?.[0] || item.image ? (
                        <Image
                          src={item.images?.[0] || item.image}
                          alt={item.title || "product"}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800 text-xs text-gray-500">
                          No Image
                        </div>
                      )}
                      {item.discount > 0 && (
                        <span className="absolute right-3 top-3 rounded-full bg-gray-900 px-2.5 py-1 text-xs font-semibold text-white dark:bg-white dark:text-gray-900">
                          {item.discount}% off
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                          {item.category}
                        </p>
                        <h2 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold leading-snug text-gray-900 dark:text-gray-50">
                          {item.title}
                        </h2>
                      </div>
                      <RatingStars
                        rating={item.rating}
                        count={item.ratingCount}
                      />
                      <div className="flex flex-wrap items-end gap-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-gray-50">
                          ৳{item.price}
                        </span>
                        {item.oldPrice != null &&
                          item.oldPrice > item.price && (
                            <span className="text-sm text-gray-400 line-through dark:text-gray-500">
                              ৳{item.oldPrice}
                            </span>
                          )}
                      </div>
                      <p className="mt-auto flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <svg
                          className="h-3.5 w-3.5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Free delivery available
                      </p>
                      <span className="text-xs font-medium text-indigo-600 group-hover:text-indigo-500 dark:text-indigo-400 dark:group-hover:text-indigo-300">
                        View details →
                      </span>
                    </div>
                  </Link>
                ))}

              {!loading && !error && filtered.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900/50">
                  {items.length === 0 ? (
                    <>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        No products to show
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Check back later or add items from the dashboard.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        No items match your filters
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Try clearing search or choosing a different category.
                      </p>
                      {hasActiveFilters && (
                        <button
                          type="button"
                          className="btn btn-primary mt-4 text-sm"
                          onClick={() => {
                            setSearch("");
                            setCategory("");
                            setPrice("");
                          }}
                        >
                          Clear filters
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {!loading && !error && totalPages > 0 && (
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
                disabled={loading}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
