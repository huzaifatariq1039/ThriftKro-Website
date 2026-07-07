import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroProducts = products.slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Two-Column Hero & Carousel */}
      <section className="mt-24 pt-32 pb-16 lg:mt-32 lg:pt-40 lg:pb-24 px-6 sm:px-8 lg:px-16 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center animate-fade-in min-h-[85vh]">
        
        {/* Left Side: Tagline & CTAs - Centered */}
        <div className="flex flex-col items-center text-center justify-center mx-auto w-full">
          <h1 className="font-sans font-extrabold text-6xl sm:text-7xl lg:text-[85px] xl:text-[100px] text-charcoal tracking-tight mb-6 leading-[1.05] py-2">
            Try kro.<br />
            Buy kro.<br />
            <span className="text-accent">Thrift kro.</span>
          </h1>
          <p className="text-[13px] sm:text-sm text-text-secondary max-w-sm mb-8 leading-relaxed font-medium">
            Pakistan's first AI-powered preloved streetwear marketplace. Secure escrow payments, virtual try-on, and authentic vintage.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="btn-accent text-white px-8 py-4 text-sm tracking-wide">
              Start Thrifting
            </Link>
            <Link to="/about" className="btn-outline px-8 py-4 text-sm tracking-wide">
              How It Works
            </Link>
          </div>
        </div>

        {/* Right Side: Product Slideshow (Floating Images) */}
        <div className="w-full relative flex justify-end mt-12 lg:mt-0 lg:translate-x-[8%] pr-[5%] lg:pr-0">
          <div className="w-full max-w-sm sm:max-w-lg lg:max-w-[500px] xl:max-w-[560px]">
            <div className="flex items-center justify-end mb-6 px-4">
              <div className="flex gap-2">
                {heroProducts.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${currentSlide === idx ? 'bg-accent w-5' : 'bg-border'}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="relative aspect-square sm:aspect-[4/5] group cursor-pointer flex justify-center items-center">
              {heroProducts.map((product, idx) => (
                <div 
                  key={product.id}
                  className={`absolute inset-0 transition-opacity duration-1000 flex flex-col items-center justify-center ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                >
                  {/* Floating Image with Drop Shadow */}
                  <div className="relative w-full flex-1 flex justify-center items-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-[2000ms] group-hover:scale-105" 
                    />
                    {/* Verified Badge */}
                    {product.verified && (
                      <div className="absolute top-0 right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 flex items-center gap-1.5 rounded-full border border-border shadow-sm">
                        <span className="w-1.5 h-1.5 bg-verified rounded-full"></span>
                        <span className="text-[8px] font-bold text-charcoal uppercase tracking-wider">Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Category Tabs */}
      <section className="px-6 sm:px-8 lg:px-16 w-full max-w-7xl mx-auto mb-16 border-b border-border">
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
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 sm:px-8 lg:px-16 w-full max-w-7xl mx-auto mb-32">
        <div className="flex justify-between items-end mb-8">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">{filtered.length} Items</span>
          <button className="text-[11px] font-bold text-charcoal uppercase tracking-widest border-b border-transparent hover:border-charcoal transition-colors">Sort</button>
        </div>
        <ProductGrid products={filtered} />
      </section>
    </div>
  );
}