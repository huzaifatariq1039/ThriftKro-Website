import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, ArrowLeft } from 'lucide-react';
import { products } from '../../data/products';

export default function BuyerVto() {
  const [activeItem, setActiveItem] = useState(0);
  const shoeProducts = products.filter(p => p.category === 'Sneakers');
  const allVtoItems = shoeProducts.length > 0 ? shoeProducts : products.slice(0, 3);

  return (
    <div className="min-h-screen pt-[68px]" style={{ background: '#FBF9F8' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        <Link
          to="/marketplace"
          className="flex items-center gap-2 text-sm font-semibold mb-6"
          style={{ color: 'rgba(26,17,8,0.6)' }}
        >
          <ArrowLeft size={16} /> Back
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{ background: '#FFF3E0' }}
            >
              <Sparkles size={14} style={{ color: '#FF5C00' }} />
              <span className="text-xs font-bold" style={{ color: '#FF5C00' }}>
                AR TRY-ON
              </span>
            </div>

            <h1
              className="font-extrabold"
              style={{
                fontSize: 34,
                letterSpacing: '-0.03em',
                color: '#1A1108',
              }}
            >
              See it on your feet.
            </h1>
            <p
              className="text-sm mt-3 mb-6"
              style={{ color: 'rgba(26,17,8,0.55)' }}
            >
              Point your camera at your feet and our AR engine overlays the piece in real time.
            </p>

            <span
              className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-3"
              style={{
                color: 'rgba(26,17,8,0.4)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Choose a style
            </span>

            <div className="flex gap-3">
              {allVtoItems.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setActiveItem(i)}
                  className="rounded-2xl overflow-hidden transition-all"
                  style={{
                    boxShadow: `0 0 0 ${activeItem === i ? 3 : 1}px ${
                      activeItem === i ? '#FF5C00' : 'rgba(26,17,8,0.1)'
                    }`,
                  }}
                >
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-20 h-20 object-cover"
                  />
                </button>
              ))}
            </div>

            <button
              className="mt-8 flex items-center gap-2 px-6 py-3.5 rounded-full font-extrabold text-white"
              style={{ background: '#FF5C00' }}
            >
              <Camera size={18} /> Enable camera
            </button>
          </div>

          {/* Right — Camera Viewport */}
          <div
            className="rounded-[2rem] overflow-hidden relative flex items-center justify-center"
            style={{ background: '#1A1108', minHeight: 460 }}
          >
            {/* Dashed frame */}
            <div className="absolute inset-6 rounded-3xl border-2 border-dashed border-white/20" />

            {/* Foot oval */}
            <div className="w-56 h-32 rounded-[50%] border-2 border-white/30 flex items-center justify-center relative">
              {allVtoItems[activeItem] && (
                <img
                  src={allVtoItems[activeItem].image}
                  alt=""
                  className="w-32 h-32 object-contain drop-shadow-2xl"
                />
              )}
            </div>

            <span
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/50"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              POSITION YOUR FEET IN THE OVAL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
