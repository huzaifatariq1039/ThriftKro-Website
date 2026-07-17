import { Link } from 'react-router-dom';
import { PlusCircle, Eye, Pencil } from 'lucide-react';
import { products } from '../../data/products';

export default function SellerListings() {
  // Mock seller listings for UI demonstration
  const sellerListings = [
    { ...products[0], status: 'Active', views: 342, stock: 3 },
    { ...products[1], status: 'Pending', views: 0, stock: 1 },
    { ...products[2], status: 'Active', views: 89, stock: 5 },
    { ...products[3], status: 'Active', views: 12, stock: 0 },
  ];

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <span
          className="text-[10px] font-bold tracking-[0.1em] uppercase"
          style={{
            color: 'rgba(26,17,8,0.4)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {sellerListings.length} items · {sellerListings.filter(l => l.status === 'Active').length} active
        </span>
        <Link
          to="/seller/add"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-extrabold text-white text-sm transition-all hover:opacity-90 hover:scale-105"
          style={{ background: '#FF5C00' }}
        >
          <PlusCircle size={16} /> Add item
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {sellerListings.map(l => (
          <div
            key={l.id}
            className="flex gap-4 p-4 rounded-2xl bg-white transition-transform hover:-translate-y-1"
            style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06), 0 4px 20px rgba(0,0,0,0.02)" }}
          >
            <img
              src={l.image}
              alt={l.name}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                  style={{
                    background: l.status === "Active" ? "#E8F5E9" : "#FFF8E1",
                    color: l.status === "Active" ? "#2E7D32" : "#F9A825"
                  }}
                >
                  {l.status}
                </span>
                <span
                  className="text-xs flex items-center gap-1"
                  style={{ color: "rgba(26,17,8,0.5)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <Eye size={12} /> {l.views}
                </span>
              </div>
              
              <p className="font-bold text-[15px] truncate" style={{ color: '#1A1108' }}>
                {l.name}
              </p>
              
              <p className="font-extrabold mt-1" style={{ color: '#FF5C00' }}>
                Rs. {l.price.toLocaleString()}
              </p>
              
              <p className="text-xs mt-1" style={{ color: "rgba(26,17,8,0.5)" }}>
                Stock: {l.stock}
              </p>
            </div>
            
            <button
              className="self-start w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-black/5"
              style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.12)" }}
              title="Edit listing"
            >
              <Pencil size={14} style={{ color: '#1A1108' }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
