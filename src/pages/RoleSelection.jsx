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
      {/* Header - Elegant & Understated */}
      <div className="text-center mb-10">
        <span className="block text-[10px] font-extrabold tracking-[0.3em] text-[#888888] uppercase mb-2">
          Thrift Kro Portal
        </span>
        <h3 className="text-sm font-black text-[#121212] tracking-[0.25em] uppercase">
          Choose Your Path
        </h3>
      </div>

      {/* Cards - Two Refined Minimalist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[700px] w-full">
        
        {/* Buyer Card */}
        <button 
          onClick={() => handleRoleSelect('buyer')}
          className="bg-white p-8 rounded-2xl border border-[#EAEAEA] hover:border-[#121212] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.02)] transition-all duration-300 group flex flex-col items-center text-center cursor-pointer focus:outline-none"
        >
          <div className="w-12 h-12 rounded-xl bg-[#F9FAFB] flex items-center justify-center mb-5 text-[#121212] border border-[#EAEAEA] group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5 stroke-[1.25]" />
          </div>
          
          <h4 className="text-xs font-bold text-[#121212] uppercase tracking-wider mb-2">
            Buyer Mode
          </h4>
          
          <p className="text-[11px] text-[#888888] leading-relaxed font-medium max-w-[220px]">
            Shop authenticated pre-loved streetwear and try on items using our virtual fitting room.
          </p>

          <div className="w-full mt-6">
            <span className="w-full py-2.5 border border-[#121212] text-[#121212] rounded-xl text-[9px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 group-hover:bg-[#121212] group-hover:text-white transition-all">
              Enter Marketplace <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </button>

        {/* Seller Card */}
        <button 
          onClick={() => handleRoleSelect('seller')}
          className="bg-white p-8 rounded-2xl border border-[#EAEAEA] hover:border-[#121212] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.02)] transition-all duration-300 group flex flex-col items-center text-center cursor-pointer focus:outline-none"
        >
          <div className="w-12 h-12 rounded-xl bg-[#F9FAFB] flex items-center justify-center mb-5 text-[#121212] border border-[#EAEAEA] group-hover:scale-105 transition-transform">
            <Store className="w-5 h-5 stroke-[1.25]" />
          </div>
          
          <h4 className="text-xs font-bold text-[#121212] uppercase tracking-wider mb-2">
            Seller Portal
          </h4>
          
          <p className="text-[11px] text-[#888888] leading-relaxed font-medium max-w-[220px]">
            Create listings with automatic AI scanning, manage orders, and payout balances.
          </p>

          <div className="w-full mt-6">
            <span className="w-full py-2.5 bg-[#121212] text-white rounded-xl text-[9px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#2A2A2A] transition-all shadow-sm">
              Open Dashboard <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </button>

      </div>
    </div>
  );
}
