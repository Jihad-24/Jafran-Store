"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function AddToCartSection({ item }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const updateQty = (val) => {
    if (val < 1) return;
    setQty(val);
  };

  const handleAdd = () => {
    addToCart(item, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Quantity row */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
        <span className="text-sm text-gray-500 dark:text-gray-400">Quantity</span>
        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <button
            onClick={() => updateQty(qty - 1)}
            className="px-4 py-2 text-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            −
          </button>
          <span className="px-5 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
            {qty}
          </span>
          <button
            onClick={() => updateQty(qty + 1)}
            className="px-4 py-2 text-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Buttons */}
      <button
        onClick={handleAdd}
        className={`w-full py-3.5 rounded-xl font-semibold text-sm transition cursor-pointer ${
          added
            ? "bg-green-600 text-white"
            : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200"
        }`}
      >
        {added ? "✓ Added to Cart" : "Add to Cart"}
      </button>

      {added && (
        <Link
          href="/cart"
          className="w-full py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-medium text-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          View Cart →
        </Link>
      )}
    </div>
  );
}
