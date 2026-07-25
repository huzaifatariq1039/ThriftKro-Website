import React from "react";
import { ArrowLeft } from "lucide-react";
import { INK, PAPER, FONT } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Toggle } from "@/components/ui";
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

export default function BuyerNotifications({ s }: { s: Store }) {
  const rows: [keyof typeof s.buyerNotifPrefs, string, string][] = [
    ["orderUpdates", "Order updates", "Shipping & delivery alerts"],
    ["priceDrops", "Price drops", "When wishlisted items drop in price"],
    ["newArrivals", "New arrivals", "Fresh drops in your favorite categories"],
    ["messages", "Messages", "Chats from sellers"],
    ["promotions", "Promotions", "Deals & discount campaigns"],
  ];
  return (
    <SubPage s={s} title="Notifications" back="buyer-profile">
      <div className="space-y-3">
        {rows.map(([k, l, d]) => (
          <div key={k} className="flex items-center gap-4 p-4 rounded-2xl bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
            <div className="flex-1"><p className="font-bold text-sm" style={{ color: INK }}>{l}</p><p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>{d}</p></div>
            <Toggle on={s.buyerNotifPrefs[k]} onChange={() => s.setBuyerNotifPrefs((p: Record<string, boolean>) => ({ ...p, [k]: !p[k] }))} />
          </div>
        ))}
      </div>
    </SubPage>
  );
}
