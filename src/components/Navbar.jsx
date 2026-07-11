import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-[#F0F0F0] shadow-sm' : 'bg-white'}
        `}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between w-full h-16 sm:h-[72px] relative">
            
            {/* Left Nav (Men, Women, Objects) */}
            <div className="hidden lg:flex items-center gap-8">
              {['Men', 'Women', 'Objects'].map((dept) => (
                <NavLink 
                  key={dept} 
                  to={`/department/${dept.toLowerCase()}`} 
                  className={({ isActive }) => `
                    text-[13px] font-medium transition-colors relative
                    after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300
                    ${isActive 
                      ? 'text-charcoal after:w-full font-semibold' 
                      : 'text-text-secondary hover:text-charcoal after:w-0 hover:after:w-full'
                    }
                  `}
                >
                  {dept}
                </NavLink>
              ))}
            </div>
            
            {/* Center Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <Link to="/" className="flex items-center gap-2.5 shrink-0 pointer-events-auto">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-[11px]">TK</span>
                </div>
                <span className="text-[18px] font-bold tracking-tight text-charcoal leading-none hidden sm:block">Thrift Kro</span>
              </Link>
            </div>

            {/* Right Nav (Search, Sell) */}
            <div className="hidden lg:flex items-center gap-6 ml-auto pr-6">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-xl hover:bg-surface transition-colors text-text-secondary hover:text-charcoal"
              >
                <Search className="w-[18px] h-[18px]" strokeWidth={1.75} />
              </button>
              <Link to="/seller" className="text-[13px] font-medium text-text-secondary hover:text-charcoal transition-colors">
                Sell
              </Link>
            </div>

            {/* Far Right: Profile & Cart */}
            <div className="flex items-center gap-4 relative z-10">
              <Link to="/account" className="hidden sm:flex p-2 rounded-xl hover:bg-surface transition-colors text-text-secondary hover:text-charcoal">
                <User className="w-[18px] h-[18px]" strokeWidth={1.75} />
              </Link>
              
              <Link to="/cart" className="p-2 rounded-xl hover:bg-surface transition-colors text-text-secondary hover:text-charcoal relative">
                <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.75} />
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-accent text-white text-[9px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">2</span>
              </Link>

              <button
                className="lg:hidden p-2 rounded-xl hover:bg-surface transition-colors text-charcoal"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" strokeWidth={1.75} /> : <Menu className="w-5 h-5" strokeWidth={1.75} />}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="border-t border-[#F0F0F0] animate-fade-in">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-4">
              <div className="relative max-w-lg mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search for brands, items, categories..."
                  className="w-full pl-11 pr-4 py-3 bg-surface rounded-xl border border-[#EAEAEA] focus:border-accent focus:ring-2 focus:ring-accent/10 text-[13px]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[#EAEAEA] animate-fade-in shadow-lg">
            <div className="px-6 py-8 flex flex-col gap-1">
              {['Men', 'Women', 'Objects'].map((dept) => (
                <NavLink 
                  key={dept} 
                  to={`/department/${dept.toLowerCase()}`} 
                  className={({ isActive }) => `
                    text-[15px] py-3 px-4 rounded-xl hover:bg-surface transition-colors
                    ${isActive ? 'font-bold text-accent bg-accent-ultralight' : 'font-semibold text-charcoal'}
                  `}
                  onClick={() => setMobileOpen(false)}
                >
                  {dept}
                </NavLink>
              ))}
              <div className="h-px w-full bg-[#F0F0F0] my-3" />
              <Link to="/seller" className="text-[14px] font-medium text-text-secondary py-3 px-4 rounded-xl hover:bg-surface transition-colors" onClick={() => setMobileOpen(false)}>Sell on Thrift Kro</Link>
              <Link to="/account" className="text-[14px] font-medium text-text-secondary py-3 px-4 rounded-xl hover:bg-surface transition-colors" onClick={() => setMobileOpen(false)}>My Account</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
