import React from "react";
import { INK } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label, Toggle } from "@/components/ui";
import { SellerShell } from "../components/SellerShell";

export default function SellerNotifications({ s }: { s: Store }) {
  const rows: { key: keyof typeof s.sellerNotifPrefs; label: string; sub: string }[] = [
    { key: "newOrders", label: "New order alerts", sub: "When a buyer places an order" },
    { key: "newMessages", label: "Messages", sub: "Chats from potential buyers" },
    { key: "payoutAlerts", label: "Payout notifications", sub: "When funds release to your account" },
    { key: "promotions", label: "Seller tips & promos", sub: "Growth tips & seasonal campaigns" },
  ];
  return (
    <SellerShell s={s}>
      <Label>NOTIFICATIONS</Label>
      <h1 className="font-extrabold mt-1 mb-8" style={{ fontSize: 32, letterSpacing: "-0.03em", color: INK }}>Notification preferences</h1>
      <div className="max-w-md space-y-3">
        {rows.map(r => (
          <div key={r.key} className="flex items-center gap-4 p-4 rounded-2xl bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
            <div className="flex-1"><p className="font-bold text-sm" style={{ color: INK }}>{r.label}</p><p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>{r.sub}</p></div>
            <Toggle on={s.sellerNotifPrefs[r.key]} onChange={() => s.setSellerNotifPrefs((p: any) => ({ ...p, [r.key]: !p[r.key] }))} />
          </div>
        ))}
      </div>
    </SellerShell>
  );
}
