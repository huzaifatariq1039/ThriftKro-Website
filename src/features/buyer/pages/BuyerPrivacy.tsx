import React from "react";
import { ArrowLeft, Lock, Fingerprint, ShieldCheck, ChevronRight } from "lucide-react";
import { ORANGE, INK, PAPER, FONT } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label, Toggle } from "@/components/ui";
import { BuyerNav } from "../components/BuyerNav";

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

function Row({ icon, label, sub, onClick, danger }: { icon: React.ReactNode; label: string; sub?: string; onClick: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-[#F7F4EF] transition-colors" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: danger ? "#FDECEA" : "#FFF3E0" }}><span style={{ color: danger ? "#DC2626" : ORANGE }}>{icon}</span></div>
      <div className="flex-1 text-left"><p className="font-bold text-sm" style={{ color: danger ? "#DC2626" : INK }}>{label}</p>{sub && <p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>{sub}</p>}</div>
      <ChevronRight size={18} style={{ color: "rgba(26,17,8,0.3)" }} />
    </button>
  );
}

export default function BuyerPrivacy({ s }: { s: Store }) {
  const toggles: [keyof typeof s.buyerPrivacyPrefs, string, string, boolean?][] = [
    ["twoFactor", "Two-factor authentication", "Extra security on login", true],
    ["biometric", "Biometric login", "Use fingerprint / face", true],
    ["hideActivity", "Hide activity status", "Don't show when you're online"],
    ["dataSharing", "Data sharing", "Personalized recommendations"],
    ["savePayment", "Save payment info", "For faster checkout"],
  ];
  return (
    <SubPage s={s} title="Privacy & Security" back="buyer-profile">
      <div className="space-y-3 mb-6">
        {toggles.map(([k, l, d, flow]) => (
          <div key={k} className="flex items-center gap-4 p-4 rounded-2xl bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
            <div className="flex-1"><p className="font-bold text-sm" style={{ color: INK }}>{l}</p><p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>{d}</p></div>
            <Toggle on={s.buyerPrivacyPrefs[k]} onChange={() => {
              const turningOn = !s.buyerPrivacyPrefs[k];
              if (flow && turningOn) { s.setSecurityFlow({ type: k === "twoFactor" ? "2fa" : "biometric", onDone: () => s.setBuyerPrivacyPrefs((p: Record<string, boolean>) => ({ ...p, [k]: true })) }); return; }
              s.setBuyerPrivacyPrefs((p: Record<string, boolean>) => ({ ...p, [k]: !p[k] }));
            }} />
          </div>
        ))}
      </div>
      <Label>Account security</Label>
      <div className="space-y-3 mt-3">
        <Row icon={<Lock size={18} />} label="Change password" onClick={() => s.setSecurityFlow({ type: "change-password" })} />
        <Row icon={<Fingerprint size={18} />} label="Manage devices" sub={`${s.devices.length} active`} onClick={() => s.setSecurityFlow({ type: "manage-devices" })} />
        <Row icon={<ShieldCheck size={18} />} label="Login activity" onClick={() => s.setSecurityFlow({ type: "login-activity" })} />
      </div>
    </SubPage>
  );
}
