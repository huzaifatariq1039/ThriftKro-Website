import React, { useState } from "react";
import { ArrowRight, Sparkles, Recycle, ShieldCheck, Mail, Target, Leaf, Store as StoreIcon, Star, Instagram, Twitter, Facebook } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import logoImg from "@/assets/logo.png";
import { ORANGE, YELLOW, INK, PAPER, FONT, MONO } from "@/constants/theme";
import { mockProducts as products } from "@/services/mockData";
import type { Store } from "@/hooks/useStore";
import { Logo, Label } from "@/components/ui";

export default function LandingPage({ s, onAdminClick }: { s: Store; onAdminClick?: () => void }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  return (
    <div className="min-h-screen" style={{ background: PAPER, fontFamily: FONT }}>
      <header className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {["Discover", "Try-On", "Sell", "About"].map(x => <span key={x} className="text-sm font-semibold cursor-pointer hover:opacity-60" style={{ color: INK }}>{x}</span>)}
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-8 pt-10 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: "#FFF3E0" }}>
            <Sparkles size={14} style={{ color: ORANGE }} /><span className="text-xs font-bold" style={{ color: ORANGE }}>Pakistan's #1 circular fashion marketplace</span>
          </div>
          <h1 className="font-extrabold" style={{ fontSize: 64, lineHeight: 0.95, letterSpacing: "-0.04em", color: INK }}>
            Try Kro.<br />Buy Kro.<br /><span style={{ color: ORANGE }}>Thrift Kro.</span>
          </h1>
          <p className="mt-6 text-base max-w-md" style={{ color: "rgba(26,17,8,0.6)" }}>
            Buy & sell pre-loved streetwear, sneakers and vintage. Try them on with AR before you commit. Sustainable never looked this good.
          </p>
          <div className="mt-8 flex gap-3">
            <button onClick={() => s.setRoute("role-select")} className="px-7 py-4 rounded-full font-extrabold flex items-center gap-2" style={{ background: ORANGE, color: "white" }}>Get Started <ArrowRight size={18} /></button>
          </div>
          <div className="mt-10 flex gap-10">
            {[["50K+", "Active users"], ["120K+", "Items listed"], ["4.9★", "Avg. rating"]].map(([n, l]) => (
              <div key={l}><p className="font-extrabold" style={{ fontSize: 28, letterSpacing: "-0.02em", color: INK }}>{n}</p><Label>{l}</Label></div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {products.slice(0, 4).map((p, i) => (
            <div key={p.id} className={`rounded-3xl overflow-hidden ${i % 2 ? "mt-8" : ""}`} style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}>
              <ImageWithFallback src={p.img} alt={p.name} className="w-full aspect-square object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-16" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-8">
          {[[<Recycle size={24} />, "Circular by design", "Every purchase keeps clothing out of landfills and in rotation."], [<Sparkles size={24} />, "AR Try-On", "See how sneakers & fits look on you before you buy — no guesswork."], [<ShieldCheck size={24} />, "Buyer Protection", "7-day protection on every order. Shop with total peace of mind."]].map(([ic, t, d], i) => (
            <div key={i}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: YELLOW }}><span style={{ color: INK }}>{ic as React.ReactNode}</span></div>
              <p className="font-extrabold text-white text-lg mb-2">{t as string}</p>
              <p className="text-sm text-white/50">{d as string}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5" style={{ background: "#FFF3E0" }}><Target size={14} style={{ color: ORANGE }} /><span className="text-xs font-bold" style={{ color: ORANGE }}>OUR VISION</span></div>
            <h2 className="font-extrabold" style={{ fontSize: 44, lineHeight: 1.02, letterSpacing: "-0.03em", color: INK }}>A Pakistan where nothing goes to waste.</h2>
            <p className="mt-5 text-base" style={{ color: "rgba(26,17,8,0.6)" }}>
              Pakistan generates thousands of tonnes of textile waste annually. Thrift Kro is building the infrastructure for circular fashion — empowering a new generation to shop consciously without compromising on style.
            </p>
            <div className="mt-8 space-y-4">
              {[["Empowering local thrifters", "Giving small sellers, Instagram thrift stores & boutiques a digital-first platform."], ["Verified authenticity", "AI-powered quality control ensures every listed item is legitimate."], ["Zero friction AR fitting", "Try on shoes & apparel directly from your camera, reducing returns by 60%."]].map(([t, d], i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FFF3E0" }}><Leaf size={16} style={{ color: ORANGE }} /></div>
                  <div><p className="font-bold text-sm" style={{ color: INK }}>{t}</p><p className="text-xs mt-0.5" style={{ color: "rgba(26,17,8,0.55)" }}>{d}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden relative group h-72" style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80&fit=crop&auto=format"
                alt="Curated Vintage Clothing"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-7 flex flex-col justify-end">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold w-fit mb-2.5" style={{ background: YELLOW, color: INK }}>
                  <Sparkles size={13} />
                  <span>Curated Weekly Drops</span>
                </div>
                <h3 className="font-extrabold text-white text-2xl leading-tight mb-1">
                  Fresh Vintage & Streetwear
                </h3>
                <p className="text-sm text-white/80 max-w-sm">
                  Hand-picked pre-loved fits added daily nationwide with 100% buyer protection.
                </p>
              </div>
            </div>
            <div className="rounded-3xl p-8 bg-white border" style={{ borderColor: "rgba(26,17,8,0.08)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: "#FFF3E0" }}><Star size={24} style={{ color: ORANGE }} /></div>
              <h3 className="font-extrabold text-2xl mb-2" style={{ color: INK }}>Loved by 50K+ Buyers</h3>
              <p className="text-sm mb-4" style={{ color: "rgba(26,17,8,0.55)" }}>"The AR try-on feature is insane. I bought my Jordan 1s here and they fit perfectly!"</p>
              <p className="text-xs font-bold" style={{ color: ORANGE, fontFamily: MONO }}>— ZAYN A. · LAHORE</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-16" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Logo light />
            <p className="mt-4 text-xs max-w-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
              Pakistan's first circular fashion & AR try-on marketplace. Empowering buyers and sellers to shop pre-loved.
            </p>
            <div className="flex gap-3 mt-6">
              {[<Instagram size={18} />, <Twitter size={18} />, <Facebook size={18} />].map((ic, i) => (
                <div key={i} className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>{ic}</div>
              ))}
            </div>
          </div>
          {[
            ["Marketplace", ["Discover", "Sneakers", "Streetwear", "Vintage", "Bags"]],
            ["Company", ["About Us", "Careers", "Press", "Seller Guide", "Blog"]],
            ["Trust & Legal", ["Privacy Policy", "Terms of Service", "Buyer Protection", "Authentication", "Contact"]],
          ].map(([t, links], i) => (
            <div key={i}>
              <p className="font-bold text-xs uppercase tracking-wider mb-4" style={{ fontFamily: MONO, color: "white" }}>{t as string}</p>
              <div className="space-y-2.5">
                {(links as string[]).map(l => (
                  <p key={l} className="text-xs cursor-pointer hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.6)" }} onClick={() => {
                    if (l === "Careers") s.setRoute("careers");
                    else if (l === "Press") s.setRoute("press");
                    else if (l === "Seller Guide") s.setRoute("seller-guide");
                    else if (l === "Blog") s.setRoute("blog");
                    else if (l === "Discover") s.setRoute("buyer-home");
                    else s.setRoute("landing");
                  }}>{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: MONO }}>© 2026 THRIFT KRO · MADE WITH ♥ IN PAKISTAN 🇵🇰</p>
          <button onClick={onAdminClick} className="text-xs font-bold px-3.5 py-1.5 rounded-full hover:opacity-90 transition-opacity" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontFamily: MONO }}>
            Admin Portal Access →
          </button>
        </div>
      </footer>
    </div>
  );
}
