import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, CreditCard, Wallet, MapPin, Truck } from 'lucide-react';
import { products } from '../data/products';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const cartItems = [products[0], products[1]];
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const escrowFee = Math.round(subtotal * 0.02);
  const shipping = 500;
  const total = subtotal + escrowFee + shipping;

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-32 pb-24">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-12 animate-fade-in">
        
        <div className="flex items-center gap-2 mb-10">
          <Lock className="w-5 h-5 text-accent" />
          <h1 className="font-sans font-black text-3xl text-charcoal tracking-tight uppercase">Secure Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Checkout Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Shipping */}
            <div className="bg-white p-8 rounded-3xl border border-border/40 shadow-sm">
              <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-border/60">
                <Truck className="w-5 h-5 text-accent" />
                <h2 className="text-sm font-bold tracking-widest uppercase text-charcoal">1. Shipping Address</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">First Name</label>
                  <input type="text" className="w-full" placeholder="John" required />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">Last Name</label>
                  <input type="text" className="w-full" placeholder="Doe" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">Street Address</label>
                  <input type="text" className="w-full" placeholder="123 Main St, Apt 4B" required />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">City</label>
                  <input type="text" className="w-full" placeholder="Lahore" required />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">Phone Number</label>
                  <input type="tel" className="w-full" placeholder="+92 300 1234567" required />
                </div>
              </div>
            </div>

            {/* Step 2: Escrow */}
            <div className="bg-white p-8 rounded-3xl border border-border/40 shadow-sm">
              <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <Wallet className="w-5 h-5 text-accent" />
                  <h2 className="text-sm font-bold tracking-widest uppercase text-charcoal">2. Escrow Payment</h2>
                </div>
                <div className="flex items-center gap-1 text-verified">
                  <Lock className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Secured</span>
                </div>
              </div>

              <div className="space-y-3">
                <label 
                  onClick={() => setPaymentMethod('wallet')}
                  className={`
                    flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all duration-300
                    ${paymentMethod === 'wallet' 
                      ? 'border-accent bg-accent-ultralight/30 shadow-sm' 
                      : 'border-border/60 hover:border-charcoal'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${paymentMethod === 'wallet' ? 'border-accent' : 'border-border'}`}>
                      {paymentMethod === 'wallet' && <div className="w-2.5 h-2.5 bg-accent rounded-full animate-scale-in" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-charcoal uppercase tracking-wide">Thrift Kro Wallet</p>
                      <p className="text-[11px] text-text-muted mt-0.5 font-medium">Available Balance: Rs. 42,300</p>
                    </div>
                  </div>
                  <Wallet className={`w-5 h-5 ${paymentMethod === 'wallet' ? 'text-accent' : 'text-charcoal/30'}`} />
                </label>
                
                <label 
                  onClick={() => setPaymentMethod('card')}
                  className={`
                    flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all duration-300
                    ${paymentMethod === 'card' 
                      ? 'border-accent bg-accent-ultralight/30 shadow-sm' 
                      : 'border-border/60 hover:border-charcoal'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${paymentMethod === 'card' ? 'border-accent' : 'border-border'}`}>
                      {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-accent rounded-full animate-scale-in" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-charcoal uppercase tracking-wide">Credit / Debit Card</p>
                      <p className="text-[11px] text-text-muted mt-0.5 font-medium">Visa, Mastercard, PayPak</p>
                    </div>
                  </div>
                  <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-accent' : 'text-charcoal/30'}`} />
                </label>
              </div>
            </div>

            <button className="btn-primary w-full py-4 text-xs tracking-widest flex items-center justify-center gap-2 shadow-md">
              <Lock className="w-4 h-4" /> Pay Rs. {total.toLocaleString()} to Escrow
            </button>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-3xl border border-border/40 shadow-sm sticky top-32">
              <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-text-secondary mb-6 border-b border-border/60 pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto pr-2 scrollbar-hide">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 p-2 hover:bg-surface rounded-2xl transition-colors duration-200">
                    <div className="w-16 h-20 bg-surface rounded-xl overflow-hidden shrink-0 border border-border/30">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-[12px] font-bold text-charcoal leading-snug uppercase tracking-wide line-clamp-1">{item.name}</p>
                      <p className="text-[10px] font-extrabold text-accent uppercase tracking-wider mt-0.5">{item.brand || item.seller}</p>
                      <p className="text-[11px] text-text-muted mt-1 font-medium">Size: {item.size}</p>
                      <p className="text-sm font-bold text-charcoal mt-1">Rs. {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/60 pt-5 space-y-3 mb-6 text-sm font-medium text-text-secondary">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-charcoal font-bold">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Escrow Fee (2%)</span>
                  <span className="text-charcoal font-bold">Rs. {escrowFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-charcoal font-bold">Rs. 500</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end border-t border-border/60 pt-5 mb-6">
                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-0.5">Total</span>
                <span className="text-2xl font-black text-accent">Rs. {total.toLocaleString()}</span>
              </div>

              <div className="p-4 bg-accent-ultralight border border-accent/10 flex gap-3 rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-text-secondary font-medium">
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
