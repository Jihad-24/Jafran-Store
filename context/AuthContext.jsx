"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { matchMockAccount } from "@/lib/mockAuth";

const ROLE_KEY = "odyssey_dashboard_role";
const MOCK_SESSION_KEY = "odyssey_mock_session";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [mockSession, setMockSession] = useState(null);
  const [dashboardRole, setDashboardRoleState] = useState("user");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setFirebaseUser);
    return () => unsub();
  }, []);

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
          return;
        }
      }
      const stored = localStorage.getItem(ROLE_KEY);
      if (stored === "admin" || stored === "user") {
        setDashboardRoleState(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const user = mockSession?.user ?? firebaseUser;

  const setDashboardRole = (role) => {
    const next = role === "admin" ? "admin" : "user";
    try {
      localStorage.setItem(ROLE_KEY, next);
    } catch {
      /* ignore */
    }
    setDashboardRoleState(next);
    if (mockSession) {
      const nextSession = { ...mockSession, role: next };
      try {
        sessionStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(nextSession));
      } catch {
        /* ignore */
      }
      setMockSession(nextSession);
    }
  };

  const loginMock = (email, password) => {
    const m = matchMockAccount(email, password);
    if (!m) return false;
    const session = { user: m.user, role: m.role };
    try {
      sessionStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session));
      localStorage.setItem(ROLE_KEY, m.role);
    } catch {
      /* ignore */
    }
    setMockSession(session);
    setDashboardRoleState(m.role);
    return true;
  };

  const logout = async () => {
    try {
      sessionStorage.removeItem(MOCK_SESSION_KEY);
    } catch {
      /* ignore */
    }
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
