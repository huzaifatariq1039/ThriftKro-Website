import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, RefreshCw } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/marketplace', label: 'Discover' },
    { to: '/vto', label: 'Try-On' },
    { to: '/wishlist', label: 'Wishlist' },
    { to: '/account/orders', label: 'Orders' },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(251,250,248,0.85)' : 'rgba(251,250,248,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderColor: 'rgba(26,17,8,0.08)',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-[68px] gap-4 sm:gap-8">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <img
                src="/Thrift kro.png"
                alt="Thrift Kro"
                className="h-9 w-9 rounded-xl object-cover"
              />
              <span
                className="text-[17px] font-extrabold tracking-tight leading-none hidden sm:block whitespace-nowrap"
                style={{ color: '#1A1108' }}
              >
                Thrift Kro
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-7 flex-1">
              {navLinks.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `text-sm font-semibold transition-colors hover:opacity-70 ${
                      isActive ? 'text-accent' : ''
                    }`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? '#FF5C00' : '#1A1108',
                  })}
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            {/* Search bar (desktop) */}
            <Link
              to="/search"
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full flex-1 max-w-xs"
              style={{
                background: 'white',
                boxShadow: '0 0 0 1px rgba(26,17,8,0.1)',
              }}
            >
              <Search size={16} style={{ color: 'rgba(26,17,8,0.4)' }} />
              <span className="text-sm" style={{ color: 'rgba(26,17,8,0.4)' }}>
                Search sneakers, vintage…
              </span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'white',
                  boxShadow: '0 0 0 1px rgba(26,17,8,0.1)',
                }}
              >
                <Heart size={18} style={{ color: '#1A1108' }} />
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative w-10 h-10 rounded-full flex items-center justify-center group"
                style={{
                  background: 'white',
                  boxShadow: '0 0 0 1px rgba(26,17,8,0.1)',
                }}
              >
                <ShoppingBag
                  size={18}
                  style={{ color: '#1A1108' }}
                  className="transition-transform group-hover:-translate-y-0.5"
                />
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center"
                  style={{
                    background: '#FF5C00',
                    fontSize: 9,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  2
                </span>
              </Link>

              {/* Profile */}
              <Link
                to="/account"
                className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  background: '#FFF3E0',
                  boxShadow: '0 0 0 1px rgba(26,17,8,0.1)',
                }}
              >
                <span className="text-xs font-bold" style={{ color: '#FF5C00' }}>JD</span>
              </Link>

              {/* Switch to Seller */}
              <Link
                to="/seller"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold"
                style={{ background: '#1A1108', color: 'white' }}
              >
                <RefreshCw size={13} /> Switch
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 rounded-xl hover:bg-white/60 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ color: '#1A1108' }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t animate-fade-in"
            style={{
              background: 'rgba(251,250,248,0.98)',
              borderColor: 'rgba(26,17,8,0.06)',
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `text-[15px] py-3 px-4 rounded-xl transition-colors font-semibold ${
                      isActive ? 'bg-[#FFF3E0] text-accent' : 'hover:bg-white/60'
                    }`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? '#FF5C00' : '#1A1108',
                  })}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="h-px w-full my-3" style={{ background: 'rgba(26,17,8,0.06)' }} />
              <Link
                to="/search"
                className="text-[15px] py-3 px-4 rounded-xl font-semibold hover:bg-white/60 flex items-center gap-2"
                style={{ color: '#1A1108' }}
                onClick={() => setMobileOpen(false)}
              >
                <Search size={16} /> Search
              </Link>
              <Link
                to="/seller"
                className="text-[15px] py-3 px-4 rounded-xl font-semibold hover:bg-white/60"
                style={{ color: 'rgba(26,17,8,0.6)' }}
                onClick={() => setMobileOpen(false)}
              >
                Switch to Seller
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
