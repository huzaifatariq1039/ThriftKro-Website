export default function DashboardCard({ icon: Icon, label, value, trend, trendUp }) {
  return (
    <div className="bg-white rounded-xl border border-border-light p-5 shadow-depth-sm transition-depth">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
          {Icon && <Icon className="w-5 h-5 text-accent-dark" />}
        </div>
        {trend && (
          <span
            className={`
              text-[11px] font-semibold px-2 py-0.5 rounded-md
              ${trendUp ? 'text-green-700 bg-green-50' : 'text-red-600 bg-red-50'}
            `}
          >
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-charcoal tracking-tight">{value}</p>
      <p className="text-xs text-text-muted mt-1">{label}</p>
    </div>
  );
}
