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

export default function SellerSidebar({ collapsed, onToggleCollapse, mobileOpen, onClose }) {
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
          fixed top-0 left-0 h-full z-50 bg-white border-r border-[#F0F0F0] flex flex-col
          transition-all duration-300 ease-out
          lg:translate-x-0 lg:static lg:z-auto
          ${mobileOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'lg:w-[72px]' : 'lg:w-[260px]'}
        `}
      >
        {/* Header */}
        <div className={`flex items-center h-[72px] border-b border-[#F0F0F0] shrink-0 ${collapsed && !mobileOpen ? 'justify-center px-3' : 'justify-between px-5'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Logo icon always visible */}
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-white font-bold text-sm">TK</span>
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="animate-fade-in">
                <span className="text-[15px] font-bold text-charcoal leading-none block tracking-tight">Thrift Kro</span>
                <span className="text-[9px] text-text-muted tracking-[0.12em] uppercase block mt-0.5 font-medium">Seller Portal</span>
              </div>
            )}
          </div>
          
          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl hover:bg-surface text-text-muted hover:text-charcoal transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav label */}
        {(!collapsed || mobileOpen) && (
          <div className="px-5 pt-6 pb-2">
            <span className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">Menu</span>
          </div>
        )}

        {/* Nav links */}
        <nav className={`flex-1 ${collapsed && !mobileOpen ? 'px-2 py-4' : 'px-3 py-2'} space-y-1 overflow-y-auto scrollbar-hide`}>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/seller'}
              onClick={onClose}
              title={collapsed && !mobileOpen ? item.label : undefined}
              className={({ isActive }) => `
                group flex items-center gap-3 rounded-xl transition-all duration-300 relative overflow-hidden
                ${collapsed && !mobileOpen ? 'justify-center p-3' : 'px-4 py-2.5'}
                ${isActive
                  ? 'bg-accent/10 text-accent font-bold shadow-sm'
                  : 'text-text-secondary hover:bg-surface hover:text-charcoal'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/5 bg-accent rounded-r-full" />
                  )}
                  <item.icon className={`w-[18px] h-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'scale-110' : ''}`} strokeWidth={1.75} />
                  {(!collapsed || mobileOpen) && <span className="text-[13px] animate-fade-in">{item.label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Switch to marketplace */}
        <div className={`${collapsed && !mobileOpen ? 'px-2' : 'px-3'} pb-5 shrink-0`}>
          <NavLink
            to="/"
            title="Marketplace"
            className={`
              flex items-center justify-center gap-2.5 rounded-xl
              text-[12px] font-semibold
              bg-surface text-text-secondary border border-[#EAEAEA]
              hover:bg-charcoal hover:text-white hover:border-charcoal hover:shadow-[0_8px_20px_rgba(18,18,18,0.2)]
              transition-all duration-300 group
              ${collapsed && !mobileOpen ? 'p-3' : 'px-4 py-2.5'}
            `}
          >
            <ArrowRightLeft className="w-4 h-4 shrink-0 transition-transform duration-500 group-hover:rotate-180" strokeWidth={1.75} />
            {(!collapsed || mobileOpen) && <span className="animate-fade-in">Marketplace</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
}
