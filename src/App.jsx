import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import SellerDashboard from './pages/SellerDashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import About from './pages/About';
import Contact from './pages/Contact';

function AppLayout() {
  const location = useLocation();
  const isSeller = location.pathname.startsWith('/seller');

  return (
    <div className="flex flex-col min-h-screen">
      {!isSeller && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/seller/*" element={<SellerDashboard />} />
        </Routes>
      </main>
      {!isSeller && <Footer />}
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
