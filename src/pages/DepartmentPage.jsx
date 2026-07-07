import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { products, categories } from '../data/products';
import { Filter, SlidersHorizontal } from 'lucide-react';

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
    <div className="min-h-screen bg-white">
      {/* Department Header */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 px-6 sm:px-8 lg:px-16 w-full max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col items-center text-center">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-text-muted mb-4">
            Department
          </p>
          <h1 className="font-sans font-extrabold text-5xl sm:text-6xl lg:text-7xl text-charcoal tracking-tight mb-6 capitalize">
            {departmentName}
          </h1>
          <p className="text-sm sm:text-base text-text-secondary max-w-md mx-auto leading-relaxed font-medium">
            Discover the latest verified vintage pieces and curated streetwear in our {departmentName} collection.
          </p>
        </div>
      </section>

      {/* Minimal Category Tabs */}
      <section className="px-6 sm:px-8 lg:px-16 w-full max-w-7xl mx-auto mb-12 border-b border-border">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide pb-5">
          {categories.map((cat) => (
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

      {/* Product Grid & Filters */}
      <section className="px-6 sm:px-8 lg:px-16 w-full max-w-7xl mx-auto mb-32">
        <div className="flex justify-between items-center mb-8">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">
            {filtered.length} Items
          </span>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-[11px] font-bold text-charcoal uppercase tracking-widest hover:opacity-70 transition-opacity">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter
            </button>
            <button className="flex items-center gap-2 text-[11px] font-bold text-charcoal uppercase tracking-widest hover:opacity-70 transition-opacity">
              <Filter className="w-3.5 h-3.5" />
              Sort
            </button>
          </div>
        </div>

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="text-center py-24 bg-surface rounded-2xl border border-border/50 border-dashed">
            <h3 className="text-lg font-extrabold text-charcoal mb-2">No items found</h3>
            <p className="text-sm text-text-muted">We couldn't find any items in this category for {departmentName}.</p>
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
