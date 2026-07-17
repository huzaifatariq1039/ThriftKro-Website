import { Link } from 'react-router-dom';
import {
  Package, Heart, MapPin, CreditCard, Bell, Lock, RefreshCw, X,
  ChevronRight, Check,
} from 'lucide-react';

function Row({ icon, label, sub, to, danger }) {
  return (
    <Link
      to={to}
      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-[#F7F4EF] transition-colors"
      style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.06)' }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: danger ? '#FDECEA' : '#FFF3E0' }}
      >
        <span style={{ color: danger ? '#DC2626' : '#FF5C00' }}>{icon}</span>
      </div>
      <div className="flex-1 text-left">
        <p className="font-bold text-sm" style={{ color: danger ? '#DC2626' : '#1A1108' }}>
          {label}
        </p>
        {sub && (
          <p className="text-xs" style={{ color: 'rgba(26,17,8,0.5)' }}>
            {sub}
          </p>
        )}
      </div>
      <ChevronRight size={18} style={{ color: 'rgba(26,17,8,0.3)' }} />
    </Link>
  );
}

export default function Account() {
  return (
    <div className="min-h-screen pt-[68px]" style={{ background: '#FBF9F8' }}>
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-8 animate-fade-in">

        {/* Profile Card */}
        <div
          className="flex items-center gap-5 p-6 rounded-3xl bg-white mb-8"
          style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold"
            style={{ background: '#FFF3E0', color: '#FF5C00' }}
          >
            JD
          </div>
          <div className="flex-1">
            <h1 className="font-extrabold text-xl" style={{ color: '#1A1108' }}>
              John Doe
            </h1>
            <p className="text-sm" style={{ color: 'rgba(26,17,8,0.55)' }}>
              john@example.com
            </p>
            <span
              className="inline-flex items-center gap-1 mt-1.5 text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: '#E8F5E9', color: '#2E7D32' }}
            >
              <Check size={11} /> Verified buyer
            </span>
          </div>
          <Link
            to="/account/settings"
            className="px-4 py-2 rounded-full text-sm font-bold"
            style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.12)', color: '#1A1108' }}
          >
            Edit
          </Link>
        </div>

        {/* Menu Rows */}
        <div className="space-y-3">
          {/* Shopping */}
          <span
            className="text-[10px] font-bold tracking-[0.1em] uppercase block"
            style={{
              color: 'rgba(26,17,8,0.4)',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Shopping
          </span>
          <Row icon={<Package size={18} />} label="My Orders" sub="2 orders" to="/account/orders" />
          <Row icon={<Heart size={18} />} label="Wishlist" sub="4 saved" to="/wishlist" />
          <Row icon={<MapPin size={18} />} label="Addresses" sub="2 saved" to="/account/addresses" />
          <Row icon={<CreditCard size={18} />} label="Payment Methods" sub="1 card" to="/account/payments" />

          {/* Preferences */}
          <div className="pt-3">
            <span
              className="text-[10px] font-bold tracking-[0.1em] uppercase block"
              style={{
                color: 'rgba(26,17,8,0.4)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Preferences
            </span>
          </div>
          <Row icon={<Bell size={18} />} label="Notifications" to="/account/notifications" />
          <Row icon={<Lock size={18} />} label="Privacy & Security" to="/account/privacy" />
          <Row icon={<RefreshCw size={18} />} label="Switch to Seller" sub="Manage your shop" to="/seller" />

          <div className="pt-3" />
          <Link
            to="/"
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-rose-50/60 transition-colors"
            style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.06)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: '#FDECEA' }}
            >
              <X size={18} style={{ color: '#DC2626' }} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-sm" style={{ color: '#DC2626' }}>Log out</p>
            </div>
            <ChevronRight size={18} style={{ color: 'rgba(26,17,8,0.3)' }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
