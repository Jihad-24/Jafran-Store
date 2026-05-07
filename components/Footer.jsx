"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-10 border-t border-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Jafran Store"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />

            <span className="text-xl font-bold tracking-tight  text-gray-100">
              Jafran Store
            </span>
          </Link>
          <p className="text-gray-300 text-sm mt-2">
            Simple product management platform
          </p>
        </div>

        <div className="flex gap-6 text-sm text-gray-200">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/items" className="hover:text-white transition">
            Items
          </Link>
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            Contact
          </Link>
        </div>
      </div>

      <p className="text-center text-gray-500 text-xs mt-8">
        © 2026 Odyssey. All rights reserved.
      </p>
    </footer>
  );
}
