import { Link } from 'react-router-dom';
import { ShieldCheck, Heart } from 'lucide-react';
import { useState } from 'react';

export default function ProductCard({ product, index = 0 }) {
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group animate-fade-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image container */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface mb-3.5 elevation-1 card-hover">
          {/* Shimmer placeholder */}
          {!imageLoaded && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-surface via-white to-surface bg-[length:200%_100%]"
              style={{ animation: 'shimmer 1.5s infinite' }}
            />
          )}

          <img
            src={product.image}
            alt={product.name}
            className={`
              w-full h-full object-cover img-zoom
              transition-opacity duration-500
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Top row — badge + wishlist */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            {product.verified && (
              <div className="flex items-center gap-1.5 px-2.5 py-[6px] bg-white/95 backdrop-blur-md rounded-lg elevation-1">
                <ShieldCheck className="w-3.5 h-3.5 text-verified" />
                <span className="text-[10px] font-bold text-charcoal tracking-wide uppercase">
                  Verified
                </span>
              </div>
            )}

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setLiked(!liked);
              }}
              className={`
                p-2 rounded-full backdrop-blur-md transition-all duration-200
                sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0
                ${liked
                  ? 'bg-red-50 text-red-500 !opacity-100 !translate-y-0'
                  : 'bg-white/90 text-charcoal/40 hover:text-red-500'
                }
              `}
              aria-label="Add to wishlist"
            >
              <Heart className={`w-4 h-4 transition-transform duration-200 hover:scale-110 ${liked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Bottom — condition + discount */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-md">
              <span className="text-[10px] font-bold text-charcoal tracking-wider">
                {product.condition}
              </span>
            </div>
            {discount > 0 && (
              <div className="px-2 py-1 bg-charcoal/80 backdrop-blur-md rounded-md">
                <span className="text-[10px] font-bold text-white">
                  -{discount}%
                </span>
              </div>
            )}
          </div>


        </div>
      </Link>

      {/* Product info */}
      <div className="px-1">
        {/* Brand/Seller */}
        <p className="text-[11px] font-semibold text-text-muted tracking-[0.08em] uppercase mb-0.5">
          {product.brand || product.seller}
        </p>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-[13px] font-medium text-charcoal leading-snug mb-1.5 group-hover:text-charcoal-muted transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-bold text-charcoal">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-[12px] text-text-muted line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Seller line */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-[18px] h-[18px] rounded-full bg-accent/30 flex items-center justify-center ring-1 ring-accent/20">
            <span className="text-[7px] font-bold text-charcoal">
              {product.sellerAvatar}
            </span>
          </div>
          <span className="text-[11px] text-text-muted">
            {product.seller}
          </span>
        </div>
      </div>
    </div>
  );
}
