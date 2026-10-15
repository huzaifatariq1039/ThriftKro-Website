import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Role } from "../types/types";
import { authService } from "../services/api/authService";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "sonner";

type AccountRole = Exclude<Role, null>;
export type AuthStatus = "restoring" | "authenticated" | "anonymous";

type AuthContextType = {
  user: User | null;
  token: string | null;
  role: Role;
  authStatus: AuthStatus;
  isAuthenticated: boolean;
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
  login: (email: string, pass: string, expectedRole: "buyer" | "seller") => Promise<User>;
  signup: (email: string, pass: string, fullName: string, expectedRole: "buyer" | "seller") => Promise<User>;
  googleLogin: (googleToken: string, expectedRole: "buyer" | "seller") => Promise<User>;
  adminLogin: (email: string, pass: string) => Promise<User>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>("restoring");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const clearState = () => {
    setUser(null);
    setToken(null);
    setAuthStatus("anonymous");
    useAppStore.getState().resetSellerVerification();
  };

  const establishSession = async (
    sessionUser: User,
    sessionToken: string,
    expectedRole: AccountRole,
  ): Promise<User> => {
    if (sessionUser.role !== expectedRole) {
      await authService.logout().catch(() => undefined);
      clearState();
      throw new Error(`This account is registered as ${sessionUser.role}, not ${expectedRole}.`);
    }

    setUser(sessionUser);
    setToken(sessionToken);
    setAuthStatus("authenticated");
    useAppStore.getState().hydrateAuthenticatedProfile(sessionUser);
    return sessionUser;
  };

  useEffect(() => {
    let active = true;

    const restore = async () => {
      const storedToken = authService.getToken();
      if (!storedToken) {
        if (active) setAuthStatus("anonymous");
        return;
      }

      const restoredUser = await authService.getCurrentUser();
      if (!active) return;
      if (!restoredUser || !restoredUser.role) {
        clearState();
        return;
      }

      setUser(restoredUser);
      setToken(storedToken);
      setAuthStatus("authenticated");
      useAppStore.getState().hydrateAuthenticatedProfile(restoredUser);
    };

    void restore();
    return () => {
      active = false;
    };
  }, []);

  const login = async (email: string, pass: string, expectedRole: "buyer" | "seller") => {
    try {
      const response = await authService.login(email, pass, expectedRole);
      const loggedInUser = await establishSession(response.data.user, response.data.token, expectedRole);
      toast.success(`Successfully logged in as ${loggedInUser.role}`);
      return loggedInUser;
    } catch (error) {
      toast.error("Login failed. Please check your credentials and account role.");
      throw error;
    }
  };

  const signup = async (
    email: string,
    pass: string,
    fullName: string,
    expectedRole: "buyer" | "seller",
  ) => {
    const response = await authService.signup(email, pass, fullName, expectedRole);
    const signedUpUser = await establishSession(response.data.user, response.data.token, expectedRole);
    toast.success("Account created successfully");
    return signedUpUser;
  };

  const googleLogin = async (googleToken: string, expectedRole: "buyer" | "seller") => {
    const response = await authService.googleAuth(googleToken, expectedRole);
    return establishSession(response.user, response.access_token, expectedRole);
  };

  const adminLogin = async (email: string, pass: string) => {
    try {
      const response = await authService.login(email, pass, "admin");
      const admin = await establishSession(response.data.user, response.data.token, "admin");
      toast.success("Admin login successful");
      return admin;
    } catch (error) {
      toast.error("Admin login failed.");
      throw error;
    }
  };

  const logout = async () => {
    clearState();
    await authService.logout().catch(() => undefined);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      role: user?.role || null,
      authStatus,
      isAuthenticated: authStatus === "authenticated" && Boolean(user && token),
      authMode,
      setAuthMode,
      login,
      signup,
      googleLogin,
      adminLogin,
      logout,
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
