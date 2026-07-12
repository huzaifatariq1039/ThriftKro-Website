import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Award, Ruler, Heart, ShoppingBag } from 'lucide-react';
import VTONModal from '../components/VTONModal';
import { products } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const [vtonOpen, setVtonOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [liked, setLiked] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return null;

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const activeSize = selectedSize || product.size;
  const conditionScore = product.conditionScore || 90;

  // Condition bar gradient color
  const getConditionColor = (score) => {
    if (score >= 80) return 'from-emerald-400 to-emerald-500';
    if (score >= 60) return 'from-amber-400 to-amber-500';
    return 'from-rose-400 to-rose-500';
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 animate-fade-in">
        
        {/* Breadcrumb */}
        <div className="mb-8 text-[11px] font-extrabold tracking-[0.15em] uppercase text-text-muted flex items-center gap-2">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link to="/department/men" className="hover:text-accent transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column — Image Gallery */}
          <div className="lg:col-span-7">
            <div className="aspect-[3/4] bg-white rounded-3xl overflow-hidden border border-border/40 relative group shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-8 sm:p-12 transition-transform duration-1000 group-hover:scale-105"
              />
              {product.verified && (
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 flex items-center gap-2 rounded-2xl shadow-sm border border-border/40">
                  <ShieldCheck className="w-4 h-4 text-verified" />
                  <span className="text-[10px] font-bold text-charcoal uppercase tracking-wider">AI Verified Authentic</span>
                </div>
              )}
              {/* Wishlist button */}
              <button
                onClick={() => setLiked(!liked)}
                className={`absolute top-6 right-6 p-3 rounded-xl backdrop-blur-md transition-all duration-200 border ${liked ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white/90 border-border/40 text-charcoal/40 hover:text-red-500'}`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              </button>
            </div>
            {/* Thumbnail dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {[0, 1, 2, 3].map((i) => (
                <button key={i} className={`w-2 h-2 rounded-full transition-all ${i === 0 ? 'bg-accent w-5' : 'bg-border hover:bg-charcoal/30'}`} />
              ))}
            </div>
          </div>

          {/* Right Column — Details Panel */}
          <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border border-border/40 shadow-sm">
            
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-accent mb-3">
              {product.brand || product.seller}
            </p>
            
            <h1 className="font-sans font-black text-3xl sm:text-4xl text-charcoal tracking-tight mb-4 uppercase leading-none">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-3 mb-8">
              <span className="text-2xl font-extrabold text-charcoal">Rs. {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-text-muted line-through mb-1">Rs. {product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Sizes Selection widget */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5" /> Size in Focus
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Selected: {activeSize}</span>
              </div>
              <div className="flex gap-2.5">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`
                      w-11 h-11 text-xs font-bold rounded-xl border flex items-center justify-center transition-all duration-200
                      ${activeSize === sz 
                        ? 'bg-charcoal border-charcoal text-white shadow-md' 
                        : 'border-border/60 hover:border-charcoal text-charcoal hover:bg-surface'}
                    `}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Scoring visual meter */}
            <div className="mb-8 p-5 bg-surface rounded-2xl border border-border/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-accent" /> Condition Score
                </span>
                <span className="text-xs font-extrabold text-charcoal">{conditionScore}/100 ({product.condition})</span>
              </div>
              <div className="w-full h-2.5 bg-border/40 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getConditionColor(conditionScore)} transition-all duration-700 rounded-full`}
                  style={{ width: `${conditionScore}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed mb-8 font-medium">
              {product.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3.5 mb-8">
              <button className="btn-primary w-full py-4 text-xs tracking-widest shadow-md flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Add to Bag — Escrow Secured
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="btn-outline py-4 text-xs tracking-wider">
                  Make Offer
                </button>
                <button 
                  onClick={() => setVtonOpen(true)}
                  className="btn-accent py-4 text-xs tracking-wider flex items-center justify-center gap-1.5 shadow-sm"
                >
                  Virtual Try-On
                </button>
              </div>
            </div>

            {/* Escrow note */}
            <div className="flex items-start gap-3 p-4 bg-accent-ultralight rounded-2xl border border-accent/10">
              <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
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
