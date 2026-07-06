import { useState } from 'react';
import { Package, Heart, Settings, ShieldCheck, Wallet } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

export default function Account() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="min-h-screen bg-surface py-10 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl elevation-1 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center text-3xl font-bold text-charcoal border-4 border-white elevation-2">
            JD
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-charcoal tracking-tight">John Doe</h1>
            <p className="text-[13px] text-text-muted mt-1">Member since 2026</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
              <div className="px-3 py-1.5 bg-surface rounded-lg flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-verified" />
                <span className="text-[11px] font-semibold text-charcoal">Verified Buyer</span>
              </div>
              <div className="px-3 py-1.5 bg-surface rounded-lg flex items-center gap-2">
                <Wallet className="w-4 h-4 text-accent-dark" />
                <span className="text-[11px] font-semibold text-charcoal">Balance: Rs. 0</span>
              </div>
            </div>
          </div>
          <button className="btn-outline px-5 py-2.5 text-xs">Edit Profile</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl elevation-1 p-2">
              <nav className="flex flex-col space-y-1">
                {[
                  { id: 'orders', icon: Package, label: 'My Orders' },
                  { id: 'saved', icon: Heart, label: 'Saved Items' },
                  { id: 'settings', icon: Settings, label: 'Settings' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-surface text-charcoal'
                        : 'text-text-secondary hover:bg-surface/50 hover:text-charcoal'
                    }`}
                  >
                    <tab.icon className={`w-4.5 h-4.5 ${activeTab === tab.id ? 'text-charcoal' : 'text-text-muted'}`} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl elevation-1 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-charcoal mb-6">Order History</h2>
                <div className="space-y-4">
                  <div className="p-5 border border-border-light rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-text-muted">#ORD-9921</span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase">In Transit</span>
                      </div>
                      <p className="text-sm font-semibold text-charcoal">Vintage Oversized Hoodie</p>
                      <p className="text-[11px] text-text-muted mt-1">Ordered on Oct 12, 2026</p>
                    </div>
                    <div className="text-right w-full sm:w-auto">
                      <p className="text-sm font-bold text-charcoal mb-2">Rs. 4,500</p>
                      <button className="text-[11px] font-semibold text-accent-dark hover:underline">Track Order</button>
                    </div>
                  </div>
                  
                  <div className="p-5 border border-border-light rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-text-muted">#ORD-9840</span>
                        <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-[10px] font-bold uppercase">Delivered</span>
                      </div>
                      <p className="text-sm font-semibold text-charcoal">Retro Graphic Tee</p>
                      <p className="text-[11px] text-text-muted mt-1">Delivered on Sep 28, 2026</p>
                    </div>
                    <div className="text-right w-full sm:w-auto">
                      <p className="text-sm font-bold text-charcoal mb-2">Rs. 2,800</p>
                      <button className="text-[11px] font-semibold text-accent-dark hover:underline">Leave Review</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div>
                <h2 className="text-xl font-bold text-charcoal mb-6">Saved Items</h2>
                <ProductGrid products={products.slice(0, 4)} />
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl elevation-1 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-charcoal mb-6">Account Settings</h2>
                <div className="max-w-md space-y-5">
                  <div>
                    <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" value="john@example.com" readOnly className="w-full px-4 py-3 bg-surface rounded-xl text-sm text-text-muted" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Phone Number</label>
                    <input type="tel" defaultValue="+92 300 1234567" className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:border-charcoal focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Shipping Address</label>
                    <textarea rows="3" defaultValue="123 Main St, Apt 4B, Lahore" className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:border-charcoal focus:outline-none"></textarea>
                  </div>
                  <button className="btn-primary w-full sm:w-auto">Save Changes</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
