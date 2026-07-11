import { Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';
import { Package, Heart, Settings, ShieldCheck, Wallet, Calendar } from 'lucide-react';

import BuyerOrders from './buyer/BuyerOrders';
import BuyerSaved from './buyer/BuyerSaved';
import BuyerProfile from './buyer/BuyerProfile';

export default function Account() {
  const location = useLocation();

  const navItems = [
    { id: 'orders', icon: Package, label: 'My Orders', path: '/account/orders' },
    { id: 'saved', icon: Heart, label: 'Saved Items', path: '/account/saved' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/account/settings' }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 animate-fade-in">
        
        {/* Profile Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAEAEA] flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-accent-ultralight flex items-center justify-center text-2xl font-bold text-accent border border-accent/10">
            JD
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-charcoal tracking-tight">John Doe</h1>
            <p className="text-[12px] text-text-muted mt-1 flex items-center justify-center sm:justify-start gap-1">
              <Calendar className="w-3.5 h-3.5" /> Member since 2026
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
              <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] font-semibold text-emerald-800">Verified Buyer</span>
              </div>
              <div className="px-3 py-1.5 bg-accent-ultralight border border-accent/10 rounded-lg flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-accent" />
                <span className="text-[11px] font-semibold text-accent-dark">Balance: Rs. 0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#EAEAEA] p-3 shadow-sm">
              <nav className="flex flex-col gap-1">
                {navItems.map((tab) => (
                  <NavLink
                    key={tab.id}
                    to={tab.path}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold transition-all
                      ${isActive
                        ? 'bg-accent-ultralight text-accent'
                        : 'text-text-secondary hover:bg-surface hover:text-charcoal'
                      }
                    `}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Routes>
              <Route path="/" element={<Navigate to="/account/orders" replace />} />
              <Route path="/orders" element={<BuyerOrders />} />
              <Route path="/saved" element={<BuyerSaved />} />
              <Route path="/settings" element={<BuyerProfile />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
