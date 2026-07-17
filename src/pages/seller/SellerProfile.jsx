import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Store, Package, Bell, Lock, RefreshCw, X } from 'lucide-react';

function Row({ icon, label, sub, to, onClick, danger }) {
  const content = (
    <>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: danger ? "#FDECEA" : "#FFF3E0" }}
      >
        <span style={{ color: danger ? "#DC2626" : '#FF5C00' }}>{icon}</span>
      </div>
      <div className="flex-1 text-left">
        <p className="font-bold text-sm" style={{ color: danger ? "#DC2626" : '#1A1108' }}>
          {label}
        </p>
        {sub && (
          <p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>
            {sub}
          </p>
        )}
      </div>
      <ChevronRight size={18} style={{ color: "rgba(26,17,8,0.3)" }} />
    </>
  );

  const className = "w-full flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-[#F7F4EF] transition-colors";
  const style = { boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" };

  if (to) {
    return <Link to={to} className={className} style={style}>{content}</Link>;
  }
  return <button onClick={onClick} className={className} style={style}>{content}</button>;
}

export default function SellerProfile() {
  const navigate = useNavigate();

  return (
    <div className="p-6 sm:p-10 max-w-3xl mx-auto animate-fade-in">
      
      {/* ─── Header Card ─── */}
      <div
        className="flex items-center gap-5 p-6 rounded-3xl mb-8 transition-transform hover:-translate-y-1"
        style={{ background: '#1A1108', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center font-extrabold text-2xl shrink-0"
          style={{ background: '#FFD60A', color: '#1A1108' }}
        >
          S
        </div>
        <div className="flex-1">
          <h1 className="font-extrabold text-xl text-white">
            StreetwearHub
          </h1>
          <p className="text-sm text-white/60">
            StreetwearHub · Lahore, PK
          </p>
          <span
            className="inline-flex items-center gap-1 mt-1.5 text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: '#FFD60A', color: '#1A1108' }}
          >
            <ShieldCheck size={11} /> Verified seller
          </span>
        </div>
        <Link
          to="/seller/edit-profile"
          className="px-4 py-2 rounded-full text-sm font-bold transition-colors hover:bg-white hover:text-black shrink-0"
          style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
        >
          Edit
        </Link>
      </div>

      <div className="space-y-3">
        {/* Shop Section */}
        <span
          className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2"
          style={{ color: 'rgba(26,17,8,0.4)', fontFamily: "'JetBrains Mono', monospace" }}
        >
          Shop
        </span>
        <Row
          icon={<Store size={18} />}
          label="Shop settings"
          sub="StreetwearHub"
          to="/seller/shop-setting"
        />
        <Row
          icon={<Package size={18} />}
          label="My listings"
          sub="4 items"
          to="/seller/listings"
        />
        
        {/* Preferences Section */}
        <div className="pt-3">
          <span
            className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2"
            style={{ color: 'rgba(26,17,8,0.4)', fontFamily: "'JetBrains Mono', monospace" }}
          >
            Preferences
          </span>
        </div>
        <Row
          icon={<Bell size={18} />}
          label="Notifications"
          to="/seller/notifications"
        />
        <Row
          icon={<Lock size={18} />}
          label="Privacy & Security"
          to="/seller/privacy"
        />
        <Row
          icon={<RefreshCw size={18} />}
          label="Switch to Buyer"
          sub="Shop for yourself"
          to="/marketplace"
        />
        
        {/* Logout */}
        <div className="pt-3" />
        <Row
          icon={<X size={18} />}
          label="Log out"
          danger
          onClick={() => navigate('/')}
        />
      </div>
    </div>
  );
}
