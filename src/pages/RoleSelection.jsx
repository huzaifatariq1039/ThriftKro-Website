import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Store } from 'lucide-react';

export default function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === 'buyer') {
      navigate('/marketplace');
    } else {
      navigate('/seller');
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h2 className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-3">Welcome to Thrift Kro</h2>
        <h3 className="text-4xl sm:text-5xl font-extrabold text-charcoal tracking-tight">Choose Your Path</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Buyer Option */}
        <button 
          onClick={() => handleRoleSelect('buyer')}
          className="bg-white p-12 rounded-3xl border-2 border-transparent hover:border-accent shadow-lg hover:shadow-2xl transition-all group flex flex-col items-center text-center text-left cursor-pointer focus:outline-none"
        >
          <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-colors text-charcoal">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h4 className="text-2xl font-extrabold text-charcoal mb-4">I am a Buyer</h4>
          <p className="text-sm text-text-secondary leading-relaxed font-medium max-w-xs mx-auto">
            Discover curated vintage, use virtual try-on, and shop sustainably from trusted sellers.
          </p>
        </button>

        {/* Seller Option */}
        <button 
          onClick={() => handleRoleSelect('seller')}
          className="bg-charcoal p-12 rounded-3xl border-2 border-transparent hover:border-accent shadow-lg hover:shadow-2xl transition-all group flex flex-col items-center text-center text-left cursor-pointer focus:outline-none"
        >
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-colors text-white">
            <Store className="w-10 h-10" />
          </div>
          <h4 className="text-2xl font-extrabold text-white mb-4">I am a Seller</h4>
          <p className="text-sm text-white/70 leading-relaxed font-medium max-w-xs mx-auto">
            Create your inventory, manage your storefront, and reach thousands of buyers instantly.
          </p>
        </button>
      </div>
    </div>
  );
}
