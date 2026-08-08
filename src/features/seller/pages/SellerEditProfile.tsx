import React, { useState, useRef } from "react";
import { Camera } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, INK } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label, Field, inputCls, inputStyle } from "@/components/ui";
import { SellerShell } from "../components/SellerShell";
import { authService } from "@/services/api/authService";

export default function SellerEditProfile({ s }: { s: Store }) {
  const [f, setF] = useState(s.sellerProfile);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setLoading(true);
    try {
      await authService.updateProfile({
        email: f.email,
        phone_number: f.phone,
        avatar_url: f.avatar
      });
      // We are ignoring bio/city for now if they are not supported by the backend /users/me
      await s.syncProfile();
      s.showToast("Shop profile saved ✓");
      s.setRoute("seller-profile");
    } catch (err) {
      s.showToast("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SellerShell s={s}>
      <Label>SETTINGS</Label>
      <h1 className="font-extrabold mt-1 mb-8" style={{ fontSize: 32, letterSpacing: "-0.03em", color: INK }}>Edit profile</h1>
      <div className="max-w-md bg-white p-8 rounded-3xl space-y-4" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
        <div className="flex items-center gap-4 mb-4">
          <ImageWithFallback src={f.avatar || ""} alt="me" className="w-20 h-20 rounded-2xl object-cover" />
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            style={{ display: "none" }} 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                  const b64 = ev.target?.result as string;
                  setF({ ...f, avatar: b64 });
                };
                reader.readAsDataURL(file);
              }
            }} 
          />
          <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.12)", color: INK }}><Camera size={14} /> Change avatar</button>
        </div>
        <Field label="Shop name"><input className={inputCls} style={inputStyle} value={f.shopName} onChange={e => setF({ ...f, shopName: e.target.value })} /></Field>
        <Field label="Bio / Description"><textarea className={inputCls} style={{ ...inputStyle, height: 80 }} value={f.bio} onChange={e => setF({ ...f, bio: e.target.value })} /></Field>
        <Field label="Email"><input className={inputCls} style={inputStyle} value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></Field>
        <Field label="Phone"><input className={inputCls} style={inputStyle} value={f.phone || ""} onChange={e => setF({ ...f, phone: e.target.value })} /></Field>
        <Field label="City"><input className={inputCls} style={inputStyle} value={f.city || ""} onChange={e => setF({ ...f, city: e.target.value })} /></Field>
        <button disabled={loading} onClick={handleSave} className="w-full py-4 rounded-xl font-extrabold text-white mt-4 transition-opacity disabled:opacity-50" style={{ background: ORANGE }}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </SellerShell>
  );
}
