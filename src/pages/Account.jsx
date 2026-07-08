import { useState } from 'react';
import { Package, Heart, Settings, ShieldCheck, Wallet, User, Calendar, MapPin } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

export default function Account() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 animate-fade-in">
        
        {/* Profile Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-border/40 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-accent-ultralight flex items-center justify-center text-2xl font-black text-accent border border-accent/10 shadow-sm">
            JD
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-black text-charcoal tracking-tight uppercase">John Doe</h1>
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider mt-1 flex items-center justify-center sm:justify-start gap-1">
              <Calendar className="w-3.5 h-3.5" /> Member since 2026
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
              <div className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">Verified Buyer</span>
              </div>
              <div className="px-3.5 py-1.5 bg-accent-ultralight border border-accent/10 rounded-xl flex items-center gap-2">
                <Wallet className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-accent-dark">Balance: Rs. 0</span>
              </div>
            </div>
          </div>
          <button className="btn-outline px-6 py-2.5 text-xs self-center sm:self-start">Edit Profile</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-border/40 p-3 shadow-sm">
              <nav className="flex flex-col gap-1">
                {[
                  { id: 'orders', icon: Package, label: 'My Orders' },
                  { id: 'saved', icon: Heart, label: 'Saved Items' },
                  { id: 'settings', icon: Settings, label: 'Settings' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                      activeTab === tab.id
                        ? 'bg-charcoal text-white shadow-sm'
                        : 'text-text-secondary hover:bg-surface hover:text-charcoal'
                    }`}
                  >
                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-text-muted'}`} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="bg-white rounded-3xl border border-border/40 p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-black text-charcoal uppercase tracking-tight mb-6">Order History</h2>
                <div className="space-y-4">
                  <div className="p-6 border border-border/60 rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:border-charcoal transition-all">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-text-muted bg-surface px-2 py-0.5 rounded-md">#ORD-9921</span>
                        <span className="px-2.5 py-0.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg text-[9px] font-extrabold uppercase tracking-wide">In Transit</span>
                      </div>
                      <p className="text-base font-bold text-charcoal uppercase tracking-wide">Vintage Oversized Hoodie</p>
                      <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mt-1">Ordered on Oct 12, 2026</p>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <p className="text-base font-extrabold text-charcoal mb-2">Rs. 4,500</p>
                      <button className="text-[11px] font-bold text-accent hover:text-accent-dark uppercase tracking-wider">Track Order</button>
                    </div>
                  </div>
                  
                  <div className="p-6 border border-border/60 rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:border-charcoal transition-all">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-text-muted bg-surface px-2 py-0.5 rounded-md">#ORD-9840</span>
                        <span className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg text-[9px] font-extrabold uppercase tracking-wide">Delivered</span>
                      </div>
                      <p className="text-base font-bold text-charcoal uppercase tracking-wide">Retro Graphic Tee</p>
                      <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mt-1">Delivered on Sep 28, 2026</p>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <p className="text-base font-extrabold text-charcoal mb-2">Rs. 2,800</p>
                      <button className="text-[11px] font-bold text-accent hover:text-accent-dark uppercase tracking-wider">Leave Review</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="space-y-6">
                <h2 className="text-lg font-black text-charcoal uppercase tracking-tight">Saved Items</h2>
                <ProductGrid products={products.slice(0, 4)} />
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-3xl border border-border/40 p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-black text-charcoal uppercase tracking-tight mb-6">Account Settings</h2>
                <div className="max-w-md space-y-5">
                  <div>
                    <label className="block text-[10px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" value="john@example.com" readOnly className="w-full text-text-muted bg-surface border-border/40" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">Phone Number</label>
                    <input type="tel" defaultValue="+92 300 1234567" className="w-full" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">Shipping Address</label>
                    <textarea rows="3" defaultValue="123 Main St, Apt 4B, Lahore" className="w-full"></textarea>
                  </div>
                  <button className="btn-primary w-full sm:w-auto py-3.5 shadow-sm">Save Changes</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
