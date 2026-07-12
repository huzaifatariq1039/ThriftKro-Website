import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function DashboardCard({ icon: Icon, label, value, trend, trendUp }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 hover:shadow-md hover:border-accent/20 transition-all duration-300 group relative overflow-hidden">
      {/* Left accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-accent-dark rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="w-9 h-9 rounded-xl bg-accent-ultralight flex items-center justify-center group-hover:scale-105 group-hover:bg-accent/15 transition-all duration-300">
              <Icon className="w-4 h-4 text-accent" />
            </div>
          )}
          <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">{label}</span>
        </div>
        {trend && (
          <span
            className={`
              text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1
              ${trendUp
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-rose-600 bg-rose-50'}
            `}
          >
            {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-extrabold text-charcoal tracking-tight">{value}</p>
    </div>
  );
}
