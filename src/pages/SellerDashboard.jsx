import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import SellerSidebar from '../components/SellerSidebar';

// Subpages
import SellerOverview from './seller/SellerOverview';
import SellerListings from './seller/SellerListings';
import SellerVerification from './seller/SellerVerification';
import SellerOrders from './seller/SellerOrders';
import SellerWallet from './seller/SellerWallet';

export default function SellerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/seller') return 'Dashboard';
    if (path === '/seller/listings') return 'Listings';
    if (path === '/seller/verification') return 'AI Verification';
    if (path === '/seller/orders') return 'Orders';
    if (path === '/seller/wallet') return 'Wallet';
    return 'Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-charcoal select-none">
      {/* Sidebar */}
      <SellerSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl h-[72px] flex items-center justify-between px-6 lg:px-10 border-b border-[#F0F0F0]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-2 rounded-xl hover:bg-surface transition-colors text-charcoal"
            >
              <Menu className="w-5 h-5" strokeWidth={1.75} />
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-surface transition-colors"
            >
              <Menu className="w-5 h-5 text-charcoal" strokeWidth={1.75} />
            </button>
            <div>
              <h1 className="text-[17px] font-bold text-charcoal">{getPageTitle()}</h1>
              <p className="text-[11px] text-text-muted hidden sm:block">Welcome back, StreetwearHub</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl hover:bg-surface border border-[#EAEAEA] text-text-muted hover:text-charcoal transition-all relative">
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full ring-2 ring-white"></span>
              <Bell className="w-[18px] h-[18px]" strokeWidth={1.75} />
            </button>
            
            <div className="flex items-center gap-3 pl-3 border-l border-[#EAEAEA]">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-dark text-white flex items-center justify-center font-bold text-[13px] shadow-sm">
                S
              </div>
              <div className="hidden sm:block">
                <span className="block text-[13px] font-semibold text-charcoal">StreetwearHub</span>
                <span className="block text-[10px] text-text-muted font-medium mt-0.5">Tier II Seller</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <div className="p-5 lg:p-8 flex-1 max-w-[1500px] w-full mx-auto">
          <Routes>
            <Route path="/" element={<SellerOverview />} />
            <Route path="/listings" element={<SellerListings />} />
            <Route path="/verification" element={<SellerVerification />} />
            <Route path="/orders" element={<SellerOrders />} />
            <Route path="/wallet" element={<SellerWallet />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
