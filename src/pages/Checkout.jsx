import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, CreditCard, Wallet } from 'lucide-react';
import { products } from '../data/products';

export default function Checkout() {
  const cartItems = [products[0], products[1]];
  const total = cartItems.reduce((sum, item) => sum + item.price, 0) + 500 + Math.round(cartItems.reduce((sum, item) => sum + item.price, 0) * 0.02);

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-[1000px] mx-auto px-6 sm:px-12">
        
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight mb-12">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Checkout Form */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Step 1 */}
            <section>
              <h2 className="text-[11px] font-bold tracking-[0.1em] uppercase text-charcoal mb-6 border-b border-border pb-4">1. Shipping Address</h2>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <div className="col-span-1">
                  <input type="text" className="w-full bg-transparent border-b border-border py-2 text-sm focus:border-charcoal focus:outline-none transition-colors placeholder:text-text-muted" placeholder="First Name" />
                </div>
                <div className="col-span-1">
                  <input type="text" className="w-full bg-transparent border-b border-border py-2 text-sm focus:border-charcoal focus:outline-none transition-colors placeholder:text-text-muted" placeholder="Last Name" />
                </div>
                <div className="col-span-2">
                  <input type="text" className="w-full bg-transparent border-b border-border py-2 text-sm focus:border-charcoal focus:outline-none transition-colors placeholder:text-text-muted" placeholder="Street Address" />
                </div>
                <div className="col-span-1">
                  <input type="text" className="w-full bg-transparent border-b border-border py-2 text-sm focus:border-charcoal focus:outline-none transition-colors placeholder:text-text-muted" placeholder="City" />
                </div>
                <div className="col-span-1">
                  <input type="tel" className="w-full bg-transparent border-b border-border py-2 text-sm focus:border-charcoal focus:outline-none transition-colors placeholder:text-text-muted" placeholder="Phone Number" />
                </div>
              </div>
            </section>

            {/* Step 2 */}
            <section>
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <h2 className="text-[11px] font-bold tracking-[0.1em] uppercase text-charcoal">2. Escrow Payment</h2>
                <div className="flex items-center gap-1.5 text-verified">
                  <Lock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Secure</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-5 border border-border cursor-pointer hover:border-charcoal transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full border border-charcoal flex items-center justify-center">
                      <div className="w-2 h-2 bg-charcoal rounded-full" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal">Thrift Kro Wallet</p>
                      <p className="text-[11px] text-text-muted mt-0.5">Available Balance: Rs. 42,300</p>
                    </div>
                  </div>
                  <Wallet className="w-5 h-5 text-charcoal/40" />
                </label>
                
                <label className="flex items-center justify-between p-5 border border-border cursor-pointer hover:border-charcoal transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full border border-border" />
                    <div>
                      <p className="text-sm font-medium text-charcoal">Credit Card</p>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-charcoal/40" />
                </label>
              </div>
            </section>

            <button className="btn-primary w-full py-5 text-sm flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" /> Pay Rs. {total.toLocaleString()} to Escrow
            </button>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-surface/30 p-8 sticky top-32">
              <h3 className="text-[11px] font-bold tracking-[0.1em] uppercase text-charcoal mb-6 border-b border-border pb-4">Order Summary</h3>
              
              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-surface overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-[12px] font-medium text-charcoal leading-snug">{item.name}</p>
                      <p className="text-[11px] text-text-muted mt-1">Size: {item.size}</p>
                      <p className="text-sm font-medium text-charcoal mt-2">Rs. {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6 space-y-3 mb-6 text-sm text-text-secondary">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-charcoal">Rs. {(total - 500 - Math.round((total-500)*0.02)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Escrow Fee</span>
                  <span className="text-charcoal">Rs. {Math.round((total-500)*0.02).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-charcoal">Rs. 500</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end border-t border-border pt-6 mb-8">
                <span className="text-sm font-bold text-charcoal uppercase tracking-widest">Total</span>
                <span className="text-xl font-medium text-charcoal">Rs. {total.toLocaleString()}</span>
              </div>

              <div className="p-4 bg-surface/50 border border-border flex gap-3 text-text-secondary">
                <ShieldCheck className="w-4 h-4 text-charcoal shrink-0" />
                <p className="text-[11px] leading-relaxed">
                  Your funds are secure. The seller won't receive payment until you receive the item and confirm it matches the AI-verified condition.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
