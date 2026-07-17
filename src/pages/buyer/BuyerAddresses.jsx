import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Plus } from 'lucide-react';

const initialAddresses = [
  { id: 1, label: 'Home', kind: 'Residential', line: '123 Main St, Apt 4B, Gulberg III, Lahore', isDefault: true },
  { id: 2, label: 'Office', kind: 'Commercial', line: 'Floor 5, Arfa Tower, Ferozepur Road, Lahore', isDefault: false },
];

export default function BuyerAddresses() {
  const [addresses, setAddresses] = useState(initialAddresses);

  const setDefault = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
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
          Addresses
        </h1>

        <div className="space-y-4">
          {addresses.map(a => (
            <div
              key={a.id}
              className="p-4 rounded-2xl bg-white flex items-start gap-3"
              style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.06)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: '#FFF3E0' }}
              >
                <MapPin size={18} style={{ color: '#FF5C00' }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold" style={{ color: '#1A1108' }}>{a.label}</p>
                  {a.isDefault && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: '#E8F5E9', color: '#2E7D32' }}
                    >
                      Default
                    </span>
                  )}
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: '#F2EFE9', color: 'rgba(26,17,8,0.6)' }}
                  >
                    {a.kind}
                  </span>
                </div>
                <p className="text-sm mt-1" style={{ color: 'rgba(26,17,8,0.6)' }}>
                  {a.line}
                </p>
              </div>
              {!a.isDefault && (
                <button
                  onClick={() => setDefault(a.id)}
                  className="text-xs font-bold shrink-0"
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
            <Plus size={16} /> Add new address
          </button>
        </div>
      </div>
    </div>
  );
}
