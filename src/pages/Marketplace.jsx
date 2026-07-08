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
      {/* Categories in Focus */}
      <section className="mt-24 pt-16 lg:mt-32 w-full px-4 sm:px-8 lg:px-12 mb-24">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-extrabold text-charcoal tracking-tight uppercase">Categories in Focus</h2>
          <Link to="/department/men" className="text-[11px] font-bold text-text-muted uppercase tracking-widest border-b border-transparent hover:border-text-muted transition-colors">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { name: "Vintage Tees", img: "/images/tee.png", link: "/department/men" },
            { name: "Denim Edit", img: "/images/denim-jacket.png", link: "/department/women" },
            { name: "Sneaker Vault", img: "/images/sneakers.png", link: "/department/objects" },
            { name: "Heavyweight Hoodies", img: "/images/hoodie.png", link: "/department/men" },
          ].map((cat, idx) => (
            <Link key={idx} to={cat.link} className="group relative aspect-[3/4] overflow-hidden bg-surface flex items-center justify-center cursor-pointer">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-contain p-8 drop-shadow-xl transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-bold text-lg uppercase tracking-wide">{cat.name}</h3>
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">Shop Now</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Editorial Split Banners */}
      <section className="w-full px-4 sm:px-8 lg:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1 */}
          <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] overflow-hidden bg-charcoal group cursor-pointer">
             <div className="absolute inset-0 flex items-center justify-center p-12">
               <img src="/images/windbreaker.png" alt="New Arrivals" className="w-full h-full object-contain drop-shadow-2xl opacity-90 transition-transform duration-1000 group-hover:scale-105" />
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
             <div className="absolute bottom-8 left-8 right-8 text-white">
               <h3 className="text-4xl font-extrabold tracking-tight mb-2 uppercase">New<br/>Arrivals</h3>
               <Link to="/department/men" className="inline-block mt-4 text-[11px] font-bold uppercase tracking-widest border-b border-white pb-1 hover:text-accent hover:border-accent transition-colors">Explore Drop</Link>
             </div>
          </div>
          {/* Banner 2 */}
          <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] overflow-hidden bg-surface group cursor-pointer">
             <div className="absolute inset-0 flex items-center justify-center p-12">
               <img src="/images/cargo-pants.png" alt="Utility Essentials" className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-1000 group-hover:scale-105" />
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
             <div className="absolute top-8 left-8 right-8 text-charcoal">
               <h3 className="text-4xl font-extrabold tracking-tight mb-2 uppercase">Utility<br/>Essentials</h3>
               <Link to="/department/women" className="inline-block mt-4 text-[11px] font-bold uppercase tracking-widest border-b border-charcoal pb-1 hover:text-accent hover:border-accent transition-colors">Shop Bottoms</Link>
             </div>
          </div>
        </div>
      </section>

      {/* The Vault Edit */}
      <section className="w-full px-4 sm:px-8 lg:px-12 mb-24">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-extrabold text-charcoal tracking-tight uppercase">The Vault Edit</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
          {products.slice(0, 5).map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="shrink-0 w-[300px] sm:w-[400px] group snap-start">
              <div className="relative aspect-[4/5] bg-surface mb-4 flex items-center justify-center overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain p-8 drop-shadow-xl transition-transform duration-700 group-hover:scale-110" />
                {product.verified && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 flex items-center gap-1 rounded-full shadow-sm">
                    <span className="w-1 h-1 bg-verified rounded-full"></span>
                    <span className="text-[7px] font-bold text-charcoal uppercase tracking-wider">Verified</span>
                  </div>
                )}
              </div>
              <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-text-muted mb-1">{product.brand || product.seller}</p>
              <h3 className="text-base font-bold text-charcoal leading-tight mb-1 truncate">{product.name}</h3>
              <div className="flex items-end gap-2">
                <span className="text-sm font-extrabold text-accent">Rs. {product.price.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full bg-charcoal text-white py-24 mb-0">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase mb-4">Join The Club</h2>
          <p className="text-sm text-white/60 mb-8 font-medium">Subscribe for early access to vintage drops, exclusive discounts, and AI styling tips.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="bg-transparent border-b border-white/30 px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors w-full placeholder:text-white/40 uppercase tracking-wide"
            />
            <button className="bg-white text-charcoal px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}