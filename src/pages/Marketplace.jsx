import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Netlify Theme Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 sm:px-12 lg:px-16 max-w-[1600px] mx-auto flex flex-col items-center text-center animate-fade-in">
        <h1 className="font-sans font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-[90px] text-charcoal tracking-tight mb-8 leading-[1.05]">
          Try kro.<br />
          Buy kro.<br />
          <span className="text-accent">Thrift kro.</span>
        </h1>
        <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed font-medium">
          Pakistan's first AI-powered preloved streetwear marketplace. Secure escrow payments, virtual try-on, and authentic vintage.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/" className="btn-accent text-white px-8 py-4 text-sm tracking-wide">
            Start Thrifting
          </Link>
          <Link to="/about" className="btn-outline px-8 py-4 text-sm tracking-wide">
            How It Works
          </Link>
        </div>
      </section>

      {/* Feature Image Banner (Optional but adds premium feel) */}
      <section className="px-6 sm:px-12 lg:px-16 max-w-[1600px] mx-auto mb-24 animate-slide-up">
        <div className="w-full aspect-[21/9] bg-surface rounded-sm overflow-hidden group">
          <img 
            src={products[0].image} 
            alt="Editorial" 
            className="w-full h-full object-cover opacity-90 scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
          />
        </div>
      </section>

      {/* Minimal Category Tabs */}
      <section className="px-6 sm:px-12 lg:px-16 max-w-[1600px] mx-auto mb-16 border-b border-border">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide pb-5">
          {['All', 'Hoodies', 'T-Shirts', 'Jackets', 'Sneakers', 'Pants', 'Accessories'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                shrink-0 text-[12px] font-bold tracking-[0.08em] uppercase transition-colors relative
                ${activeCategory === cat ? 'text-charcoal' : 'text-text-muted hover:text-charcoal'}
              `}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-charcoal" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 sm:px-12 lg:px-16 max-w-[1600px] mx-auto mb-32">
        <div className="flex justify-between items-end mb-8">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">{filtered.length} Items</span>
          <button className="text-[11px] font-bold text-charcoal uppercase tracking-widest border-b border-transparent hover:border-charcoal transition-colors">Sort</button>
        </div>
        <ProductGrid products={filtered} />
      </section>
    </div>
  );
}
