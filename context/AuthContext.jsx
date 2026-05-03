"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";

const GUEST_CART_KEY = "guest_cart";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);

  // final user = DB user (includes role) OR firebase fallback
  const user = dbUser || firebaseUser;

  // ---------------- MERGE GUEST CART ----------------
  const mergeGuestCart = async (email) => {
    try {
      const guestCart =
        JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || [];

      if (!guestCart.length) return;

      await axios.post("http://localhost:5001/cart/merge", {
        email,
        items: guestCart,
      });

      localStorage.removeItem(GUEST_CART_KEY);
    } catch (err) {
      console.error("Cart merge failed:", err);
    }
  };

  // ---------------- FETCH USER FROM DB ----------------
  const fetchUserFromDB = async (email) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/users?email=${email}`
      );

      return res.data?.[0] || null;
    } catch (err) {
      console.error("Failed to fetch user:", err);
      return null;
    }
  };

  // ---------------- FIREBASE AUTH LISTENER ----------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setFirebaseUser(u);

      if (u?.email) {
        await mergeGuestCart(u.email);

        const dbUserData = await fetchUserFromDB(u.email);
        setDbUser(dbUserData);

        window.dispatchEvent(new Event("cart-updated"));
      } else {
        setDbUser(null);
      }
    });

    return () => unsub();
  }, []);

  // ---------------- LOGOUT ----------------
  const logout = async () => {
    await signOut(auth);
    setFirebaseUser(null);
    setDbUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,

        // role helpers (clean & simple)
        isAdmin: dbUser?.role === "admin",
        isUser: dbUser?.role === "user",
        role: dbUser?.role || "user",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);