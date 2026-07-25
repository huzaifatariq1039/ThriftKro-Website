import React from "react";
import { ORANGE, YELLOW, INK, PAPER, FONT } from "@/constants/theme";
import { mockProducts as products, mockCategories as categories } from "@/services/mockData";
import type { Store } from "@/hooks/useStore";
import { Label } from "@/components/ui";
import { BuyerNav, ProductCard } from "../components/BuyerNav";

export default function BuyerHome({ s }: { s: Store }) {
  const filtered = products.filter(p => s.activeCategory === "All" || p.category === s.activeCategory);
  return (
    <div style={{ background: PAPER, minHeight: "100vh", fontFamily: FONT }}>
      <BuyerNav s={s} />
      <section className="max-w-7xl mx-auto px-8 pt-10 pb-8">
        <div className="rounded-[2rem] overflow-hidden relative p-12 flex flex-col justify-center min-h-[280px]" style={{ background: "linear-gradient(120deg,#1A1108 0%,#3a2a15 100%)" }}>
          <Label><span style={{ color: YELLOW }}>NEW DROPS WEEKLY</span></Label>
          <h1 className="font-extrabold text-white mt-3 max-w-lg" style={{ fontSize: 48, lineHeight: 0.98, letterSpacing: "-0.03em" }}>Pre-loved gems, freshly dropped.</h1>
          <button onClick={() => s.setActiveCategory("Shoes")} className="mt-6 self-start px-6 py-3 rounded-full font-extrabold" style={{ background: ORANGE, color: "white" }}>Shop sneakers →</button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(c => (
            <button key={c} onClick={() => s.setActiveCategory(c)} className="px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap" style={{ background: s.activeCategory === c ? INK : "white", color: s.activeCategory === c ? "white" : INK, boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}>{c}</button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-extrabold" style={{ fontSize: 26, letterSpacing: "-0.02em", color: INK }}>{s.activeCategory === "All" ? "Trending now" : s.activeCategory}</h2>
          <Label>{filtered.length} items</Label>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map(p => <ProductCard key={p.id} p={p} s={s} />)}
        </div>
        {filtered.length === 0 && <p className="text-center py-16 text-sm" style={{ color: "rgba(26,17,8,0.4)" }}>No items in this category yet.</p>}
      </section>
    </div>
  );
}
