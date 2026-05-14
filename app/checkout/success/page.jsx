"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function SuccessContent() {
  const searchParams = useSearchParams();
  const idFromUrl = searchParams.get("id");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("lastOrder");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  const orderId = order?.id || idFromUrl || "—";

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Order placed
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Thank you. We&apos;ve received your order and will contact you soon.
        </p>
        <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
          Order ID:{" "}
          <span className="font-mono font-semibold text-gray-900 dark:text-gray-100">
            {orderId}
          </span>
        </p>
        {order?.total != null && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Total:{" "}
            <span className="font-bold">
              ৳{Number(order.total).toLocaleString()}
            </span>
          </p>
        )}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/items"
            className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-200 transition"
          >
            Continue shopping
          </Link>
          <Link
            href="/dashboard/my-items"
            className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-200 transition"
          >
            See Orders
          </Link>
          <Link
            href="/"
            className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div>
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center text-sm text-gray-400">
            Loading…
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
      <Footer />
    </div>
  );
}
