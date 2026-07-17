import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`toggle-switch ${on ? 'on' : 'off'}`}
      aria-pressed={on}
    />
  );
}

const defaultPrefs = {
  orderUpdates: true,
  priceDrops: true,
  newArrivals: false,
  messages: true,
  promotions: false,
};

export default function BuyerNotifications() {
  const [prefs, setPrefs] = useState(defaultPrefs);

  const toggle = (key) => setPrefs(prev => ({ ...prev, [key]: !prev[key] }));

  const rows = [
    ['orderUpdates', 'Order updates', 'Shipping & delivery alerts'],
    ['priceDrops', 'Price drops', 'When wishlisted items drop in price'],
    ['newArrivals', 'New arrivals', 'Fresh drops in your favorite categories'],
    ['messages', 'Messages', 'Chats from sellers'],
    ['promotions', 'Promotions', 'Deals & discount campaigns'],
  ];

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
          Notifications
        </h1>

        <div className="space-y-3">
          {rows.map(([key, label, desc]) => (
            <div
              key={key}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white"
              style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.06)' }}
            >
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: '#1A1108' }}>
                  {label}
                </p>
                <p className="text-xs" style={{ color: 'rgba(26,17,8,0.5)' }}>
                  {desc}
                </p>
              </div>
              <Toggle on={prefs[key]} onChange={() => toggle(key)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
