import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Recycle, ShieldCheck } from 'lucide-react';
import { products } from '../data/products';

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: '#FBF9F8' }}>

      {/* ─── Header ─── */}
      <header className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/Thrift kro.png" alt="Thrift Kro" className="h-9 w-9 rounded-xl object-cover" />
          <span className="text-[17px] font-extrabold tracking-tight hidden sm:block" style={{ color: '#1A1108' }}>
            Thrift Kro
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Discover', to: '/marketplace' },
            { label: 'Try-On', to: '/vto' },
            { label: 'Sell', to: '/seller' },
            { label: 'About', to: '/about' },
          ].map(x => (
            <Link
              key={x.label}
              to={x.to}
              className="text-sm font-semibold hover:opacity-60 transition-opacity"
              style={{ color: '#1A1108' }}
            >
              {x.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/role-selection"
          className="px-5 py-2.5 rounded-full text-sm font-extrabold"
          style={{ background: '#1A1108', color: 'white' }}
        >
          Get Started
        </Link>
      </header>

      {/* ─── Hero Section ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-20 grid md:grid-cols-2 gap-12 items-center !pt-10 !pb-20">
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{ background: '#FFF3E0' }}
          >
            <Sparkles size={14} style={{ color: '#FF5C00' }} />
            <span className="text-xs font-bold" style={{ color: '#FF5C00' }}>
              Pakistan's #1 circular fashion marketplace
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-extrabold"
            style={{
              fontSize: 'clamp(42px, 6vw, 68px)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#1A1108',
            }}
          >
            Thrift smarter.
            <br />
            Style <span style={{ color: '#FF5C00' }}>louder.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base max-w-md" style={{ color: 'rgba(26,17,8,0.6)' }}>
            Buy & sell pre-loved streetwear, sneakers and vintage. Try them on with AR before you commit. Sustainable never looked this good.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/role-selection"
              className="px-7 py-4 rounded-full font-extrabold flex items-center gap-2 text-white transition-all hover:opacity-90"
              style={{ background: '#FF5C00' }}
            >
              Start Shopping <ArrowRight size={18} />
            </Link>
            <Link
              to="/role-selection"
              className="px-7 py-4 rounded-full font-extrabold transition-all hover:opacity-70"
              style={{ boxShadow: '0 0 0 1.5px rgba(26,17,8,0.15)', color: '#1A1108' }}
            >
              Sell Your Closet
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 flex gap-10">
            {[
              ['50K+', 'Active users'],
              ['120K+', 'Items listed'],
              ['4.9★', 'Avg. rating'],
            ].map(([num, label]) => (
              <div key={label}>
                <p
                  className="font-extrabold"
                  style={{ fontSize: 28, letterSpacing: '-0.02em', color: '#1A1108' }}
                >
                  {num}
                </p>
                <span
                  className="text-[10px] font-bold tracking-[0.1em] uppercase"
                  style={{
                    color: 'rgba(26,17,8,0.4)',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Image Grid (staggered 2×2) */}
        <div className="grid grid-cols-2 gap-4">
          {products.slice(0, 4).map((p, i) => (
            <div
              key={p.id}
              className={`rounded-3xl overflow-hidden ${i % 2 ? 'mt-8' : ''}`}
              style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features Section (Dark) ─── */}
      <section className="!py-16" style={{ background: '#1A1108' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Recycle size={24} />,
              title: 'Circular by design',
              desc: 'Every purchase keeps clothing out of landfills and in rotation.',
            },
            {
              icon: <Sparkles size={24} />,
              title: 'AR Try-On',
              desc: 'See how sneakers & fits look on you before you buy — no guesswork.',
            },
            {
              icon: <ShieldCheck size={24} />,
              title: 'Buyer Protection',
              desc: '7-day protection on every order. Shop with total peace of mind.',
            },
          ].map((feat, i) => (
            <div key={i}>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: '#FFD60A' }}
              >
                <span style={{ color: '#1A1108' }}>{feat.icon}</span>
              </div>
              <p className="font-extrabold text-white text-lg mb-2">{feat.title}</p>
              <p className="text-sm text-white/50">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="max-w-7xl mx-auto px-6 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/Thrift kro.png" alt="Thrift Kro" className="h-9 w-9 rounded-xl object-cover" />
          <span className="text-[17px] font-extrabold tracking-tight" style={{ color: '#1A1108' }}>
            Thrift Kro
          </span>
        </Link>
        <span
          className="text-xs"
          style={{
            color: 'rgba(26,17,8,0.4)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          © 2026 THRIFT KRO · MADE IN PAKISTAN
        </span>
      </footer>
    </div>
  );
}
