import { useState } from 'react';

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`toggle-switch ${on ? 'on' : 'off'}`}
      aria-pressed={on}
    />
  );
}

export default function SellerNotifications() {
  const [prefs, setPrefs] = useState({
    newOrders: true,
    messages: true,
    lowStock: true,
    priceOffers: false,
    promotions: false,
    weeklyReport: true
  });

  const toggle = (key) => setPrefs(prev => ({ ...prev, [key]: !prev[key] }));

  const rows = [
    ["newOrders", "New orders", "When a buyer places an order"],
    ["messages", "Messages", "New chats from buyers"],
    ["lowStock", "Low stock alerts", "When items run low"],
    ["priceOffers", "Price offers", "When buyers make an offer"],
    ["promotions", "Promotions", "Platform deals & campaigns"],
    ["weeklyReport", "Weekly report", "Your shop's performance summary"],
  ];

  return (
    <div className="p-6 sm:p-10 max-w-2xl mx-auto animate-fade-in">
      <div className="space-y-3">
        {rows.map(([key, label, desc]) => (
          <div
            key={key}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white"
            style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}
          >
            <div className="flex-1">
              <p className="font-bold text-sm" style={{ color: '#1A1108' }}>
                {label}
              </p>
              <p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>
                {desc}
              </p>
            </div>
            <Toggle on={prefs[key]} onChange={() => toggle(key)} />
          </div>
        ))}
      </div>
    </div>
  );
}
