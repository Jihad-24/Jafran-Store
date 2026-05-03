"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Message sent successfully!");
      setLoading(false);
      e.target.reset();
    }, 1000);
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-lg">

          {/* Left info panel */}
          <div className="bg-gray-900 dark:bg-gray-950 p-10 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white">Contact Us</h1>

            <p className="text-gray-400 mt-4 leading-relaxed text-sm">
              Have a question or need help? We&apos;d love to hear from you.
              Send us a message and we&apos;ll respond as soon as possible.
            </p>

            <div className="mt-8 space-y-4 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-green-400 rounded-full shrink-0" />
                support@yourapp.com
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-400 rounded-full shrink-0" />
                +880 1234-567890
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-pink-400 rounded-full shrink-0" />
                Narayanganj, Bangladesh
              </div>
            </div>

            <Link
              href="/"
              className="mt-10 text-sm text-gray-500 hover:text-white transition"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Right form panel */}
          <div className="p-10 bg-white dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                required
                className="input"
              />
              <input
                type="email"
                placeholder="Your email"
                required
                className="input"
              />
              <textarea
                placeholder="Your message"
                rows={5}
                required
                className="input resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-700 dark:hover:bg-gray-200 transition disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
