import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
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
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image container */}
        <div
          className="relative rounded-3xl overflow-hidden mb-3"
          style={{
            background: 'white',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          }}
        >
          {/* Shimmer placeholder */}
          {!imageLoaded && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#F2EFE9] via-white to-[#F2EFE9] bg-[length:200%_100%]"
              style={{ animation: 'shimmer 1.5s infinite' }}
            />
          )}

          <img
            src={product.image}
            alt={product.name}
            className={`
              w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Discount badge — top left */}
          {discount > 0 && (
            <span
              className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-extrabold"
              style={{
                background: '#FFD60A',
                color: '#1A1108',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              -{discount}%
            </span>
          )}

          {/* Heart — top right */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLiked(!liked);
            }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            aria-label="Add to wishlist"
          >
            <Heart
              size={16}
              fill={liked ? '#FF5C00' : 'none'}
              style={{ color: liked ? '#FF5C00' : '#1A1108' }}
              className="transition-transform hover:scale-110"
            />
          </button>
        </div>
      </Link>

      {/* Product info */}
      <div className="px-0.5">
        {/* Brand in mono */}
        <p
          className="text-[10px] font-bold tracking-wider uppercase mb-0.5"
          style={{
            color: 'rgba(26,17,8,0.5)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {(product.brand || product.seller).toUpperCase()} · {product.condition}
        </p>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3
            className="text-sm font-bold leading-snug mb-1 truncate group-hover:opacity-70 transition-opacity"
            style={{ color: '#1A1108' }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-extrabold" style={{ color: '#FF5C00' }}>
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span
              className="text-xs line-through"
              style={{ color: 'rgba(26,17,8,0.35)' }}
            >
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
