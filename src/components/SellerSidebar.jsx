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
          fixed top-0 left-0 h-full z-50 bg-white lg:bg-transparent border-r border-[#EAEAEA] flex flex-col
          transition-all duration-300 ease-out
          lg:translate-x-0 lg:static lg:z-auto
          ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'lg:w-20' : 'lg:w-64'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-20 border-b border-[#EAEAEA] shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#121212] text-white font-bold flex items-center justify-center shrink-0 shadow-sm">
              TK
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="animate-fade-in">
                <span className="text-xs font-extrabold text-[#121212] leading-none block">Thrift Kro</span>
                <span className="block text-[9px] text-[#888888] font-bold tracking-widest uppercase mt-0.5">
                  Seller Portal
                </span>
              </div>
            )}
          </div>
          
          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-[#121212] transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/seller'}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl
                text-[10px] font-extrabold uppercase tracking-wider transition-all duration-200
                ${isActive
                  ? 'text-[#FF5C00] bg-slate-100/50'
                  : 'text-[#888888] hover:text-[#121212] hover:bg-slate-100/30'
                }
                ${collapsed ? 'lg:justify-center lg:px-0 lg:rounded-xl' : ''}
              `}
            >
              <item.icon className="w-[16px] h-[16px] shrink-0 stroke-[1.5]" />
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
              py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider
              bg-[#F3F4F6]/50 border border-transparent text-[#888888]
              hover:bg-[#F3F4F6] hover:text-[#121212]
              transition-all duration-200
              ${collapsed ? 'lg:px-0' : 'px-4'}
            `}
          >
            <ArrowRightLeft className="w-4 h-4 shrink-0 stroke-[1.5]" />
            {(!collapsed || mobileOpen) && <span className="animate-fade-in">Marketplace</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
}
