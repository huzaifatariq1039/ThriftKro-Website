import React from "react";
import { ArrowLeft, CreditCard, Plus } from "lucide-react";
import { ORANGE, INK, PAPER, FONT } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { BuyerNav } from "../components/BuyerNav";

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

export default function BuyerPayments({ s }: { s: Store }) {
  return (
    <SubPage s={s} title="Payment Methods" back="buyer-profile">
      <div className="space-y-4">
        {s.cards.map(c => (
          <div key={c.id} className="p-4 rounded-2xl bg-white flex items-center gap-3" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
            <div className="w-12 h-9 rounded-lg flex items-center justify-center" style={{ background: INK }}><CreditCard size={18} color="white" /></div>
            <div className="flex-1"><p className="font-bold" style={{ color: INK }}>{c.brand} •••• {c.last4}</p><p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>Expires {c.exp}</p></div>
            {c.isDefault ? <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#E8F5E9", color: "#2E7D32" }}>Default</span> : <button onClick={() => { s.setCards(prev => prev.map(x => ({ ...x, isDefault: x.id === c.id }))); s.showToast("Default card set ✓"); }} className="text-xs font-bold" style={{ color: ORANGE }}>Set default</button>}
          </div>
        ))}
        <button onClick={() => {
          const last4 = window.prompt("Enter last 4 digits of card:");
          if (last4 && last4.length === 4) {
            s.setCards(prev => [...prev, {
              id: Date.now(),
              brand: "Visa",
              last4,
              exp: "12/25",
              isDefault: prev.length === 0
            }]);
            s.showToast("Card added ✓");
          } else if (last4) {
            s.showToast("Please enter exactly 4 digits.");
          }
        }} className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2" style={{ boxShadow: "0 0 0 1.5px rgba(26,17,8,0.15)", color: INK }}><Plus size={16} /> Add new card</button>
      </div>
    </SubPage>
  );
}
