"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
export default function Cta() {
  const { user } = useAuth();
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/85 dark:bg-black/75 backdrop-blur-[2px]" />

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-sky-500/20 blur-3xl rounded-full" />

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm text-gray-700 dark:text-gray-200 backdrop-blur-md">
            ✨ Modern Full-Stack eCommerce Platform
          </span>

          {/* Heading */}
          <h2 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Manage Your Store
            <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
              {" "}
              Smarter & Faster
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-8">
            Jafran Store is a scalable full-stack eCommerce platform built for
            seamless product management, secure shopping, and a smooth modern
            user experience.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href={user ? "/items" : "/login"}
              className="px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:scale-105 hover:opacity-90 transition duration-300 shadow-2xl"
            >
              Explore Products
            </Link>

            <Link
              href="/about"
              className="px-8 py-4 rounded-full border border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/5 backdrop-blur-md text-black dark:text-white font-medium hover:bg-black/10 dark:hover:bg-white/10 transition duration-300"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6">
              <h3 className="text-3xl font-bold text-black dark:text-white">
                500+
              </h3>
              <p className="text-gray-700 dark:text-gray-400 mt-2 text-sm">
                Products Listed
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6">
              <h3 className="text-3xl font-bold text-black dark:text-white">
                Secure
              </h3>
              <p className="text-gray-700 dark:text-gray-400 mt-2 text-sm">
                Authentication System
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 col-span-2 md:col-span-1">
              <h3 className="text-3xl font-bold text-black dark:text-white">
                Fast
              </h3>
              <p className="text-gray-700 dark:text-gray-400 mt-2 text-sm">
                Modern Dashboard Experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
