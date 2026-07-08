export default function DashboardCard({ icon: Icon, label, value, trend, trendUp }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-[#888888] stroke-[1.5]" />}
          <span className="text-[10px] font-bold text-[#888888] uppercase tracking-wider">{label}</span>
        </div>
        {trend && (
          <span
            className={`
              text-[10px] font-bold px-2 py-0.5 rounded-full
              ${trendUp 
                ? 'text-emerald-600 bg-emerald-50' 
                : 'text-rose-600 bg-rose-50'}
            `}
          >
            {trendUp ? '+' : ''}{trend} {trendUp ? '↑' : '↓'}
          </span>
        )}
      </div>
      <p className="text-3xl font-extrabold text-[#121212] tracking-tight">{value}</p>
    </div>
  );
}
