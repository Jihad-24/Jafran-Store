"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AddToCartSection({ item }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const { addToCart } = useCart();

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };
console.log(selectedSizes, selectedColors);
  const updateQty = (val) => {
    if (val < 1) return;
    setQty(val);
  };

  const sizes =
    typeof item.sizes === "string" ? JSON.parse(item.sizes) : item.sizes || [];
  const colors =
    typeof item.colors === "string"
      ? JSON.parse(item.colors)
      : item.colors || [];

  const handleAdd = () => {
    // Require size if sizes exist
    if (item?.sizes?.length && selectedSizes.length === 0) {
      toast.error("Please select a size");
      return;
    }

    // Require color if colors exist
    if (item?.colors?.length && selectedColors.length === 0) {
      toast.error("Please select a color");
      return;
    }

    addToCart(
      {
        ...item,
      },
      qty,
      selectedSizes,
      selectedColors,
    );

    setAdded(true);

    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        {/* Size Selection */}
        {sizes?.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Select Size
            </span>

            <div className="flex flex-wrap gap-2 ">
              {sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`min-w-[48px] px-4 py-2 cursor-pointer rounded-xl border text-sm font-medium transition ${
                    selectedSizes.includes(size)
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                      : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Color Selection */}
        {colors?.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Select Color
            </span>

            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => toggleColor(color)}
                  className={`px-4 py-2 rounded-xl cursor-pointer border text-sm font-medium transition ${
                    selectedColors.includes(color)
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                      : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-white"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Quantity row */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Quantity
        </span>

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
