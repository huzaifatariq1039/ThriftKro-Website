import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Store, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6 select-none">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-base">TK</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-charcoal mb-2">Choose your role</h3>
        <p className="text-[13px] text-text-muted max-w-xs mx-auto">Select how you'd like to use Thrift Kro today</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[680px] w-full">
        
        {/* Buyer Card */}
        <button 
          onClick={() => handleRoleSelect('buyer')}
          className="bg-white p-7 rounded-2xl border border-[#EAEAEA] hover:border-accent/40 hover:shadow-lg transition-all duration-300 group flex flex-col items-start text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          <div className="w-12 h-12 rounded-xl bg-accent-ultralight flex items-center justify-center mb-5 text-accent group-hover:scale-105 group-hover:bg-accent group-hover:text-white transition-all duration-300">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
          </div>
          
          <h4 className="text-[15px] font-bold text-charcoal mb-2">Buyer Mode</h4>
          <p className="text-[13px] text-text-muted leading-relaxed mb-6">
            Browse authenticated pre-loved streetwear and try items on with our virtual fitting room.
          </p>

          <span className="w-full py-3 border border-[#EAEAEA] text-charcoal rounded-xl text-[12px] font-semibold flex items-center justify-center gap-2 group-hover:bg-charcoal group-hover:text-white group-hover:border-charcoal transition-all duration-300">
            Enter Marketplace <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>

        {/* Seller Card */}
        <button 
          onClick={() => handleRoleSelect('seller')}
          className="bg-white p-7 rounded-2xl border border-[#EAEAEA] hover:border-accent/40 hover:shadow-lg transition-all duration-300 group flex flex-col items-start text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          <div className="w-12 h-12 rounded-xl bg-accent-ultralight flex items-center justify-center mb-5 text-accent group-hover:scale-105 group-hover:bg-accent group-hover:text-white transition-all duration-300">
            <Store className="w-5 h-5" strokeWidth={1.75} />
          </div>
          
          <h4 className="text-[15px] font-bold text-charcoal mb-2">Seller Portal</h4>
          <p className="text-[13px] text-text-muted leading-relaxed mb-6">
            Create AI-verified listings, manage orders, and track your escrow payouts seamlessly.
          </p>

          <span className="w-full py-3 bg-accent text-white rounded-xl text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-accent-dark transition-all duration-300 shadow-sm">
            Open Dashboard <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>
    </div>
  );
}
