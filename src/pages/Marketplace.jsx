import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-20">
      {/* Categories in Focus */}
      <section className="pt-16 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase mb-2 block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-current" /> Curated Drops
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight uppercase">Categories in Focus</h2>
          </div>
          <Link to="/department/men" className="text-[11px] font-bold text-accent uppercase tracking-widest hover:text-accent-dark hover:underline transition-all flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Vintage Tees", img: "/images/tee.png", link: "/department/men", count: "124 Pieces" },
            { name: "Denim Edit", img: "/images/denim-jacket.png", link: "/department/women", count: "82 Pieces" },
            { name: "Sneaker Vault", img: "/images/sneakers.png", link: "/department/objects", count: "45 Pieces" },
            { name: "Heavyweight Hoodies", img: "/images/hoodie.png", link: "/department/men", count: "98 Pieces" },
          ].map((cat, idx) => (
            <Link key={idx} to={cat.link} className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-white border border-border/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl">
              <div className="w-full h-full flex items-center justify-center p-8">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-contain drop-shadow-xl transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[9px] font-bold uppercase tracking-wider text-accent-light bg-accent/20 px-2 py-0.5 rounded-md mb-2 inline-block">{cat.count}</span>
                <h3 className="text-xl font-bold uppercase tracking-wide leading-tight">{cat.name}</h3>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center gap-1">
                  Shop Drop <ArrowRight className="w-3 h-3 text-accent" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Editorial Split Banners */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Banner 1 */}
          <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-charcoal group shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="absolute inset-0 flex items-center justify-center p-12 select-none">
              <img src="/images/windbreaker.png" alt="New Arrivals" className="w-4/5 h-4/5 object-contain drop-shadow-2xl opacity-80 mix-blend-lighten transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">FRESH DROPS DAILY</span>
              <h3 className="text-4xl font-extrabold tracking-tight mb-2 uppercase leading-[1.1]">New<br/>Arrivals</h3>
              <Link to="/department/men" className="inline-flex items-center gap-2 mt-4 text-[11px] font-bold uppercase tracking-widest border-b border-white/40 pb-1 hover:text-accent hover:border-accent transition-colors">
                Explore Drop <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          {/* Banner 2 */}
          <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-border/40 group shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="absolute inset-0 flex items-center justify-center p-12 select-none">
              <img src="/images/cargo-pants.png" alt="Utility Essentials" className="w-4/5 h-4/5 object-contain drop-shadow-2xl transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-transparent md:from-[#F9FAFB]/90" />
            <div className="absolute top-8 left-8 right-8 text-charcoal">
              <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block font-sans">MILITARY CUTS</span>
              <h3 className="text-4xl font-extrabold tracking-tight mb-2 uppercase leading-[1.1]">Utility<br/>Essentials</h3>
              <Link to="/department/women" className="inline-flex items-center gap-2 mt-4 text-[11px] font-bold uppercase tracking-widest border-b border-charcoal/20 pb-1 hover:text-accent hover:border-accent transition-colors">
                Shop Bottoms <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Vault Edit */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16">
        <div className="mb-8">
          <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase mb-2 block">HIGHLY DESIRED</span>
          <h2 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight uppercase">The Vault Edit</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
          {products.slice(0, 5).map((product, index) => (
            <div key={product.id} className="shrink-0 w-[280px] sm:w-[320px] snap-start bg-white p-4 rounded-3xl border border-border/40 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full bg-charcoal text-white py-24 mb-0 relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase mb-3 block">STREETWEAR COMMUNITY</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase mb-4">Join The Club</h2>
          <p className="text-sm text-white/60 mb-8 font-medium max-w-md mx-auto leading-relaxed">
            Subscribe for early access to vintage drops, exclusive discount codes, and AI styling suggestions.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              required
              placeholder="Enter your email address" 
              className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:bg-white/10 focus:border-accent text-white placeholder:text-white/30 w-full uppercase tracking-wider"
            />
            <button type="submit" className="btn-accent px-8 py-3.5 shadow-lg shadow-accent/15 shrink-0 text-white font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}