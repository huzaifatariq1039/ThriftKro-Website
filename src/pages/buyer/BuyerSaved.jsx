import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/products';

export default function BuyerSaved() {
  // Simulating saved/liked items
  const savedItems = products.slice(0, 4);

  return (
    <div className="min-h-screen pt-[68px]" style={{ background: '#FBF9F8' }}>
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-8 animate-fade-in">
        <Link
          to="/account"
          className="flex items-center gap-2 text-sm font-semibold mb-4"
          style={{ color: 'rgba(26,17,8,0.6)' }}
        >
          <ArrowLeft size={16} /> Back
        </Link>

        <h1
          className="font-extrabold mb-8"
          style={{ fontSize: 30, letterSpacing: '-0.03em', color: '#1A1108' }}
        >
          Wishlist
        </h1>

        {savedItems.length === 0 ? (
          <p
            className="text-center py-16 text-sm"
            style={{ color: 'rgba(26,17,8,0.4)' }}
          >
            Nothing saved yet — tap the heart on any item.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {savedItems.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
