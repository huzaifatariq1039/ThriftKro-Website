import { Link } from 'react-router-dom';
import { ShoppingBag, Package, ArrowRight } from 'lucide-react';

export default function RoleSelection() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-8"
      style={{ background: '#FBF9F8' }}
    >
      {/* Logo */}
      <div className="mb-10">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/Thrift kro.png" alt="Thrift Kro" className="h-12 w-12 rounded-xl object-cover" />
        </Link>
      </div>

      {/* Heading */}
      <h2
        className="font-extrabold text-center mb-2"
        style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.03em', color: '#1A1108' }}
      >
        How do you want to start?
      </h2>
      <p className="text-sm mb-10" style={{ color: 'rgba(26,17,8,0.55)' }}>
        You can switch anytime.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">

        {/* Buyer Card */}
        <Link
          to="/login"
          className="p-8 rounded-3xl text-left transition-all duration-300 hover:-translate-y-1 group"
          style={{ background: 'white', boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: '#FF5C00' }}
          >
            <ShoppingBag size={28} color="white" />
          </div>
          <p className="font-extrabold text-xl mb-1" style={{ color: '#1A1108' }}>
            I'm a Buyer
          </p>
          <p className="text-sm" style={{ color: 'rgba(26,17,8,0.55)' }}>
            Browse thousands of pre-loved pieces, try them on in AR & shop safely.
          </p>
          <span
            className="inline-flex items-center gap-1 mt-5 font-bold text-sm group-hover:gap-2 transition-all"
            style={{ color: '#FF5C00' }}
          >
            Continue <ArrowRight size={16} />
          </span>
        </Link>

        {/* Seller Card */}
        <Link
          to="/login"
          className="p-8 rounded-3xl text-left transition-all duration-300 hover:-translate-y-1 group"
          style={{ background: '#1A1108', boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: '#FFD60A' }}
          >
            <Package size={28} style={{ color: '#1A1108' }} />
          </div>
          <p className="font-extrabold text-xl mb-1 text-white">
            I'm a Seller
          </p>
          <p className="text-sm text-white/55">
            List your closet, reach 50K+ buyers, track orders & grow your shop.
          </p>
          <span
            className="inline-flex items-center gap-1 mt-5 font-bold text-sm group-hover:gap-2 transition-all"
            style={{ color: '#FFD60A' }}
          >
            Continue <ArrowRight size={16} />
          </span>
        </Link>
      </div>

      {/* Back */}
      <Link
        to="/"
        className="mt-10 text-sm font-semibold transition-opacity hover:opacity-70"
        style={{ color: 'rgba(26,17,8,0.5)' }}
      >
        ← Back to home
      </Link>
    </div>
  );
}
