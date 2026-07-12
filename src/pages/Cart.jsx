import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShieldCheck, ShoppingBag, Plus, Minus, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';

export default function Cart() {
  const [quantities, setQuantities] = useState({ [products[0].id]: 1, [products[1].id]: 1 });
  const cartItems = [products[0], products[1]];
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (quantities[item.id] || 1), 0);
  const escrowFee = Math.round(subtotal * 0.02);
  const shipping = 500;
  const total = subtotal + escrowFee + shipping;

  const updateQty = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-32 pb-24">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-12 animate-fade-in">
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-accent-ultralight flex items-center justify-center text-accent">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-sans font-black text-3xl text-charcoal tracking-tight uppercase">Shopping Bag</h1>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mt-0.5">{cartItems.length} items eligible for Escrow Protection</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-border/40 flex gap-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-24 h-32 bg-surface rounded-2xl overflow-hidden shrink-0 border border-border/30">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <Link to={`/product/${item.id}`} className="text-base font-bold text-charcoal hover:text-accent transition-colors line-clamp-1 uppercase tracking-wide">
                        {item.name}
                      </Link>
                      <button className="w-8 h-8 rounded-xl bg-surface hover:bg-rose-50 text-text-muted hover:text-rose-600 transition-colors flex items-center justify-center shrink-0 group">
                        <Trash2 className="w-4 h-4 transition-transform group-hover:scale-110" />
                      </button>
                    </div>
                    <p className="text-[10px] font-extrabold tracking-widest text-accent uppercase mt-1">
                      {item.brand || item.seller}
                    </p>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="flex gap-4 text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                        <span>Size: {item.size}</span>
                        <span>Cond: {item.condition}</span>
                      </div>
                      <p className="text-base font-extrabold text-charcoal">Rs. {(item.price * (quantities[item.id] || 1)).toLocaleString()}</p>
                    </div>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1 bg-surface rounded-xl border border-border/40 p-1">
                      <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-text-muted hover:text-charcoal transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-[13px] font-bold text-charcoal">{quantities[item.id] || 1}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-text-muted hover:text-charcoal transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link to="/marketplace" className="inline-flex items-center gap-2 text-[13px] font-semibold text-text-secondary hover:text-accent transition-colors mt-2">
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>

          {/* Sticky Summary Panel */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-3xl border border-border/40 shadow-sm sticky top-32">
              <h2 className="text-[11px] font-bold tracking-[0.15em] uppercase text-text-secondary mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span> Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm font-medium text-text-secondary">
                  <span>Subtotal</span>
                  <span className="text-charcoal font-bold">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-text-secondary">
                  <span>Escrow Fee (2%)</span>
                  <span className="text-charcoal font-bold">Rs. {escrowFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-text-secondary">
                  <span>Shipping</span>
                  <span className="text-charcoal font-bold">Rs. {shipping.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="border-t border-border pt-5 mb-6 flex justify-between items-end">
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-0.5">Total Amount</span>
                <span className="text-2xl font-black text-accent">Rs. {total.toLocaleString()}</span>
              </div>

              <Link to="/checkout" className="btn-primary w-full text-center py-4 text-xs tracking-widest mb-6 shadow-sm">
                Proceed to Checkout
              </Link>
              
              <div className="flex items-start gap-3 p-4 bg-accent-ultralight border border-accent/10 rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-text-secondary font-medium">
                  Escrow Protection active. The seller is not paid until you verify the item's condition.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
