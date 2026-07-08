import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { products, categories } from '../data/products';
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function DepartmentPage() {
  const { departmentName } = useParams();
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter products by the current department first
  const departmentProducts = useMemo(() => {
    return products.filter((p) => p.department?.toLowerCase() === departmentName?.toLowerCase());
  }, [departmentName]);

  // Then filter by the selected category (All, Hoodies, etc.)
  const filtered = useMemo(() => {
    if (activeCategory === 'All') return departmentProducts;
    return departmentProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory, departmentProducts]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-20">
      {/* Department Header */}
      <section className="pt-16 pb-10 px-6 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase mb-3 block flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 fill-current" /> Curated Collection
          </span>
          <h1 className="font-sans font-black text-5xl sm:text-6xl lg:text-7xl text-charcoal tracking-tight mb-4 capitalize leading-none">
            {departmentName}
          </h1>
          <p className="text-sm sm:text-base text-text-secondary max-w-md mx-auto leading-relaxed font-medium">
            Discover verified vintage streetwear pieces in our {departmentName} collection.
          </p>
        </div>
      </section>

      {/* Modern Capsule Category Tabs */}
      <section className="px-6 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto mb-10">
        <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                shrink-0 px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wider uppercase border transition-all duration-200
                ${activeCategory === cat 
                  ? 'bg-charcoal border-charcoal text-white shadow-sm hover:scale-[1.02]' 
                  : 'bg-white border-border/40 text-text-secondary hover:border-charcoal hover:text-charcoal'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid & Filters */}
      <section className="px-6 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto mb-32">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-border/40 shadow-sm">
          <span className="text-[10px] font-extrabold text-text-secondary uppercase tracking-widest pl-2">
            {filtered.length} Items Available
          </span>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1.5 text-[11px] font-bold text-charcoal uppercase tracking-widest hover:text-accent transition-colors">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter
            </button>
            <button className="flex items-center gap-1.5 text-[11px] font-bold text-charcoal uppercase tracking-widest hover:text-accent transition-colors">
              <Filter className="w-3.5 h-3.5" />
              Sort
            </button>
          </div>
        </div>

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-border/40 shadow-sm">
            <h3 className="text-base font-black text-charcoal mb-2 uppercase tracking-wide">No items found</h3>
            <p className="text-xs text-text-secondary font-medium max-w-xs mx-auto leading-relaxed">We couldn't find any items in this category for {departmentName}. New drops are added daily, please check back soon.</p>
            <button 
              onClick={() => setActiveCategory('All')}
              className="mt-6 btn-outline px-6 py-2.5 text-xs"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
