import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShieldCheck, ShoppingBag, Plus, Minus, ArrowLeft, Shield } from 'lucide-react';
import { products } from '../data/products';

export default function Cart() {
  const [cartItems, setCartItems] = useState([products[0], products[1]]);

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = cartItems.length ? 199 : 0;
  const total = subtotal + shipping;

  const pk = (n) => `Rs. ${n.toLocaleString()}`;

  return (
    <div className="min-h-screen pt-[68px]" style={{ background: '#FBF9F8' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 animate-fade-in">

        <h1
          className="font-extrabold mb-8"
          style={{ fontSize: 34, letterSpacing: '-0.03em', color: '#1A1108' }}
        >
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          /* ─── Empty State ─── */
          <div className="text-center py-24">
            <ShoppingBag
              size={48}
              style={{ color: 'rgba(26,17,8,0.2)' }}
              className="mx-auto mb-4"
            />
            <p className="font-bold text-lg" style={{ color: '#1A1108' }}>
              Your cart is empty
            </p>
            <p className="text-sm mb-6" style={{ color: 'rgba(26,17,8,0.5)' }}>
              Find something you love.
            </p>
            <Link
              to="/marketplace"
              className="inline-block px-6 py-3 rounded-full font-extrabold text-white"
              style={{ background: '#FF5C00' }}
            >
              Start shopping
            </Link>
          </div>
        ) : (
          /* ─── Cart Content ─── */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-2xl bg-white"
                  style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.06)' }}
                >
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover hover:opacity-80 transition-opacity"
                    />
                  </Link>
                  <div className="flex-1">
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase block"
                      style={{
                        color: 'rgba(26,17,8,0.5)',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {(item.brand || item.seller).toUpperCase()} · {item.condition}
                    </span>
                    <Link
                      to={`/product/${item.id}`}
                      className="font-bold block hover:opacity-70 transition-opacity"
                      style={{ color: '#1A1108' }}
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs" style={{ color: 'rgba(26,17,8,0.5)' }}>
                      Size {item.size} · {item.seller}
                    </p>
                    <p className="font-extrabold mt-2" style={{ color: '#FF5C00' }}>
                      {pk(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-rose-100"
                    style={{ background: '#FDECEA' }}
                  >
                    <Trash2 size={16} style={{ color: '#DC2626' }} />
                  </button>
                </div>
              ))}

              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 text-sm font-semibold mt-2"
                style={{ color: 'rgba(26,17,8,0.6)' }}
              >
                <ArrowLeft size={16} /> Continue shopping
              </Link>
            </div>

            {/* Summary */}
            <div
              className="rounded-2xl p-6 bg-white h-fit sticky top-24"
              style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.06)' }}
            >
              <h3 className="font-extrabold mb-4" style={{ color: '#1A1108' }}>
                Order Summary
              </h3>

              {[
                ['Subtotal', subtotal],
                ['Shipping', shipping],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between text-sm py-1.5"
                  style={{ color: 'rgba(26,17,8,0.6)' }}
                >
                  <span>{label}</span>
                  <span className="font-semibold" style={{ color: '#1A1108' }}>
                    {pk(value)}
                  </span>
                </div>
              ))}

              <div
                className="border-t my-3"
                style={{ borderColor: 'rgba(26,17,8,0.08)' }}
              />

              <div
                className="flex justify-between font-extrabold text-lg mb-5"
                style={{ color: '#1A1108' }}
              >
                <span>Total</span>
                <span style={{ color: '#FF5C00' }}>{pk(total)}</span>
              </div>

              <Link
                to="/checkout"
                className="w-full py-4 rounded-xl font-extrabold text-white text-center block"
                style={{ background: '#FF5C00' }}
              >
                Checkout · {pk(total)}
              </Link>

              <div
                className="flex items-center justify-center gap-2 mt-4 text-xs"
                style={{ color: 'rgba(26,17,8,0.5)' }}
              >
                <Shield size={14} /> Secure checkout · Buyer protection
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
