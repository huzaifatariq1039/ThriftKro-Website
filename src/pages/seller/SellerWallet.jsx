import { Wallet, ArrowDownToLine, ArrowUpRight } from 'lucide-react';

export default function SellerWallet() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-bold text-charcoal">Wallet & Payouts</h2>
          <p className="text-[13px] text-text-muted mt-1">Manage your escrow balance and withdraw funds</p>
        </div>
        <button className="btn-accent px-4 py-2 text-[12px] flex items-center gap-2">
          <ArrowDownToLine className="w-4 h-4" /> Withdraw Funds
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-charcoal rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="relative z-10">
            <span className="block text-[12px] font-medium text-white/60 mb-2 uppercase tracking-wider">Available Balance</span>
            <div className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">Rs. 42,300</div>
            
            <div className="flex items-center gap-8">
              <div>
                <span className="block text-[11px] text-white/60 mb-1">In Escrow</span>
                <span className="block text-[15px] font-semibold">Rs. 8,600</span>
              </div>
              <div>
                <span className="block text-[11px] text-white/60 mb-1">Total Earned</span>
                <span className="block text-[15px] font-semibold">Rs. 148,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6">
          <h3 className="text-[14px] font-semibold text-charcoal mb-4">Payout Method</h3>
          <div className="p-4 rounded-xl border border-[#EAEAEA] flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center shrink-0">
              <span className="font-bold text-[13px] text-charcoal">HBL</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-charcoal">Habib Bank Limited</p>
              <p className="text-[11px] text-text-muted mt-0.5">**** **** 4321</p>
            </div>
          </div>
          <button className="text-[12px] font-semibold text-accent hover:text-accent-dark w-full text-left">
            + Add New Bank Account
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F0F0F0]">
          <h3 className="text-[14px] font-semibold text-charcoal">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-[#F0F0F0]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-[#FAFAFA] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-charcoal">Escrow Released (#TK-284{i})</p>
                  <p className="text-[11px] text-text-muted mt-0.5">Oct 24, 2026</p>
                </div>
              </div>
              <span className="text-[14px] font-bold text-emerald-600">+ Rs. {4500 * i}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
