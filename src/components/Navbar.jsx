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
          ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-border' : 'bg-white'}
        `}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between w-full h-20 sm:h-24 relative">
            
            {/* Invisible Left Anchor for Flex Spacing */}
            <div className="w-10"></div>
            
            {/* Absolute Center Container for Links & Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-8 lg:gap-16">
              
              {/* Left Nav (Men, Women, Objects) */}
              <div className="hidden lg:flex items-center gap-8">
                <Link to="/" className="text-[11px] font-bold tracking-[0.1em] uppercase text-text-secondary hover:text-charcoal transition-colors">Men</Link>
                <Link to="/" className="text-[11px] font-bold tracking-[0.1em] uppercase text-text-secondary hover:text-charcoal transition-colors">Women</Link>
                <Link to="/" className="text-[11px] font-bold tracking-[0.1em] uppercase text-text-secondary hover:text-charcoal transition-colors">Objects</Link>
              </div>

              {/* Center Logo */}
              <Link to="/" className="flex flex-col items-center justify-center shrink-0">
                <span className="font-sans text-2xl font-extrabold tracking-tight text-charcoal leading-none">Thrift Kro</span>
              </Link>

              {/* Right Nav (Search, Sell) */}
              <div className="hidden lg:flex items-center gap-8">
                <div className="flex items-center border-b border-charcoal/20 pb-1 hover:border-charcoal transition-colors">
                  <Search className="w-3.5 h-3.5 text-charcoal mr-2" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent text-[11px] font-medium tracking-wide w-24 focus:w-32 transition-all focus:outline-none placeholder:text-text-muted uppercase"
                  />
                </div>
                <Link to="/seller" className="text-[11px] font-bold tracking-[0.1em] uppercase text-text-secondary hover:text-charcoal transition-colors">
                  Sell
                </Link>
              </div>

            </div>

            {/* Far Right: Profile & Cart */}
            <div className="flex items-center justify-end gap-6 sm:gap-8 ml-auto relative z-10">
              <Link to="/account" className="hidden sm:block text-charcoal hover:opacity-60 transition-opacity">
                <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </Link>
              
              <Link to="/cart" className="text-charcoal hover:opacity-60 transition-opacity relative">
                <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-accent text-white text-[9px] font-bold flex items-center justify-center rounded-full">2</span>
              </Link>

              <button
                className="lg:hidden text-charcoal hover:opacity-60 transition-opacity"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border h-screen animate-fade-in">
            <div className="px-6 py-8 flex flex-col gap-6">
              <Link to="/" className="text-xl font-serif text-charcoal" onClick={() => setMobileOpen(false)}>Men</Link>
              <Link to="/" className="text-xl font-serif text-charcoal" onClick={() => setMobileOpen(false)}>Women</Link>
              <Link to="/" className="text-xl font-serif text-charcoal" onClick={() => setMobileOpen(false)}>Objects</Link>
              <div className="h-px w-full bg-border my-2" />
              <Link to="/seller" className="text-sm font-bold tracking-[0.1em] uppercase text-text-secondary" onClick={() => setMobileOpen(false)}>Sell</Link>
              <Link to="/account" className="text-sm font-bold tracking-[0.1em] uppercase text-text-secondary" onClick={() => setMobileOpen(false)}>Account</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
