import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Plus } from 'lucide-react';

const initialCards = [
  { id: 1, brand: 'Visa', last4: '4242', exp: '08/28', isDefault: true },
  { id: 2, brand: 'Mastercard', last4: '8821', exp: '12/27', isDefault: false },
];

export default function BuyerPayments() {
  const [cards, setCards] = useState(initialCards);

  const setDefault = (id) => {
    setCards(prev => prev.map(c => ({ ...c, isDefault: c.id === id })));
  };

  return (
    <div className="min-h-screen pt-[68px]" style={{ background: '#FBF9F8' }}>
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-8 animate-fade-in">
        <Link
          to="/account"
          className="flex items-center gap-2 text-sm font-semibold mb-4"
          style={{ color: 'rgba(26,17,8,0.6)' }}
        >
          <ArrowLeft size={16} /> Back
        </Link>

        <h1
          className="font-extrabold mb-8"
          style={{ fontSize: 30, letterSpacing: '-0.03em', color: '#1A1108' }}
        >
          Payment Methods
        </h1>

        <div className="space-y-4">
          {cards.map(c => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-white flex items-center gap-3"
              style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.06)' }}
            >
              <div
                className="w-12 h-9 rounded-lg flex items-center justify-center"
                style={{ background: '#1A1108' }}
              >
                <CreditCard size={18} color="white" />
              </div>
              <div className="flex-1">
                <p className="font-bold" style={{ color: '#1A1108' }}>
                  {c.brand} •••• {c.last4}
                </p>
                <p className="text-xs" style={{ color: 'rgba(26,17,8,0.5)' }}>
                  Expires {c.exp}
                </p>
              </div>
              {c.isDefault ? (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: '#E8F5E9', color: '#2E7D32' }}
                >
                  Default
                </span>
              ) : (
                <button
                  onClick={() => setDefault(c.id)}
                  className="text-xs font-bold"
                  style={{ color: '#FF5C00' }}
                >
                  Set default
                </button>
              )}
            </div>
          ))}

          <button
            className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2"
            style={{ boxShadow: '0 0 0 1.5px rgba(26,17,8,0.15)', color: '#1A1108' }}
          >
            <Plus size={16} /> Add new card
          </button>
        </div>
      </div>
    </div>
  );
}
