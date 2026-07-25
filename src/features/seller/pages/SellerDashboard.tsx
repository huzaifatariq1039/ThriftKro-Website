import React from "react";
import { TrendingUp, Package, Eye, Star, Plus } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, INK, pk } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label } from "@/components/ui";
import { SellerShell } from "../components/SellerShell";

export default function SellerDashboard({ s }: { s: Store }) {
  const stats = [
    ["Total earnings", pk(s.sellerProfile.totalEarnings ?? 0), "+12% this month", <TrendingUp size={20} />],
    ["Active listings", s.sellerListings.length, "2 pending review", <Package size={20} />],
    ["Shop views", "1,420", "+28% vs last week", <Eye size={20} />],
    ["Shop rating", `${s.sellerProfile.rating}★`, `${s.sellerProfile.salesCount} total sales`, <Star size={20} />],
  ];
  return (
    <SellerShell s={s}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Label>SELLER DASHBOARD</Label>
          <h1 className="font-extrabold mt-1" style={{ fontSize: 32, letterSpacing: "-0.03em", color: INK }}>Welcome back, {s.sellerProfile.shopName} 👋</h1>
        </div>
        <button onClick={() => s.setRoute("seller-add")} className="px-6 py-3.5 rounded-full font-extrabold text-white flex items-center gap-2" style={{ background: ORANGE }}><Plus size={18} /> Add Listing</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        {stats.map(([l, v, sub, ic]) => (
          <div key={l as string} className="p-5 rounded-3xl bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "#FFF3E0", color: ORANGE }}>{ic as React.ReactNode}</div>
            <p className="font-extrabold text-2xl" style={{ color: INK }}>{v as any}</p>
            <p className="text-xs font-bold mt-1" style={{ color: INK }}>{l as string}</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(26,17,8,0.4)" }}>{sub as string}</p>
          </div>
        ))}
      </div>

      <h2 className="font-extrabold mb-4 text-lg" style={{ color: INK }}>Recent Listings</h2>
      <div className="space-y-3">
        {s.sellerListings.slice(0, 4).map(item => (
          <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
            <ImageWithFallback src={item.img} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate" style={{ color: INK }}>{item.name}</p>
              <p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>{item.category} · {item.views} views · {item.likes} likes</p>
            </div>
            <span className="font-extrabold" style={{ color: ORANGE }}>{pk(item.price)}</span>
          </div>
        ))}
      </div>
    </SellerShell>
  );
}
