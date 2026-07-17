import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Heart, ShoppingBag, Camera, Star, Truck, Shield, Plus, Minus, Sparkles } from 'lucide-react';
import VTONModal from '../components/VTONModal';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const [vtonOpen, setVtonOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) return null;

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const [selectedSize, setSelectedSize] = useState(product.size);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const related = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen pt-[68px]" style={{ background: '#FBF9F8' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 animate-fade-in">

        {/* Back link */}
        <Link
          to="/marketplace"
          className="flex items-center gap-2 text-sm font-semibold mb-6"
          style={{ color: 'rgba(26,17,8,0.6)' }}
        >
          <ArrowLeft size={16} /> Back to discover
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ─── Image ─── */}
          <div
            className="relative rounded-[2rem] overflow-hidden"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
            {/* Heart */}
            <button
              onClick={() => setLiked(!liked)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white flex items-center justify-center"
              style={{ boxShadow: '0 6px 16px rgba(0,0,0,0.12)' }}
            >
              <Heart
                size={20}
                fill={liked ? '#FF5C00' : 'none'}
                style={{ color: liked ? '#FF5C00' : '#1A1108' }}
              />
            </button>
            {/* VTO button */}
            <button
              onClick={() => setVtonOpen(true)}
              className="absolute bottom-5 left-5 flex items-center gap-2 px-4 py-2.5 rounded-full font-extrabold text-sm"
              style={{ background: '#FFD60A', color: '#1A1108' }}
            >
              <Camera size={16} /> Try it on
            </button>
          </div>

          {/* ─── Details ─── */}
          <div>
            {/* Brand label */}
            <span
              className="text-[10px] font-bold tracking-[0.15em] uppercase"
              style={{
                color: 'rgba(26,17,8,0.4)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {(product.brand || product.seller).toUpperCase()} · {product.category.toUpperCase()}
            </span>

            {/* Name */}
            <h1
              className="font-extrabold mt-2"
              style={{
                fontSize: 'clamp(28px, 4vw, 38px)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#1A1108',
              }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mt-4">
              <span className="font-extrabold" style={{ fontSize: 30, color: '#FF5C00' }}>
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg line-through" style={{ color: 'rgba(26,17,8,0.35)' }}>
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
              {discount > 0 && (
                <span
                  className="px-2 py-1 rounded-full text-xs font-extrabold"
                  style={{
                    background: '#FFD60A',
                    color: '#1A1108',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  -{discount}%
                </span>
              )}
            </div>

            {/* Info chips */}
            <div className="flex gap-3 mt-6">
              {[
                ['Condition', product.condition],
                ['Size', product.size],
                ['Category', product.category],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex-1 rounded-2xl p-3 bg-white text-center"
                  style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.08)' }}
                >
                  <span
                    className="text-[10px] font-bold tracking-[0.1em] uppercase block"
                    style={{
                      color: 'rgba(26,17,8,0.4)',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {label}
                  </span>
                  <p className="font-bold text-sm mt-1" style={{ color: '#1A1108' }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Size selector */}
            <div className="mt-6">
              <span
                className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2"
                style={{
                  color: 'rgba(26,17,8,0.4)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Select size
              </span>
              <div className="flex gap-2">
                {sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                    style={{
                      background: selectedSize === sz ? '#1A1108' : 'white',
                      color: selectedSize === sz ? 'white' : '#1A1108',
                      boxShadow: '0 0 0 1px rgba(26,17,8,0.1)',
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mt-6">
              <span
                className="text-[10px] font-bold tracking-[0.1em] uppercase"
                style={{
                  color: 'rgba(26,17,8,0.4)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Quantity
              </span>
              <div
                className="flex items-center gap-3 rounded-full px-2 py-1 bg-white"
                style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.1)' }}
              >
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: '#F2EFE9' }}
                >
                  <Minus size={15} />
                </button>
                <span
                  className="font-bold w-5 text-center"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: '#F2EFE9' }}
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* Seller card */}
            <div
              className="flex items-center gap-3 mt-6 p-4 rounded-2xl bg-white"
              style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.08)' }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: '#FFF3E0' }}
              >
                <Star size={18} fill="#FF5C00" style={{ color: '#FF5C00' }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: '#1A1108' }}>
                  {product.seller}
                </p>
                <p className="text-xs" style={{ color: 'rgba(26,17,8,0.5)' }}>
                  {product.rating} rating · Verified seller
                </p>
              </div>
              <Shield size={18} style={{ color: '#FF5C00' }} />
            </div>

            {/* Description */}
            <p className="text-sm mt-6 leading-relaxed" style={{ color: 'rgba(26,17,8,0.6)' }}>
              {product.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 py-4 rounded-xl font-extrabold transition-all hover:opacity-80"
                style={{
                  boxShadow: '0 0 0 1.5px rgba(26,17,8,0.15)',
                  color: '#1A1108',
                }}
              >
                Add to Cart
              </button>
              <Link
                to="/cart"
                className="flex-1 py-4 rounded-xl font-extrabold text-white text-center transition-all hover:opacity-90"
                style={{ background: '#FF5C00' }}
              >
                Buy Now
              </Link>
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-2 mt-4 text-xs" style={{ color: 'rgba(26,17,8,0.5)' }}>
              <Truck size={14} /> Delivery in 2-3 days · <Shield size={14} /> 7-day buyer protection
            </div>
          </div>
        </div>

        {/* ─── Related Products ─── */}
        <div className="mt-16">
          <h2
            className="font-extrabold mb-6"
            style={{ fontSize: 24, letterSpacing: '-0.02em', color: '#1A1108' }}
          >
            You might also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>

      <VTONModal isOpen={vtonOpen} onClose={() => setVtonOpen(false)} productName={product.name} />
    </div>
  );
}
