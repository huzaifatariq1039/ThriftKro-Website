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
  "about-us": "/about-us",
  "privacy-policy": "/privacy-policy",
  "terms-of-service": "/terms-of-service",
  "buyer-protection": "/buyer-protection",
  "authentication": "/authentication",
  "contact": "/contact",
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

  const loginWithCredentials = async (email: string, pass: string, forRole: "buyer" | "seller") => {
    await auth.login(email, pass, forRole);
    if (forRole === "seller") {
      try {
        const verification = await store.fetchVerificationStatus();
        navigate(verification === "verified" ? "/seller/dashboard" : "/seller/verify");
      } catch {
        navigate("/seller/verify");
      }
    } else {
      navigate("/buyer/home");
    }
  };

  const signupWithCredentials = async (email: string, pass: string, fullName: string, forRole: "buyer" | "seller") => {
    await auth.signup(email, pass, fullName, forRole);
    if (forRole === "seller") {
      navigate("/seller/verify");
    } else {
      navigate("/buyer/home");
    }
  };

  const requestRoleSwitch = async (target: "buyer" | "seller") => {
    store.setShowRoleSwitch(false);
    if (auth.role === target) {
      navigate(target === "buyer" ? "/buyer/home" : "/seller/verify");
      return;
    }
    await auth.logout();
    auth.setAuthMode("login");
    navigate(target === "buyer" ? "/auth/buyer" : "/auth/seller");
  };

  const logout = () => {
    auth.logout();
    navigate("/role-select");
  };

  const googleAuth = async (token: string, forRole: "buyer" | "seller") => {
    await auth.googleLogin(token, forRole);
    if (forRole === "seller") {
      try {
        const verification = await store.fetchVerificationStatus();
        navigate(verification === "verified" ? "/seller/dashboard" : "/seller/verify");
      } catch {
        navigate("/seller/verify");
      }
    } else {
      navigate("/buyer/home");
    }
  };

  return {
    ...store,
    route: currentRoute,
    setRoute,
    role: auth.role,
    authMode: auth.authMode,
    setAuthMode: auth.setAuthMode,
    loginWithCredentials,
    signupWithCredentials,
    googleAuth,
    logout,
    requestRoleSwitch,
  };
}

export type Store = ReturnType<typeof useStore>;
