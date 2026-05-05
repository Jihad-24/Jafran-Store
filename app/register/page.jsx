"use client";

import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // store user in DB with role
      await axios.post("https://jafran-store-server.vercel.app/users", {
        email: cred.user.email,
        role: "user",
        createdAt: new Date(),
      });

      router.push("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // save / upsert user in DB
      await axios.post("https://jafran-store-server.vercel.app/users", {
        email: user.email,
        role: "user",
        createdAt: new Date(),
        photoURL: user.photoURL || "",
        name: user.displayName || "",
        provider: "google",
      });

      router.push("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <input name="email" placeholder="Email" className="input" />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />

          <button
            disabled={loading}
            className="cursor-pointer bg-indigo-600 dark:bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 transition"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>
        </div>

        <button
          onClick={handleGoogleRegister}
          className="cursor-pointer w-full border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 p-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>

         <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>
          {/* <span className="text-sm text-gray-500 dark:text-gray-400">OR</span> */}
          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {" "}
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 dark:text-indigo-500 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
