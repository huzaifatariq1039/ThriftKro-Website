import React, { useState } from "react";
import { Camera } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, INK } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label, Field, inputCls, inputStyle } from "@/components/ui";
import { SellerShell } from "../components/SellerShell";

export default function SellerEditProfile({ s }: { s: Store }) {
  const [f, setF] = useState(s.sellerProfile);
  return (
    <SellerShell s={s}>
      <Label>SETTINGS</Label>
      <h1 className="font-extrabold mt-1 mb-8" style={{ fontSize: 32, letterSpacing: "-0.03em", color: INK }}>Edit profile</h1>
      <div className="max-w-md bg-white p-8 rounded-3xl space-y-4" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
        <div className="flex items-center gap-4 mb-4">
          <ImageWithFallback src={f.avatar || ""} alt="me" className="w-20 h-20 rounded-2xl object-cover" />
          <button className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.12)", color: INK }}><Camera size={14} /> Change avatar</button>
        </div>
        <Field label="Shop name"><input className={inputCls} style={inputStyle} value={f.shopName} onChange={e => setF({ ...f, shopName: e.target.value })} /></Field>
        <Field label="Bio / Description"><textarea className={inputCls} style={{ ...inputStyle, height: 80 }} value={f.bio} onChange={e => setF({ ...f, bio: e.target.value })} /></Field>
        <Field label="Email"><input className={inputCls} style={inputStyle} value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></Field>
        <Field label="Phone"><input className={inputCls} style={inputStyle} value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} /></Field>
        <Field label="City"><input className={inputCls} style={inputStyle} value={f.city} onChange={e => setF({ ...f, city: e.target.value })} /></Field>
        <button onClick={() => { s.setSellerProfile(f); s.showToast("Shop profile saved ✓"); s.setRoute("seller-profile"); }} className="w-full py-4 rounded-xl font-extrabold text-white mt-4" style={{ background: ORANGE }}>Save Changes</button>
      </div>
    </SellerShell>
  );
}
