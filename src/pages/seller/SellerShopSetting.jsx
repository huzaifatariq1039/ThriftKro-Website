import { useState } from 'react';
import { Store, MapPin, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SellerShopSetting() {
  const navigate = useNavigate();
  const [f, setF] = useState({
    shopName: 'StreetwearHub',
    location: 'Lahore, PK',
    shipping: 'Nationwide (Rs. 200)'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/seller/profile');
  };

  return (
    <div className="p-6 sm:p-10 max-w-2xl mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label
            className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2"
            style={{ color: 'rgba(26,17,8,0.4)', fontFamily: "'JetBrains Mono', monospace" }}
          >
            Shop name
          </label>
          <div className="relative">
            <Store
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "rgba(26,17,8,0.4)" }}
            />
            <input
              className="w-full pl-11"
              value={f.shopName}
              onChange={e => setF({ ...f, shopName: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label
            className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2"
            style={{ color: 'rgba(26,17,8,0.4)', fontFamily: "'JetBrains Mono', monospace" }}
          >
            Location
          </label>
          <div className="relative">
            <MapPin
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "rgba(26,17,8,0.4)" }}
            />
            <input
              className="w-full pl-11"
              value={f.location}
              onChange={e => setF({ ...f, location: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label
            className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2"
            style={{ color: 'rgba(26,17,8,0.4)', fontFamily: "'JetBrains Mono', monospace" }}
          >
            Shipping
          </label>
          <div className="relative">
            <Truck
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "rgba(26,17,8,0.4)" }}
            />
            <input
              className="w-full pl-11"
              value={f.shipping}
              onChange={e => setF({ ...f, shipping: e.target.value })}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl font-extrabold text-white mt-4 transition-transform hover:-translate-y-0.5"
          style={{ background: '#FF5C00', boxShadow: '0 8px 20px rgba(255,92,0,0.2)' }}
        >
          Save Shop Settings
        </button>
      </form>
    </div>
  );
}
