import {
  DollarSign,
  Package,
  Clock,
  Wallet,
  Upload,
  ScanLine,
  TrendingUp,
  MoreHorizontal,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';
import DashboardCard from '../../components/DashboardCard';

const escrowPayouts = [
  { id: '#TK-2847', buyer: 'Hamza K.', item: 'Vintage Nike Windbreaker', amount: 'Rs. 6,500', status: 'Released', statusColor: 'text-emerald-600 bg-emerald-50' },
  { id: '#TK-2846', buyer: 'Ayesha R.', item: 'Retro Graphic Tee', amount: 'Rs. 2,800', status: 'Pending', statusColor: 'text-amber-600 bg-amber-50' },
  { id: '#TK-2845', buyer: 'Omar S.', item: 'Cargo Pants Olive', amount: 'Rs. 5,800', status: 'In Escrow', statusColor: 'text-blue-600 bg-blue-50' },
  { id: '#TK-2844', buyer: 'Sara M.', item: 'Denim Jacket Distressed', amount: 'Rs. 7,200', status: 'Released', statusColor: 'text-emerald-600 bg-emerald-50' },
];

const recentActivity = [
  { id: 1, icon: CheckCircle2, iconColor: 'text-emerald-500 bg-emerald-50', text: 'AI Verification passed for "Vintage Nike Windbreaker"', time: '20 mins ago' },
  { id: 2, icon: ShieldCheck, iconColor: 'text-blue-500 bg-blue-50', text: 'New offer received from Omar S. (Rs. 5,800)', time: '2 hours ago' },
  { id: 3, icon: AlertTriangle, iconColor: 'text-amber-500 bg-amber-50', text: 'Listing "Retro Graphic Tee" needs better photos', time: '1 day ago' },
];

const weeklyData = [
  { day: 'Mon', visitors: 80, tryOns: 45 },
  { day: 'Tue', visitors: 120, tryOns: 85 },
  { day: 'Wed', visitors: 160, tryOns: 130 },
  { day: 'Thu', visitors: 110, tryOns: 70 },
  { day: 'Fri', visitors: 190, tryOns: 155 },
  { day: 'Sat', visitors: 240, tryOns: 200 },
  { day: 'Sun', visitors: 220, tryOns: 175 },
];

export default function SellerOverview() {
  const maxVal = 260;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard icon={DollarSign} label="Total Sales" value="Rs. 148K" trend="12%" trendUp={true} />
        <DashboardCard icon={Package} label="Active Listings" value="24" trend="3 new" trendUp={true} />
        <DashboardCard icon={Clock} label="Pending Escrow" value="Rs. 8,600" />
        <DashboardCard icon={Wallet} label="Wallet Balance" value="Rs. 42,300" trend="8%" trendUp={true} />
      </div>

      {/* Main Content Blocks */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left/Center Column (2/3 width) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Active Escrow Payouts */}
          <div className="bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F0F0]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-accent-ultralight flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
                <h2 className="text-[14px] font-semibold text-charcoal">Active Escrow Payouts</h2>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-surface transition-colors text-text-muted">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#FAFAFA] border-b border-[#F0F0F0]">
                    <th className="px-6 py-3.5 text-[11px] font-semibold text-text-muted tracking-wide uppercase">Order ID</th>
                    <th className="px-6 py-3.5 hidden sm:table-cell text-[11px] font-semibold text-text-muted tracking-wide uppercase">Buyer</th>
                    <th className="px-6 py-3.5 text-[11px] font-semibold text-text-muted tracking-wide uppercase">Item</th>
                    <th className="px-6 py-3.5 text-right text-[11px] font-semibold text-text-muted tracking-wide uppercase">Amount</th>
                    <th className="px-6 py-3.5 text-right text-[11px] font-semibold text-text-muted tracking-wide uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F0]">
                  {escrowPayouts.map((payout) => (
                    <tr key={payout.id} className="hover:bg-[#FAFAFA] transition-colors group">
                      <td className="px-6 py-4 text-[13px] font-mono font-semibold text-charcoal">{payout.id}</td>
                      <td className="px-6 py-4 text-[13px] text-text-secondary hidden sm:table-cell">{payout.buyer}</td>
                      <td className="px-6 py-4 text-[13px] text-charcoal truncate max-w-[180px]">{payout.item}</td>
                      <td className="px-6 py-4 text-[13px] font-semibold text-charcoal text-right">{payout.amount}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg ${payout.statusColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {payout.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Weekly Store Traffic Chart */}
          <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[14px] font-semibold text-charcoal">Weekly Store Traffic</h3>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text-muted">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent"></span> Try-On
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text-muted">
                  <span className="w-2.5 h-2.5 rounded-full bg-charcoal/20"></span> Visitors
                </span>
              </div>
            </div>

            {/* Modern Bar Chart */}
            <div className="relative h-52 w-full flex items-end gap-3 pt-4">
              <div className="absolute inset-x-0 bottom-6 top-0 flex flex-col justify-between pointer-events-none">
                {[0,1,2,3].map(i => (
                  <div key={i} className="w-full border-t border-dashed border-[#F0F0F0]" />
                ))}
              </div>

              {weeklyData.map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative z-10">
                  <div className="w-full flex items-end justify-center gap-[3px] max-w-[48px] h-full">
                    <div 
                      className="w-3 bg-[#E5E7EB] rounded-t-md group-hover:bg-[#D1D5DB] transition-all duration-300"
                      style={{ height: `${(bar.visitors / maxVal) * 100}%` }}
                    />
                    <div 
                      className="w-3 bg-accent rounded-t-md group-hover:brightness-110 transition-all duration-300 shadow-sm"
                      style={{ height: `${(bar.tryOns / maxVal) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          {/* Quick Add Listing */}
          <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-accent-ultralight flex items-center justify-center">
                <ScanLine className="w-4 h-4 text-accent" />
              </div>
              <h2 className="text-[14px] font-semibold text-charcoal">Quick Add Listing</h2>
            </div>

            <div className="flex flex-col items-center justify-center py-10 px-6 rounded-xl border-2 border-dashed border-[#E5E7EB] hover:border-accent hover:bg-accent-ultralight/30 transition-all duration-300 cursor-pointer group">
              <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center mb-4 group-hover:bg-accent-ultralight group-hover:scale-105 transition-all">
                <Upload className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" strokeWidth={1.75} />
              </div>
              <p className="text-[13px] font-semibold text-charcoal mb-1">Upload Flat-Lay Photo</p>
              <p className="text-[11px] text-text-muted">Drag and drop or click to browse</p>
            </div>

            <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-charcoal text-white font-semibold text-[12px] uppercase tracking-wider hover:bg-charcoal-light rounded-xl transition-all duration-300 hover:shadow-md active:scale-[0.98]">
              <ScanLine className="w-4 h-4" strokeWidth={1.75} />
              Start AI Scan
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[14px] font-semibold text-charcoal">Recent Activity</h3>
              <button className="text-[11px] font-semibold text-accent hover:text-accent-dark transition-colors flex items-center gap-0.5">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3 p-3 rounded-xl hover:bg-surface transition-colors">
                  <div className={`w-8 h-8 rounded-lg ${activity.iconColor} flex items-center justify-center shrink-0`}>
                    <activity.icon className="w-3.5 h-3.5" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-charcoal leading-relaxed line-clamp-2">{activity.text}</p>
                    <span className="text-[10px] text-text-muted font-medium mt-1 block">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Performance */}
          <div className="bg-gradient-to-br from-charcoal to-charcoal-light rounded-2xl p-6 text-white">
            <h3 className="text-[14px] font-semibold mb-5 text-white/90">Portfolio Performance</h3>
            <div className="space-y-5">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5">Month to Date</span>
                <span className="block text-2xl font-bold tracking-tight">Rs. 32,450</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 mt-1">
                  <ArrowUpRight className="w-3 h-3" /> +14.2% vs last month
                </span>
              </div>
              <div className="border-t border-white/10 pt-4">
                <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5">Pieces Sold</span>
                <span className="block text-2xl font-bold tracking-tight">18</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 mt-1">
                  <ArrowUpRight className="w-3 h-3" /> +2 vs last month
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
