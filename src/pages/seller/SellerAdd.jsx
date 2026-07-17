import { useState } from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SellerAdd() {
  const navigate = useNavigate();
  const [f, setF] = useState({
    name: '', brand: '', price: '', condition: 'Excellent', size: '', category: 'Shoes', desc: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate publish
    navigate('/seller/listings');
  };

  return (
    <div className="p-6 sm:p-10 max-w-3xl mx-auto animate-fade-in">
      
      {/* ─── Photo Upload Row ─── */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
        {[0, 1, 2].map(i => (
          <button
            key={i}
            className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 bg-white transition-all hover:bg-orange-50/50"
            style={{
              boxShadow: "0 0 0 1.5px dashed rgba(26,17,8,0.15)",
              border: "1.5px dashed rgba(26,17,8,0.2)"
            }}
          >
            <Upload size={24} style={{ color: '#FF5C00' }} />
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "rgba(26,17,8,0.5)" }}>
              {i === 0 ? "Main photo" : "Add photo"}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2" style={{ color: 'rgba(26,17,8,0.4)', fontFamily: "'JetBrains Mono', monospace" }}>
            Item name
          </label>
          <input
            className="w-full"
            value={f.name}
            onChange={e => setF({ ...f, name: e.target.value })}
            placeholder="e.g. Air Jordan 1 Retro"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2" style={{ color: 'rgba(26,17,8,0.4)', fontFamily: "'JetBrains Mono', monospace" }}>
              Brand
            </label>
            <input
              className="w-full"
              value={f.brand}
              onChange={e => setF({ ...f, brand: e.target.value })}
              placeholder="Nike"
              required
            />
          </div>
          <div>
            <label className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2" style={{ color: 'rgba(26,17,8,0.4)', fontFamily: "'JetBrains Mono', monospace" }}>
              Price (PKR)
            </label>
            <input
              className="w-full"
              value={f.price}
              onChange={e => setF({ ...f, price: e.target.value })}
              placeholder="2499"
              inputMode="numeric"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2" style={{ color: 'rgba(26,17,8,0.4)', fontFamily: "'JetBrains Mono', monospace" }}>
              Category
            </label>
            <select
              className="w-full"
              value={f.category}
              onChange={e => setF({ ...f, category: e.target.value })}
            >
              {["Shoes", "Vintage", "Shirts", "Jackets", "Bags", "Accessories"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2" style={{ color: 'rgba(26,17,8,0.4)', fontFamily: "'JetBrains Mono', monospace" }}>
              Condition
            </label>
            <select
              className="w-full"
              value={f.condition}
              onChange={e => setF({ ...f, condition: e.target.value })}
            >
              {["Excellent", "Good", "Fair"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2" style={{ color: 'rgba(26,17,8,0.4)', fontFamily: "'JetBrains Mono', monospace" }}>
              Size
            </label>
            <input
              className="w-full"
              value={f.size}
              onChange={e => setF({ ...f, size: e.target.value })}
              placeholder="UK 9"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2" style={{ color: 'rgba(26,17,8,0.4)', fontFamily: "'JetBrains Mono', monospace" }}>
            Description
          </label>
          <textarea
            className="w-full min-h-[120px] resize-none py-3"
            value={f.desc}
            onChange={e => setF({ ...f, desc: e.target.value })}
            placeholder="Tell buyers about the condition, fit & story…"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl font-extrabold text-white mt-4 transition-transform hover:-translate-y-0.5"
          style={{ background: '#FF5C00', boxShadow: '0 8px 20px rgba(255,92,0,0.2)' }}
        >
          Publish Listing
        </button>
      </form>
    </div>
  );
}
