import ProductGrid from '../../components/ProductGrid';
import { products } from '../../data/products';

export default function BuyerSaved() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 sm:p-8 shadow-sm">
        <h2 className="text-[18px] font-bold text-charcoal mb-6 pb-4 border-b border-[#F0F0F0]">Saved Items</h2>
        <ProductGrid products={products.slice(0, 4)} />
      </div>
    </div>
  );
}
