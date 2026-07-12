import { Package, Plus, Upload, Camera, Tag } from 'lucide-react';

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

      <div className="bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden">
        <div className="empty-state py-16">
          <div className="empty-state-icon">
            <Package className="w-8 h-8 text-text-muted" />
          </div>
          <h3>No listings yet</h3>
          <p>Start building your portfolio by uploading your first item. Our AI will handle the rest.</p>
        </div>

        {/* Step-by-step guide */}
        <div className="border-t border-[#F0F0F0] px-8 py-6">
          <h4 className="text-[12px] font-bold text-text-muted uppercase tracking-wider mb-4">How to list an item</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Camera, step: '1', title: 'Upload Photos', desc: 'Take flat-lay photos of your item' },
              { icon: Tag, step: '2', title: 'Set Details', desc: 'Add brand, size, price and condition' },
              { icon: Upload, step: '3', title: 'AI Verifies', desc: 'Our AI scans and grades authenticity' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3 p-4 bg-surface rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-accent-ultralight text-accent flex items-center justify-center shrink-0 text-[11px] font-bold">
                  {s.step}
                </div>
                <div>
                  <p className="text-[12px] font-bold text-charcoal">{s.title}</p>
                  <p className="text-[11px] text-text-muted mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
