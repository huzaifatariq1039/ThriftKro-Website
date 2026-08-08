import { useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { useAuth } from "../contexts/AuthContext";
import { Route } from "../types/types";

// Route path mapping helper
export const routeToPath: Record<Route, string> = {
  landing: "/",
  "role-select": "/role-select",
  "buyer-auth": "/auth/buyer",
  "seller-auth": "/auth/seller",
  "buyer-home": "/buyer/home",
  "buyer-product": "/buyer/product",
  "buyer-vto": "/buyer/vto",
  "buyer-cart": "/buyer/cart",
  "buyer-profile": "/buyer/profile",
  "buyer-edit-profile": "/buyer/profile/edit",
  "buyer-orders": "/buyer/orders",
  "buyer-wishlist": "/buyer/wishlist",
  "buyer-addresses": "/buyer/addresses",
  "buyer-payments": "/buyer/payments",
  "buyer-notifications": "/buyer/notifications",
  "buyer-privacy": "/buyer/privacy",
  "buyer-search": "/buyer/search",
  "seller-verify": "/seller/verify",
  "seller-dashboard": "/seller/dashboard",
  "seller-listings": "/seller/listings",
  "seller-add": "/seller/add",
  "seller-messages": "/seller/messages",
  "seller-profile": "/seller/profile",
  "seller-edit-profile": "/seller/profile/edit",
  "seller-notifications": "/seller/notifications",
  "seller-privacy": "/seller/privacy",
  "seller-shop-setting": "/seller/shop-settings",
  "seller-shop-settings": "/seller/shop-settings",
  careers: "/careers",
  press: "/press",
  "seller-guide": "/seller-guide",
  blog: "/blog",
};

export function useStore() {
  const store = useAppStore();
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Map route based on current path
  const currentRoute: Route = (Object.keys(routeToPath).find(
    k => routeToPath[k as Route] === location.pathname
  ) as Route) || "landing";

  const setRoute = (r: Route) => {
    const targetPath = routeToPath[r] || "/";
    navigate(targetPath);
  };

  const login = async (forRole: "buyer" | "seller") => {
    await auth.login("user@thriftkro.pk", "password", forRole);
    if (forRole === "seller") {
      const v = store.sellerVerified;
      navigate(v === "verified" || v === "pending" ? "/seller/dashboard" : "/seller/verify");
    } else {
      navigate("/buyer/home");
    }
  };

  const loginWithCredentials = async (email: string, pass: string, forRole: "buyer" | "seller") => {
    await auth.login(email, pass, forRole);
    if (forRole === "seller") {
      // Fetch real verification status from backend before deciding where to navigate
      await store.fetchVerificationStatus();
      const v = useAppStore.getState().sellerVerified;
      navigate(v === "verified" || v === "pending" ? "/seller/dashboard" : "/seller/verify");
    } else {
      navigate("/buyer/home");
    }
  };

  const signupWithCredentials = async (email: string, pass: string, fullName: string, forRole: "buyer" | "seller") => {
    const { authAPI } = await import("../services/api");
    await authAPI.signup({ email, name: fullName, role: forRole, password: pass });
    await auth.login(email, pass, forRole);
    if (forRole === "seller") {
      // New seller — ensure verification state is 'unverified' so the wizard shows
      store.setSellerVerified("unverified");
      navigate("/seller/verify");
    } else {
      navigate("/buyer/home");
    }
  };

  const signupSeller = async () => {
    await auth.signupSeller();
    navigate("/seller/verify");
  };

  const requestRoleSwitch = (target: "buyer" | "seller") => {
    store.setShowRoleSwitch(false);
    if (auth.unlockedRoles.has(target)) {
      auth.setRole(target);
      navigate(target === "buyer" ? "/buyer/home" : "/seller/dashboard");
    } else {
      auth.setAuthMode("login");
      navigate(target === "buyer" ? "/auth/buyer" : "/auth/seller");
    }
  };

  const logout = () => {
    auth.logout();
    navigate("/role-select");
  };

  return {
    ...store,
    route: currentRoute,
    setRoute,
    role: auth.role,
    setRole: auth.setRole,
    unlockedRoles: auth.unlockedRoles,
    authMode: auth.authMode,
    setAuthMode: auth.setAuthMode,
    login,
    loginWithCredentials,
    signupWithCredentials,
    signupSeller,
    logout,
    requestRoleSwitch,
  };
}

export type Store = ReturnType<typeof useStore>;
