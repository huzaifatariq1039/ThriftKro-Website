import React from "react";
import { ArrowRight, ShoppingBag, Package } from "lucide-react";
import { ORANGE, YELLOW, INK, PAPER, FONT } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Logo } from "@/components/ui";

export default function RoleSelectPage({ s }: { s: Store }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8" style={{ background: PAPER, fontFamily: FONT }}>
      <div className="mb-10"><Logo size={48} /></div>
      <h2 className="font-extrabold text-center mb-2" style={{ fontSize: 40, letterSpacing: "-0.03em", color: INK }}>How do you want to start?</h2>
      <p className="text-sm mb-10" style={{ color: "rgba(26,17,8,0.55)" }}>You can switch anytime.</p>
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        <button onClick={() => { s.setAuthMode("signup"); s.setRoute("buyer-auth"); }} className="p-8 rounded-3xl text-left transition-transform hover:-translate-y-1" style={{ background: "white", boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: ORANGE }}><ShoppingBag size={28} color="white" /></div>
          <p className="font-extrabold text-xl mb-1" style={{ color: INK }}>I'm a Buyer</p>
          <p className="text-sm" style={{ color: "rgba(26,17,8,0.55)" }}>Browse thousands of pre-loved pieces, try them on in AR & shop safely.</p>
          <span className="inline-flex items-center gap-1 mt-5 font-bold text-sm" style={{ color: ORANGE }}>Continue <ArrowRight size={16} /></span>
        </button>
        <button onClick={() => { s.setAuthMode("signup"); s.setRoute("seller-auth"); }} className="p-8 rounded-3xl text-left transition-transform hover:-translate-y-1" style={{ background: INK, boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: YELLOW }}><Package size={28} color={INK} /></div>
          <p className="font-extrabold text-xl mb-1 text-white">I'm a Seller</p>
          <p className="text-sm text-white/55">List your closet, reach 50K+ buyers, track orders & grow your shop.</p>
          <span className="inline-flex items-center gap-1 mt-5 font-bold text-sm" style={{ color: YELLOW }}>Continue <ArrowRight size={16} /></span>
        </button>
      </div>
      <button onClick={() => s.setRoute("landing")} className="mt-10 text-sm font-semibold" style={{ color: "rgba(26,17,8,0.5)" }}>← Back to home</button>
    </div>
  );
}
