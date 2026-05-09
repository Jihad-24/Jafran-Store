"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "../../components/Footer";

const sections = [
  { id: "terms", title: "Terms of Use" },
  { id: "accounts", title: "User Accounts" },
  { id: "privacy", title: "Privacy Policy" },
  { id: "payments", title: "Payments & Orders" },
  { id: "refund", title: "Refund Policy" },
  { id: "limits", title: "Limitations" },
  { id: "updates", title: "Updates" },
  { id: "contact", title: "Contact" },
];

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />

      {/* Hero */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Policies & Legal
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-400">
            Everything you need to know about using Jafran Store
          </p>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="sticky top-24 space-y-2">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white transition"
              >
                {sec.title}
              </a>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div className="md:col-span-3 space-y-6">
          <div
            id="terms"
            className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950"
          >
            <h2 className="text-xl font-semibold">1. Terms of Use</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">
              By using Jafran Store, you agree to follow all rules and laws.
              Misuse, hacking attempts, or fraud will lead to account
              suspension.
            </p>
          </div>

          <div
            id="accounts"
            className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950"
          >
            <h2 className="text-xl font-semibold">2. User Accounts</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">
              You are responsible for your account security. Keep your login
              safe and report any suspicious activity immediately.
            </p>
          </div>

          <div
            id="privacy"
            className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950"
          >
            <h2 className="text-xl font-semibold">3. Privacy Policy</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">
              We respect your privacy. Data is used only for orders, support,
              and improving services. We never sell personal data.
            </p>
          </div>

          <div
            id="payments"
            className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950"
          >
            <h2 className="text-xl font-semibold">4. Payments & Orders</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">
              Payments are secure. Prices may change. Orders are confirmed only
              after successful payment.
            </p>
          </div>

          <div
            id="refund"
            className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950"
          >
            <h2 className="text-xl font-semibold">5. Refund Policy</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">
              Refunds apply only for failed payments or duplicate charges.
              Digital products are generally non-refundable.
            </p>
          </div>

          <div
            id="limits"
            className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950"
          >
            <h2 className="text-xl font-semibold">6. Limitations</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">
              We are not responsible for third-party failures, delays, or
              indirect losses.
            </p>
          </div>

          <div
            id="updates"
            className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950"
          >
            <h2 className="text-xl font-semibold">7. Updates</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">
              Policies may change anytime. Continued use means acceptance.
            </p>
          </div>

          <div
            id="contact"
            className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950"
          >
            <h2 className="text-xl font-semibold">8. Contact</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">
              Need help? Contact our support team anytime.
            </p>

            <Link
              href="/contact"
              className="inline-block mt-4 px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
            >
              Contact Support
            </Link>
          </div>

          {/* Back */}
          <div className="pt-6">
            <Link
              href="/"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
