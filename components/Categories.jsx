"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
export default function Categories() {
  return (
    <section className="bg-white dark:bg-gray-950 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-gray-100">
          Explore Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Electronics", icon: "📱" },
            { name: "Fashion", icon: "👕" },
            { name: "Accessories", icon: "⌚" },
            { name: "More", icon: "✨" },
          ].map((cat) => (
            <div
              key={cat.name}
              className="group relative p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden"
            >
              {/* hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition"></div>

              <div className="relative flex flex-col items-center text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition">
                  {cat.icon}
                </div>

                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white">
                  {cat.name}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Browse {cat.name.toLowerCase()} products
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
