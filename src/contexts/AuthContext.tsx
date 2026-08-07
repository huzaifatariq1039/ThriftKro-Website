import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Role } from "../types/types";
import { authAPI } from "../services/api";
import { useAppStore } from "@/store/useAppStore";

type AuthContextType = {
  user: User | null;
  token: string | null;
  role: Role;
  isAuthenticated: boolean;
  unlockedRoles: Set<Role>;
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
  login: (email: string, pass: string, forRole: "buyer" | "seller") => Promise<void>;
  signupSeller: () => Promise<void>;
  adminLogin: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  requestRoleSwitch: (target: "buyer" | "seller") => void;
  setRole: (role: Role) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("thrift_kro_token") || sessionStorage.getItem("thrift_kro_token"));
  const [role, setRoleState] = useState<Role>(null);
  const [unlockedRoles, setUnlockedRoles] = useState<Set<Role>>(new Set());
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    // Restore session on page reload
    const storedToken = localStorage.getItem("thrift_kro_token") || sessionStorage.getItem("thrift_kro_token");
    authAPI.getCurrentUser().then(u => {
      if (u) {
        setUser(u);
        setRoleState(u.role);
        setUnlockedRoles(new Set([u.role]));
        useAppStore.getState().syncProfile();
        // Re-sync token state from storage so isAuthenticated is correct
        if (storedToken) {
          setToken(storedToken);
        }
      } else {
        // No valid user — clear stale token state
        setToken(null);
      }
    }).catch(() => {
      // API unreachable — clear stale token state
      setToken(null);
    });
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    if (user) {
      const updated = { ...user, role: r };
      setUser(updated);
      localStorage.setItem("thrift_kro_user", JSON.stringify(updated));
    }
  };

  const login = async (email: string, pass: string, forRole: "buyer" | "seller") => {
    const res = await authAPI.login(email, pass, forRole);
    setUser(res.user);
    setToken(res.token);
    setRoleState(forRole);
    setUnlockedRoles(prev => new Set([...prev, forRole]));
    useAppStore.getState().syncProfile();
    // Token & user are already saved by authService based on Remember Me preference
  };

  const signupSeller = async () => {
    const res = await authAPI.signup({ email: "seller@thriftkro.pk", name: "New Seller", role: "seller" });
    setUser(res.user);
    setToken(res.token);
    setRoleState("seller");
    setUnlockedRoles(prev => new Set([...prev, "seller"]));
  };

  const adminLogin = async (email: string, pass: string) => {
    const res = await authAPI.adminLogin(email, pass);
    setUser(res.user);
    setToken(res.token);
    setRoleState("admin");
    setUnlockedRoles(prev => new Set([...prev, "admin"]));
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setToken(null);
    setRoleState(null);
    setUnlockedRoles(new Set());
  };

  const requestRoleSwitch = (target: "buyer" | "seller") => {
    setAuthMode("login");
    // Handled via navigation to auth page in router
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      role,
      isAuthenticated: !!user && !!token,
      unlockedRoles,
      authMode,
      setAuthMode,
      login,
      signupSeller,
      adminLogin,
      logout,
      requestRoleSwitch,
      setRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
