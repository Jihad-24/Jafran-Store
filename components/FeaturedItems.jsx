"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const StarIcon = ({ half = false, empty = false }) => (
  <span className="relative inline-block h-4 w-4 shrink-0">
    <svg
      className={`h-4 w-4 ${
        empty ? "text-gray-300 dark:text-gray-600" : "text-amber-400"
      }`}
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
    <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="aspect-[4/3] animate-pulse bg-gray-200 dark:bg-gray-800" />

      <div className="space-y-3 p-4">
        <div className="h-3 w-1/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-4 animate-pulse rounded bg-gray-200 dark:bg-gray-800"
            />
          ))}
        </div>

        <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jafran-store-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Featured Items
          </h2>
          <Link
            href="/items"
            className="text-sm font-medium hover:underline text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            : items.length > 0 &&
              items.slice(0, 6).map((item) => (
                <Link
                  key={item._id}
                  href={`/items/${item._id}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm outline-none transition hover:border-indigo-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-500/40 dark:focus-visible:ring-offset-gray-950"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
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
                      <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs text-gray-500 dark:bg-gray-800">
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

                      {item.oldPrice != null && item.oldPrice > item.price && (
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

          {!loading && items.length === 0 && (
            <div className="col-span-full py-10 text-center text-gray-500">
              No items found
            </div>
          )}
        </div>
      </section>
    </>
  );
}
