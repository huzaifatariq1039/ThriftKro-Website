import React, { useState } from "react";
import { Rss, ArrowRight } from "lucide-react";
import { ORANGE, INK, MONO } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { PageShell } from "../components/PageShell";

const SURFACE = "#FFFFFF";
const MUTED = "rgba(26,17,8,0.55)";
const BORDER = "rgba(26,17,8,0.08)";

const blogPosts = [
  {
    id: 1, title: "How to spot fake sneakers: the 7-point checklist", category: "Authentication", date: "Jun 22, 2026",
    excerpt: "Counterfeit sneakers are everywhere. Here's exactly what to look for before you buy — from stitching patterns to box labels.",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop&auto=format",
    readTime: "4 min",
  },
  {
    id: 2, title: "The best vintage finds under PKR 1,000 this month", category: "Style", date: "Jun 18, 2026",
    excerpt: "Our curation team scoured thousands of listings to bring you the week's best-value thrift finds. These won't last long.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
    readTime: "3 min",
  },
  {
    id: 3, title: "Circular fashion 101: why buying used is the most radical thing you can do", category: "Sustainability", date: "Jun 12, 2026",
    excerpt: "Fast fashion produces 92 million tonnes of waste a year. We break down why pre-loved is the most sustainable choice — and why it's cooler.",
    img: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600&h=400&fit=crop&auto=format",
    readTime: "6 min",
  },
  {
    id: 4, title: "Seller spotlight: how KarachiKicks grew to 2,100+ sales", category: "Seller Story", date: "Jun 5, 2026",
    excerpt: "From a closet clean-out to a full-time business — Ahmad shares how he built one of Pakistan's top-rated thrift shops.",
    img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop&auto=format",
    readTime: "5 min",
  },
  {
    id: 5, title: "AR Try-On: how we built virtual fitting rooms on a mobile camera", category: "Tech", date: "May 29, 2026",
    excerpt: "A behind-the-scenes look at the computer vision pipeline powering Thrift Kro's AR try-on feature.",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop&auto=format",
    readTime: "7 min",
  },
  {
    id: 6, title: "Style guide: how to build a full wardrobe for under PKR 5,000", category: "Style", date: "May 22, 2026",
    excerpt: "Yes, it's possible. With the right strategy and a bit of patience, a great thrift wardrobe costs less than a single fast-fashion haul.",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop&auto=format",
    readTime: "5 min",
  },
];

const blogCategories = ["All", "Style", "Sustainability", "Authentication", "Tech", "Seller Story"];
const catColors: Record<string, string> = {
  Style: ORANGE, Sustainability: "#2E9E4F", Authentication: "#7B5CF6", Tech: "#0288D1", "Seller Story": "#E6AC00",
};

export default function BlogPage({ s }: { s: Store }) {
  const [cat, setCat] = useState("All");
  const [featured, ...rest] = blogPosts;
  const filtered = (cat === "All" ? rest : rest.filter(p => p.category === cat));

  return (
    <PageShell s={s} title="Blog">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5" style={{ background: "#FFF3E0" }}>
            <Rss size={13} style={{ color: ORANGE }} /><span className="text-xs font-bold" style={{ color: ORANGE }}>THRIFT KRO JOURNAL</span>
          </div>
          <h1 className="font-extrabold" style={{ fontSize: 52, lineHeight: 1, letterSpacing: "-0.04em", color: INK }}>Stories from the<br />circular economy.</h1>
        </div>

        {/* Featured post */}
        <div className="grid md:grid-cols-2 gap-8 mb-14 rounded-3xl overflow-hidden border" style={{ background: SURFACE, borderColor: BORDER }}>
          <img src={featured.img} alt={featured.title} className="w-full h-64 md:h-full object-cover" />
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: `${catColors[featured.category] ?? ORANGE}18`, color: catColors[featured.category] ?? ORANGE, fontFamily: MONO }}>{featured.category}</span>
              <span className="text-xs" style={{ color: MUTED, fontFamily: MONO }}>{featured.date}</span>
              <span className="text-xs" style={{ color: MUTED, fontFamily: MONO }}>{featured.readTime} read</span>
            </div>
            <h2 className="font-extrabold mb-3" style={{ fontSize: 26, color: INK, lineHeight: 1.15, letterSpacing: "-0.02em" }}>{featured.title}</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: MUTED }}>{featured.excerpt}</p>
            <button className="self-start flex items-center gap-2 px-6 py-3 rounded-full font-extrabold text-sm hover:opacity-90 transition-all"
              style={{ background: ORANGE, color: "white" }}>
              Read Story <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {blogCategories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className="px-4 py-2 rounded-full text-xs font-bold border transition-all"
              style={{ background: cat === c ? INK : "transparent", color: cat === c ? "white" : MUTED, borderColor: cat === c ? INK : BORDER, fontFamily: MONO }}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map(post => (
            <div key={post.id} className="rounded-2xl border overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer" style={{ background: SURFACE, borderColor: BORDER }}>
              <div className="overflow-hidden">
                <img src={post.img} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: `${catColors[post.category] ?? ORANGE}18`, color: catColors[post.category] ?? ORANGE, fontFamily: MONO }}>{post.category}</span>
                  <span className="text-xs" style={{ color: MUTED, fontFamily: MONO }}>{post.readTime} read</span>
                </div>
                <h3 className="font-extrabold text-sm leading-snug mb-2" style={{ color: INK }}>{post.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: MUTED }}>{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs" style={{ color: MUTED, fontFamily: MONO }}>{post.date}</span>
                  <span className="text-xs font-bold flex items-center gap-1" style={{ color: ORANGE }}>Read <ArrowRight size={11} /></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="font-bold" style={{ color: INK }}>No posts in this category yet.</p>
            <p className="text-sm mt-2" style={{ color: MUTED }}>Check back soon.</p>
          </div>
        )}
      </div>
    </PageShell>
  );
}
