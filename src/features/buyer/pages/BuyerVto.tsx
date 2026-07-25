import React from "react";
import { ArrowLeft, Sparkles, Camera } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, YELLOW, INK, PAPER, FONT, MONO } from "@/constants/theme";
import { mockVtoShoes as vtoShoes } from "@/services/mockData";
import type { Store } from "@/hooks/useStore";
import { Label } from "@/components/ui";
import { BuyerNav } from "../components/BuyerNav";

export default function BuyerVto({ s }: { s: Store }) {
  const p = s.selectedProduct;
  const isShoe = p.category === "Shoes";
  return (
    <div style={{ background: PAPER, minHeight: "100vh", fontFamily: FONT }}>
      <BuyerNav s={s} />
      <div className="max-w-7xl mx-auto px-8 py-8">
        <button onClick={() => s.setRoute(p ? "buyer-product" : "buyer-home")} className="flex items-center gap-2 text-sm font-semibold mb-6" style={{ color: "rgba(26,17,8,0.6)" }}><ArrowLeft size={16} /> Back</button>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: "#FFF3E0" }}><Sparkles size={14} style={{ color: ORANGE }} /><span className="text-xs font-bold" style={{ color: ORANGE }}>AR TRY-ON</span></div>
            <h1 className="font-extrabold" style={{ fontSize: 34, letterSpacing: "-0.03em", color: INK }}>See it on {isShoe ? "your feet" : "you"}.</h1>
            <p className="text-sm mt-3 mb-6" style={{ color: "rgba(26,17,8,0.55)" }}>Point your camera at {isShoe ? "your feet" : "yourself"} and our AR engine overlays the piece in real time.</p>
            <Label>Choose a style</Label>
            <div className="flex gap-3 mt-3">
              {vtoShoes.map((v, i) => (
                <button key={v.id} onClick={() => s.setActiveVtoItem(i)} className="rounded-2xl overflow-hidden" style={{ boxShadow: `0 0 0 ${s.activeVtoItem === i ? 3 : 1}px ${s.activeVtoItem === i ? ORANGE : "rgba(26,17,8,0.1)"}` }}>
                  <ImageWithFallback src={v.img} alt={v.name} className="w-20 h-20 object-cover" />
                </button>
              ))}
            </div>
            <button className="mt-8 flex items-center gap-2 px-6 py-3.5 rounded-full font-extrabold text-white" style={{ background: ORANGE }}><Camera size={18} /> Enable camera</button>
          </div>
          <div className="rounded-[2rem] overflow-hidden relative flex items-center justify-center" style={{ background: INK, minHeight: 460 }}>
            <div className="absolute inset-6 rounded-3xl border-2 border-dashed border-white/20" />
            {isShoe ? (
              <div className="w-56 h-32 rounded-[50%] border-2 border-white/30 flex items-center justify-center relative">
                <ImageWithFallback src={vtoShoes[s.activeVtoItem].img} alt="" className="w-32 h-32 object-contain drop-shadow-2xl" />
              </div>
            ) : (
              <div className="w-40 h-56 rounded-[45%] border-2 border-white/30 flex items-center justify-center">
                <ImageWithFallback src={p.img} alt="" className="w-36 h-36 object-contain drop-shadow-2xl" />
              </div>
            )}
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/50" style={{ fontFamily: MONO }}>{isShoe ? "POSITION YOUR FEET IN THE OVAL" : "STAND WITHIN THE FRAME"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
