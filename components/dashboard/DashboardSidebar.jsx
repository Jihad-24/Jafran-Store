"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const userNav = [
  { href: "/dashboard", label: "Overview", icon: "◆" },
  { href: "/dashboard/my-items", label: "My Items", icon: "◇" },
  { href: "/dashboard/profile", label: "Profile", icon: "○" },
  { href: "/dashboard/settings", label: "Settings", icon: "◎" },
];

const adminNav = [
  { href: "/dashboard", label: "Overview", icon: "◆" },
  { href: "/dashboard/admin/users", label: "Manage Users", icon: "▣" },
  { href: "/dashboard/admin/items", label: "Manage Items", icon: "▤" },
  { href: "/dashboard/admin/add", label: "Add Item", icon: "✚" },
  { href: "/dashboard/admin/reports", label: "Reports", icon: "▥" },
  { href: "/dashboard/admin/categories", label: "Categories", icon: "▦" },
  { href: "/dashboard/settings", label: "Settings", icon: "◎" },
];

function NavLink({ href, label, icon, active, onNavigate }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
        active
          ? "bg-indigo-600 text-white shadow-sm"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      <span className="text-xs w-5 text-center opacity-80">{icon}</span>
      {label}
    </Link>
  );
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();

  const { user, logout, role, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // const isAdmin = user?.role === "admin";
  // const items = user ? (isAdmin ? adminNav : userNav) : [];
  // const role = user?.role || "user";
  // const items = role === "admin" ? adminNav : userNav;
  const items = role === "admin" ? adminNav : userNav;

  console.log("USER:", user);
  console.log("ROLE:", role);
  const closeMobile = () => setMobileOpen(false);

  if (!user) {
    return (
      <div className="w-64 p-4 text-sm text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-800">
        Please login to access dashboard
      </div>
    );
  }

  const sidebarInner = (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="px-2 mb-8">
          <Link
            href="/"
            onClick={closeMobile}
            className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100"
          >
            Odyssey
          </Link>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Dashboard
          </p>

          <div className="mt-3 inline-flex items-center gap-2">
            <span
              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                isAdmin
                  ? "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              }`}
            >
              {isAdmin ? "Admin" : "User"}
            </span>
          </div>
        </div>
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
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-1 flex-1">
        {items.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname === item.href || pathname.startsWith(`${item.href}/`)
            }
            onNavigate={closeMobile}
          />
        ))}
      </nav>

      {/* FOOTER */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 space-y-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate px-1">
          {user?.email}
        </p>

        <Link
          href="/items"
          onClick={closeMobile}
          className="block text-sm text-indigo-600 dark:text-indigo-400 hover:underline px-1"
        >
          ← Storefront
        </Link>

        <button
          onClick={() => {
            closeMobile();
            logout();
          }}
          className="w-full text-left text-sm text-red-600 dark:text-red-400 hover:underline px-1 py-1"
        >
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="w-full md:w-64 shrink-0 flex flex-col md:flex-row">
      {/* MOBILE TOP BAR */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-gray-950/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          Menu
        </span>

        <button
          type="button"
          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? "Close" : "Open"}
        </button>
      </div>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/40"
          onClick={closeMobile}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col p-4 transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {sidebarInner}
      </aside>
    </div>
  );
}
