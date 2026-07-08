import { useState } from 'react';
import {
  DollarSign,
  Package,
  Clock,
  Wallet,
  Upload,
  ScanLine,
  Menu,
  TrendingUp,
  Bell,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import SellerSidebar from '../components/SellerSidebar';
import DashboardCard from '../components/DashboardCard';

const escrowPayouts = [
  { id: '#TK-2847', buyer: 'Hamza K.', item: 'Vintage Nike Windbreaker', amount: 'Rs. 6,500', status: 'Released', statusColor: 'text-emerald-600 bg-emerald-50/60' },
  { id: '#TK-2846', buyer: 'Ayesha R.', item: 'Retro Graphic Tee', amount: 'Rs. 2,800', status: 'Pending', statusColor: 'text-amber-600 bg-amber-50/60' },
  { id: '#TK-2845', buyer: 'Omar S.', item: 'Cargo Pants Olive', amount: 'Rs. 5,800', status: 'In Escrow', statusColor: 'text-blue-600 bg-blue-50/60' },
  { id: '#TK-2844', buyer: 'Sara M.', item: 'Denim Jacket Distressed', amount: 'Rs. 7,200', status: 'Released', statusColor: 'text-emerald-600 bg-emerald-50/60' },
];

const recentActivity = [
  { id: 1, type: 'success', text: 'AI Verification passed for "Vintage Nike Windbreaker"', time: '20 mins ago' },
  { id: 2, type: 'info', text: 'New offer received from Omar S. (Rs. 5,800)', time: '2 hours ago' },
  { id: 3, type: 'warning', text: 'Listing "Retro Graphic Tee" requires better lighting', time: '1 day ago' },
];

export default function SellerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] text-[#121212] select-none">
      {/* Sidebar */}
      <SellerSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#F9FAFB]/80 backdrop-blur-xl border-b border-[#EAEAEA] h-20 flex items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4">
            {/* Menu Toggle for Desktop */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-2.5 rounded-xl hover:bg-slate-100 border border-[#EAEAEA] transition-all text-[#121212]"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-4.5 h-4.5" />
            </button>
            {/* Menu Toggle for Mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-slate-100 border border-[#EAEAEA] transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-4.5 h-4.5 text-[#121212]" />
            </button>
            <div>
              <h1 className="text-sm font-extrabold text-[#121212] tracking-wider uppercase">Overview</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl hover:bg-slate-100 border border-[#EAEAEA] text-[#888888] hover:text-[#121212] transition-all relative">
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#FF5C00] rounded-full"></span>
              <Bell className="w-4 h-4 stroke-[1.5]" />
            </button>
            
            {/* User Profile Mockup */}
            <div className="flex items-center gap-3 pl-3 border-l border-[#EAEAEA]">
              <div className="w-8 h-8 rounded-lg bg-[#121212] text-white flex items-center justify-center font-bold text-xs">
                S
              </div>
              <div className="hidden sm:block">
                <span className="block text-xs font-bold text-[#121212]">StreetwearHub</span>
                <span className="block text-[8px] text-[#888888] font-bold tracking-widest uppercase mt-0.5">LEVEL 2 SELLER</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid Container */}
        <div className="p-6 lg:p-10 space-y-8 flex-1 max-w-[1600px] w-full mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              icon={DollarSign}
              label="Total Sales"
              value="Rs. 148K"
              trend="12%"
              trendUp={true}
            />
            <DashboardCard
              icon={Package}
              label="Active Listings"
              value="24"
              trend="3 new"
              trendUp={true}
            />
            <DashboardCard
              icon={Clock}
              label="Pending Escrow"
              value="Rs. 8,600"
            />
            <DashboardCard
              icon={Wallet}
              label="Wallet Balance"
              value="Rs. 42,300"
              trend="8%"
              trendUp={true}
            />
          </div>

          {/* Main Content Blocks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left/Center Column (2/3 width on large screens) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Active Escrow Payouts */}
              <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#EAEAEA]">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#121212] stroke-[1.5]" />
                    <h2 className="text-xs font-bold text-[#121212] uppercase tracking-wider">
                      Active Escrow Payouts
                    </h2>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#EAEAEA] text-[10px] font-bold text-[#888888] tracking-wider uppercase">
                        <th className="px-6 py-4.5">Order ID</th>
                        <th className="px-6 py-4.5 hidden sm:table-cell">Buyer</th>
                        <th className="px-6 py-4.5">Item</th>
                        <th className="px-6 py-4.5 text-right">Amount</th>
                        <th className="px-6 py-4.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAEAEA]/60">
                      {escrowPayouts.map((payout) => (
                        <tr
                          key={payout.id}
                          className="hover:bg-[#F9FAFB]/50 transition-colors"
                        >
                          <td className="px-6 py-4.5 text-xs font-mono font-bold text-[#121212]">
                            {payout.id}
                          </td>
                          <td className="px-6 py-4.5 text-xs font-medium text-[#888888] hidden sm:table-cell">
                            {payout.buyer}
                          </td>
                          <td className="px-6 py-4.5 text-xs font-medium text-[#121212] truncate max-w-[180px]">
                            {payout.item}
                          </td>
                          <td className="px-6 py-4.5 text-xs font-bold text-[#121212] text-right">
                            {payout.amount}
                          </td>
                          <td className="px-6 py-4.5 text-right">
                            <span
                              className={`
                                inline-flex items-center gap-1.5 text-[9px] font-bold px-2.5 py-1 rounded-full
                                ${payout.statusColor}
                              `}
                            >
                              <span className="w-1 h-1 rounded-full bg-current"></span>
                              {payout.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Performance Metrics Chart Mockup */}
              <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xs font-bold text-[#121212] uppercase tracking-wider">Weekly Store Traffic</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#888888] bg-[#F9FAFB] border border-[#EAEAEA] px-2 py-0.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00]"></span> Try-On
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#888888] bg-[#F9FAFB] border border-[#EAEAEA] px-2 py-0.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#121212]"></span> Visitors
                    </span>
                  </div>
                </div>

                {/* SVG Visual Chart Mockup */}
                <div className="relative h-48 w-full flex items-end gap-2 pt-4">
                  <div className="absolute inset-x-0 bottom-0 top-4 flex flex-col justify-between pointer-events-none">
                    <div className="w-full border-t border-[#EAEAEA]/50"></div>
                    <div className="w-full border-t border-[#EAEAEA]/50"></div>
                    <div className="w-full border-t border-[#EAEAEA]/50"></div>
                    <div className="w-full border-t border-[#F9FAFB]"></div>
                  </div>

                  {/* Chart Bars Mockup */}
                  {[
                    { day: 'Mon', vis: 80, try: 45 },
                    { day: 'Tue', vis: 120, try: 85 },
                    { day: 'Wed', vis: 160, try: 130 },
                    { day: 'Thu', vis: 110, try: 70 },
                    { day: 'Fri', vis: 190, try: 155 },
                    { day: 'Sat', vis: 240, try: 200 },
                    { day: 'Sun', vis: 220, try: 175 },
                  ].map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative z-10">
                      <div className="w-full flex items-end justify-center gap-1 max-w-[48px] h-full">
                        {/* Visitors Bar */}
                        <div 
                          className="w-2.5 bg-slate-200 rounded-t-sm group-hover:bg-slate-300 transition-all"
                          style={{ height: `${(bar.vis / 260) * 100}%` }}
                        ></div>
                        {/* Try-on Bar */}
                        <div 
                          className="w-2.5 bg-[#FF5C00] rounded-t-sm group-hover:brightness-95 transition-all shadow-sm"
                          style={{ height: `${(bar.try / 260) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-[9px] font-bold text-[#888888] uppercase tracking-wider">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (1/3 width on large screens) */}
            <div className="space-y-8">
              {/* Quick Add Listing */}
              <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                <div className="flex items-center gap-2 mb-5">
                  <ScanLine className="w-4 h-4 text-[#121212] stroke-[1.5]" />
                  <h2 className="text-xs font-bold text-[#121212] uppercase tracking-wider">
                    Quick Add Listing
                  </h2>
                </div>

                <div className="flex flex-col items-center justify-center py-14 px-6 rounded-xl border border-dashed border-slate-300 hover:border-[#121212] transition-all duration-300 cursor-pointer bg-[#F9FAFB]/50 group">
                  <Upload className="w-6 h-6 text-[#888888] mb-3 group-hover:text-[#121212] transition-colors stroke-[1.25]" />
                  <p className="text-[11px] font-bold text-[#121212] uppercase tracking-wider mb-1">
                    Upload Flat-Lay Photo
                  </p>
                  <p className="text-[10px] text-[#888888] font-medium">
                    Drag and drop or click to browse
                  </p>
                </div>

                <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-[#121212] text-white font-bold text-[10px] uppercase tracking-wider hover:bg-[#2A2A2A] rounded-xl transition-all duration-300 shadow-sm">
                  <ScanLine className="w-4 h-4 stroke-[1.5]" />
                  Start AI Scan
                </button>
              </div>

              {/* Recent AI / Shop Activities */}
              <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                <h3 className="text-xs font-bold text-[#121212] uppercase tracking-wider mb-5">Recent Store Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-3 text-xs border-b border-[#EAEAEA]/60 pb-3 last:border-0 last:pb-0">
                      {activity.type === 'success' && <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5 stroke-[1.5]" />}
                      {activity.type === 'info' && <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5 stroke-[1.5]" />}
                      {activity.type === 'warning' && <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5 stroke-[1.5]" />}
                      
                      <div className="flex-1">
                        <p className="text-xs font-medium text-[#121212] leading-relaxed">{activity.text}</p>
                        <span className="text-[9px] text-[#888888] font-bold uppercase tracking-wider mt-1 block">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Selling Tips Card - Redesigned to Minimal Style */}
              <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] relative overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F9FAFB] border border-[#EAEAEA] flex items-center justify-center shrink-0">
                    <HelpCircle className="w-4 h-4 text-[#FF5C00] stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#121212]">Seller Optimization Tip</h4>
                    <p className="text-[11px] text-[#888888] leading-relaxed mt-2">
                      AI Virtual Try-On boosts visitor engagement by 3.5x.
                    </p>
                    <a href="#optimization" className="inline-flex items-center gap-1 text-[10px] font-bold text-[#FF5C00] uppercase tracking-wider mt-4 hover:underline">
                      Learn More <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
