import { ClipboardList, Search } from 'lucide-react';

export default function SellerOrders() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-bold text-charcoal">Orders</h2>
          <p className="text-[13px] text-text-muted mt-1">Manage fulfillment and shipping for sold items</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="pl-9 pr-4 py-2 bg-white rounded-xl border border-[#EAEAEA] focus:border-accent text-[13px] w-full sm:w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden">
        <div className="p-12 flex flex-col items-center justify-center text-center border-b border-[#F0F0F0]">
          <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mb-4">
            <ClipboardList className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-[15px] font-bold text-charcoal mb-2">No recent orders</h3>
          <p className="text-[13px] text-text-secondary max-w-sm">When buyers purchase your items, their fulfillment details will appear here.</p>
        </div>
        <div className="bg-[#FAFAFA] p-4 text-center">
          <a href="#" className="text-[12px] font-semibold text-accent hover:text-accent-dark">View Order History Archive</a>
        </div>
      </div>
    </div>
  );
}
