"use client";

import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { MOCK_DEMO_HINT } from "@/lib/mockAuth";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");
      router.push("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
      toast.success("Logged in successfully");
      router.push("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6">
          Welcome Back
        </h1>

        {/* <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4 leading-relaxed">
          {MOCK_DEMO_HINT}
        </p> */}

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="cursor-pointer w-full border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 p-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>
          {/* <span className="text-sm text-gray-500 dark:text-gray-400">OR</span> */}
          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {" "}
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 dark:text-indigo-500 hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
