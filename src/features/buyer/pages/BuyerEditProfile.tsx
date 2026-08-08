import React, { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, INK, PAPER, FONT } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Field, inputCls, inputStyle } from "@/components/ui";
import { BuyerNav } from "../components/BuyerNav";
import { authService } from "@/services/api/authService";

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

export default function BuyerEditProfile({ s }: { s: Store }) {
  const [f, setF] = useState(s.buyerProfile);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await authService.updateProfile({
        full_name: f.name,
        email: f.email,
        phone_number: f.phone,
        avatar_url: f.avatar
      });
      // Update global state via syncProfile or directly setting buyerProfile
      await s.syncProfile();
      s.showToast("Profile updated ✓");
      s.setRoute("buyer-profile");
    } catch (err) {
      s.showToast("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SubPage s={s} title="Edit Profile" back="buyer-profile">
      <div className="flex items-center gap-4 mb-8">
        <ImageWithFallback src={f.avatar || ""} alt="me" className="w-20 h-20 rounded-full object-cover" />
        <button onClick={() => {
          const url = window.prompt("Enter new avatar image URL:", f.avatar || "");
          if (url !== null) setF({ ...f, avatar: url });
        }} className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1.5" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.12)", color: INK }}><Camera size={14} /> Change photo</button>
      </div>
      <div className="space-y-4 max-w-md">
        <Field label="Full name"><input className={inputCls} style={inputStyle} value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></Field>
        <Field label="Email"><input className={inputCls} style={inputStyle} value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></Field>
        <Field label="Phone"><input className={inputCls} style={inputStyle} value={f.phone || ""} onChange={e => setF({ ...f, phone: e.target.value })} /></Field>
        <Field label="Gender"><input className={inputCls} style={inputStyle} value={f.gender || ""} onChange={e => setF({ ...f, gender: e.target.value })} /></Field>
        <button disabled={loading} onClick={handleSave} className="w-full py-4 rounded-xl font-extrabold text-white transition-opacity disabled:opacity-50" style={{ background: ORANGE }}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </SubPage>
  );
}
