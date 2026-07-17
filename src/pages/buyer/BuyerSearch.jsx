import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/products';

export default function BuyerSearch() {
  const [query, setQuery] = useState('');

  const results = query
    ? products.filter(p =>
        (p.name + p.brand + p.category + p.seller)
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : [];

  const suggestions = ['Jordan', "Levi's", 'Vintage', 'Samba', 'Y2K', 'Nike'];

  return (
    <div className="min-h-screen pt-[68px]" style={{ background: '#FBF9F8' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">

        {/* Search Input */}
        <div
          className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white mb-8"
          style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.1)' }}
        >
          <Search size={20} style={{ color: 'rgba(26,17,8,0.4)' }} />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search sneakers, vintage, brands…"
            className="flex-1 !bg-transparent !border-none !shadow-none !ring-0 outline-none text-base !p-0 !h-auto"
          />
          {query && (
            <button onClick={() => setQuery('')}>
              <X size={18} style={{ color: 'rgba(26,17,8,0.4)' }} />
            </button>
          )}
        </div>

        {/* Suggestions (when empty) */}
        {!query && (
          <div className="flex flex-wrap gap-2 mb-8">
            {suggestions.map(tag => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-4 py-2 rounded-full text-sm font-bold bg-white"
                style={{
                  boxShadow: '0 0 0 1px rgba(26,17,8,0.08)',
                  color: '#1A1108',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {query && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
            {results.length === 0 && (
              <p
                className="text-center py-16 text-sm"
                style={{ color: 'rgba(26,17,8,0.4)' }}
              >
                No results for "{query}".
              </p>
            )}
          </>
        )}

        {/* When empty — trending */}
        {!query && (
          <div>
            <h2
              className="font-extrabold mb-4"
              style={{ fontSize: 22, letterSpacing: '-0.02em', color: '#1A1108' }}
            >
              Trending
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.slice(0, 4).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
