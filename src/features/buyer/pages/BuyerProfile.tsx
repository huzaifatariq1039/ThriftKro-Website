import React from "react";
import { Package, Heart, MapPin, CreditCard, Bell, Lock, RefreshCw, X, ChevronRight, Check } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, INK, PAPER, FONT } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label } from "@/components/ui";
import { BuyerNav } from "../components/BuyerNav";

function Row({ icon, label, sub, onClick, danger }: { icon: React.ReactNode; label: string; sub?: string; onClick: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-[#F7F4EF] transition-colors" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: danger ? "#FDECEA" : "#FFF3E0" }}><span style={{ color: danger ? "#DC2626" : ORANGE }}>{icon}</span></div>
      <div className="flex-1 text-left"><p className="font-bold text-sm" style={{ color: danger ? "#DC2626" : INK }}>{label}</p>{sub && <p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>{sub}</p>}</div>
      <ChevronRight size={18} style={{ color: "rgba(26,17,8,0.3)" }} />
    </button>
  );
}

export default function BuyerProfile({ s }: { s: Store }) {
  return (
    <div style={{ background: PAPER, minHeight: "100vh", fontFamily: FONT }}>
      <BuyerNav s={s} />
      <div className="max-w-3xl mx-auto px-8 py-8">
        <div className="flex items-center gap-5 p-6 rounded-3xl bg-white mb-8" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          <ImageWithFallback src={s.buyerProfile.avatar || ""} alt="me" className="w-20 h-20 rounded-full object-cover" />
          <div className="flex-1">
            <h1 className="font-extrabold text-xl" style={{ color: INK }}>{s.buyerProfile.name}</h1>
            <p className="text-sm" style={{ color: "rgba(26,17,8,0.55)" }}>{s.buyerProfile.email}</p>
            <span className="inline-flex items-center gap-1 mt-1.5 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#E8F5E9", color: "#2E7D32" }}><Check size={11} /> Verified buyer</span>
          </div>
          <button onClick={() => s.setRoute("buyer-edit-profile")} className="px-4 py-2 rounded-full text-sm font-bold" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.12)", color: INK }}>Edit</button>
        </div>
        <div className="space-y-3">
          <Label>Shopping</Label>
          <Row icon={<Package size={18} />} label="My Orders" sub={`${s.buyerOrders.length} orders`} onClick={() => s.setRoute("buyer-orders")} />
          <Row icon={<Heart size={18} />} label="Wishlist" sub={`${s.likedProducts.size} saved`} onClick={() => s.setRoute("buyer-wishlist")} />
          <Row icon={<MapPin size={18} />} label="Addresses" sub={`${s.addresses.length} saved`} onClick={() => s.setRoute("buyer-addresses")} />
          <Row icon={<CreditCard size={18} />} label="Payment Methods" sub={`${s.cards.length} cards`} onClick={() => s.setRoute("buyer-payments")} />
          <div className="pt-3"><Label>Preferences</Label></div>
          <Row icon={<Bell size={18} />} label="Notifications" onClick={() => s.setRoute("buyer-notifications")} />
          <Row icon={<Lock size={18} />} label="Privacy & Security" onClick={() => s.setRoute("buyer-privacy")} />
          <Row icon={<RefreshCw size={18} />} label="Switch to Seller" sub="Manage your shop" onClick={() => s.setShowRoleSwitch(true)} />
          <div className="pt-3" />
          <Row icon={<X size={18} />} label="Log out" danger onClick={() => s.logout()} />
        </div>
      </div>
    </div>
  );
}
