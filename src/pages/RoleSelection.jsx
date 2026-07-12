import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Store, ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

export default function RoleSelection() {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState(null);

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
          onMouseEnter={() => setHoveredRole('buyer')}
          onMouseLeave={() => setHoveredRole(null)}
          className="bg-white p-7 rounded-2xl border border-[#EAEAEA] hover:border-accent/40 hover:shadow-lg transition-all duration-300 group flex flex-col items-start text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/20 relative overflow-hidden"
        >
          {/* Subtle background pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/[0.02] rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="w-12 h-12 rounded-xl bg-accent-ultralight flex items-center justify-center mb-5 text-accent group-hover:scale-105 group-hover:bg-accent group-hover:text-white transition-all duration-300 relative z-10">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
          </div>
          
          <h4 className="text-[15px] font-bold text-charcoal mb-2 relative z-10">Buyer Mode</h4>
          <p className="text-[13px] text-text-muted leading-relaxed mb-6 relative z-10">
            Browse authenticated pre-loved streetwear and try items on with our virtual fitting room.
          </p>

          <span className="w-full py-3 border border-[#EAEAEA] text-charcoal rounded-xl text-[12px] font-semibold flex items-center justify-center gap-2 group-hover:bg-charcoal group-hover:text-white group-hover:border-charcoal transition-all duration-300 relative z-10">
            {hoveredRole === 'buyer' ? <Check className="w-3.5 h-3.5" /> : null}
            Enter Marketplace <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>

        {/* Seller Card */}
        <button 
          onClick={() => handleRoleSelect('seller')}
          onMouseEnter={() => setHoveredRole('seller')}
          onMouseLeave={() => setHoveredRole(null)}
          className="bg-white p-7 rounded-2xl border border-[#EAEAEA] hover:border-accent/40 hover:shadow-lg transition-all duration-300 group flex flex-col items-start text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/20 relative overflow-hidden"
        >
          {/* Subtle background pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/[0.02] rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="w-12 h-12 rounded-xl bg-accent-ultralight flex items-center justify-center mb-5 text-accent group-hover:scale-105 group-hover:bg-accent group-hover:text-white transition-all duration-300 relative z-10">
            <Store className="w-5 h-5" strokeWidth={1.75} />
          </div>
          
          <h4 className="text-[15px] font-bold text-charcoal mb-2 relative z-10">Seller Portal</h4>
          <p className="text-[13px] text-text-muted leading-relaxed mb-6 relative z-10">
            Create AI-verified listings, manage orders, and track your escrow payouts seamlessly.
          </p>

          <span className="w-full py-3 bg-accent text-white rounded-xl text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-accent-dark transition-all duration-300 shadow-sm relative z-10">
            {hoveredRole === 'seller' ? <Check className="w-3.5 h-3.5" /> : null}
            Open Dashboard <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>
    </div>
  );
}
