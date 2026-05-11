"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, hydrated, cartTotal, clearCart, delivery } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  // const [delivery, setDelivery] = useState(70); // default inside Dhaka
  // const delivery = 0;
  const total = cartTotal + delivery;

  useEffect(() => {
    if (hydrated && items.length === 0) router.replace("/cart");
  }, [hydrated, items.length, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const orderId = `OD-${Date.now().toString(36).toUpperCase()}`;

    const payload = {
      id: orderId,
      total,
      subtotal: cartTotal,
      delivery,
      placedAt: new Date().toISOString(),

      customer: {
        name: form.get("name"),
        email: user?.email || form.get("email"), // ✅ guest + logged-in support
        phone: form.get("phone"),
        address: form.get("address"),
        city: form.get("city"),
        notes: form.get("notes") || "",
        isGuest: !user?.email, // ✅ important flag
      },

      payment: form.get("payment"),

      items: items.map((i) => ({
        productId: i.productId,
        title: i.title,
        qty: i.qty,
        price: i.price,
        selectedSizes: i.selectedSizes || null,
        selectedColors: i.selectedColors || null,
        image: i.image || null,
      })),
    };

    try {
      // 🔥 send order to backend
      await axios.post(
        "https://jafran-store-server.vercel.app/orders",
        payload,
      );

      // store for success page
      sessionStorage.setItem("lastOrder", JSON.stringify(payload));

      // clear cart (works for guest + user)
      await clearCart();

      router.push(`/checkout/success?id=${orderId}`);
    } catch (err) {
      console.error("Order failed:", err);
      t("Order failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!hydrated || items.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center text-sm text-gray-400">
          {!hydrated ? "Loading…" : "Redirecting…"}
        </div>
        <Footer />
      </div>
    );
  }

  // console.log("cart", items);
  return (
    <div>
      <Navbar />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <Link
              href="/"
              className="hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/cart"
              className="hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              Cart
            </Link>
            <span>/</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Checkout
            </span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
              <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                  Delivery details
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Full name
                    </label>
                    <input
                      name="name"
                      required
                      className="input"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="input"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Phone
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="input"
                      placeholder="+880 …"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Address
                    </label>
                    <input
                      name="address"
                      required
                      className="input"
                      placeholder="Street, building, area"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      City
                    </label>
                    <input
                      name="city"
                      required
                      className="input"
                      placeholder="City"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Order notes (optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      className="input resize-none"
                      placeholder="Delivery instructions…"
                    />
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                  Delivery area
                </h2>

                <div className="space-y-3">
                  {[
                    { value: 70, label: "Inside Dhaka (৳70)" },
                    { value: 120, label: "Outside Dhaka (৳120)" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={opt.value}
                        checked={delivery === opt.value}
                        onChange={() => setDelivery(opt.value)}
                        className="accent-gray-900 dark:accent-white"
                      />
                      <span className="text-sm text-gray-800 dark:text-gray-200">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                  Payment
                </h2>
                <div className="space-y-3">
                  {[
                    { value: "cod", label: "Cash on delivery" },
                    { value: "card", label: "Card (pay on delivery)" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer has-checked:border-gray-900 dark:has-checked:border-white"
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.value}
                        defaultChecked={opt.value === "cod"}
                        className="accent-gray-900 dark:accent-white"
                      />
                      <span className="text-sm text-gray-800 dark:text-gray-200">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/cart"
                  className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  ← Back to cart
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 min-w-[200px] py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold text-sm hover:bg-gray-700 dark:hover:bg-gray-200 transition disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? "Placing order…" : "Place order"}
                </button>
              </div>
            </form>

            <aside className="lg:col-span-2 lg:sticky lg:top-24">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Your order
                </h2>
                <ul className="space-y-3 text-sm max-h-64 overflow-y-auto scrollbar-hide">
                  {items.map((item) => (
                    <li
                      key={item._id}
                      className="flex justify-between items-center gap-2 text-gray-600 dark:text-gray-400"
                    >
                      <Link href={`/items/${item._id}`} className="shrink-0">
                        <div className="w-18 h-18 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-105 transition duration-300"
                          />
                        </div>
                      </Link>
                      <div className="truncate">
                        <p>
                          {item.title}
                          <span className="text-gray-400"> ×{item.qty}</span>
                        </p>

                        {(item?.selectedSizes?.length > 0 ||
                          item?.selectedColors?.length > 0) && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.selectedSizes?.length > 0 && (
                              <>Size: {item.selectedSizes.join(", ")}</>
                            )}

                            {item.selectedSizes?.length > 0 &&
                              item.selectedColors?.length > 0 && (
                                <span className="px-1"> • </span>
                              )}

                            {item.selectedColors?.length > 0 && (
                              <>Color: {item.selectedColors.join(", ")}</>
                            )}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 font-medium text-gray-800 dark:text-gray-200">
                        ৳{(item.price * item.qty).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200 dark:border-gray-800 my-4" />
                <dl className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>৳{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {delivery === 0
                        ? "Free"
                        : `৳${delivery.toLocaleString()}`}
                    </span>
                  </div>
                </dl>
                <div className="border-t border-gray-200 dark:border-gray-800 my-4" />
                <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100">
                  <span>Total</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
