import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <p className="text-sm font-medium text-charcoal mb-1">No items found</p>
        <p className="text-xs text-text-muted">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10 stagger-children">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
