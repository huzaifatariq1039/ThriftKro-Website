export default function DashboardCard({ icon: Icon, label, value, trend, trendUp }) {
  return (
    <div className="bg-white rounded-3xl border border-border/60 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-2xl bg-accent-ultralight text-accent flex items-center justify-center">
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        {trend && (
          <span
            className={`
              text-[10px] font-bold px-2.5 py-1 rounded-full border
              ${trendUp 
                ? 'text-emerald-700 bg-emerald-50 border-emerald-100' 
                : 'text-rose-700 bg-rose-50 border-rose-100'}
            `}
          >
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-extrabold text-charcoal tracking-tight">{value}</p>
      <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}
