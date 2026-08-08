import React from "react";
import { ArrowLeft, MapPin, Plus } from "lucide-react";
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

export default function BuyerAddresses({ s }: { s: Store }) {
  return (
    <SubPage s={s} title="Addresses" back="buyer-profile">
      <div className="space-y-4">
        {s.addresses.map(a => (
          <div key={a.id} className="p-4 rounded-2xl bg-white flex items-start gap-3" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#FFF3E0" }}><MapPin size={18} style={{ color: ORANGE }} /></div>
            <div className="flex-1">
              <div className="flex items-center gap-2"><p className="font-bold" style={{ color: INK }}>{a.label}</p>{a.isDefault && <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#E8F5E9", color: "#2E7D32" }}>Default</span>}<span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#F2EFE9", color: "rgba(26,17,8,0.6)" }}>{a.kind}</span></div>
              <p className="text-sm mt-1" style={{ color: "rgba(26,17,8,0.6)" }}>{a.line}</p>
            </div>
            <button onClick={() => { s.setAddresses(prev => prev.map(x => ({ ...x, isDefault: x.id === a.id }))); s.showToast("Default address set ✓"); }} className="text-xs font-bold" style={{ color: ORANGE }}>Set default</button>
          </div>
        ))}
        <button onClick={() => {
          const newAddress = window.prompt("Enter new address:");
          if (newAddress && newAddress.trim().length > 0) {
            s.setAddresses(prev => [...prev, {
              id: Date.now().toString(),
              label: "New Address",
              line: newAddress,
              kind: "Home",
              isDefault: prev.length === 0
            }]);
            s.showToast("Address added ✓");
          }
        }} className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2" style={{ boxShadow: "0 0 0 1.5px rgba(26,17,8,0.15)", color: INK }}><Plus size={16} /> Add new address</button>
      </div>
    </SubPage>
  );
}
