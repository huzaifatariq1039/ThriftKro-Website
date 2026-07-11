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
          <Route path="/account/*" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
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
