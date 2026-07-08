import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Store, ArrowRight, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-xs font-bold tracking-[0.25em] text-accent uppercase mb-3 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          Welcome to Thrift Kro
        </h2>
        <h3 className="text-4xl sm:text-5xl font-black text-charcoal tracking-tight uppercase">Choose Your Path</h3>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full relative z-10">
        
        {/* Buyer Option */}
        <button 
          onClick={() => handleRoleSelect('buyer')}
          className="bg-white p-10 rounded-3xl border border-border/50 hover:border-accent hover:-translate-y-1 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center cursor-pointer focus:outline-none"
        >
          <div className="w-16 h-16 bg-accent-ultralight rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform text-accent">
            <ShoppingBag className="w-8 h-8" />
          </div>
          
          <h4 className="text-xl font-black text-charcoal mb-2 uppercase tracking-tight">
            I am a Buyer
          </h4>
          
          <p className="text-xs text-text-secondary leading-relaxed font-medium max-w-xs">
            Shop authenticated pre-loved streetwear and try on items using our virtual fitting room.
          </p>

          <div className="w-full mt-8">
            <span className="btn-outline w-full py-3.5 text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 group-hover:bg-charcoal group-hover:text-white group-hover:border-charcoal transition-all">
              Shop Streetwear <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </button>

        {/* Seller Option */}
        <button 
          onClick={() => handleRoleSelect('seller')}
          className="bg-white p-10 rounded-3xl border border-border/50 hover:border-accent hover:-translate-y-1 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center cursor-pointer focus:outline-none"
        >
          <div className="w-16 h-16 bg-accent-ultralight rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform text-accent">
            <Store className="w-8 h-8" />
          </div>
          
          <h4 className="text-xl font-black text-charcoal mb-2 uppercase tracking-tight">
            I am a Seller
          </h4>
          
          <p className="text-xs text-text-secondary leading-relaxed font-medium max-w-xs">
            Create listings with automatic AI scanning, manage orders, and payout balances.
          </p>

          <div className="w-full mt-8">
            <span className="btn-primary w-full py-3.5 text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 shadow-sm">
              Open Storefront <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </button>

      </div>
    </div>
  );
}
