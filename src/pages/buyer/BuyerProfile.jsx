import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';

export default function BuyerProfile() {
  const [form, setForm] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+92 300 1234567',
    gender: 'Male',
  });

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

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
          Edit Profile
        </h1>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold"
            style={{ background: '#FFF3E0', color: '#FF5C00' }}
          >
            JD
          </div>
          <button
            className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1.5"
            style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.12)', color: '#1A1108' }}
          >
            <Camera size={14} /> Change photo
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 max-w-md">
          {[
            ['Full name', 'name', 'text'],
            ['Email', 'email', 'email'],
            ['Phone', 'phone', 'tel'],
            ['Gender', 'gender', 'text'],
          ].map(([label, key, type]) => (
            <div key={key}>
              <label
                className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2"
                style={{
                  color: 'rgba(26,17,8,0.4)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {label}
              </label>
              <input
                type={type}
                value={form[key]}
                onChange={e => update(key, e.target.value)}
                className="w-full"
              />
            </div>
          ))}

          <button
            className="w-full py-4 rounded-xl font-extrabold text-white mt-4"
            style={{ background: '#FF5C00' }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
