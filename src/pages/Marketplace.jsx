import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-[68px]" style={{ background: '#FBF9F8' }}>

      {/* ─── Hero Banner ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-8 pb-6 !py-0 !pt-8 !pb-6">
        <div
          className="rounded-[2rem] overflow-hidden relative p-8 sm:p-12 flex flex-col justify-center min-h-[260px] sm:min-h-[300px]"
          style={{
            background: 'linear-gradient(120deg, #1A1108 0%, #3a2a15 100%)',
          }}
        >
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(255,92,0,0.15)' }} />

          <span
            className="text-[10px] font-bold tracking-[0.15em] uppercase mb-3"
            style={{
              color: '#FFD60A',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            NEW DROPS WEEKLY
          </span>
          <h1
            className="font-extrabold text-white max-w-lg"
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
            }}
          >
            Pre-loved gems,{' '}
            <br className="hidden sm:block" />
            freshly dropped.
          </h1>
          <Link
            to="/department/objects"
            className="mt-6 self-start px-6 py-3 rounded-full font-extrabold text-white inline-flex items-center gap-2"
            style={{ background: '#FF5C00' }}
          >
            Shop sneakers <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ─── Category Filters ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 !py-0 !pt-4 !pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className="px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all"
              style={{
                background: activeCategory === c ? '#1A1108' : 'white',
                color: activeCategory === c ? 'white' : '#1A1108',
                boxShadow: '0 0 0 1px rgba(26,17,8,0.08)',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* ─── Product Grid ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 !py-8">
        <div className="flex items-baseline justify-between mb-6">
          <h2
            className="font-extrabold"
            style={{
              fontSize: 26,
              letterSpacing: '-0.02em',
              color: '#1A1108',
            }}
          >
            {activeCategory === 'All' ? 'Trending now' : activeCategory}
          </h2>
          <span
            className="text-[10px] font-bold tracking-[0.15em] uppercase"
            style={{
              color: 'rgba(26,17,8,0.4)',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {filtered.length} items
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p
            className="text-center py-16 text-sm"
            style={{ color: 'rgba(26,17,8,0.4)' }}
          >
            No items in this category yet.
          </p>
        )}
      </section>

      {/* ─── Editorial Banners ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 !py-4 !pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dark banner */}
          <Link
            to="/department/men"
            className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden group"
            style={{
              background: '#1A1108',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <img
                src="/images/windbreaker.png"
                alt="New Arrivals"
                className="w-4/5 h-4/5 object-contain drop-shadow-2xl opacity-80 mix-blend-lighten transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.15em] block mb-2"
                style={{
                  color: '#FF5C00',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                FRESH DROPS
              </span>
              <h3
                className="font-extrabold uppercase leading-[1.05]"
                style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.02em' }}
              >
                New
                <br />
                Arrivals
              </h3>
              <span className="inline-flex items-center gap-1 mt-4 text-[11px] font-bold uppercase tracking-wider border-b border-white/40 pb-1">
                Explore Drop <ArrowRight size={12} />
              </span>
            </div>
          </Link>

          {/* Light banner */}
          <Link
            to="/department/women"
            className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden group"
            style={{
              background: 'white',
              boxShadow: '0 0 0 1px rgba(26,17,8,0.06), 0 10px 30px rgba(0,0,0,0.06)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <img
                src="/images/cargo-pants.png"
                alt="Utility Essentials"
                className="w-4/5 h-4/5 object-contain drop-shadow-2xl transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-transparent" />
            <div className="absolute top-8 left-8 right-8">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.15em] block mb-2"
                style={{
                  color: '#FF5C00',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                UTILITY WEAR
              </span>
              <h3
                className="font-extrabold uppercase leading-[1.05]"
                style={{
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  letterSpacing: '-0.02em',
                  color: '#1A1108',
                }}
              >
                Utility
                <br />
                Essentials
              </h3>
              <span
                className="inline-flex items-center gap-1 mt-4 text-[11px] font-bold uppercase tracking-wider border-b pb-1"
                style={{
                  color: '#1A1108',
                  borderColor: 'rgba(26,17,8,0.15)',
                }}
              >
                Shop Bottoms <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <section
        className="w-full text-white py-20 sm:py-24 relative overflow-hidden !mt-8"
        style={{ background: '#1A1108' }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(255,92,0,0.1)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(255,92,0,0.05)' }} />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <span
            className="text-[10px] font-bold tracking-[0.15em] uppercase mb-3 block"
            style={{
              color: '#FF5C00',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            STREETWEAR COMMUNITY
          </span>
          <h2
            className="font-extrabold tracking-tight mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.02em' }}
          >
            Join The Club
          </h2>
          <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Subscribe for early access to vintage drops, exclusive discount codes, and AI styling suggestions.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="!bg-white/10 !border-white/15 rounded-xl px-5 py-3.5 text-[13px] text-white placeholder:text-white/40 w-full focus:!border-accent focus:!ring-2 focus:!ring-accent/20"
            />
            <button type="submit" className="btn-accent px-8 py-3.5 shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}