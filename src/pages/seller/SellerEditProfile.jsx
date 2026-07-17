import { useState } from 'react';
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SellerEditProfile() {
  const navigate = useNavigate();
  const [f, setF] = useState({
    name: 'StreetwearHub',
    email: 'seller@streetwear.pk',
    phone: '+92 300 1234567',
    bio: 'Curated vintage and premium streetwear. Verified authenticity.'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/seller/profile');
  };

  return (
    <div className="p-6 sm:p-10 max-w-2xl mx-auto animate-fade-in">
      
      {/* Avatar */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center font-extrabold text-2xl shrink-0"
          style={{ background: '#FFD60A', color: '#1A1108' }}
        >
          {f.name[0] || 'S'}
        </div>
        <button
          className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 transition-colors hover:bg-black/5"
          style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.12)", color: '#1A1108' }}
        >
          <Camera size={14} /> Change photo
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ['Full name', 'name', 'text'],
          ['Email', 'email', 'email'],
          ['Phone', 'phone', 'tel']
        ].map(([label, key, type]) => (
          <div key={key}>
            <label
              className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2"
              style={{ color: 'rgba(26,17,8,0.4)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              {label}
            </label>
            <input
              type={type}
              className="w-full"
              value={f[key]}
              onChange={e => setF({ ...f, [key]: e.target.value })}
              required
            />
          </div>
        ))}
        
        <div>
          <label
            className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2"
            style={{ color: 'rgba(26,17,8,0.4)', fontFamily: "'JetBrains Mono', monospace" }}
          >
            Bio
          </label>
          <textarea
            className="w-full min-h-[90px] resize-none py-3"
            value={f.bio}
            onChange={e => setF({ ...f, bio: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl font-extrabold text-white mt-4 transition-transform hover:-translate-y-0.5"
          style={{ background: '#FF5C00', boxShadow: '0 8px 20px rgba(255,92,0,0.2)' }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
