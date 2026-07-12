import { useState } from 'react';
import { ClipboardList, Search } from 'lucide-react';

export default function SellerOrders() {
  const [activeTab, setActiveTab] = useState('all');
  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'completed', label: 'Completed' },
  ];

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

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-surface p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-[12px] font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-charcoal shadow-sm'
                : 'text-text-muted hover:text-charcoal'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden">
        <div className="empty-state">
          <div className="empty-state-icon">
            <ClipboardList className="w-8 h-8 text-text-muted" />
          </div>
          <h3>No {activeTab === 'all' ? 'recent' : activeTab} orders</h3>
          <p>When buyers purchase your items, their fulfillment details will appear here.</p>
        </div>
        <div className="bg-[#FAFAFA] p-4 text-center border-t border-[#F0F0F0]">
          <a href="#" className="text-[12px] font-semibold text-accent hover:text-accent-dark transition-colors">View Order History Archive</a>
        </div>
      </div>
    </div>
  );
}
