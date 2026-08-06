import React, { Suspense, lazy } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { WebApp } from "@/layouts/WebApp";
import { PageLoader } from "@/components/ui";
import { useStore } from "@/hooks/useStore";
import { useAppStore } from "@/store/useAppStore";

// Lazy-loaded Feature Screens
const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));
const RoleSelectPage = lazy(() => import("@/features/landing/pages/RoleSelectPage"));
const AuthPage = lazy(() => import("@/features/auth/pages/AuthPage"));

const CareersPage = lazy(() => import("@/features/public-pages/pages/CareersPage"));
const PressPage = lazy(() => import("@/features/public-pages/pages/PressPage"));
const SellerGuidePage = lazy(() => import("@/features/public-pages/pages/SellerGuidePage"));
const BlogPage = lazy(() => import("@/features/public-pages/pages/BlogPage"));

const BuyerHome = lazy(() => import("@/features/buyer/pages/BuyerHome"));
const BuyerProduct = lazy(() => import("@/features/buyer/pages/BuyerProduct"));
const BuyerVto = lazy(() => import("@/features/buyer/pages/BuyerVto"));
const BuyerCart = lazy(() => import("@/features/buyer/pages/BuyerCart"));
const BuyerProfile = lazy(() => import("@/features/buyer/pages/BuyerProfile"));
const BuyerEditProfile = lazy(() => import("@/features/buyer/pages/BuyerEditProfile"));
const BuyerOrders = lazy(() => import("@/features/buyer/pages/BuyerOrders"));
const BuyerWishlist = lazy(() => import("@/features/buyer/pages/BuyerWishlist"));
const BuyerAddresses = lazy(() => import("@/features/buyer/pages/BuyerAddresses"));
const BuyerPayments = lazy(() => import("@/features/buyer/pages/BuyerPayments"));
const BuyerNotifications = lazy(() => import("@/features/buyer/pages/BuyerNotifications"));
const BuyerPrivacy = lazy(() => import("@/features/buyer/pages/BuyerPrivacy"));
const BuyerSearch = lazy(() => import("@/features/buyer/pages/BuyerSearch"));

const SellerVerify = lazy(() => import("@/features/seller/pages/SellerVerify"));
const SellerDashboard = lazy(() => import("@/features/seller/pages/SellerDashboard"));
const SellerListings = lazy(() => import("@/features/seller/pages/SellerListings"));
const SellerAdd = lazy(() => import("@/features/seller/pages/SellerAdd"));
const SellerMessages = lazy(() => import("@/features/seller/pages/SellerMessages"));
const SellerProfile = lazy(() => import("@/features/seller/pages/SellerProfile"));
const SellerEditProfile = lazy(() => import("@/features/seller/pages/SellerEditProfile"));
const SellerShopSetting = lazy(() => import("@/features/seller/pages/SellerShopSetting"));
const SellerNotifications = lazy(() => import("@/features/seller/pages/SellerNotifications"));
const SellerPrivacy = lazy(() => import("@/features/seller/pages/SellerPrivacy"));
import { useAuth } from "@/contexts/AuthContext";

const AdminLogin = lazy(() => import("@/features/admin/pages/AdminLogin"));
const AdminDashboard = lazy(() => import("@/features/admin/pages/AdminDashboard"));

const SellerGuard: React.FC<{ s: ReturnType<typeof useStore>; children: React.ReactNode }> = ({ s, children }) => {
  const navigate = useNavigate();
  const mustVerify = s.role === "seller" && (s.sellerVerified === "unverified" || s.sellerVerified === "rejected" || s.sellerVerified === "frozen");
  React.useEffect(() => {
    if (mustVerify) {
      navigate("/seller/verify");
    }
  }, [mustVerify, navigate]);

  if (mustVerify) {
    return null;
  }
  return <>{children}</>;
};

const GuestGuard: React.FC<{ s: ReturnType<typeof useStore>; children: React.ReactNode }> = ({ s, children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();
  const [checking, setChecking] = React.useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      if (role === "seller") {
        // Fetch real verification status before deciding where to redirect
        setChecking(true);
        s.fetchVerificationStatus().then(() => {
          // Read fresh state from Zustand store (not the stale closure)
          const v = useAppStore.getState().sellerVerified;
          navigate(v === "verified" || v === "pending" ? "/seller/dashboard" : "/seller/verify");
        }).finally(() => setChecking(false));
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/buyer/home");
      }
    }
  }, [isAuthenticated, role, navigate]);

  if (isAuthenticated || checking) {
    return null;
  }
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  const store = useStore();
  const navigate = useNavigate();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Pages wrapped in WebApp layout for modals & toasts */}
        <Route path="/" element={<WebApp><LandingPage s={store} onAdminClick={() => navigate("/admin/login")} /></WebApp>} />
        <Route path="/role-select" element={<WebApp><GuestGuard s={store}><RoleSelectPage s={store} /></GuestGuard></WebApp>} />
        <Route path="/auth/buyer" element={<WebApp><GuestGuard s={store}><AuthPage s={store} forRole="buyer" /></GuestGuard></WebApp>} />
        <Route path="/auth/seller" element={<WebApp><GuestGuard s={store}><AuthPage s={store} forRole="seller" /></GuestGuard></WebApp>} />

        <Route path="/careers" element={<WebApp><CareersPage s={store} /></WebApp>} />
        <Route path="/press" element={<WebApp><PressPage s={store} /></WebApp>} />
        <Route path="/seller-guide" element={<WebApp><SellerGuidePage s={store} /></WebApp>} />
        <Route path="/blog" element={<WebApp><BlogPage s={store} /></WebApp>} />

        {/* Buyer Routes */}
        <Route path="/buyer/home" element={<WebApp><BuyerHome s={store} /></WebApp>} />
        <Route path="/buyer/product" element={<WebApp><BuyerProduct s={store} /></WebApp>} />
        <Route path="/buyer/vto" element={<WebApp><BuyerVto s={store} /></WebApp>} />
        <Route path="/buyer/cart" element={<WebApp><BuyerCart s={store} /></WebApp>} />
        <Route path="/buyer/profile" element={<WebApp><BuyerProfile s={store} /></WebApp>} />
        <Route path="/buyer/profile/edit" element={<WebApp><BuyerEditProfile s={store} /></WebApp>} />
        <Route path="/buyer/orders" element={<WebApp><BuyerOrders s={store} /></WebApp>} />
        <Route path="/buyer/wishlist" element={<WebApp><BuyerWishlist s={store} /></WebApp>} />
        <Route path="/buyer/addresses" element={<WebApp><BuyerAddresses s={store} /></WebApp>} />
        <Route path="/buyer/payments" element={<WebApp><BuyerPayments s={store} /></WebApp>} />
        <Route path="/buyer/notifications" element={<WebApp><BuyerNotifications s={store} /></WebApp>} />
        <Route path="/buyer/privacy" element={<WebApp><BuyerPrivacy s={store} /></WebApp>} />
        <Route path="/buyer/search" element={<WebApp><BuyerSearch s={store} /></WebApp>} />

        {/* Seller Routes */}
        <Route path="/seller/verify" element={<WebApp><SellerVerify s={store} /></WebApp>} />
        <Route path="/seller/dashboard" element={<WebApp><SellerGuard s={store}><SellerDashboard s={store} /></SellerGuard></WebApp>} />
        <Route path="/seller/listings" element={<WebApp><SellerGuard s={store}><SellerListings s={store} /></SellerGuard></WebApp>} />
        <Route path="/seller/add" element={<WebApp><SellerGuard s={store}><SellerAdd s={store} /></SellerGuard></WebApp>} />
        <Route path="/seller/messages" element={<WebApp><SellerGuard s={store}><SellerMessages s={store} /></SellerGuard></WebApp>} />
        <Route path="/seller/profile" element={<WebApp><SellerProfile s={store} /></WebApp>} />
        <Route path="/seller/profile/edit" element={<WebApp><SellerEditProfile s={store} /></WebApp>} />
        <Route path="/seller/shop-settings" element={<WebApp><SellerGuard s={store}><SellerShopSetting s={store} /></SellerGuard></WebApp>} />
        <Route path="/seller/notifications" element={<WebApp><SellerNotifications s={store} /></WebApp>} />
        <Route path="/seller/privacy" element={<WebApp><SellerPrivacy s={store} /></WebApp>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<GuestGuard s={store}><AdminLogin onLogin={() => navigate("/admin/dashboard")} /></GuestGuard>} />
        <Route path="/admin/dashboard" element={<AdminDashboard onBack={() => navigate("/")} />} />

        {/* Fallback to Landing */}
        <Route path="*" element={<WebApp><LandingPage s={store} onAdminClick={() => navigate("/admin/login")} /></WebApp>} />
      </Routes>
    </Suspense>
  );
};
