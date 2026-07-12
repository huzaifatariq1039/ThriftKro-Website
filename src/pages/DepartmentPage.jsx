import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { products, categories } from '../data/products';
import { Filter, SlidersHorizontal, Sparkles, ChevronDown } from 'lucide-react';

export default function DepartmentPage() {
  const { departmentName } = useParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState('all');
  const [conditionFilter, setConditionFilter] = useState('all');

  const departmentProducts = useMemo(() => {
    return products.filter((p) => p.department?.toLowerCase() === departmentName?.toLowerCase());
  }, [departmentName]);

  const filtered = useMemo(() => {
    let result = activeCategory === 'All' ? departmentProducts : departmentProducts.filter((p) => p.category === activeCategory);
    
    if (priceRange === 'under3k') result = result.filter(p => p.price < 3000);
    else if (priceRange === '3k-5k') result = result.filter(p => p.price >= 3000 && p.price <= 5000);
    else if (priceRange === 'over5k') result = result.filter(p => p.price > 5000);
    
    if (conditionFilter !== 'all') result = result.filter(p => p.condition === conditionFilter);
    
    return result;
  }, [activeCategory, departmentProducts, priceRange, conditionFilter]);

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
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl border border-border/40 shadow-sm">
          <span className="text-[10px] font-extrabold text-text-secondary uppercase tracking-widest pl-2">
            {filtered.length} Items Available
          </span>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${showFilters ? 'bg-charcoal text-white' : 'text-charcoal hover:bg-surface'}`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter
            </button>
            <div className="relative">
              <select 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none bg-transparent text-[11px] font-bold text-charcoal uppercase tracking-widest pr-6 cursor-pointer focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low</option>
                <option value="price-high">Price: High</option>
              </select>
              <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        {showFilters && (
          <div className="bg-white p-6 rounded-2xl border border-border/40 shadow-sm mb-6 animate-slide-down">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">Price Range</label>
                <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="w-full text-[13px]">
                  <option value="all">All Prices</option>
                  <option value="under3k">Under Rs. 3,000</option>
                  <option value="3k-5k">Rs. 3,000 – 5,000</option>
                  <option value="over5k">Over Rs. 5,000</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">Condition</label>
                <select value={conditionFilter} onChange={e => setConditionFilter(e.target.value)} className="w-full text-[13px]">
                  <option value="all">All Conditions</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => { setPriceRange('all'); setConditionFilter('all'); }}
                  className="text-[12px] font-semibold text-accent hover:text-accent-dark transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="bg-white rounded-3xl border border-border/40 shadow-sm empty-state">
            <div className="empty-state-icon">
              <Filter className="w-8 h-8 text-text-muted" />
            </div>
            <h3>No items found</h3>
            <p>We couldn't find any items matching your filters for {departmentName}. New drops are added daily.</p>
            <button 
              onClick={() => { setActiveCategory('All'); setPriceRange('all'); setConditionFilter('all'); }}
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
