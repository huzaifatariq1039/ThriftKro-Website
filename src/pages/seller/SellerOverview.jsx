import { DollarSign, ShoppingBag, Eye, Package, TrendingUp, AlertTriangle, Check } from 'lucide-react';

export default function SellerOverview() {
  const stats = [
    { icon: <DollarSign size={20} />, label: "Revenue", value: "PKR 84,200", delta: "+12%" },
    { icon: <ShoppingBag size={20} />, label: "Orders", value: "37", delta: "+5" },
    { icon: <Eye size={20} />, label: "Total Views", value: "2,431", delta: "+18%" },
    { icon: <Package size={20} />, label: "In Stock", value: "42", delta: "" },
  ];

  const bars = [40, 65, 45, 80, 55, 90, 70];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const lowStock = [
    { id: '101', q: 1 },
    { id: '104', q: 0 }
  ];

  const notifs = [
    { id: 1, type: 'sold', msg: 'Order #394 placed for Vintage Hoodie' },
    { id: 2, type: 'low', msg: 'Air Jordan 1 running low' },
    { id: 3, type: 'oos', msg: 'Item #104 is out of stock' },
  ];

  return (
    <div className="p-6 sm:p-10 space-y-8 animate-fade-in max-w-7xl mx-auto">
      
      {/* ─── Stats Grid ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {stats.map(st => (
          <div
            key={st.label}
            className="p-5 rounded-2xl bg-white transition-transform hover:-translate-y-1"
            style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "#FFF3E0" }}
              >
                <span style={{ color: '#FF5C00' }}>{st.icon}</span>
              </div>
              {st.delta && (
                <span className="text-xs font-bold" style={{ color: "#2E7D32" }}>
                  {st.delta}
                </span>
              )}
            </div>
            <p className="font-extrabold" style={{ fontSize: 24, letterSpacing: "-0.02em", color: '#1A1108' }}>
              {st.value}
            </p>
            <span
              className="text-[10px] font-bold tracking-[0.1em] uppercase"
              style={{ color: 'rgba(26,17,8,0.4)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              {st.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* ─── Chart ─── */}
        <div
          className="md:col-span-2 p-6 rounded-2xl bg-white flex flex-col"
          style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-extrabold" style={{ color: '#1A1108' }}>Sales this week</h3>
            <span className="flex items-center gap-1 text-xs font-bold" style={{ color: '#FF5C00' }}>
              <TrendingUp size={14} /> +23% vs last week
            </span>
          </div>
          <div className="flex items-end justify-between gap-3 h-48 mt-auto pt-4">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-full rounded-t-lg transition-all"
                  style={{ height: `${h}%`, background: i === 5 ? '#FF5C00' : "#F0D9C4" }}
                />
                <span
                  className="text-xs mt-1"
                  style={{ color: "rgba(26,17,8,0.4)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {days[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Stock Alerts ─── */}
        <div className="p-6 rounded-2xl flex flex-col" style={{ background: '#1A1108' }}>
          <h3 className="font-extrabold text-white mb-1">Stock alerts</h3>
          <p className="text-xs text-white/50 mb-4">Items running low</p>
          
          <div className="space-y-2 flex-1">
            {lowStock.map(({ id, q }) => (
              <div
                key={id}
                className="flex items-center gap-2 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <AlertTriangle size={16} style={{ color: '#FFD60A' }} />
                <span className="text-sm text-white flex-1">Item #{id}</span>
                <span
                  className="text-xs font-bold"
                  style={{ color: q === 0 ? "#FF6B6B" : '#FFD60A', fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {q === 0 ? "OUT" : `${q} left`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Recent Activity ─── */}
      <div
        className="p-6 rounded-2xl bg-white"
        style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold" style={{ color: '#1A1108' }}>Recent activity</h3>
          <button className="text-xs font-bold transition-opacity hover:opacity-70" style={{ color: '#FF5C00' }}>
            Clear all
          </button>
        </div>
        <div className="space-y-2">
          {notifs.map(n => (
            <div
              key={n.id}
              className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-black/5"
              style={{ background: "#F7F4EF" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: n.type === "oos" ? "#FDECEA" : n.type === "low" ? "#FFF8E1" : "#E8F5E9" }}
              >
                {n.type === "sold" ? (
                  <Check size={15} style={{ color: "#2E7D32" }} />
                ) : (
                  <AlertTriangle size={15} style={{ color: n.type === "oos" ? "#DC2626" : "#F9A825" }} />
                )}
              </div>
              <span className="text-sm" style={{ color: '#1A1108' }}>{n.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
