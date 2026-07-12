import { Camera } from 'lucide-react';

export default function BuyerProfile() {
  return (
    <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 sm:p-8 shadow-sm animate-fade-in">
      <h2 className="text-[18px] font-bold text-charcoal mb-6 pb-4 border-b border-[#F0F0F0]">Account Settings</h2>
      
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4 shrink-0">
          <div className="relative w-28 h-28 rounded-full bg-accent-ultralight flex items-center justify-center text-4xl font-bold text-accent border-4 border-white shadow-md overflow-hidden group">
            <span className="group-hover:opacity-0 transition-opacity duration-300">JD</span>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <button className="text-[12px] font-semibold text-accent hover:text-accent-dark transition-colors">
            Change Avatar
          </button>
        </div>

        {/* Form Fields */}
        <div className="flex-1 max-w-xl space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[12px] font-semibold text-text-secondary mb-2">First Name</label>
              <input type="text" defaultValue="John" className="w-full" />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-text-secondary mb-2">Last Name</label>
              <input type="text" defaultValue="Doe" className="w-full" />
            </div>
          </div>
          
          <div>
            <label className="block text-[12px] font-semibold text-text-secondary mb-2">Email Address</label>
            <input type="email" value="john@example.com" readOnly className="w-full text-text-muted bg-surface border-[#EAEAEA] cursor-not-allowed focus:ring-0 focus:border-[#EAEAEA]" />
          </div>
          
          <div>
            <label className="block text-[12px] font-semibold text-text-secondary mb-2">Phone Number</label>
            <input type="tel" defaultValue="+92 300 1234567" className="w-full" />
          </div>
          
          <div>
            <label className="block text-[12px] font-semibold text-text-secondary mb-2">Shipping Address</label>
            <textarea rows="3" defaultValue="123 Main St, Apt 4B, Lahore" className="w-full resize-none"></textarea>
          </div>

          <div className="pt-4 border-t border-[#F0F0F0]">
            <label className="block text-[13px] font-bold text-charcoal mb-3">Style Preferences</label>
            <p className="text-[12px] text-text-muted mb-4">Select the categories you're most interested in to personalize your feed.</p>
            <div className="flex flex-wrap gap-2">
              {['Vintage', 'Streetwear', 'Y2K', 'Techwear', 'Sneakers', 'Designer', 'Minimalist'].map((pref, idx) => (
                <label key={idx} className="cursor-pointer">
                  <input type="checkbox" className="peer sr-only" defaultChecked={idx < 3} />
                  <div className="px-4 py-2 rounded-full border border-[#EAEAEA] text-[12px] font-medium text-text-secondary hover:bg-surface peer-checked:bg-charcoal peer-checked:text-white peer-checked:border-charcoal transition-all select-none">
                    {pref}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button className="btn-primary w-full sm:w-auto py-3.5 px-10 text-[13px] tracking-wide">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
