import React from "react";
import { Newspaper, ExternalLink, Package } from "lucide-react";
import { ORANGE, YELLOW, INK, MONO } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { PageShell } from "../components/PageShell";

const SURFACE = "#FFFFFF";
const MUTED = "rgba(26,17,8,0.55)";
const BORDER = "rgba(26,17,8,0.08)";

const pressCoverage = [
  { outlet: "Dawn Business", headline: "Thrift Kro is building Pakistan's answer to Depop", date: "Jun 2026", type: "Feature", url: "#" },
  { outlet: "The News", headline: "Circular fashion startup raises seed round to expand nationwide", date: "May 2026", type: "Funding", url: "#" },
  { outlet: "Aurora Magazine", headline: "How Gen Z is reshaping fashion retail in Pakistan", date: "Apr 2026", type: "Feature", url: "#" },
  { outlet: "TechJuice", headline: "Thrift Kro's AI verification system cuts counterfeit listings by 84%", date: "Mar 2026", type: "Tech", url: "#" },
  { outlet: "Profit by Pakistan Today", headline: "The second-hand economy: PKR 50 billion opportunity no one is chasing", date: "Feb 2026", type: "Analysis", url: "#" },
];

const pressKit = [
  { label: "Brand Logo (PNG, SVG)", size: "2.1 MB" },
  { label: "Product Screenshots", size: "8.4 MB" },
  { label: "Founder Photos", size: "5.2 MB" },
  { label: "Company Fact Sheet", size: "420 KB" },
];

export default function PressPage({ s }: { s: Store }) {
  return (
    <PageShell s={s} title="Press">
      <div className="max-w-5xl mx-auto px-8 py-16">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5" style={{ background: "#FFF3E0" }}>
            <Newspaper size={13} style={{ color: ORANGE }} /><span className="text-xs font-bold" style={{ color: ORANGE }}>PRESS ROOM</span>
          </div>
          <h1 className="font-extrabold mb-4" style={{ fontSize: 52, lineHeight: 1, letterSpacing: "-0.04em", color: INK }}>
            Thrift Kro<br />in the news.
          </h1>
          <p className="text-base max-w-lg" style={{ color: MUTED }}>
            For press inquiries, interviews, and media assets — reach us at{" "}
            <a href="mailto:press@thriftkro.pk" style={{ color: ORANGE, fontWeight: 700 }}>press@thriftkro.pk</a>
          </p>
        </div>

        {/* Coverage */}
        <h2 className="font-extrabold mb-5" style={{ fontSize: 22, color: INK }}>Media Coverage</h2>
        <div className="space-y-3 mb-14">
          {pressCoverage.map((item, i) => (
            <a key={i} href={item.url}
              className="flex items-center justify-between p-5 rounded-2xl border hover:border-orange-400 transition-all group"
              style={{ background: SURFACE, borderColor: BORDER }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FFF3E0" }}>
                  <Newspaper size={18} style={{ color: ORANGE }} />
                </div>
                <div>
                  <p className="font-bold text-sm leading-snug" style={{ color: INK }}>{item.headline}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-bold" style={{ color: ORANGE }}>{item.outlet}</span>
                    <span className="text-xs" style={{ color: MUTED, fontFamily: MONO }}>{item.date}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: `${ORANGE}15`, color: ORANGE, fontFamily: MONO }}>{item.type}</span>
                  </div>
                </div>
              </div>
              <ExternalLink size={15} style={{ color: MUTED }} className="flex-shrink-0 group-hover:text-orange-500 transition-colors" />
            </a>
          ))}
        </div>

        {/* Press kit */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          <div>
            <h2 className="font-extrabold mb-5" style={{ fontSize: 22, color: INK }}>Press Kit</h2>
            <div className="space-y-2">
              {pressKit.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border" style={{ background: SURFACE, borderColor: BORDER }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#FFF3E0" }}>
                      <Package size={14} style={{ color: ORANGE }} />
                    </div>
                    <p className="text-sm font-semibold" style={{ color: INK }}>{item.label}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: MUTED, fontFamily: MONO }}>{item.size}</span>
                    <button className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: INK, color: "white", fontFamily: MONO }}>↓</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 rounded-2xl" style={{ background: INK }}>
            <p className="font-extrabold text-white mb-2" style={{ fontSize: 20 }}>Media Contact</p>
            <p className="text-white/60 text-sm mb-6">We respond to all press inquiries within 24 hours on business days.</p>
            <div className="space-y-3">
              {[
                { label: "General Press", value: "press@thriftkro.pk" },
                { label: "Partnerships", value: "partners@thriftkro.pk" },
                { label: "Events", value: "events@thriftkro.pk" },
              ].map(c => (
                <div key={c.label}>
                  <p className="text-xs text-white/40 uppercase tracking-wider" style={{ fontFamily: MONO }}>{c.label}</p>
                  <a href={`mailto:${c.value}`} className="text-sm font-bold" style={{ color: YELLOW }}>{c.value}</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick facts */}
        <h2 className="font-extrabold mb-5" style={{ fontSize: 22, color: INK }}>Company Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { stat: "2024", label: "Founded" },
            { stat: "50K+", label: "Active users" },
            { stat: "120K+", label: "Items listed" },
            { stat: "60+", label: "Cities covered" },
          ].map(f => (
            <div key={f.label} className="p-5 rounded-2xl border text-center" style={{ background: SURFACE, borderColor: BORDER }}>
              <p className="font-extrabold" style={{ fontSize: 28, color: ORANGE, letterSpacing: "-0.03em" }}>{f.stat}</p>
              <p className="text-sm mt-1" style={{ color: MUTED }}>{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
