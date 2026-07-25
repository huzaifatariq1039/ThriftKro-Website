import React from "react";
import { ArrowLeft } from "lucide-react";
import { INK, PAPER, FONT } from "@/constants/theme";
import { mockProducts as products } from "@/services/mockData";
import type { Store } from "@/hooks/useStore";
import { BuyerNav, ProductCard } from "../components/BuyerNav";

function SubPage({ s, title, back, children }: { s: Store; title: string; back: any; children: React.ReactNode }) {
  return (
    <div style={{ background: PAPER, minHeight: "100vh", fontFamily: FONT }}>
      <BuyerNav s={s} />
      <div className="max-w-3xl mx-auto px-8 py-8">
        <button onClick={() => s.setRoute(back)} className="flex items-center gap-2 text-sm font-semibold mb-4" style={{ color: "rgba(26,17,8,0.6)" }}><ArrowLeft size={16} /> Back</button>
        <h1 className="font-extrabold mb-8" style={{ fontSize: 30, letterSpacing: "-0.03em", color: INK }}>{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default function BuyerWishlist({ s }: { s: Store }) {
  const liked = products.filter(p => s.likedProducts.has(p.id));
  return (
    <SubPage s={s} title="Wishlist" back="buyer-profile">
      {liked.length === 0 ? <p className="text-center py-16 text-sm" style={{ color: "rgba(26,17,8,0.4)" }}>Nothing saved yet — tap the heart on any item.</p> : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">{liked.map(p => <ProductCard key={p.id} p={p} s={s} />)}</div>
      )}
    </SubPage>
  );
}
