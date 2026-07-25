import React from "react";
import { Heart, Search, ShoppingBag, User, ArrowLeft, ChevronRight, Check } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, YELLOW, INK, PAPER, FONT, MONO, pk } from "@/constants/theme";
import type { Product } from "@/types/types";
import type { Store } from "@/hooks/useStore";
import { Logo } from "@/components/ui";

export function ProductCard({ p, s }: { p: Product; s: Store }) {
  const liked = s.likedProducts.has(p.id);
  const off = Math.round((1 - p.price / p.originalPrice) * 100);
  return (
    <div className="group cursor-pointer" onClick={() => { s.setSelectedProduct(p); s.setRoute("buyer-product"); }}>
      <div className="relative rounded-3xl overflow-hidden mb-3" style={{ background: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
        <ImageWithFallback src={p.img} alt={p.name} className="w-full aspect-square object-cover transition-transform group-hover:scale-105" />
        <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-extrabold" style={{ background: YELLOW, color: INK, fontFamily: MONO }}>-{off}%</span>
        <button onClick={e => { e.stopPropagation(); s.toggleLike(p.id); }} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <Heart size={16} fill={liked ? ORANGE : "none"} style={{ color: liked ? ORANGE : INK }} />
        </button>
      </div>
      <p className="text-xs" style={{ color: "rgba(26,17,8,0.5)", fontFamily: MONO }}>{p.brand.toUpperCase()} · {p.condition}</p>
      <p className="font-bold text-sm mt-0.5 truncate" style={{ color: INK }}>{p.name}</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="font-extrabold" style={{ color: ORANGE }}>{pk(p.price)}</span>
        <span className="text-xs line-through" style={{ color: "rgba(26,17,8,0.35)" }}>{pk(p.originalPrice)}</span>
      </div>
    </div>
  );
}

export function BuyerNav({ s }: { s: Store }) {
  return (
    <header className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between border-b" style={{ borderColor: "rgba(26,17,8,0.06)", background: PAPER }}>
      <Logo onClick={() => s.setRoute("buyer-home")} />
      <div className="flex items-center gap-3">
        <button onClick={() => s.setRoute("buyer-search")} className="w-10 h-10 rounded-full flex items-center justify-center bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}><Search size={18} style={{ color: INK }} /></button>
        <button onClick={() => s.setRoute("buyer-wishlist")} className="w-10 h-10 rounded-full flex items-center justify-center bg-white relative" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}>
          <Heart size={18} style={{ color: INK }} />
          {s.likedProducts.size > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center text-[10px] font-extrabold" style={{ background: ORANGE, fontFamily: MONO }}>{s.likedProducts.size}</span>}
        </button>
        <button onClick={() => s.setRoute("buyer-cart")} className="w-10 h-10 rounded-full flex items-center justify-center bg-white relative" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}>
          <ShoppingBag size={18} style={{ color: INK }} />
          {s.cartItems.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center text-[10px] font-extrabold" style={{ background: ORANGE, fontFamily: MONO }}>{s.cartItems.length}</span>}
        </button>
        <button onClick={() => s.setRoute("buyer-profile")} className="w-10 h-10 rounded-full flex items-center justify-center bg-white overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}>
          <ImageWithFallback src={s.buyerProfile.avatar || ""} alt="me" className="w-full h-full object-cover" />
        </button>
      </div>
    </header>
  );
}
