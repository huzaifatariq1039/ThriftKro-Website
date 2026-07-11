export default function BuyerOrders() {
  return (
    <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 sm:p-8 shadow-sm">
      <h2 className="text-[18px] font-bold text-charcoal mb-6 pb-4 border-b border-[#F0F0F0]">Order History</h2>
      <div className="space-y-4">
        <div className="p-6 border border-[#EAEAEA] rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:border-charcoal/30 transition-all">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono font-semibold text-text-muted bg-surface px-2.5 py-1 rounded-md">#ORD-9921</span>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-bold uppercase tracking-wider">In Transit</span>
            </div>
            <p className="text-[15px] font-semibold text-charcoal">Vintage Oversized Hoodie</p>
            <p className="text-[12px] text-text-muted mt-1">Ordered on Oct 12, 2026</p>
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto">
            <p className="text-[16px] font-bold text-charcoal mb-2">Rs. 4,500</p>
            <button className="text-[12px] font-semibold text-accent hover:text-accent-dark tracking-wide">Track Order</button>
          </div>
        </div>
        
        <div className="p-6 border border-[#EAEAEA] rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:border-charcoal/30 transition-all">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono font-semibold text-text-muted bg-surface px-2.5 py-1 rounded-md">#ORD-9840</span>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold uppercase tracking-wider">Delivered</span>
            </div>
            <p className="text-[15px] font-semibold text-charcoal">Retro Graphic Tee</p>
            <p className="text-[12px] text-text-muted mt-1">Delivered on Sep 28, 2026</p>
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto">
            <p className="text-[16px] font-bold text-charcoal mb-2">Rs. 2,800</p>
            <button className="text-[12px] font-semibold text-accent hover:text-accent-dark tracking-wide">Leave Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}
