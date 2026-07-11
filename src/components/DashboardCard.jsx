export default function DashboardCard({ icon: Icon, label, value, trend, trendUp }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="w-9 h-9 rounded-xl bg-accent-ultralight flex items-center justify-center group-hover:scale-105 transition-transform">
              <Icon className="w-4 h-4 text-accent" />
            </div>
          )}
          <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">{label}</span>
        </div>
        {trend && (
          <span
            className={`
              text-[11px] font-semibold px-2.5 py-1 rounded-lg
              ${trendUp
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-rose-600 bg-rose-50'}
            `}
          >
            {trendUp ? '+' : ''}{trend} {trendUp ? '↑' : '↓'}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-charcoal tracking-tight">{value}</p>
    </div>
  );
}
