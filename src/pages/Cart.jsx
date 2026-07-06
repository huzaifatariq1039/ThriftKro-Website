import { Link } from 'react-router-dom';
import { Trash2, ShieldCheck, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

export default function Cart() {
  const cartItems = [products[0], products[1]];
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const escrowFee = Math.round(subtotal * 0.02);
  const shipping = 500;
  const total = subtotal + escrowFee + shipping;

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-[1000px] mx-auto px-6 sm:px-12">
        
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight mb-2">Shopping Bag</h1>
        <p className="text-[13px] text-text-secondary mb-12">2 items eligible for Escrow Protection</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Cart Items List */}
          <div className="lg:col-span-7">
            <div className="border-t border-border">
              {cartItems.map((item) => (
                <div key={item.id} className="py-8 flex gap-6 border-b border-border">
                  <div className="w-24 h-32 bg-surface shrink-0 group">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link to={`/product/${item.id}`} className="text-sm font-medium text-charcoal hover:text-text-muted transition-colors">
                          {item.name}
                        </Link>
                        <button className="text-text-muted hover:text-charcoal transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] font-bold tracking-widest text-text-muted uppercase mt-1">
                        {item.brand || item.seller}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex gap-4 text-[12px] text-text-secondary mb-3">
                        <span>Size: {item.size}</span>
                        <span>Cond: {item.condition}</span>
                      </div>
                      <p className="text-sm font-medium text-charcoal">Rs. {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Minimal Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-surface/50 p-8 sticky top-32">
              <h2 className="text-xs font-bold tracking-[0.1em] uppercase text-charcoal mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>Subtotal</span>
                  <span className="text-charcoal">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>Escrow Fee (2%)</span>
                  <span className="text-charcoal">Rs. {escrowFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>Shipping</span>
                  <span className="text-charcoal">Rs. {shipping.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="border-t border-border pt-6 mb-8 flex justify-between items-end">
                <span className="text-sm font-bold text-charcoal">Total</span>
                <span className="text-xl font-medium text-charcoal">Rs. {total.toLocaleString()}</span>
              </div>

              <Link to="/checkout" className="btn-primary w-full text-center py-4 text-xs tracking-widest mb-6">
                Proceed to Checkout
              </Link>
              
              <div className="flex items-start gap-3 text-text-secondary">
                <ShieldCheck className="w-4 h-4 text-charcoal shrink-0" />
                <p className="text-[11px] leading-relaxed">
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
