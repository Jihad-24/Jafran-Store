"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-5">
        <svg
          className="w-9 h-9 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Your cart is empty
      </h2>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-2 mb-6">
        Looks like you haven&apos;t added anything yet.
      </p>
      <Link
        href="/items"
        className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-200 transition"
      >
        Browse Products
      </Link>
    </div>
  );
}

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, cartTotal } = useCart();

  // const delivery = 0;
  const { delivery, setDelivery } = useCart();
  const total = cartTotal + delivery;

  // console.log(items);

  return (
    <div>
      <Navbar />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Breadcrumb */}
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <Link
              href="/"
              className="hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Cart
            </span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Shopping Cart
              {items.length > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-400 dark:text-gray-500">
                  ({items.length} {items.length === 1 ? "item" : "items"})
                </span>
              )}
            </h1>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-red-500 hover:text-red-600 transition"
              >
                Clear all
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Cart Items */}
              <div className="lg:col-span-2 flex flex-col gap-3">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex gap-4 items-start"
                  >
                    {/* Image */}
                    <Link href={`/items/${item._id}`} className="shrink-0">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition duration-300"
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
                        {item.category}
                      </p>
                      <Link href={`/items/${item._id}`}>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 hover:underline">
                          {item.title}
                        </h3>
                      </Link>

                      <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
                        {/* Qty stepper */}
                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQty(item._id, item.qty - 1)}
                            className="px-3 py-1.5 text-base cursor-pointer bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                          >
                            −
                          </button>
                          <span className="px-4 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item._id, item.qty + 1)}
                            className="px-3 py-1.5 text-base cursor-pointer bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                          >
                            +
                          </button>
                        </div>
                        <div>
                          {(item.selectedSizes?.length > 0 ||
                            item.selectedColors?.length > 0) && (
                            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex">
                              {/* Sizes */}
                              {item.selectedSizes?.length > 0 && (
                                <div className="flex gap-1 flex-wrap">
                                  <span className="font-medium">Sizes:</span>
                                  <span>{item.selectedSizes.join(", ")}</span>
                                </div>
                              )}
                              {item.selectedSizes?.length > 0 &&
                                item.selectedColors?.length > 0 && (
                                  <span className="px-3"> • </span>
                                )}
                              {/* Colors */}
                              {item.selectedColors?.length > 0 && (
                                <div className="flex gap-1 flex-wrap">
                                  <span className="font-medium">Colors:</span>
                                  <span>{item.selectedColors.join(", ")}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                          ৳{(item.price * item.qty).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item._id)}
                      className="shrink-0 text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition mt-0.5"
                      title="Remove"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}

                <Link
                  href="/items"
                  className="mt-2 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                >
                  ← Continue shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:sticky lg:top-24">
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                  <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-5">
                    Order Summary
                  </h2>
                  <section className="my-4 space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Delivery Area
                    </h3>

                    <div className="space-y-2">
                      {[
                        { value: 70, label: "Inside Dhaka (৳70)" },
                        { value: 120, label: "Outside Dhaka (৳120)" },
                      ].map((opt) => (
                        <label
                          key={opt.value}
                          className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer"
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {opt.label}
                          </span>

                          <input
                            type="radio"
                            name="delivery"
                            checked={delivery === opt.value}
                            onChange={() => setDelivery(opt.value)}
                            className="accent-gray-900 dark:accent-white"
                          />
                        </label>
                      ))}
                    </div>
                  </section>
                  <dl className="space-y-3 text-sm">
                    {items.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-center text-gray-500 dark:text-gray-400"
                      >
                        <Link href={`/items/${item._id}`} className="shrink-0">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover hover:scale-105 transition duration-300"
                            />
                          </div>
                        </Link>
                        <span className="truncate max-w-[160px]">
                          {item.title} × {item.qty}
                        </span>
                        <span className="font-medium text-gray-700 dark:text-gray-300 shrink-0">
                          ৳{(item.price * item.qty).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </dl>

                  <div className="border-t border-gray-200 dark:border-gray-800 my-4" />

                  <dl className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-gray-500 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span>৳{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 dark:text-gray-400">
                      <span>Delivery</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        ৳{delivery}
                      </span>
                    </div>
                  </dl>

                  <div className="border-t border-gray-200 dark:border-gray-800 my-4" />

                  <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100 text-base">
                    <span>Total</span>
                    <span>৳{total.toLocaleString()}</span>
                  </div>

                  <Link
                    href="/checkout"
                    className="mt-5 block w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold text-sm hover:bg-gray-700 dark:hover:bg-gray-200 transition text-center"
                  >
                    Proceed to Checkout
                  </Link>

                  <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                    Secure checkout
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
