import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const orders = [
  {
    id: '#ORD-9921',
    name: 'Oversized Vintage Hoodie',
    img: '/images/hoodie.png',
    date: 'Oct 12, 2026',
    price: 4500,
    status: 'In Transit',
  },
  {
    id: '#ORD-9840',
    name: 'Retro Graphic Tee',
    img: '/images/tee.png',
    date: 'Sep 28, 2026',
    price: 2800,
    status: 'Delivered',
  },
  {
    id: '#ORD-9712',
    name: 'Vintage Earth-Tone Sneakers',
    img: '/images/sneakers.png',
    date: 'Sep 15, 2026',
    price: 9500,
    status: 'Delivered',
  },
];

export default function BuyerOrders() {
  const statusColor = (s) =>
    s === 'Delivered' ? '#2E7D32' : s === 'In Transit' ? '#FF5C00' : '#8A7E72';

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
          My Orders
        </h1>

        <div className="space-y-4">
          {orders.map(o => (
            <div
              key={o.id}
              className="flex gap-4 p-4 rounded-2xl bg-white"
              style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.06)' }}
            >
              <img
                src={o.img}
                alt={o.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: 'rgba(26,17,8,0.5)',
                    }}
                  >
                    {o.id}
                  </span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: statusColor(o.status) + '22',
                      color: statusColor(o.status),
                    }}
                  >
                    {o.status}
                  </span>
                </div>
                <p className="font-bold mt-1" style={{ color: '#1A1108' }}>
                  {o.name}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs" style={{ color: 'rgba(26,17,8,0.5)' }}>
                    {o.date}
                  </span>
                  <span className="font-extrabold" style={{ color: '#FF5C00' }}>
                    Rs. {o.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
