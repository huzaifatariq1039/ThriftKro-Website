import { Camera, Image as ImageIcon } from 'lucide-react';

export default function SellerProfile() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-[18px] font-bold text-charcoal">Store Profile</h2>
        <p className="text-[13px] text-text-muted mt-1">Manage your store's public appearance and business details</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden">
        {/* Cover Image Section */}
        <div className="relative h-48 bg-surface border-b border-[#EAEAEA] flex items-center justify-center group">
          <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-charcoal/20 transition-colors duration-300"></div>
          <div className="z-10 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer text-charcoal">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-[12px] font-semibold bg-white/90 px-3 py-1 rounded-full backdrop-blur-sm">Upload Cover Image</span>
          </div>
          
          {/* Store Logo (Avatar) overlapping the cover */}
          <div className="absolute -bottom-10 left-8 z-20">
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-accent-dark border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-white group/avatar overflow-hidden">
              <span className="group-hover/avatar:opacity-0 transition-opacity duration-300">S</span>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="p-8 pt-16">
          <div className="max-w-2xl space-y-8">
            
            {/* Store Information */}
            <section>
              <h3 className="text-[14px] font-bold text-charcoal mb-4">Store Information</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-[12px] font-semibold text-text-secondary mb-2">Store Name</label>
                  <input type="text" defaultValue="StreetwearHub" className="w-full" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-text-secondary mb-2">Store Tagline (Optional)</label>
                  <input type="text" defaultValue="Premium vintage & streetwear curation." className="w-full" placeholder="e.g., Premium vintage curation" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-text-secondary mb-2">Store Bio</label>
                  <textarea rows="4" defaultValue="We specialize in authentic 90s vintage and modern streetwear. Every item is handpicked and AI-verified for authenticity." className="w-full resize-none"></textarea>
                  <p className="text-[11px] text-text-muted mt-2">Brief description for your store page. Max 500 characters.</p>
                </div>
              </div>
            </section>

            <hr className="border-[#F0F0F0]" />

            {/* Business Details */}
            <section>
              <h3 className="text-[14px] font-bold text-charcoal mb-4">Business Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-[12px] font-semibold text-text-secondary mb-2">Support Email</label>
                  <input type="email" defaultValue="support@streetwearhub.pk" className="w-full" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-text-secondary mb-2">Business Phone</label>
                  <input type="tel" defaultValue="+92 300 9876543" className="w-full" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-text-secondary mb-2">Return Policy</label>
                <select className="w-full">
                  <option>No returns accepted</option>
                  <option>3-day returns (buyer pays shipping)</option>
                  <option>7-day returns (buyer pays shipping)</option>
                </select>
                <p className="text-[11px] text-text-muted mt-2">Select the return policy for your listings.</p>
              </div>
            </section>

            <div className="pt-4">
              <button className="btn-primary py-3.5 px-8 text-[13px] tracking-wide">
                Save Store Profile
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
