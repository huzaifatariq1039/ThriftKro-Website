import { Package, Plus } from 'lucide-react';

export default function SellerListings() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[18px] font-bold text-charcoal">My Listings</h2>
          <p className="text-[13px] text-text-muted mt-1">Manage your active and pending streetwear items</p>
        </div>
        <button className="btn-accent px-4 py-2 text-[12px] flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-text-muted" />
        </div>
        <h3 className="text-[15px] font-bold text-charcoal mb-2">No listings yet</h3>
        <p className="text-[13px] text-text-secondary max-w-sm mb-6">You haven't added any items to your portfolio. Upload a flat-lay photo to start the AI verification process.</p>
        <button className="btn-outline px-6 py-2.5 text-[12px]">Upload Photo</button>
      </div>
    </div>
  );
}
