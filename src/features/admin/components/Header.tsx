import React, { useState } from "react";
import { Search, Bell, Plus } from "lucide-react";
import { C, FONT, MONO } from "../data/adminData";

const pageTitles: Record<string, string> = {
  overview: "Platform Overview & Financial Analytics",
  kyc: "Seller KYC & Verification Requests",
  catalog: "Product Catalog & AI Audit",
  escrow: "Escrow Management & Orders",
  revenue: "Platform Revenue & GMV Analytics",
  support: "Support, Disputes & Resolutions",
  careers: "Careers & Press Management",
  settings: "Admin Settings & Configuration",
};

export function Header({ page }: { page: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <header className="flex items-center gap-4 px-6 border-b flex-shrink-0"
      style={{ height: 70, background: C.surface, borderColor: C.border }}>
      <div className="flex-shrink-0">
        <p className="text-xs font-medium" style={{ color: C.textDim, fontFamily: MONO }}>ADMIN CONSOLE</p>
        <h1 className="text-sm font-bold leading-tight" style={{ color: C.text, fontFamily: FONT }}>{pageTitles[page]}</h1>
      </div>
      <div className="flex flex-1 items-center gap-2.5 px-4 py-2 rounded-lg border transition-all mx-4"
        style={{ background: C.bg, borderColor: focused ? C.orange : C.border, maxWidth: 460, boxShadow: focused ? `0 0 0 3px ${C.orange}18` : "none" }}>
        <Search size={13} style={{ color: C.textDim, flexShrink: 0 }} />
        <input className="flex-1 bg-transparent text-xs outline-none" style={{ color: C.text, fontFamily: FONT }}
          placeholder="Search users, products, order IDs, verification hashes..."
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        <span className="px-1.5 py-0.5 rounded border text-xs" style={{ color: C.textDim, borderColor: C.border, fontFamily: MONO }}>⌘K</span>
      </div>
      <div className="ml-auto flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border"
          style={{ background: `${C.green}10`, borderColor: `${C.green}30` }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.green }} />
          <p className="text-xs font-medium" style={{ color: C.green, fontFamily: MONO }}>Escrow Engine: Active</p>
        </div>
        <button className="relative w-9 h-9 rounded-lg flex items-center justify-center border hover:bg-white/5 transition-colors"
          style={{ borderColor: C.border }}>
          <Bell size={15} style={{ color: C.textMuted }} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-bold text-white"
            style={{ background: C.red, fontFamily: MONO, fontSize: 9 }}>5</span>
        </button>
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ background: C.orange, color: "#1A1108", fontFamily: FONT }}>
          <Plus size={13} /> Import CSV
        </button>
      </div>
    </header>
  );
}
