"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import { matchMockAccount } from "@/lib/mockAuth";

const ROLE_KEY = "odyssey_dashboard_role";
const MOCK_SESSION_KEY = "odyssey_mock_session";
const GUEST_CART_KEY = "guest_cart";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [mockSession, setMockSession] = useState(null);
  const [dashboardRole, setDashboardRoleState] = useState("user");

  // ---------------- USER ----------------
  const user = mockSession?.user ?? firebaseUser;

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

  // ---------------- FIREBASE AUTH ----------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setFirebaseUser(u);

      if (u?.email) {
        await mergeGuestCart(u.email);
        window.dispatchEvent(new Event("cart-updated"));
      }
    });

    return () => unsub();
  }, []);

  // ---------------- INIT MOCK SESSION ----------------
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(MOCK_SESSION_KEY);

      if (raw) {
        const s = JSON.parse(raw);

        if (s?.user?.email) {
          setMockSession(s);

          if (s.role === "admin" || s.role === "user") {
            setDashboardRoleState(s.role);
            localStorage.setItem(ROLE_KEY, s.role);
          }
        }
      }

      const stored = localStorage.getItem(ROLE_KEY);
      if (stored === "admin" || stored === "user") {
        setDashboardRoleState(stored);
      }
    } catch {}
  }, []);

  // ---------------- ROLE ----------------
  const setDashboardRole = (role) => {
    const next = role === "admin" ? "admin" : "user";

    localStorage.setItem(ROLE_KEY, next);
    setDashboardRoleState(next);

    if (mockSession) {
      const nextSession = { ...mockSession, role: next };
      sessionStorage.setItem(
        MOCK_SESSION_KEY,
        JSON.stringify(nextSession)
      );
      setMockSession(nextSession);
    }
  };

  // ---------------- MOCK LOGIN ----------------
  const loginMock = async (email, password) => {
    const m = matchMockAccount(email, password);
    if (!m) return false;

    const session = { user: m.user, role: m.role };

    sessionStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(ROLE_KEY, m.role);

    setMockSession(session);
    setDashboardRoleState(m.role);

    await mergeGuestCart(m.user.email);

    window.dispatchEvent(new Event("cart-updated"));

    return true;
  };

  // ---------------- LOGOUT ----------------
  const logout = async () => {
    sessionStorage.removeItem(MOCK_SESSION_KEY);
    setMockSession(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        dashboardRole,
        setDashboardRole,
        loginMock,
        isMockSession: Boolean(mockSession),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);