import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Marketplace from './pages/Marketplace';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import RoleSelection from './pages/RoleSelection';
import ProductDetail from './pages/ProductDetail';
import SellerDashboard from './pages/SellerDashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import About from './pages/About';
import Contact from './pages/Contact';
import DepartmentPage from './pages/DepartmentPage';

// Buyer sub-pages
import BuyerOrders from './pages/buyer/BuyerOrders';
import BuyerSaved from './pages/buyer/BuyerSaved';
import BuyerProfile from './pages/buyer/BuyerProfile';
import BuyerVto from './pages/buyer/BuyerVto';
import BuyerAddresses from './pages/buyer/BuyerAddresses';
import BuyerPayments from './pages/buyer/BuyerPayments';
import BuyerNotifications from './pages/buyer/BuyerNotifications';
import BuyerPrivacy from './pages/buyer/BuyerPrivacy';
import BuyerSearch from './pages/buyer/BuyerSearch';

function AppLayout() {
  const location = useLocation();
  const hiddenNavRoutes = ['/', '/login', '/signup', '/role-selection'];
  const hiddenFooterRoutes = ['/login', '/signup', '/role-selection'];
  const isSeller = location.pathname.startsWith('/seller');
  const hideNavbar = hiddenNavRoutes.includes(location.pathname) || isSeller;
  const hideFooter = hiddenFooterRoutes.includes(location.pathname) || isSeller;

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/department/:departmentName" element={<DepartmentPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Buyer profile hub & sub-pages */}
          <Route path="/account" element={<Account />} />
          <Route path="/account/orders" element={<BuyerOrders />} />
          <Route path="/account/settings" element={<BuyerProfile />} />
          <Route path="/account/addresses" element={<BuyerAddresses />} />
          <Route path="/account/payments" element={<BuyerPayments />} />
          <Route path="/account/notifications" element={<BuyerNotifications />} />
          <Route path="/account/privacy" element={<BuyerPrivacy />} />

          {/* Standalone buyer pages */}
          <Route path="/wishlist" element={<BuyerSaved />} />
          <Route path="/vto" element={<BuyerVto />} />
          <Route path="/search" element={<BuyerSearch />} />

          {/* Seller */}
          <Route path="/seller/*" element={<SellerDashboard />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
