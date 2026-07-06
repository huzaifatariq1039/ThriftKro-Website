import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Plus, Minus, ArrowRight } from 'lucide-react';
import VTONModal from '../components/VTONModal';
import { products } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const [vtonOpen, setVtonOpen] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return null;

  return (
    <div className="min-h-screen bg-white pt-24 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Breadcrumb */}
        <div className="mb-10 text-[11px] font-bold tracking-[0.1em] uppercase text-text-muted flex gap-2">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left — Image Gallery */}
          <div>
            <div className="aspect-[3/4] bg-surface relative overflow-hidden group cursor-crosshair">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right — Details */}
          <div className="flex flex-col max-w-md pt-4">
            
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-text-muted mb-4">
              {product.brand || product.seller}
            </p>
            
            <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-3 mb-10">
              <span className="text-xl font-medium text-charcoal">Rs. {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-text-muted line-through mb-0.5">Rs. {product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Editorial Specs List */}
            <div className="border-t border-b border-border py-6 space-y-3 mb-10">
              {[
                { label: 'Size', value: product.size },
                { label: 'Condition', value: `${product.condition} (${product.conditionScore}/100)` },
                { label: 'Verified', value: product.verified ? 'AI Authenticated' : 'Pending' },
              ].map((spec) => (
                <div key={spec.label} className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">{spec.label}</span>
                  <span className="font-medium text-charcoal">{spec.value}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-text-secondary leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Action Buttons - Fixed overlap with proper gaps */}
            <div className="flex flex-col gap-4 mb-10">
              <button className="btn-primary w-full py-4 text-sm tracking-[0.1em]">
                Buy Now — Escrow Secured
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="btn-outline py-4 text-xs tracking-wider">
                  Make Offer
                </button>
                <button 
                  onClick={() => setVtonOpen(true)}
                  className="btn-accent py-4 text-xs tracking-wider flex items-center justify-center gap-2"
                >
                  Virtual Try-On
                </button>
              </div>
            </div>

            {/* Trust Note */}
            <div className="flex items-start gap-3 p-4 bg-surface rounded-sm">
              <ShieldCheck className="w-5 h-5 text-charcoal shrink-0" />
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Payment is held in secure escrow. The seller is not paid until you receive the item and verify its condition matches our AI scan.
              </p>
            </div>

          </div>
        </div>
      </div>

      <VTONModal isOpen={vtonOpen} onClose={() => setVtonOpen(false)} productName={product.name} />
    </div>
  );
}
