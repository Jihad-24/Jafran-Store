"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const copyUid = async () => {
    try {
      await navigator.clipboard.writeText(user?.uid || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
          <p className="text-gray-500 dark:text-gray-400">
            Please login to view your profile
          </p>
        </div>
        <Footer />
      </>
    );
  }

  const displayName = user.displayName || user.email?.split("@")[0] || "User";

  const photoURL = user.photoURL;

  const emailVerified = user.emailVerified ?? false;

  const memberSince = user?.metadata?.creationTime || user?.createdAt;

  const lastSignIn = user?.metadata?.lastSignInTime || user?.lastLogin;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Your profile
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Real account data
              </p>
            </div>

            <Link
              href="/items"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Browse products →
            </Link>
          </div>

          {/* CARD */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-lg overflow-hidden">
            {/* TOP */}
            <div className="p-8 flex flex-col sm:flex-row gap-6 sm:items-center border-b border-gray-200 dark:border-gray-800">
              {/* AVATAR */}
              <div className="relative w-24 h-24">
                {photoURL ? (
                  <Image
                    src={photoURL}
                    alt="profile"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-2xl object-cover border"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
                    {displayName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}

                {/* EDIT ICON */}
                <button
                  onClick={() => setOpen(true)}
                  className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 border rounded-full p-1 shadow"
                >
                  ✏️
                </button>
              </div>

              {/* INFO */}
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {displayName}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 truncate mt-1">
                  {user.email}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {emailVerified ? (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300">
                      Email verified
                    </span>
                  ) : (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200">
                      Email not verified
                    </span>
                  )}

                  {user?.role && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                      {user.role}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* DETAILS */}
            <dl className="p-8 space-y-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">User ID</dt>
                <dd className="flex gap-2 items-center">
                  <code className="truncate text-xs">{user.uid}</code>
                  <button onClick={copyUid} className="text-indigo-600 text-xs">
                    {copied ? "Copied" : "Copy"}
                  </button>
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-gray-500">Member since</dt>
                <dd>
                  {memberSince
                    ? new Date(memberSince).toLocaleDateString()
                    : "N/A"}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-gray-500">Last sign-in</dt>
                <dd>
                  {lastSignIn ? new Date(lastSignIn).toLocaleString() : "N/A"}
                </dd>
              </div>
            </dl>

            {/* ACTION */}
            <div className="px-8 pb-8">
              <button
                onClick={logout}
                className="px-5 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-80">
            <h2 className="text-lg font-semibold mb-4">
              Update Profile Picture
            </h2>

            {/* hidden input */}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));
              }}
            />

            {/* DROP ZONE */}
            <label
              htmlFor="fileInput"
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();

                const file = e.dataTransfer.files?.[0];
                if (!file) return;

                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));
              }}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-xl p-6 cursor-pointer hover:border-indigo-500 transition"
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="preview"
                  width={120}
                  height={120}
                  className="rounded-xl object-cover"
                />
              ) : (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    Drag & drop your image here
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    or click to browse
                  </p>
                </>
              )}
            </label>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={async () => {
                  if (!selectedFile) return;

                  setUploading(true);

                  const formData = new FormData();
                  formData.append("image", selectedFile);

                  try {
                    const imgbbRes = await axios.post(
                      `https://api.imgbb.com/1/upload?key=140f2d0db1502e65c2c0ee7bfc66be98`,
                      formData,
                    );

                    const imageUrl = imgbbRes.data.data.url;

                    await axios.patch("http://localhost:5001/users/avatar", {
                      email: user.email,
                      photoURL: imageUrl,
                    });

                    setUploading(false);
                    setOpen(false);
                    setSelectedFile(null);
                    setPreview(null);

                    window.location.reload();
                  } catch (err) {
                    console.error(err);
                    setUploading(false);
                  }
                }}
                disabled={!selectedFile || uploading}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Save"}
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  setSelectedFile(null);
                  setPreview(null);
                }}
                className="px-4 py-2 rounded-xl border text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
