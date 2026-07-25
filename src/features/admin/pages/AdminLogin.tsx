import React, { useState } from "react";
import { AlertCircle, Eye } from "lucide-react";
import thriftKroLogo from "@/assets/logo.png";
import { C, FONT, MONO } from "../data/adminData";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();

  const handle = async () => {
    setError("");
    setLoading(true);
    try {
      await adminLogin(email, password);
      onLogin();
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Check email and password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: "#FFFFFF", fontFamily: FONT }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(255,87,34,0.06) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg,${C.orange},${C.yellow})` }} />

      <div className="w-full max-w-sm relative">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center mb-4 shadow-sm" style={{ background: "#FFF3EE", border: `1.5px solid rgba(255,87,34,0.2)` }}>
            <img src={thriftKroLogo} alt="Thrift Kro" className="w-10 h-10 object-contain" />
          </div>
          <p className="text-lg font-extrabold" style={{ color: C.orange }}>Thrift Kro</p>
          <p className="text-xs mt-1" style={{ color: "#9E8A74", fontFamily: MONO }}>ADMIN CONSOLE · SECURE ACCESS</p>
        </div>

        <div className="rounded-2xl border p-8" style={{ background: "#FFFFFF", borderColor: "rgba(0,0,0,0.08)", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
          <h1 className="text-xl font-extrabold mb-1" style={{ color: "#1A1108" }}>Sign in</h1>
          <p className="text-xs mb-6" style={{ color: "#9E8A74", fontFamily: MONO }}>Restricted to authorised administrators only.</p>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "#5C4A35", fontFamily: MONO }}>EMAIL</label>
              <input className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all" style={{ background: "#FAFAFA", borderColor: "rgba(0,0,0,0.1)", color: "#1A1108", fontFamily: FONT }} onFocus={e => { e.target.style.borderColor = C.orange; e.target.style.boxShadow = `0 0 0 3px rgba(255,87,34,0.1)`; }} onBlur={e => { e.target.style.borderColor = "rgba(0,0,0,0.1)"; e.target.style.boxShadow = "none"; }} type="email" placeholder="admin@thriftkro.pk" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "#5C4A35", fontFamily: MONO }}>PASSWORD</label>
              <div className="relative">
                <input className="w-full px-4 py-3 pr-11 rounded-xl border text-sm outline-none transition-all" style={{ background: "#FAFAFA", borderColor: "rgba(0,0,0,0.1)", color: "#1A1108", fontFamily: FONT }} onFocus={e => { e.target.style.borderColor = C.orange; e.target.style.boxShadow = `0 0 0 3px rgba(255,87,34,0.1)`; }} onBlur={e => { e.target.style.borderColor = "rgba(0,0,0,0.1)"; e.target.style.boxShadow = "none"; }} type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1" onClick={() => setShowPw(v => !v)}>
                  <Eye size={14} style={{ color: "#9E8A74" }} />
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-lg" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
              <AlertCircle size={13} style={{ color: "#D93025", flexShrink: 0 }} />
              <p className="text-xs" style={{ color: "#D93025", fontFamily: FONT }}>{error}</p>
            </div>
          )}

          <button onClick={handle} disabled={loading || !email || !password} className="mt-5 w-full py-3.5 rounded-xl text-sm font-extrabold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40" style={{ background: C.orange, color: "#FFFFFF", fontFamily: FONT }}>
            {loading ? "Signing in…" : "Sign in to Dashboard"}
          </button>

          <div className="mt-4 p-3 rounded-lg border" style={{ borderColor: "rgba(230,172,0,0.3)", background: "rgba(230,172,0,0.06)" }}>
            <p className="text-xs text-center" style={{ color: "#7a5f00", fontFamily: MONO }}>Demo · admin@thriftkro.pk / Admin@123</p>
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "#9E8A74", fontFamily: MONO }}>© 2026 THRIFT KRO · MADE IN PAKISTAN 🇵🇰</p>
      </div>
    </div>
  );
}
