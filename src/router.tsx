import React, { Suspense, lazy } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { WebApp } from "@/layouts/WebApp";
import { PageLoader } from "@/components/ui";
import { useStore } from "@/hooks/useStore";

// Lazy-loaded Feature Screens
const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));
const RoleSelectPage = lazy(() => import("@/features/landing/pages/RoleSelectPage"));
const AuthPage = lazy(() => import("@/features/auth/pages/AuthPage"));

const CareersPage = lazy(() => import("@/features/public-pages/pages/CareersPage"));
const PressPage = lazy(() => import("@/features/public-pages/pages/PressPage"));
const SellerGuidePage = lazy(() => import("@/features/public-pages/pages/SellerGuidePage"));
const BlogPage = lazy(() => import("@/features/public-pages/pages/BlogPage"));
const GenericPage = lazy(() => import("@/features/public-pages/pages/GenericPage"));

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

const homeForRole = (role: ReturnType<typeof useAuth>["role"]) => {
  if (role === "admin") return "/admin/dashboard";
  if (role === "seller") return "/seller/verify";
  return "/buyer/home";
};

const RoleGuard: React.FC<{
  requiredRole: "buyer" | "seller" | "admin";
  children: React.ReactNode;
}> = ({ requiredRole, children }) => {
  const { authStatus, isAuthenticated, role } = useAuth();

  if (authStatus === "restoring") return <PageLoader />;
  if (!isAuthenticated) return <Navigate to={requiredRole === "admin" ? "/admin/login" : `/auth/${requiredRole}`} replace />;
  if (role !== requiredRole) return <Navigate to={homeForRole(role)} replace />;
  return <>{children}</>;
};

const SellerGuard: React.FC<{ s: ReturnType<typeof useStore>; children: React.ReactNode }> = ({ s, children }) => {
  const { authStatus, isAuthenticated, role } = useAuth();

  React.useEffect(() => {
    if (
      authStatus === "authenticated"
      && isAuthenticated
      && role === "seller"
      && s.sellerVerificationLoadState === "idle"
    ) {
      void s.fetchVerificationStatus().catch(() => undefined);
    }
  }, [authStatus, isAuthenticated, role, s.sellerVerificationLoadState, s.fetchVerificationStatus]);

  if (authStatus === "restoring") return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/auth/seller" replace />;
  if (role !== "seller") return <Navigate to={homeForRole(role)} replace />;
  if (s.sellerVerificationLoadState === "idle" || s.sellerVerificationLoadState === "loading") return <PageLoader />;
  if (s.sellerVerificationLoadState === "error" || s.sellerVerified !== "verified") {
    return <Navigate to="/seller/verify" replace />;
  }
  return <>{children}</>;
};

const GuestGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authStatus, isAuthenticated, role } = useAuth();
  if (authStatus === "restoring") return <PageLoader />;
  if (isAuthenticated) return <Navigate to={homeForRole(role)} replace />;
  return <>{children}</>;
};

const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RoleGuard requiredRole="admin">{children}</RoleGuard>;
};

const AdminGuestGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authStatus, isAuthenticated, role } = useAuth();
  if (authStatus === "restoring") return <PageLoader />;
  if (isAuthenticated) return <Navigate to={homeForRole(role)} replace />;
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  const store = useStore();
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Pages wrapped in WebApp layout for modals & toasts */}
        <Route path="/" element={<WebApp><LandingPage s={store} onAdminClick={() => navigate("/admin/login")} /></WebApp>} />
        <Route path="/role-select" element={<WebApp><GuestGuard><RoleSelectPage s={store} /></GuestGuard></WebApp>} />
        <Route path="/auth/buyer" element={<WebApp><GuestGuard><AuthPage s={store} forRole="buyer" /></GuestGuard></WebApp>} />
        <Route path="/auth/seller" element={<WebApp><GuestGuard><AuthPage s={store} forRole="seller" /></GuestGuard></WebApp>} />

        <Route path="/careers" element={<WebApp><CareersPage s={store} /></WebApp>} />
        <Route path="/press" element={<WebApp><PressPage s={store} /></WebApp>} />
        <Route path="/seller-guide" element={<WebApp><SellerGuidePage s={store} /></WebApp>} />
        <Route path="/blog" element={<WebApp><BlogPage s={store} /></WebApp>} />
        <Route path="/about-us" element={<WebApp><GenericPage s={store} title="About Us" /></WebApp>} />
        <Route path="/privacy-policy" element={<WebApp><GenericPage s={store} title="Privacy Policy" /></WebApp>} />
        <Route path="/terms-of-service" element={<WebApp><GenericPage s={store} title="Terms of Service" /></WebApp>} />
        <Route path="/buyer-protection" element={<WebApp><GenericPage s={store} title="Buyer Protection" /></WebApp>} />
        <Route path="/authentication" element={<WebApp><GenericPage s={store} title="Authentication" /></WebApp>} />
        <Route path="/contact" element={<WebApp><GenericPage s={store} title="Contact" /></WebApp>} />

        {/* Buyer Routes */}
        <Route path="/buyer/home" element={<WebApp><RoleGuard requiredRole="buyer"><BuyerHome s={store} /></RoleGuard></WebApp>} />
        <Route path="/buyer/product" element={<WebApp><RoleGuard requiredRole="buyer"><BuyerProduct s={store} /></RoleGuard></WebApp>} />
        <Route path="/buyer/vto" element={<WebApp><RoleGuard requiredRole="buyer"><BuyerVto s={store} /></RoleGuard></WebApp>} />
        <Route path="/buyer/cart" element={<WebApp><RoleGuard requiredRole="buyer"><BuyerCart s={store} /></RoleGuard></WebApp>} />
        <Route path="/buyer/profile" element={<WebApp><RoleGuard requiredRole="buyer"><BuyerProfile s={store} /></RoleGuard></WebApp>} />
        <Route path="/buyer/profile/edit" element={<WebApp><RoleGuard requiredRole="buyer"><BuyerEditProfile s={store} /></RoleGuard></WebApp>} />
        <Route path="/buyer/orders" element={<WebApp><RoleGuard requiredRole="buyer"><BuyerOrders s={store} /></RoleGuard></WebApp>} />
        <Route path="/buyer/wishlist" element={<WebApp><RoleGuard requiredRole="buyer"><BuyerWishlist s={store} /></RoleGuard></WebApp>} />
        <Route path="/buyer/addresses" element={<WebApp><RoleGuard requiredRole="buyer"><BuyerAddresses s={store} /></RoleGuard></WebApp>} />
        <Route path="/buyer/payments" element={<WebApp><RoleGuard requiredRole="buyer"><BuyerPayments s={store} /></RoleGuard></WebApp>} />
        <Route path="/buyer/notifications" element={<WebApp><RoleGuard requiredRole="buyer"><BuyerNotifications s={store} /></RoleGuard></WebApp>} />
        <Route path="/buyer/privacy" element={<WebApp><RoleGuard requiredRole="buyer"><BuyerPrivacy s={store} /></RoleGuard></WebApp>} />
        <Route path="/buyer/search" element={<WebApp><RoleGuard requiredRole="buyer"><BuyerSearch s={store} /></RoleGuard></WebApp>} />

        {/* Seller Routes */}
        <Route path="/seller/verify" element={<WebApp><RoleGuard requiredRole="seller"><SellerVerify s={store} /></RoleGuard></WebApp>} />
        <Route path="/seller/dashboard" element={<WebApp><SellerGuard s={store}><SellerDashboard s={store} /></SellerGuard></WebApp>} />
        <Route path="/seller/listings" element={<WebApp><SellerGuard s={store}><SellerListings s={store} /></SellerGuard></WebApp>} />
        <Route path="/seller/add" element={<WebApp><SellerGuard s={store}><SellerAdd s={store} /></SellerGuard></WebApp>} />
        <Route path="/seller/messages" element={<WebApp><SellerGuard s={store}><SellerMessages s={store} /></SellerGuard></WebApp>} />
        <Route path="/seller/profile" element={<WebApp><RoleGuard requiredRole="seller"><SellerProfile s={store} /></RoleGuard></WebApp>} />
        <Route path="/seller/profile/edit" element={<WebApp><RoleGuard requiredRole="seller"><SellerEditProfile s={store} /></RoleGuard></WebApp>} />
        <Route path="/seller/shop-settings" element={<WebApp><SellerGuard s={store}><SellerShopSetting s={store} /></SellerGuard></WebApp>} />
        <Route path="/seller/notifications" element={<WebApp><RoleGuard requiredRole="seller"><SellerNotifications s={store} /></RoleGuard></WebApp>} />
        <Route path="/seller/privacy" element={<WebApp><RoleGuard requiredRole="seller"><SellerPrivacy s={store} /></RoleGuard></WebApp>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminGuestGuard><AdminLogin onLogin={() => navigate("/admin/dashboard")} /></AdminGuestGuard>} />
        <Route path="/admin/dashboard" element={<AdminGuard><AdminDashboard onLogout={() => { logout(); navigate("/"); }} /></AdminGuard>} />

        {/* Fallback to Landing */}
        <Route path="*" element={<WebApp><LandingPage s={store} onAdminClick={() => navigate("/admin/login")} /></WebApp>} />
      </Routes>
    </Suspense>
  );
};
