import React, { useState } from "react";
import { BookOpen, ArrowRight, ArrowLeft, Users, ShieldCheck, Package, Camera, Tag, Star, CheckCircle2, ChevronDown } from "lucide-react";
import { ORANGE, YELLOW, INK, MONO } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { PageShell } from "../components/PageShell";

const SURFACE = "#FFFFFF";
const MUTED = "rgba(26,17,8,0.55)";
const BORDER = "rgba(26,17,8,0.08)";

const guideSteps = [
  {
    step: "01", title: "Create your account", icon: <Users size={22} />,
    body: "Sign up with your phone number or email. It takes under 2 minutes. You can set up your shop name, bio, and profile photo right away.",
    tips: ["Use a clear profile photo — buyers trust faces", "Pick a memorable shop name (e.g. KarachiKicks, VintageLahore)", "Add your city so buyers know where you ship from"],
  },
  {
    step: "02", title: "Verify your identity (KYC)", icon: <ShieldCheck size={22} />,
    body: "To start selling and receiving payouts, you need to complete KYC (Know Your Customer). This protects both buyers and sellers.",
    tips: ["Upload a clear photo of your CNIC (both sides)", "Add a selfie with your CNIC for verification", "Business sellers: attach a shop photo or trade licence", "Review usually takes 24–48 hours"],
  },
  {
    step: "03", title: "List your first item", icon: <Package size={22} />,
    body: "Hit the + button in your seller dashboard to add a listing. Our AI will scan the photos to verify authenticity and suggest the right category.",
    tips: ["Use 4–8 photos: front, back, sole, tags, close-up defects", "Be honest about condition (Excellent / Good / Fair)", "Set a fair price — check what similar items sold for", "Write a short description with brand, size, and any flaws"],
  },
  {
    step: "04", title: "Photograph like a pro", icon: <Camera size={22} />,
    body: "Good photos are the #1 driver of sales. You don't need a studio — a clean wall and natural light are enough.",
    tips: ["Shoot in daylight or by a window", "Use a plain white or neutral wall as backdrop", "Show every angle: front, back, side profile", "Photograph defects clearly — no surprises for buyers"],
  },
  {
    step: "05", title: "Set pricing & shipping", icon: <Tag size={22} />,
    body: "Price competitively. Thrift Kro takes a 2% escrow fee on completed sales. You set the shipping cost or offer free shipping to attract buyers.",
    tips: ["Research comparable listings before pricing", "Free shipping boosts visibility in search", "Offer bundle deals to move multiple items", "Our 2% fee is only charged on completed orders"],
  },
  {
    step: "06", title: "Ship fast, get paid", icon: <Star size={22} />,
    body: "Once a buyer places an order, funds go into escrow. Ship within 2 days and mark as shipped. Once delivered, escrow is released to your account.",
    tips: ["Pack items securely — use bubble wrap for shoes", "Use TCS or Leopard for reliable delivery", "Upload tracking within 24 hours of shipping", "Funds release 48 hours after confirmed delivery"],
  },
];

export default function SellerGuidePage({ s }: { s: Store }) {
  const [active, setActive] = useState(0);
  return (
    <PageShell s={s} title="Seller Guide">
      <div className="max-w-5xl mx-auto px-8 py-16">
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5" style={{ background: "#FFF3E0" }}>
            <BookOpen size={13} style={{ color: ORANGE }} /><span className="text-xs font-bold" style={{ color: ORANGE }}>SELLER GUIDE</span>
          </div>
          <h1 className="font-extrabold" style={{ fontSize: 52, lineHeight: 1, letterSpacing: "-0.04em", color: INK }}>
            Everything you need<br />to start selling.
          </h1>
          <p className="mt-5 text-base mx-auto max-w-md" style={{ color: MUTED }}>
            From account setup to your first payout — a step-by-step walkthrough for new sellers.
          </p>
          <button onClick={() => s.setRoute("seller-auth")}
            className="mt-7 inline-flex items-center gap-2 px-7 py-4 rounded-full font-extrabold hover:opacity-90 transition-all"
            style={{ background: ORANGE, color: "white" }}>
            Start Selling Now <ArrowRight size={16} />
          </button>
        </div>

        {/* Step nav + content */}
        <div className="flex gap-6">
          {/* Sidebar nav */}
          <div className="hidden md:flex flex-col gap-1 flex-shrink-0" style={{ width: 220 }}>
            {guideSteps.map((g, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                style={{ background: active === i ? INK : "transparent", color: active === i ? "white" : MUTED }}>
                <span className="text-xs font-bold" style={{ fontFamily: MONO, color: active === i ? YELLOW : "inherit" }}>{g.step}</span>
                <span className="text-sm font-semibold">{g.title}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 rounded-2xl border p-8" style={{ background: SURFACE, borderColor: BORDER }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#FFF3E0", color: ORANGE }}>
                {guideSteps[active].icon}
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color: ORANGE, fontFamily: MONO }}>STEP {guideSteps[active].step}</p>
                <h2 className="font-extrabold" style={{ fontSize: 24, color: INK, letterSpacing: "-0.02em" }}>{guideSteps[active].title}</h2>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: MUTED }}>{guideSteps[active].body}</p>
            <div className="space-y-2.5">
              {guideSteps[active].tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={15} style={{ color: ORANGE, flexShrink: 0, marginTop: 1 }} />
                  <p className="text-sm" style={{ color: INK }}>{tip}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: BORDER }}>
              <button onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border transition-all disabled:opacity-30"
                style={{ borderColor: BORDER, color: INK }}>
                <ArrowLeft size={14} /> Previous
              </button>
              {active < guideSteps.length - 1 ? (
                <button onClick={() => setActive(active + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-all"
                  style={{ background: ORANGE, color: "white" }}>
                  Next <ArrowRight size={14} />
                </button>
              ) : (
                <button onClick={() => s.setRoute("seller-auth")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-all"
                  style={{ background: ORANGE, color: "white" }}>
                  Start Selling <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile step pills */}
        <div className="flex md:hidden gap-2 mt-6 flex-wrap">
          {guideSteps.map((g, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{ background: active === i ? INK : `${INK}10`, color: active === i ? "white" : MUTED, fontFamily: MONO }}>
              {g.step}
            </button>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="font-extrabold mb-6" style={{ fontSize: 28, color: INK, letterSpacing: "-0.02em" }}>Common Questions</h2>
          <div className="space-y-3">
            {[
              ["How long does KYC verification take?", "Usually 24–48 hours on business days. You'll get a notification when approved."],
              ["When do I receive my payout?", "Escrow is released to your balance 48 hours after confirmed delivery. Withdraw anytime to your bank."],
              ["What happens if a buyer disputes my item?", "Our Trust & Safety team reviews the dispute. Honest sellers with good photos almost always win."],
              ["Can I sell as a business / shop?", "Yes — choose 'Warehouse' or 'Shop' during KYC to list unlimited items."],
            ].map(([q, a], i) => (
              <details key={i} className="group rounded-xl border overflow-hidden" style={{ borderColor: BORDER }}>
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-sm" style={{ color: INK }}>
                  {q}
                  <ChevronDown size={15} style={{ color: MUTED }} className="group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-sm" style={{ color: MUTED }}>{a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
