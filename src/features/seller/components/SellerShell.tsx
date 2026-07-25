import React from "react";
import {
  LayoutDashboard, Package, Plus, MessageSquare, User, Bell, Lock,
  RefreshCw, Check, ArrowRight, ShieldCheck,
} from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, YELLOW, INK, PAPER, FONT } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Logo } from "@/components/ui";

export function SellerShell({ s, children }: { s: Store; children: React.ReactNode }) {
  const isKyc = s.sellerKycApproved;
  const nav: [keyof typeof s.route | string, string, React.ReactNode, number?][] = [
    ["seller-dashboard", "Dashboard", <LayoutDashboard size={18} />],
    ["seller-listings", "My Listings", <Package size={18} />, s.sellerListings.length],
    ["seller-add", "Add Listing", <Plus size={18} />],
    ["seller-messages", "Messages", <MessageSquare size={18} />, 2],
    ["seller-profile", "Shop Profile", <User size={18} />],
  ];

  return (
    <div className="min-h-screen flex" style={{ background: PAPER, fontFamily: FONT }}>
      <aside className="w-64 border-r flex flex-col justify-between p-6 bg-white flex-shrink-0" style={{ borderColor: "rgba(26,17,8,0.06)" }}>
        <div>
          <div className="mb-8"><Logo size={36} /></div>
          <div className="p-3.5 rounded-2xl mb-6 flex items-center gap-3" style={{ background: INK }}>
            <ImageWithFallback src={s.sellerProfile.avatar || ""} alt="shop" className="w-10 h-10 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-sm text-white truncate">{s.sellerProfile.shopName}</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full" style={{ background: isKyc ? "#E8F5E9" : "#FFF3E0", color: isKyc ? "#2E7D32" : ORANGE }}>
                {isKyc ? <Check size={9} /> : null}{isKyc ? "KYC Approved" : "Unverified"}
              </span>
            </div>
          </div>
          <nav className="space-y-1">
            {nav.map(([r, l, ic, cnt]) => {
              const active = s.route === r;
              return (
                <button key={r as string} onClick={() => s.setRoute(r as any)} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-colors text-left" style={{ background: active ? ORANGE : "transparent", color: active ? "white" : INK }}>
                  <span style={{ color: active ? "white" : ORANGE }}>{ic}</span>
                  <span className="flex-1">{l as string}</span>
                  {cnt ? <span className="text-xs px-2 py-0.5 rounded-full font-extrabold" style={{ background: active ? "rgba(255,255,255,0.2)" : YELLOW, color: active ? "white" : INK }}>{cnt}</span> : null}
                </button>
              );
            })}
          </nav>
        </div>
        <button onClick={() => s.setShowRoleSwitch(true)} className="flex items-center gap-2 p-3 rounded-2xl text-xs font-semibold" style={{ background: "#F5F2EE", color: "rgba(26,17,8,0.6)" }}>
          <RefreshCw size={14} /> Switch to Buyer
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {!isKyc && (
          <div className="px-8 py-3 flex items-center justify-between" style={{ background: INK }}>
            <div className="flex items-center gap-2 text-xs text-white"><ShieldCheck size={16} color={YELLOW} /> Verification required to receive payouts and get the verified badge.</div>
            <button onClick={() => s.setRoute("seller-verify")} className="px-4 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1" style={{ background: YELLOW, color: INK }}>Verify Shop <ArrowRight size={12} /></button>
          </div>
        )}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
