import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ScanLine,
  ClipboardList,
  Wallet,
  ArrowRightLeft,
  X,
  Menu,
} from 'lucide-react';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, path: '/seller' },
  { label: 'Listings', icon: Package, path: '/seller/listings' },
  { label: 'AI Verification', icon: ScanLine, path: '/seller/verification' },
  { label: 'Orders', icon: ClipboardList, path: '/seller/orders' },
  { label: 'Wallet', icon: Wallet, path: '/seller/wallet' },
];

export default function SellerSidebar({ collapsed, onToggleCollapse, mobileOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50 bg-white border-r border-border/65 flex flex-col
          transition-all duration-300 ease-out
          lg:translate-x-0 lg:static lg:z-auto
          ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'lg:w-20' : 'lg:w-64'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-20 border-b border-border/40 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-accent text-white font-black flex items-center justify-center shrink-0 shadow-sm shadow-accent/25">
              TK
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="animate-fade-in">
                <span className="text-sm font-black text-charcoal leading-none block">Thrift Kro</span>
                <span className="block text-[9px] text-accent font-extrabold tracking-widest uppercase mt-0.5">
                  Seller Portal
                </span>
              </div>
            )}
          </div>
          
          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl hover:bg-surface text-text-secondary hover:text-charcoal transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/seller'}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) => `
                flex items-center gap-3.5 px-3.5 py-3 rounded-2xl
                text-xs font-bold uppercase tracking-wider transition-all duration-200
                ${isActive
                  ? 'bg-accent-ultralight text-accent border-l-2 border-accent rounded-l-none'
                  : 'text-text-secondary hover:text-charcoal hover:bg-surface'
                }
                ${collapsed ? 'lg:justify-center lg:px-0 lg:border-l-0 lg:rounded-2xl' : ''}
              `}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {(!collapsed || mobileOpen) && <span className="animate-fade-in">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Switch to marketplace */}
        <div className="px-3 pb-6 shrink-0">
          <NavLink
            to="/"
            title="Switch to Marketplace"
            className={`
              flex items-center justify-center gap-2
              py-3 rounded-2xl text-xs font-bold uppercase tracking-wider
              bg-[#F9FAFB] border border-border/50 text-text-secondary
              hover:bg-border/30 hover:text-charcoal
              transition-all duration-200
              ${collapsed ? 'lg:px-0' : 'px-4'}
            `}
          >
            <ArrowRightLeft className="w-4.5 h-4.5 shrink-0" />
            {(!collapsed || mobileOpen) && <span className="animate-fade-in">Marketplace</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
}
