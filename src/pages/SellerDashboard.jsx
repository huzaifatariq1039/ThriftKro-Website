import { useState } from 'react';
import { Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, PlusCircle, MessageSquare, User,
  ArrowLeft, Bell, RefreshCw, X, Menu
} from 'lucide-react';

// Subpages
import SellerOverview from './seller/SellerOverview';
import SellerListings from './seller/SellerListings';
import SellerAdd from './seller/SellerAdd';
import SellerMessages from './seller/SellerMessages';
import SellerProfile from './seller/SellerProfile';
import SellerEditProfile from './seller/SellerEditProfile';
import SellerShopSetting from './seller/SellerShopSetting';
import SellerNotifications from './seller/SellerNotifications';
import SellerPrivacy from './seller/SellerPrivacy';

/* ─────────── TopBar ─────────── */
function TopBar({ title, backPath, toggleSidebar }) {
  const navigate = useNavigate();
  return (
    <div
      className="sticky top-0 z-30 px-6 sm:px-10 h-20 flex items-center justify-between border-b"
      style={{
        background: 'rgba(251,250,248,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: 'rgba(26,17,8,0.08)',
      }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-xl text-charcoal hover:bg-black/5 transition-colors"
        >
          <Menu size={20} />
        </button>
        {backPath && (
          <button
            onClick={() => navigate(backPath)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
            style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.12)' }}
          >
            <ArrowLeft size={16} />
          </button>
        )}
        <h1
          className="font-extrabold"
          style={{ fontSize: 26, letterSpacing: '-0.03em', color: '#1A1108' }}
        >
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center relative cursor-pointer hover:bg-black/5 transition-colors"
          style={{ background: 'white', boxShadow: '0 0 0 1px rgba(26,17,8,0.1)' }}
        >
          <Bell size={18} style={{ color: '#1A1108' }} />
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center"
            style={{ background: '#FF5C00', fontSize: 9, fontFamily: "'JetBrains Mono', monospace" }}
          >
            2
          </span>
        </div>
        <Link to="/seller/profile">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold hover:scale-105 transition-transform"
            style={{ background: '#FFD60A', color: '#1A1108' }}
          >
            S
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function SellerDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getPageTitle = () => {
    const p = location.pathname;
    if (p === '/seller') return 'Dashboard';
    if (p === '/seller/listings') return 'My Listings';
    if (p === '/seller/add') return 'Add New Item';
    if (p === '/seller/messages') return 'Messages';
    if (p.startsWith('/seller/profile')) return 'Profile';
    if (p === '/seller/edit-profile') return 'Edit Profile';
    if (p === '/seller/shop-setting') return 'Shop Settings';
    if (p === '/seller/notifications') return 'Notifications';
    if (p === '/seller/privacy') return 'Privacy & Security';
    return 'Dashboard';
  };

  const getBackPath = () => {
    const p = location.pathname;
    if (p === '/seller/add') return '/seller/listings';
    if (
      p === '/seller/edit-profile' ||
      p === '/seller/shop-setting' ||
      p === '/seller/notifications' ||
      p === '/seller/privacy'
    ) {
      return '/seller/profile';
    }
    return null;
  };

  const navLinks = [
    { path: '/seller', icon: <LayoutDashboard size={18} />, label: 'Dashboard', exact: true },
    { path: '/seller/listings', icon: <Package size={18} />, label: 'Listings' },
    { path: '/seller/add', icon: <PlusCircle size={18} />, label: 'Add Item' },
    { path: '/seller/messages', icon: <MessageSquare size={18} />, label: 'Messages', unread: 3 },
    { path: '/seller/profile', icon: <User size={18} />, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: '#FBF9F8', fontFamily: "'Inter', sans-serif" }}>
      
      {/* ─── Sidebar Overlay (Mobile) ─── */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      {/* ─── Sidebar ─── */}
      <aside
        className={`fixed md:sticky top-0 z-50 h-screen w-64 flex-shrink-0 border-r p-5 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ background: '#1A1108', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        {/* Logo */}
        <div className="mb-8 px-1 flex justify-between items-center">
          <Link to="/seller" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-[#FF5C00] flex items-center justify-center font-bold text-white">
              TK
            </div>
            <span className="text-white font-extrabold text-lg">Seller</span>
          </Link>
          <button className="md:hidden text-white/50" onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {navLinks.map(n => {
            const active = n.exact
              ? location.pathname === n.path
              : location.pathname.startsWith(n.path);

            return (
              <Link
                key={n.path}
                to={n.path}
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors"
                style={{
                  background: active ? '#FF5C00' : 'transparent',
                  color: active ? 'white' : 'rgba(255,255,255,0.6)',
                }}
              >
                {n.icon}
                <span className="flex-1 text-left">{n.label}</span>
                {n.unread && (
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{ background: '#FFD60A', color: '#1A1108', fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {n.unread}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <Link
          to="/marketplace"
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold mb-2 transition-colors hover:bg-white/20"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}
        >
          <RefreshCw size={16} /> Switch to Buyer
        </Link>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-colors hover:text-white"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          <X size={16} /> Log out
        </button>
      </aside>

      {/* ─── Main Content ─── */}
      <main className="flex-1 min-w-0 flex flex-col">
        <TopBar
          title={getPageTitle()}
          backPath={getBackPath()}
          toggleSidebar={() => setMobileOpen(true)}
        />
        
        <div className="flex-1 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<SellerOverview />} />
            <Route path="/listings" element={<SellerListings />} />
            <Route path="/add" element={<SellerAdd />} />
            <Route path="/messages" element={<SellerMessages />} />
            <Route path="/profile" element={<SellerProfile />} />
            <Route path="/edit-profile" element={<SellerEditProfile />} />
            <Route path="/shop-setting" element={<SellerShopSetting />} />
            <Route path="/notifications" element={<SellerNotifications />} />
            <Route path="/privacy" element={<SellerPrivacy />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
