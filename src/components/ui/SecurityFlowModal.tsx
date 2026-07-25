import { useState, useEffect } from "react";
import {
  X, Check, Lock, Eye, EyeOff, Phone, Fingerprint, Smartphone, Monitor, LogOut,
  ShieldCheck,
} from "lucide-react";
import { ORANGE, FONT, MONO } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";

function ChangePasswordFlow({ s }: { s: Store }) {
  const [cur, setCur] = useState(""); const [next, setNext] = useState(""); const [conf, setConf] = useState(""); const [show, setShow] = useState(false);
  const strong = next.length >= 8; const match = next.length > 0 && next === conf;
  return (
    <div className="space-y-3">
      {[["Current password", cur, setCur], ["New password", next, setNext], ["Confirm new password", conf, setConf]].map(([ph, v, set], i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.12)" }}>
          <Lock size={16} style={{ color: "rgba(26,17,8,0.4)" }} />
          <input type={show ? "text" : "password"} value={v as string} onChange={e => (set as any)(e.target.value)} placeholder={ph as string} className="flex-1 bg-transparent text-sm outline-none" style={{ fontFamily: FONT }} />
        </div>
      ))}
      <button onClick={() => setShow(v => !v)} className="flex items-center gap-1.5 text-xs font-bold" style={{ color: ORANGE, fontFamily: FONT }}>{show ? <EyeOff size={13} /> : <Eye size={13} />} {show ? "Hide" : "Show"} passwords</button>
      <div className="space-y-1">
        {[["At least 8 characters", strong], ["New passwords match", match]].map(([l, ok]) => (
          <div key={l as string} className="flex items-center gap-2 text-xs" style={{ fontFamily: FONT, color: ok ? "#2E7D32" : "#8A7E72" }}><Check size={12} style={{ opacity: ok ? 1 : 0.3 }} /> {l as string}</div>
        ))}
      </div>
      <button disabled={!cur || !strong || !match} onClick={() => { s.setSecurityFlow(null); s.showToast("Password changed ✓"); }} className="w-full py-3.5 rounded-xl font-extrabold text-sm" style={{ background: (!cur || !strong || !match) ? "#E0DCD5" : ORANGE, color: "white", fontFamily: FONT }}>Update Password</button>
    </div>
  );
}

function BiometricFlow({ s }: { s: Store }) {
  const [phase, setPhase] = useState<"idle" | "scanning" | "done">("idle");
  useEffect(() => {
    if (phase === "scanning") { const t = setTimeout(() => setPhase("done"), 1800); return () => clearTimeout(t); }
    if (phase === "done") { const t = setTimeout(() => { s.securityFlow?.onDone?.(); s.setSecurityFlow(null); s.showToast("Biometric enabled ✓"); }, 900); return () => clearTimeout(t); }
  }, [phase]);
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{ background: phase === "done" ? "#E8F5E9" : "#FFF3E0", boxShadow: `0 0 0 3px ${phase === "done" ? "#2E7D32" : ORANGE}` }}>
        {phase === "done" ? <Check size={48} style={{ color: "#2E7D32" }} strokeWidth={3} /> : <Fingerprint size={56} style={{ color: ORANGE }} className={phase === "scanning" ? "animate-pulse" : ""} />}
      </div>
      <p className="text-sm font-bold text-center" style={{ fontFamily: FONT }}>
        {phase === "idle" && "Place your finger on the sensor to enroll"}
        {phase === "scanning" && "Scanning your fingerprint…"}
        {phase === "done" && "Fingerprint authenticated!"}
      </p>
      {phase === "idle" && <button onClick={() => setPhase("scanning")} className="w-full py-3.5 rounded-xl font-extrabold text-sm" style={{ background: ORANGE, color: "white", fontFamily: FONT }}>Start Scan</button>}
    </div>
  );
}

function TwoFactorFlow({ s }: { s: Store }) {
  const [step, setStep] = useState<"phone" | "otp" | "done">("phone");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const phone = s.role === "seller" ? s.sellerProfile.phone : s.buyerProfile.phone;
  useEffect(() => { if (step === "done") { const t = setTimeout(() => { s.securityFlow?.onDone?.(); s.setSecurityFlow(null); s.showToast("2FA enabled ✓"); }, 900); return () => clearTimeout(t); } }, [step]);
  return (
    <div className="space-y-4">
      {step === "phone" && (<>
        <p className="text-sm" style={{ fontFamily: FONT, color: "rgba(26,17,8,0.6)" }}>We'll send a code to your registered number to confirm it's you.</p>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.12)" }}><Phone size={16} style={{ color: "rgba(26,17,8,0.4)" }} /><span className="text-sm font-semibold" style={{ fontFamily: FONT }}>{phone}</span></div>
        <button onClick={() => setStep("otp")} className="w-full py-3.5 rounded-xl font-extrabold text-sm" style={{ background: ORANGE, color: "white", fontFamily: FONT }}>Send Code</button>
      </>)}
      {step === "otp" && (<>
        <p className="text-sm" style={{ fontFamily: FONT, color: "rgba(26,17,8,0.6)" }}>Enter the code sent to {phone}. (Demo: type any 4 digits)</p>
        <div className="flex gap-2 justify-center">
          {otp.map((d, i) => <input key={i} value={d} maxLength={1} inputMode="numeric" onChange={e => setOtp(prev => prev.map((x, ix) => ix === i ? e.target.value.replace(/\D/g, "") : x))} className="w-12 h-14 rounded-xl text-center text-lg font-bold outline-none" style={{ fontFamily: MONO, boxShadow: "0 0 0 1px rgba(26,17,8,0.15)" }} />)}
        </div>
        <button disabled={otp.some(d => !d)} onClick={() => setStep("done")} className="w-full py-3.5 rounded-xl font-extrabold text-sm" style={{ background: otp.some(d => !d) ? "#E0DCD5" : ORANGE, color: "white", fontFamily: FONT }}>Verify & Enable</button>
      </>)}
      {step === "done" && (<div className="flex flex-col items-center gap-3 py-4"><div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "#E8F5E9", boxShadow: "0 0 0 3px #2E7D32" }}><ShieldCheck size={40} style={{ color: "#2E7D32" }} /></div><p className="text-sm font-bold" style={{ fontFamily: FONT }}>Two-factor authentication on!</p></div>)}
    </div>
  );
}

function ManageDevicesFlow({ s }: { s: Store }) {
  return (
    <div className="space-y-3">
      <p className="text-sm" style={{ fontFamily: FONT, color: "rgba(26,17,8,0.6)" }}>These devices are currently signed in to your account.</p>
      {s.devices.map(d => (
        <div key={d.id} className="flex items-center gap-3 p-3 rounded-2xl" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#FFF3E0" }}>{d.os === "desktop" ? <Monitor size={18} style={{ color: ORANGE }} /> : <Smartphone size={18} style={{ color: ORANGE }} />}</div>
          <div className="flex-1 min-w-0"><p className="text-sm font-bold" style={{ fontFamily: FONT }}>{d.name}</p><p className="text-xs" style={{ fontFamily: FONT, color: "rgba(26,17,8,0.5)" }}>{d.info} · {d.time}</p></div>
          {d.current ? <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: "#E8F5E9", color: "#2E7D32", fontFamily: FONT }}>This device</span> : <button onClick={() => { s.setDevices(prev => prev.filter(x => x.id !== d.id)); s.showToast("Device signed out"); }} className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg" style={{ boxShadow: "0 0 0 1px #DC2626", color: "#DC2626", fontFamily: FONT }}><LogOut size={12} /> Log out</button>}
        </div>
      ))}
      <button onClick={() => { s.setDevices(prev => prev.filter(d => d.current)); s.showToast("Signed out everywhere else"); }} className="w-full py-3 rounded-xl font-bold text-sm" style={{ boxShadow: "0 0 0 1.5px #DC2626", color: "#DC2626", fontFamily: FONT }}>Log out all other devices</button>
    </div>
  );
}

function LoginActivityFlow() {
  const events = [
    { icon: <Monitor size={16} />, label: "MacBook Pro · Chrome", loc: "Lahore, PK", time: "Today, 9:41 AM", ok: true },
    { icon: <Smartphone size={16} />, label: "iPhone 15 Pro", loc: "Karachi, PK", time: "24 Jun, 6:12 PM", ok: true },
    { icon: <Smartphone size={16} />, label: "Unknown device", loc: "Multan, PK", time: "20 Jun, 2:03 AM", ok: false },
    { icon: <Monitor size={16} />, label: "Safari · macOS", loc: "Islamabad, PK", time: "18 Jun, 11:20 AM", ok: true },
  ];
  return (
    <div className="space-y-2">
      <p className="text-sm mb-1" style={{ fontFamily: FONT, color: "rgba(26,17,8,0.6)" }}>Recent sign-in activity on your account.</p>
      {events.map((e, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}>
          <span style={{ color: e.ok ? ORANGE : "#DC2626" }}>{e.icon}</span>
          <div className="flex-1"><p className="text-sm font-bold" style={{ fontFamily: FONT }}>{e.label}</p><p className="text-xs" style={{ fontFamily: FONT, color: "rgba(26,17,8,0.5)" }}>{e.loc} · {e.time}</p></div>
          {!e.ok && <span className="text-xs font-bold" style={{ color: "#DC2626", fontFamily: FONT }}>Suspicious</span>}
        </div>
      ))}
    </div>
  );
}

export function SecurityFlowModal({ s }: { s: Store }) {
  if (!s.securityFlow) return null;
  const titles = { "change-password": "Change Password", "manage-devices": "Manage Devices", "login-activity": "Login Activity", "biometric": "Enable Biometric Login", "2fa": "Two-Factor Authentication" };
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }} onClick={() => s.setSecurityFlow(null)}>
      <div className="bg-white rounded-3xl w-full max-w-md p-6 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()} style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.3)" }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-extrabold text-lg" style={{ fontFamily: FONT }}>{titles[s.securityFlow.type]}</h3>
          <button onClick={() => s.setSecurityFlow(null)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.12)" }}><X size={16} /></button>
        </div>
        {s.securityFlow.type === "change-password" && <ChangePasswordFlow s={s} />}
        {s.securityFlow.type === "manage-devices" && <ManageDevicesFlow s={s} />}
        {s.securityFlow.type === "login-activity" && <LoginActivityFlow />}
        {s.securityFlow.type === "biometric" && <BiometricFlow s={s} />}
        {s.securityFlow.type === "2fa" && <TwoFactorFlow s={s} />}
      </div>
    </div>
  );
}
