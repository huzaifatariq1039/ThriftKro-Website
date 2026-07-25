import React from "react";
import { Lock, Fingerprint, ShieldCheck, ChevronRight } from "lucide-react";
import { ORANGE, INK } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label, Toggle } from "@/components/ui";
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

export default function SellerPrivacy({ s }: { s: Store }) {
  const toggles: { key: keyof typeof s.sellerPrivacyPrefs; label: string; sub: string; flow?: boolean }[] = [
    { key: "twoFactor", label: "Two-factor authentication", sub: "Extra security on login", flow: true },
    { key: "biometric", label: "Biometric login", sub: "Use fingerprint / face", flow: true },
    { key: "showSalesCount", label: "Show sales count", sub: "Display total sales on shop profile" },
    { key: "allowDirectMsgs", label: "Direct messages", sub: "Allow buyers to chat before ordering" },
  ];
  return (
    <SellerShell s={s}>
      <Label>SECURITY & PRIVACY</Label>
      <h1 className="font-extrabold mt-1 mb-8" style={{ fontSize: 32, letterSpacing: "-0.03em", color: INK }}>Privacy & security</h1>
      <div className="max-w-md space-y-3 mb-6">
        {toggles.map(t => (
          <div key={t.key} className="flex items-center gap-4 p-4 rounded-2xl bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
            <div className="flex-1"><p className="font-bold text-sm" style={{ color: INK }}>{t.label}</p><p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>{t.sub}</p></div>
            <Toggle on={s.sellerPrivacyPrefs[t.key]} onChange={() => {
              const turningOn = !s.sellerPrivacyPrefs[t.key];
              if (t.flow && turningOn) { s.setSecurityFlow({ type: t.key === "twoFactor" ? "2fa" : "biometric", onDone: () => s.setSellerPrivacyPrefs((p: any) => ({ ...p, [t.key]: true })) }); return; }
              s.setSellerPrivacyPrefs((p: any) => ({ ...p, [t.key]: !p[t.key] }));
            }} />
          </div>
        ))}
      </div>
      <div className="max-w-md"><Label>Account security</Label></div>
      <div className="max-w-md space-y-3 mt-3">
        <Row icon={<Lock size={18} />} label="Change password" onClick={() => s.setSecurityFlow({ type: "change-password" })} />
        <Row icon={<Fingerprint size={18} />} label="Manage devices" sub={`${s.devices.length} active`} onClick={() => s.setSecurityFlow({ type: "manage-devices" })} />
        <Row icon={<ShieldCheck size={18} />} label="Login activity" onClick={() => s.setSecurityFlow({ type: "login-activity" })} />
      </div>
    </SellerShell>
  );
}
