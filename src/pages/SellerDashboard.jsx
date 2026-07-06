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
} from 'lucide-react';
import SellerSidebar from '../components/SellerSidebar';
import DashboardCard from '../components/DashboardCard';

const escrowPayouts = [
  { id: '#TK-2847', buyer: 'Hamza K.', item: 'Vintage Nike Windbreaker', amount: 'Rs. 6,500', status: 'Released', statusColor: 'text-green-700 bg-green-50' },
  { id: '#TK-2846', buyer: 'Ayesha R.', item: 'Retro Graphic Tee', amount: 'Rs. 2,800', status: 'Pending', statusColor: 'text-amber-700 bg-amber-50' },
  { id: '#TK-2845', buyer: 'Omar S.', item: 'Cargo Pants Olive', amount: 'Rs. 5,800', status: 'In Escrow', statusColor: 'text-blue-700 bg-blue-50' },
  { id: '#TK-2844', buyer: 'Sara M.', item: 'Denim Jacket Distressed', amount: 'Rs. 7,200', status: 'Released', statusColor: 'text-green-700 bg-green-50' },
];

export default function SellerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <SellerSidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-border-light h-16 flex items-center px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-surface transition-colors mr-3"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5 text-charcoal" />
          </button>
          <div>
            <h1 className="text-base font-semibold text-charcoal">Dashboard</h1>
            <p className="text-[11px] text-text-muted">Welcome back, Seller</p>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-6xl">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8">
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

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
            {/* Active Escrow Payouts — takes 3 columns */}
            <div className="lg:col-span-3 bg-white rounded-xl border border-border-light shadow-depth-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border-light">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent-dark" />
                  <h2 className="text-sm font-semibold text-charcoal">
                    Active Escrow Payouts
                  </h2>
                </div>
                <span className="text-[11px] text-text-muted">{escrowPayouts.length} transactions</span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-light">
                      <th className="text-left text-[11px] font-medium text-text-muted tracking-wider uppercase px-5 py-3">
                        Order
                      </th>
                      <th className="text-left text-[11px] font-medium text-text-muted tracking-wider uppercase px-5 py-3 hidden sm:table-cell">
                        Buyer
                      </th>
                      <th className="text-left text-[11px] font-medium text-text-muted tracking-wider uppercase px-5 py-3">
                        Item
                      </th>
                      <th className="text-right text-[11px] font-medium text-text-muted tracking-wider uppercase px-5 py-3">
                        Amount
                      </th>
                      <th className="text-right text-[11px] font-medium text-text-muted tracking-wider uppercase px-5 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {escrowPayouts.map((payout) => (
                      <tr
                        key={payout.id}
                        className="border-b border-border-light last:border-0 hover:bg-surface/50 transition-colors"
                      >
                        <td className="px-5 py-3.5 text-xs font-mono text-charcoal">
                          {payout.id}
                        </td>
                        <td className="px-5 py-3.5 text-sm text-text-secondary hidden sm:table-cell">
                          {payout.buyer}
                        </td>
                        <td className="px-5 py-3.5 text-sm text-charcoal font-medium truncate max-w-[160px]">
                          {payout.item}
                        </td>
                        <td className="px-5 py-3.5 text-sm font-semibold text-charcoal text-right">
                          {payout.amount}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span
                            className={`
                              inline-block text-[11px] font-semibold px-2.5 py-1 rounded-md
                              ${payout.statusColor}
                            `}
                          >
                            {payout.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Add Listing — takes 2 columns */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-border-light shadow-depth-sm">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-border-light">
                <ScanLine className="w-4 h-4 text-accent-dark" />
                <h2 className="text-sm font-semibold text-charcoal">
                  Quick Add Listing
                </h2>
              </div>

              <div className="p-5">
                <div className="flex flex-col items-center justify-center py-10 px-4 rounded-xl border-2 border-dashed border-border hover:border-accent/60 transition-colors cursor-pointer bg-surface/50">
                  <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-3">
                    <Upload className="w-5 h-5 text-accent-dark" />
                  </div>
                  <p className="text-sm font-medium text-charcoal mb-1">
                    Upload Flat-Lay Photo
                  </p>
                  <p className="text-[11px] text-text-muted text-center">
                    AI will auto-scan condition, detect brand, and suggest pricing
                  </p>
                </div>

                <button className="
                  w-full mt-4 flex items-center justify-center gap-2
                  px-4 py-3 rounded-xl
                  bg-accent text-charcoal font-semibold text-sm
                  hover:bg-accent-dark transition-colors duration-200
                  shadow-depth-sm
                ">
                  <ScanLine className="w-4 h-4" />
                  Start AI Scan
                </button>

                <p className="text-[10px] text-text-muted text-center mt-3">
                  Supports JPG, PNG up to 10MB. Best results with good lighting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
