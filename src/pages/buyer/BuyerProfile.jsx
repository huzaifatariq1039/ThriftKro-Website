export default function BuyerProfile() {
  return (
    <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 sm:p-8 shadow-sm">
      <h2 className="text-[18px] font-bold text-charcoal mb-6 pb-4 border-b border-[#F0F0F0]">Account Settings</h2>
      <div className="max-w-md space-y-5">
        <div>
          <label className="block text-[12px] font-semibold text-text-secondary mb-2">Email Address</label>
          <input type="email" value="john@example.com" readOnly className="w-full text-text-muted bg-surface border-[#EAEAEA] cursor-not-allowed" />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-text-secondary mb-2">Phone Number</label>
          <input type="tel" defaultValue="+92 300 1234567" className="w-full" />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-text-secondary mb-2">Shipping Address</label>
          <textarea rows="3" defaultValue="123 Main St, Apt 4B, Lahore" className="w-full"></textarea>
        </div>
        <button className="btn-accent w-full sm:w-auto py-3 px-8 text-[13px] tracking-wide">Save Changes</button>
      </div>
    </div>
  );
}
