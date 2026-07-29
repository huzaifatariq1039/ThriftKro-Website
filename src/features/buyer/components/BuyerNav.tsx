import React from "react";
import { Heart, Search, ShoppingBag, User, ArrowLeft, ChevronRight, Check } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, YELLOW, INK, PAPER, FONT, MONO, pk } from "@/constants/theme";
import type { Product } from "@/types/types";
import type { Store } from "@/hooks/useStore";
import { Logo } from "@/components/ui";

export function ProductCard({ p, s, hideLike = false }: { p: Product; s: Store; hideLike?: boolean }) {
  const liked = s.likedProducts.has(p.id);
  const off = Math.round((1 - p.price / p.originalPrice) * 100);
  const vtoEnabled = p.category === "Shoes" || p.category === "Jackets" || p.category === "Shirts";
  return (
    <div className="group cursor-pointer rounded-2xl overflow-hidden relative bg-white flex flex-col h-full" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)", transition: "transform 0.3s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.3s", transform: "translateY(0)" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.08)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)"; }} onClick={() => { s.setSelectedProduct(p); s.setRoute("buyer-product"); }}>
      <div className="relative aspect-square overflow-hidden">
        <ImageWithFallback src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
        <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-extrabold" style={{ background: YELLOW, color: INK, fontFamily: MONO }}>-{off}%</span>
        {!hideLike && (
          <button onClick={e => { e.stopPropagation(); s.toggleLike(p.id); }} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <Heart size={16} fill={liked ? ORANGE : "none"} style={{ color: liked ? ORANGE : INK }} />
          </button>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-xs mb-1" style={{ color: "rgba(26,17,8,0.5)", fontFamily: MONO }}>{p.brand.toUpperCase()} · {p.condition}</p>
        <p className="font-bold text-sm mb-auto truncate" style={{ color: INK }}>{p.name}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold" style={{ color: ORANGE }}>{pk(p.price)}</span>
            <span className="text-xs line-through" style={{ color: "rgba(26,17,8,0.35)" }}>{pk(p.originalPrice)}</span>
          </div>
          {vtoEnabled && <div className="text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider" style={{ background: "rgba(26,17,8,0.05)", color: INK }}>Try Kro</div>}
        </div>
      </div>
    </div>
  );
}

export function BuyerNav({ s }: { s: Store }) {
  const links = [
    { l: "Sneakers", onClick: () => { s.setActiveCategory("Shoes"); s.setRoute("buyer-home"); } },
    { l: "Apparel", onClick: () => { s.setActiveCategory("Jackets"); s.setRoute("buyer-home"); } },
    { l: "Wishlist", onClick: () => s.setRoute("buyer-wishlist") },
  ];
  return (
    <nav className="sticky top-0 z-50 px-8 py-5 flex items-center justify-between" style={{ background: PAPER, borderBottom: "1px solid rgba(26,17,8,0.06)" }}>
      <div className="flex items-center gap-8">
        <Logo onClick={() => s.setRoute("landing")} />
        <div className="flex items-center gap-6">
          {links.map((l, i) => (
            <button key={i} onClick={l.onClick} className="text-sm font-medium transition-opacity hover:opacity-60" style={{ color: INK }}>{l.l}</button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => s.setRoute("buyer-search")} className="w-10 h-10 rounded-full flex items-center justify-center bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}><Search size={18} style={{ color: INK }} /></button>
        <button onClick={() => s.setRoute("buyer-wishlist")} className="w-10 h-10 rounded-full flex items-center justify-center bg-white relative" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}>
          <Heart size={18} style={{ color: INK }} />
          {s.likedProducts.size > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center text-[10px] font-extrabold" style={{ background: ORANGE, fontFamily: MONO }}>{s.likedProducts.size}</span>}
        </button>
        <button onClick={() => s.setRoute("buyer-cart")} className="w-10 h-10 rounded-full flex items-center justify-center bg-white relative" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}>
          <ShoppingBag size={18} style={{ color: INK }} />
          {s.cart.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center text-[10px] font-extrabold" style={{ background: ORANGE, fontFamily: MONO }}>{s.cart.length}</span>}
        </button>
        <button onClick={() => s.setRoute("buyer-profile")} className="w-10 h-10 rounded-full flex items-center justify-center bg-white overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}>
          <ImageWithFallback src={s.buyerProfile.avatar || ""} alt="me" className="w-full h-full object-cover" />
        </button>
      </div>
    </nav>
  );
}
