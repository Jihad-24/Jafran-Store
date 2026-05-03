"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/items", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  const navLinksN = [
    { href: "/", label: "Home" },
    { href: "/items", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
        >
          Odyssey
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
          {user
            ? navLinksN.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-black dark:hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))
            : navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-black dark:hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            title="Cart"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-7 w-14 items-center rounded-full border transition ${
              isDark
                ? "bg-indigo-500 border-indigo-400"
                : "bg-gray-200 border-gray-300"
            }`}
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="sr-only">Toggle theme</span>
            <span
              className={`absolute left-1 text-[10px] font-semibold transition ${
                isDark ? "text-white/80" : "text-gray-600"
              }`}
            >
              {isDark ? "ON" : "OFF"}
            </span>
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                isDark ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>

          {/* Guest Auth */}
          {!user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-1.5 text-sm rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 text-sm rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            /* User Dropdown */
            <div className="relative hidden md:block">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-xs">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm max-w-[120px] truncate text-gray-700 dark:text-gray-200">
                  {user.email}
                </span>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl rounded-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                    <p className="text-sm font-medium truncate text-gray-800 dark:text-gray-100">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  {/* <Link
                    href="/items/add"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setOpen(false)}
                  >
                    Add Product
                  </Link> */}

                  {/* <Link
                    href="/items/manage"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setOpen(false)}
                  >
                    Manage Products
                  </Link> */}

                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-2xl text-gray-800 dark:text-gray-100"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 px-4 py-3 space-y-2 bg-white dark:bg-gray-950">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm text-gray-700 dark:text-gray-200"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {!user ? (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/login"
                className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-black text-white dark:bg-white dark:text-black rounded-lg px-3 py-2 text-sm"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="pt-2 border-t border-gray-200 dark:border-gray-800 mt-2">
              <p className="text-sm mb-2 truncate text-gray-700 dark:text-gray-200">
                {user.email}
              </p>

              <Link
                href="/dashboard"
                className="block py-2 text-sm text-gray-700 dark:text-gray-200"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                href="/profile"
                className="block py-2 text-sm text-gray-700 dark:text-gray-200"
                onClick={() => setMobileOpen(false)}
              >
                Profile
              </Link>

              <Link
                href="/items/add"
                className="block py-2 text-sm text-gray-700 dark:text-gray-200"
                onClick={() => setMobileOpen(false)}
              >
                Add Product
              </Link>

              <Link
                href="/items/manage"
                className="block py-2 text-sm text-gray-700 dark:text-gray-200"
                onClick={() => setMobileOpen(false)}
              >
                Manage Products
              </Link>

              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="text-red-500 text-sm py-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
