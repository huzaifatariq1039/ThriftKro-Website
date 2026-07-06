import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ScanLine,
  ClipboardList,
  Wallet,
  ArrowRightLeft,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, path: '/seller' },
  { label: 'Listings', icon: Package, path: '/seller/listings' },
  { label: 'AI Verification', icon: ScanLine, path: '/seller/verification' },
  { label: 'Orders', icon: ClipboardList, path: '/seller/orders' },
  { label: 'Wallet', icon: Wallet, path: '/seller/wallet' },
];

export default function SellerSidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-charcoal/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          w-64 bg-charcoal flex flex-col
          transition-transform duration-300 ease-out
          lg:translate-x-0 lg:static lg:z-auto
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <img
              src="/Thrift kro.png"
              alt="Thrift Kro"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <div>
              <span className="text-sm font-semibold text-white">Thrift Kro</span>
              <span className="block text-[10px] text-white/40 tracking-widest uppercase">
                Seller
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/seller'}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl
                text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-accent/15 text-accent'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }
              `}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Switch to marketplace */}
        <div className="px-3 pb-4">
          <NavLink
            to="/"
            className="
              flex items-center justify-center gap-2
              px-4 py-2.5 rounded-xl
              text-xs font-medium tracking-wide
              bg-white/8 text-white/60
              hover:bg-white/12 hover:text-white/80
              transition-all duration-200
            "
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Switch to Marketplace
          </NavLink>
        </div>
      </aside>
    </>
  );
}
