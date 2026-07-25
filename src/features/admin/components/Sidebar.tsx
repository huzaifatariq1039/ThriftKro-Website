import React from "react";
import {
  LayoutDashboard, ShieldCheck, Package, CreditCard, TrendingUp,
  MessageSquare, Settings, Briefcase,
} from "lucide-react";
import thriftKroLogo from "@/assets/logo.png";
import { C, FONT, MONO } from "../data/adminData";

const navItems = [
  { id: "overview", label: "Overview Dashboard", icon: LayoutDashboard },
  { id: "kyc", label: "Seller KYC Requests", icon: ShieldCheck, badge: 3 },
  { id: "catalog", label: "Product Catalog & AI Audit", icon: Package },
  { id: "escrow", label: "Escrow & Orders", icon: CreditCard },
  { id: "revenue", label: "Platform Revenue & GMV", icon: TrendingUp },
  { id: "support", label: "Support & Disputes", icon: MessageSquare },
  { id: "careers", label: "Careers & Press", icon: Briefcase },
  { id: "settings", label: "Admin Settings", icon: Settings },
];

export function Sidebar({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  return (
    <aside className="flex flex-col h-full border-r" style={{ width: 260, background: C.surface, borderColor: C.border, flexShrink: 0 }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: C.border }}>
        <div className="flex items-center gap-3">
          <img src={thriftKroLogo} alt="Thrift Kro" className="w-8 h-8 rounded-xl object-cover" style={{ background: C.orange }} />
          <div>
            <p className="font-extrabold text-sm" style={{ color: C.orange, fontFamily: FONT }}>Thrift Kro</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.green }} />
              <p className="text-xs" style={{ color: C.green, fontFamily: MONO }}>System Live</p>
            </div>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: C.textDim, fontFamily: MONO }}>Main Menu</p>
        {navItems.map(item => {
          const Icon = item.icon; const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => setActive(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left"
              style={{ background: isActive ? `${C.orange}18` : "transparent", color: isActive ? C.text : C.textMuted, fontFamily: FONT }}>
              <Icon size={16} style={{ color: isActive ? C.orange : C.textDim, flexShrink: 0 }} />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-xs font-extrabold text-white" style={{ background: C.orange, fontFamily: MONO, fontSize: 10 }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t" style={{ borderColor: C.border }}>
        <div className="flex items-center gap-3 p-2.5 rounded-lg" style={{ background: C.surfaceAlt }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: C.orange, color: "#fff", fontFamily: MONO }}>
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate" style={{ color: C.text, fontFamily: FONT }}>Admin Manager</p>
            <p className="text-xs truncate" style={{ color: C.textDim, fontFamily: MONO }}>admin@thriftkro.pk</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
