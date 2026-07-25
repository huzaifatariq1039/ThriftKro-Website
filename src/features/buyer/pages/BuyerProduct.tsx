import React, { useState } from "react";
import { ArrowLeft, Heart, Camera, Star, Shield, Minus, Plus, Truck } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, YELLOW, INK, PAPER, FONT, MONO, pk } from "@/constants/theme";
import { mockProducts as products } from "@/services/mockData";
import type { Store } from "@/hooks/useStore";
import { Label } from "@/components/ui";
import { BuyerNav, ProductCard } from "../components/BuyerNav";

export default function BuyerProduct({ s }: { s: Store }) {
  const p = s.selectedProduct;
  const [size, setSize] = useState(p.size);
  const [qty, setQty] = useState(1);
  const liked = s.likedProducts.has(p.id);
  const related = products.filter(x => x.id !== p.id).slice(0, 4);
  const off = Math.round((1 - p.price / p.originalPrice) * 100);
  return (
    <div style={{ background: PAPER, minHeight: "100vh", fontFamily: FONT }}>
      <BuyerNav s={s} />
      <div className="max-w-7xl mx-auto px-8 py-8">
        <button onClick={() => s.setRoute("buyer-home")} className="flex items-center gap-2 text-sm font-semibold mb-6" style={{ color: "rgba(26,17,8,0.6)" }}><ArrowLeft size={16} /> Back to discover</button>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative rounded-[2rem] overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
            <ImageWithFallback src={p.img} alt={p.name} className="w-full aspect-square object-cover" />
            <button onClick={() => s.toggleLike(p.id)} className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: "0 6px 16px rgba(0,0,0,0.12)" }}><Heart size={20} fill={liked ? ORANGE : "none"} style={{ color: liked ? ORANGE : INK }} /></button>
            {p.category === "Shoes" && <button onClick={() => { s.setActiveVtoItem(0); s.setRoute("buyer-vto"); }} className="absolute bottom-5 left-5 flex items-center gap-2 px-4 py-2.5 rounded-full font-extrabold text-sm" style={{ background: YELLOW, color: INK }}><Camera size={16} /> Try it on</button>}
          </div>
          <div>
            <Label>{p.brand.toUpperCase()} · {p.category.toUpperCase()}</Label>
            <h1 className="font-extrabold mt-2" style={{ fontSize: 38, lineHeight: 1.05, letterSpacing: "-0.03em", color: INK }}>{p.name}</h1>
            <div className="flex items-center gap-3 mt-4">
              <span className="font-extrabold" style={{ fontSize: 30, color: ORANGE }}>{pk(p.price)}</span>
              <span className="text-lg line-through" style={{ color: "rgba(26,17,8,0.35)" }}>{pk(p.originalPrice)}</span>
              <span className="px-2 py-1 rounded-full text-xs font-extrabold" style={{ background: YELLOW, color: INK, fontFamily: MONO }}>-{off}%</span>
            </div>
            <div className="flex gap-3 mt-6">
              {[["Condition", p.condition], ["Size", p.size], ["Category", p.category]].map(([l, v]) => (
                <div key={l} className="flex-1 rounded-2xl p-3 bg-white text-center" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}><Label>{l}</Label><p className="font-bold text-sm mt-1" style={{ color: INK }}>{v}</p></div>
              ))}
            </div>
            <div className="mt-6">
              <Label>Select size</Label>
              <div className="flex gap-2 mt-2">
                {[p.size, "S", "M", "L"].filter((v, i, a) => a.indexOf(v) === i).map(sz => (
                  <button key={sz} onClick={() => setSize(sz)} className="px-4 py-2.5 rounded-xl text-sm font-bold" style={{ background: size === sz ? INK : "white", color: size === sz ? "white" : INK, boxShadow: "0 0 0 1px rgba(26,17,8,0.1)" }}>{sz}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <Label>Quantity</Label>
              <div className="flex items-center gap-3 rounded-full px-2 py-1 bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.1)" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F2EFE9" }}><Minus size={15} /></button>
                <span className="font-bold w-5 text-center" style={{ fontFamily: MONO }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F2EFE9" }}><Plus size={15} /></button>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 p-4 rounded-2xl bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "#FFF3E0" }}><Star size={18} fill={ORANGE} style={{ color: ORANGE }} /></div>
              <div className="flex-1"><p className="font-bold text-sm" style={{ color: INK }}>{p.seller}</p><p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>{p.sellerRating} rating · Verified seller</p></div>
              <Shield size={18} style={{ color: ORANGE }} />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => s.addToCart(p)} className="flex-1 py-4 rounded-xl font-extrabold" style={{ boxShadow: "0 0 0 1.5px rgba(26,17,8,0.15)", color: INK }}>Add to Cart</button>
              <button onClick={() => { s.addToCart(p); s.setRoute("buyer-cart"); }} className="flex-1 py-4 rounded-xl font-extrabold text-white" style={{ background: ORANGE }}>Buy Now</button>
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs" style={{ color: "rgba(26,17,8,0.5)" }}><Truck size={14} /> Delivery in 2-3 days · <Shield size={14} /> 7-day buyer protection</div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-extrabold mb-6" style={{ fontSize: 24, letterSpacing: "-0.02em", color: INK }}>You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{related.map(r => <ProductCard key={r.id} p={r} s={s} />)}</div>
        </div>
      </div>
    </div>
  );
}
