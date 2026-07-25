import React from "react";
import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, INK, PAPER, FONT, MONO, pk } from "@/constants/theme";
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

export default function BuyerOrders({ s }: { s: Store }) {
  const color = (st: string) => st === "Delivered" ? "#2E7D32" : st === "In Transit" ? ORANGE : "#8A7E72";
  return (
    <SubPage s={s} title="My Orders" back="buyer-profile">
      <div className="space-y-4">
        {s.buyerOrders.map(o => (
          <div key={o.id} className="flex gap-4 p-4 rounded-2xl bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
            <ImageWithFallback src={o.img} alt={o.name} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex-1">
              <div className="flex items-center justify-between"><span style={{ fontFamily: MONO, fontSize: 11, color: "rgba(26,17,8,0.5)" }}>{o.id}</span><span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: color(o.status) + "22", color: color(o.status) }}>{o.status}</span></div>
              <p className="font-bold mt-1" style={{ color: INK }}>{o.name}</p>
              <div className="flex items-center justify-between mt-2"><span className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>{o.date}</span><span className="font-extrabold" style={{ color: ORANGE }}>{pk(o.price)}</span></div>
            </div>
          </div>
        ))}
      </div>
    </SubPage>
  );
}
