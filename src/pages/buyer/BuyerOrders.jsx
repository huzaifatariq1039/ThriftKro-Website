import { Package, Truck, CheckCircle } from 'lucide-react';

export default function BuyerOrders() {
  const orders = [
    {
      id: '#ORD-9921',
      name: 'Vintage Oversized Hoodie',
      date: 'Ordered on Oct 12, 2026',
      price: 'Rs. 4,500',
      status: 'In Transit',
      statusClass: 'badge-info',
      icon: Truck,
      action: 'Track Order',
      progress: 65,
    },
    {
      id: '#ORD-9840',
      name: 'Retro Graphic Tee',
      date: 'Delivered on Sep 28, 2026',
      price: 'Rs. 2,800',
      status: 'Delivered',
      statusClass: 'badge-success',
      icon: CheckCircle,
      action: 'Leave Review',
      progress: 100,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 sm:p-8 shadow-sm animate-fade-in">
      <h2 className="text-[18px] font-bold text-charcoal mb-6 pb-4 border-b border-[#F0F0F0]">Order History</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="p-6 border border-[#EAEAEA] rounded-xl hover:border-accent/20 hover:shadow-sm transition-all duration-300">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-4 items-start">
                {/* Status Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'}`}>
                  <order.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-mono font-semibold text-text-muted bg-surface px-2.5 py-1 rounded-md">{order.id}</span>
                    <span className={`badge ${order.statusClass}`}>
                      <span className="badge-dot" />
                      {order.status}
                    </span>
                  </div>
                  <p className="text-[15px] font-semibold text-charcoal">{order.name}</p>
                  <p className="text-[12px] text-text-muted mt-0.5">{order.date}</p>
                </div>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto pl-14 sm:pl-0">
                <p className="text-[16px] font-bold text-charcoal mb-2">{order.price}</p>
                <button className="text-[12px] font-semibold text-accent hover:text-accent-dark tracking-wide transition-colors">{order.action}</button>
              </div>
            </div>
            
            {/* Progress tracker for In Transit */}
            {order.status === 'In Transit' && (
              <div className="mt-4 pt-4 border-t border-[#F0F0F0] pl-14">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Shipment Progress</span>
                  <span className="text-[10px] font-bold text-accent">{order.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-border/40 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full transition-all duration-700" style={{ width: `${order.progress}%` }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
