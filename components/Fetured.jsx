"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
export default function Fetured() {
  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Fast Performance",
              desc: "Optimized Next.js architecture for lightning speed",
              icon: "⚡",
            },
            {
              title: "Secure Auth",
              desc: "Firebase authentication with strong security",
              icon: "🔐",
            },
            {
              title: "Easy Management",
              desc: "Simple and powerful product CRUD system",
              icon: "🧩",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group cursor-pointer relative p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {/* glow effect */}
              <div className=" absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition"></div>

              {/* content */}
              <div className="relative">
                <div className="text-3xl mb-4">{item.icon}</div>

                <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
