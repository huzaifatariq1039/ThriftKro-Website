import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, INK, PAPER, FONT, MONO } from "@/constants/theme";
import { mockProducts as products } from "@/services/mockData";
import type { Store } from "@/hooks/useStore";
import { Logo, Label, Field, inputCls, inputStyle } from "@/components/ui";

export default function AuthPage({ s, forRole }: { s: Store; forRole: "buyer" | "seller" }) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignup = s.authMode === "signup";
  const accent = forRole === "buyer" ? ORANGE : INK;

  const submit = async () => {
    setError("");
    if (!email.trim() || !pass.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (isSignup) {
      if (!fullName.trim()) {
        setError("Please enter your full name.");
        return;
      }
      if (pass !== confirm) {
        setError("Passwords do not match.");
        return;
      }
      if (pass.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
    }

    setLoading(true);
    try {
      if (isSignup) {
        await s.signupWithCredentials(email.trim(), pass, fullName.trim(), forRole);
      } else {
        await s.loginWithCredentials(email.trim(), pass, forRole);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2" style={{ fontFamily: FONT }}>
      <div className="hidden md:flex flex-col justify-between p-12" style={{ background: forRole === "buyer" ? "linear-gradient(160deg,#FF5722,#FF8A50)" : INK }}>
        <Logo size={40} />
        <div>
          <h2 className="font-extrabold text-white" style={{ fontSize: 44, lineHeight: 1, letterSpacing: "-0.03em" }}>
            {forRole === "buyer" ? "Your next favorite fit is waiting." : "Turn your closet into cash."}
          </h2>
          <p className="mt-4 text-white/70 max-w-sm text-sm">
            {forRole === "buyer" ? "Join thousands thrifting the smart way across Pakistan." : "List in minutes, reach 50K+ buyers, get paid fast."}
          </p>
        </div>
        <div className="flex -space-x-3">
          {products.slice(0, 4).map(p => <ImageWithFallback key={p.id} src={p.img} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-white/40" />)}
        </div>
      </div>

      <div className="flex flex-col justify-center px-8 md:px-16 py-12" style={{ background: PAPER }}>
        <div className="md:hidden mb-8"><Logo /></div>
        <Label>{forRole} account</Label>
        <h2 className="font-extrabold mt-2 mb-1" style={{ fontSize: 34, letterSpacing: "-0.03em", color: INK }}>{isSignup ? "Create your account" : "Welcome back"}</h2>
        <p className="text-sm mb-8" style={{ color: "rgba(26,17,8,0.55)" }}>{isSignup ? "Sign up to start in seconds." : "Log in to continue."}</p>

        <div className="space-y-4 max-w-md">
          {isSignup && (
            <Field label="Full name">
              <input
                className={inputCls}
                style={inputStyle}
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Your name"
              />
            </Field>
          )}
          <Field label="Email">
            <input
              className={inputCls}
              style={inputStyle}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
          </Field>
          <Field label="Password">
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className={inputCls}
                style={inputStyle}
                value={pass}
                onChange={e => setPass(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submit()}
                placeholder="••••••••"
              />
              <button onClick={() => setShowPass(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(26,17,8,0.4)" }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </Field>
          {isSignup && (
            <Field label="Confirm password">
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  className={inputCls}
                  style={inputStyle}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && submit()}
                  placeholder="••••••••"
                />
                <button onClick={() => setShowConfirm(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(26,17,8,0.4)" }}>
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={submit}
            disabled={loading}
            className="w-full py-4 rounded-xl font-extrabold text-white flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
            style={{ background: accent }}
          >
            {loading ? "Processing..." : isSignup ? "Create Account" : "Log In"} <ArrowRight size={18} />
          </button>

          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px" style={{ background: "rgba(26,17,8,0.1)" }} />
            <span className="text-xs" style={{ color: "rgba(26,17,8,0.4)", fontFamily: MONO }}>OR</span>
            <div className="flex-1 h-px" style={{ background: "rgba(26,17,8,0.1)" }} />
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 bg-white"
            style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.12)", color: INK }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm pt-2" style={{ color: "rgba(26,17,8,0.55)" }}>
            {isSignup ? "Already have an account?" : "New to Thrift Kro?"}{" "}
            <button
              onClick={() => {
                setError("");
                s.setAuthMode(isSignup ? "login" : "signup");
              }}
              className="font-extrabold"
              style={{ color: accent }}
            >
              {isSignup ? "Log in" : "Sign up"}
            </button>
          </p>
          <button onClick={() => s.setRoute("role-select")} className="w-full text-center text-sm font-semibold" style={{ color: "rgba(26,17,8,0.4)" }}>
            ← Choose a different role
          </button>
        </div>
      </div>
    </div>
  );
}
