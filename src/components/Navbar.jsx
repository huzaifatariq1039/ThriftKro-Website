import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-border/60 py-2 sm:py-3 shadow-sm' : 'bg-white py-4'}
        `}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between w-full h-16 sm:h-20 relative">
            
            {/* Left Nav (Men, Women, Objects) */}
            <div className="hidden lg:flex items-center gap-8 lg:gap-10">
              <Link to="/department/men" className="text-[11px] font-bold tracking-[0.15em] uppercase text-text-secondary hover:text-charcoal hover:scale-105 transition-all">Men</Link>
              <Link to="/department/women" className="text-[11px] font-bold tracking-[0.15em] uppercase text-text-secondary hover:text-charcoal hover:scale-105 transition-all">Women</Link>
              <Link to="/department/objects" className="text-[11px] font-bold tracking-[0.15em] uppercase text-text-secondary hover:text-charcoal hover:scale-105 transition-all">Objects</Link>
            </div>
            
            {/* Center Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link to="/" className="flex flex-col items-center justify-center shrink-0">
                <span className="font-sans text-2xl font-black tracking-tighter text-charcoal leading-none hover:text-accent transition-colors">Thrift Kro</span>
              </Link>
            </div>

            {/* Right Nav (Search, Sell) */}
            <div className="hidden lg:flex items-center gap-8 ml-auto pr-8">
              <div className="flex items-center border-b border-charcoal/20 pb-1 hover:border-charcoal transition-colors">
                <Search className="w-3.5 h-3.5 text-charcoal mr-2" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent text-[11px] font-bold tracking-widest w-24 focus:w-32 transition-all focus:outline-none placeholder:text-text-muted uppercase"
                />
              </div>
              <Link to="/seller" className="text-[11px] font-bold tracking-[0.15em] uppercase text-text-secondary hover:text-charcoal hover:scale-105 transition-all">
                Sell
              </Link>
            </div>

            {/* Far Right: Profile & Cart */}
            <div className="flex items-center gap-5 sm:gap-6 relative z-10">
              <Link to="/account" className="hidden sm:block text-charcoal hover:text-accent transition-colors">
                <User className="w-[18px] h-[18px]" strokeWidth={2} />
              </Link>
              
              <Link to="/cart" className="text-charcoal hover:text-accent transition-colors relative">
                <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={2} />
                <span className="absolute -top-1.5 -right-2 w-4.5 h-4.5 bg-accent text-white text-[9px] font-black flex items-center justify-center rounded-full border border-white">2</span>
              </Link>

              <button
                className="lg:hidden text-charcoal hover:text-accent transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" strokeWidth={2} /> : <Menu className="w-5 h-5" strokeWidth={2} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border/80 h-screen animate-fade-in">
            <div className="px-8 py-10 flex flex-col gap-6">
              <Link to="/department/men" className="text-lg font-bold tracking-widest uppercase text-charcoal" onClick={() => setMobileOpen(false)}>Men</Link>
              <Link to="/department/women" className="text-lg font-bold tracking-widest uppercase text-charcoal" onClick={() => setMobileOpen(false)}>Women</Link>
              <Link to="/department/objects" className="text-lg font-bold tracking-widest uppercase text-charcoal" onClick={() => setMobileOpen(false)}>Objects</Link>
              <div className="h-px w-full bg-border/60 my-2" />
              <Link to="/seller" className="text-sm font-extrabold tracking-widest uppercase text-text-secondary" onClick={() => setMobileOpen(false)}>Sell</Link>
              <Link to="/account" className="text-sm font-extrabold tracking-widest uppercase text-text-secondary" onClick={() => setMobileOpen(false)}>Account</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
