import React from "react";
import { Star, ShieldCheck, MapPin, Store as StoreIcon, Bell, Lock, RefreshCw, X, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, INK, pk } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label } from "@/components/ui";
import { SellerShell } from "../components/SellerShell";

function Row({ icon, label, sub, onClick, danger }: { icon: React.ReactNode; label: string; sub?: string; onClick: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-[#F7F4EF] transition-colors" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: danger ? "#FDECEA" : "#FFF3E0" }}><span style={{ color: danger ? "#DC2626" : ORANGE }}>{icon}</span></div>
      <div className="flex-1 text-left"><p className="font-bold text-sm" style={{ color: danger ? "#DC2626" : INK }}>{label}</p>{sub && <p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>{sub}</p>}</div>
      <ChevronRight size={18} style={{ color: "rgba(26,17,8,0.3)" }} />
    </button>
  );
}

export default function SellerProfile({ s }: { s: Store }) {
  const isKyc = s.sellerKycApproved;
  return (
    <SellerShell s={s}>
      <div className="max-w-3xl">
        <div className="flex items-center gap-5 p-6 rounded-3xl bg-white mb-8" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          <ImageWithFallback src={s.sellerProfile.avatar || ""} alt="shop" className="w-20 h-20 rounded-2xl object-cover" />
          <div className="flex-1">
            <h1 className="font-extrabold text-xl" style={{ color: INK }}>{s.sellerProfile.shopName}</h1>
            <p className="text-sm" style={{ color: "rgba(26,17,8,0.55)" }}>{s.sellerProfile.email} · {s.sellerProfile.city}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1"><Star size={12} fill="currentColor" /> {s.sellerProfile.rating}</span>
              <span className="text-xs" style={{ color: "rgba(26,17,8,0.4)" }}>· {s.sellerProfile.salesCount} sales</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: isKyc ? "#E8F5E9" : "#FFF3E0", color: isKyc ? "#2E7D32" : ORANGE }}>{isKyc ? "KYC Verified ✓" : "Unverified"}</span>
            </div>
          </div>
          <button onClick={() => s.setRoute("seller-edit-profile")} className="px-4 py-2 rounded-full text-sm font-bold" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.12)", color: INK }}>Edit</button>
        </div>

        <div className="space-y-3">
          <Label>Shop Management</Label>
          <Row icon={<StoreIcon size={18} />} label="Shop Settings" sub="Name, bio, payout account" onClick={() => s.setRoute("seller-shop-settings")} />
          <Row icon={<ShieldCheck size={18} />} label="Identity & KYC" sub={isKyc ? "Verified" : "Action required"} onClick={() => s.setRoute("seller-verify")} />
          <Row icon={<MapPin size={18} />} label="Pickup Address" sub={s.sellerProfile.city + ", Pakistan"} onClick={() => s.showToast("Address editor coming soon")} />
          <div className="pt-3"><Label>Preferences</Label></div>
          <Row icon={<Bell size={18} />} label="Notifications" onClick={() => s.setRoute("seller-notifications")} />
          <Row icon={<Lock size={18} />} label="Privacy & Security" onClick={() => s.setRoute("seller-privacy")} />
          <Row icon={<RefreshCw size={18} />} label="Switch to Buyer" sub="Shop pre-loved fit" onClick={() => s.setShowRoleSwitch(true)} />
          <div className="pt-3" />
          <Row icon={<X size={18} />} label="Log out" danger onClick={() => s.logout()} />
        </div>
      </div>
    </SellerShell>
  );
}
