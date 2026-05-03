"use client";

import { useState } from "react";

export default function QuantitySelector({ onChange }) {
  const [qty, setQty] = useState(1);

  const updateQty = (value) => {
    if (value < 1) return;
    setQty(value);
    onChange?.(value);
  };

  return (
    <div className="mt-6 border-b border-gray-200 dark:border-gray-800 pb-3 flex items-center justify-between w-full">
      <span className="text-gray-500 dark:text-gray-400">Quantity</span>

      <div className="flex items-center w-40 md:w-60 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <button
          onClick={() => updateQty(qty - 1)}
          className="flex-1 py-2 text-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          -
        </button>

        <span className="flex-1 py-2 text-center text-base font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
          {qty}
        </span>

        <button
          onClick={() => updateQty(qty + 1)}
          className="flex-1 py-2 text-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          +
        </button>
      </div>
    </div>
  );
}
