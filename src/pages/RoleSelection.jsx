import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Store, ArrowRight, Shirt, ShieldCheck, Handshake, Zap, Sparkles } from 'lucide-react';

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

      <div className="text-center mb-16 relative z-10">
        <h2 className="text-xs font-bold tracking-[0.25em] text-accent uppercase mb-3 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          Welcome to Thrift Kro
        </h2>
        <h3 className="text-4xl sm:text-5xl font-extrabold text-charcoal tracking-tight">Choose Your Path</h3>
        <p className="text-sm text-text-secondary mt-3 font-medium max-w-sm mx-auto">
          Customize your experience by selecting how you want to interact with Thrift Kro.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full relative z-10">
        {/* Buyer Option */}
        <button 
          onClick={() => handleRoleSelect('buyer')}
          className="bg-white p-12 rounded-3xl border border-border/60 hover:border-accent hover:-translate-y-2 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col items-center text-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-accent/15"
        >
          <div className="w-20 h-20 bg-accent-ultralight rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform text-accent">
            <ShoppingBag className="w-9 h-9" />
          </div>
          <h4 className="text-2xl font-extrabold text-charcoal mb-4 flex items-center gap-2">
            I am a Buyer
            <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
          </h4>
          <p className="text-sm text-text-secondary leading-relaxed font-medium max-w-xs mb-8">
            Discover curated vintage, use virtual try-on, and shop sustainably from trusted sellers.
          </p>

          {/* Perks list */}
          <ul className="space-y-3 text-left w-full border-t border-border/50 pt-8">
            <li className="flex items-center gap-3 text-xs text-text-secondary font-medium">
              <div className="w-5 h-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <Shirt className="w-3 h-3" />
              </div>
              Interactive AI Virtual Try-On
            </li>
            <li className="flex items-center gap-3 text-xs text-text-secondary font-medium">
              <div className="w-5 h-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3 h-3" />
              </div>
              AI Authenticated Condition
            </li>
            <li className="flex items-center gap-3 text-xs text-text-secondary font-medium">
              <div className="w-5 h-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <Handshake className="w-3 h-3" />
              </div>
              Secure Escrow Bidding & Pay
            </li>
          </ul>
        </button>

        {/* Seller Option */}
        <button 
          onClick={() => handleRoleSelect('seller')}
          className="bg-charcoal p-12 rounded-3xl border border-white/5 hover:border-accent hover:-translate-y-2 shadow-xl hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] transition-all duration-300 group flex flex-col items-center text-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-accent/15 relative overflow-hidden"
        >
          {/* Subtle accent glow in dark card */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform text-white">
            <Store className="w-9 h-9 text-accent" />
          </div>
          <h4 className="text-2xl font-extrabold text-white mb-4 flex items-center gap-2">
            I am a Seller
            <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
          </h4>
          <p className="text-sm text-white/70 leading-relaxed font-medium max-w-xs mb-8">
            Create your inventory, manage your storefront, and reach thousands of buyers instantly.
          </p>

          {/* Perks list */}
          <ul className="space-y-3 text-left w-full border-t border-white/10 pt-8">
            <li className="flex items-center gap-3 text-xs text-white/75 font-medium">
              <div className="w-5 h-5 rounded-full bg-white/5 text-accent flex items-center justify-center shrink-0">
                <Zap className="w-3 h-3" />
              </div>
              AI Auto-Scan Listing Photos
            </li>
            <li className="flex items-center gap-3 text-xs text-white/75 font-medium">
              <div className="w-5 h-5 rounded-full bg-white/5 text-accent flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3 h-3" />
              </div>
              Zero Upfront Selling Fees
            </li>
            <li className="flex items-center gap-3 text-xs text-white/75 font-medium">
              <div className="w-5 h-5 rounded-full bg-white/5 text-accent flex items-center justify-center shrink-0">
                <Handshake className="w-3 h-3" />
              </div>
              Guaranteed escrow payouts
            </li>
          </ul>
        </button>
      </div>
    </div>
  );
}
