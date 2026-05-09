"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FacebookLogo,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <Image
                src="/logo.png"
                alt="Jafran Store"
                width={45}
                height={45}
                className="rounded-full object-cover"
              />

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Jafran Store
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Modern ecommerce store
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-400">
              Jafran Store offers a smooth and secure shopping experience with
              carefully selected products, fast browsing, and reliable checkout.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-6">
              <Link
                href="#"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 hover:scale-110 transition"
              >
                <FacebookLogo
                  size={20}
                  className="text-gray-700 dark:text-gray-300"
                />
              </Link>

              <Link
                href="#"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 hover:scale-110 transition"
              >
                <InstagramLogo
                  size={20}
                  className="text-gray-700 dark:text-gray-300"
                />
              </Link>

              <Link
                href="#"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 hover:scale-110 transition"
              >
                <GithubLogo
                  size={20}
                  className="text-gray-700 dark:text-gray-300"
                />
              </Link>

              <Link
                href="#"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 hover:scale-110 transition"
              >
                <LinkedinLogo
                  size={20}
                  className="text-gray-700 dark:text-gray-300"
                />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                Home
              </Link>

              <Link
                href="/items"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                Shop
              </Link>

              <Link
                href="/about"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Support + Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Support
            </h3>

            <div className="flex flex-col gap-3 text-sm mb-6">
              <Link
                href="/cart"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                Cart
              </Link>

              <Link
                href="/dashboard"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                Dashboard
              </Link>

              <Link
                href="/login"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="">
            {/* Legal Section (NEW) */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Legal
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                Terms of Service
              </Link>

              <Link
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 Jafran Store. All rights reserved.
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
