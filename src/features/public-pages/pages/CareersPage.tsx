import React, { useState } from "react";
import { Briefcase, Globe, Award, Sparkles, Users, Clock, MapPin, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { ORANGE, YELLOW, INK, MONO } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { PageShell } from "../components/PageShell";

export interface JobPost {
  id: number;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Internship" | "Part-time";
  description: string;
  posted: string;
  active: boolean;
}

export const defaultJobs: JobPost[] = [
  {
    id: 1, title: "Senior Full-Stack Engineer (React + Node)", department: "Engineering", location: "Lahore / Remote", type: "Full-time",
    description: "Build the next gen of circular commerce in Pakistan. Help scale our AR pipeline and marketplace engine.",
    posted: "2 days ago", active: true,
  },
  {
    id: 2, title: "Computer Vision / AR Intern", department: "Engineering", location: "Lahore (On-site)", type: "Internship",
    description: "Work directly on our WebXR/Three.js Virtual Try-On system for footwear and apparel.",
    posted: "5 days ago", active: true,
  },
  {
    id: 3, title: "Head of Growth & Community", department: "Marketing", location: "Karachi / Remote", type: "Full-time",
    description: "Lead user acquisition across Instagram, TikTok and campus brand ambassador programs nationwide.",
    posted: "1 week ago", active: true,
  },
  {
    id: 4, title: "Trust & Safety Specialist", department: "Operations", location: "Lahore", type: "Full-time",
    description: "Review KYC submissions, oversee dispute resolution, and manage AI catalog moderation.",
    posted: "2 weeks ago", active: true,
  },
];

const SURFACE = "#FFFFFF";
const MUTED = "rgba(26,17,8,0.55)";
const BORDER = "rgba(26,17,8,0.08)";

export default function CareersPage({ s, jobs = defaultJobs }: { s: Store; jobs?: JobPost[] }) {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);
  const types = ["All", "Full-time", "Internship", "Part-time"];
  const visible = filter === "All" ? jobs.filter(j => j.active) : jobs.filter(j => j.active && j.type === filter);
  const depts = [...new Set(visible.map(j => j.department))];

  return (
    <PageShell s={s} title="Careers">
      {/* Hero */}
      <div className="py-20 px-8 text-center" style={{ background: INK }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: "rgba(255,214,0,0.15)" }}>
          <Briefcase size={13} style={{ color: YELLOW }} /><span className="text-xs font-bold" style={{ color: YELLOW }}>JOIN THE TEAM</span>
        </div>
        <h1 className="font-extrabold text-white mx-auto" style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.04em", maxWidth: 680 }}>
          Help build Pakistan's circular fashion future.
        </h1>
        <p className="mt-5 text-white/60 text-base mx-auto max-w-lg">
          We're a small, ambitious team moving fast. If you care about fashion, tech, and sustainability — we want you.
        </p>
        <div className="flex items-center justify-center gap-8 mt-10">
          {[["15+", "Team members"], ["3", "Cities"], ["100% Remote OK", "Most roles"]].map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="font-extrabold text-white" style={{ fontSize: 26, letterSpacing: "-0.02em" }}>{n}</p>
              <p className="text-xs text-white/50 mt-0.5" style={{ fontFamily: MONO }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Perks */}
      <div className="max-w-5xl mx-auto px-8 py-16">
        <h2 className="font-extrabold text-center mb-10" style={{ fontSize: 32, letterSpacing: "-0.03em", color: INK }}>Why Thrift Kro?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { icon: <Globe size={20} />, title: "Remote-first", sub: "Work from anywhere in Pakistan" },
            { icon: <Award size={20} />, title: "Competitive pay", sub: "Market + equity for senior hires" },
            { icon: <Sparkles size={20} />, title: "Real ownership", sub: "Ship fast, own your outcomes" },
            { icon: <Users size={20} />, title: "Small team", sub: "No bureaucracy, high impact" },
          ].map((p, i) => (
            <div key={i} className="p-6 rounded-2xl text-center border" style={{ background: SURFACE, borderColor: BORDER }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "#FFF3E0", color: ORANGE }}>{p.icon}</div>
              <p className="font-bold text-sm" style={{ color: INK }}>{p.title}</p>
              <p className="text-xs mt-1" style={{ color: MUTED }}>{p.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Job list */}
      <div className="max-w-4xl mx-auto px-8 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-extrabold" style={{ fontSize: 28, letterSpacing: "-0.03em", color: INK }}>Open Positions</h2>
          <div className="flex rounded-full overflow-hidden border" style={{ borderColor: BORDER }}>
            {types.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className="px-4 py-2 text-xs font-bold transition-all"
                style={{ background: filter === t ? INK : "transparent", color: filter === t ? "white" : MUTED, fontFamily: MONO }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {depts.map(dept => (
          <div key={dept} className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: MUTED, fontFamily: MONO }}>{dept}</p>
            <div className="space-y-3">
              {visible.filter(j => j.department === dept).map(job => (
                <div key={job.id} className="rounded-2xl border overflow-hidden" style={{ background: SURFACE, borderColor: BORDER }}>
                  <button className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setExpanded(expanded === job.id ? null : job.id)}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FFF3E0" }}>
                        <Briefcase size={16} style={{ color: ORANGE }} />
                      </div>
                      <div>
                        <p className="font-bold" style={{ color: INK }}>{job.title}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1 text-xs" style={{ color: MUTED }}>
                            <Clock size={11} />{job.type}
                          </span>
                          <span className="flex items-center gap-1 text-xs" style={{ color: MUTED }}>
                            <MapPin size={11} />{job.location}
                          </span>
                          <span className="text-xs" style={{ color: MUTED, fontFamily: MONO }}>{job.posted}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                        style={{ background: job.type === "Internship" ? `${YELLOW}30` : `${ORANGE}15`, color: job.type === "Internship" ? "#7a5f00" : ORANGE, fontFamily: MONO }}>
                        {job.type}
                      </span>
                      {expanded === job.id ? <ChevronUp size={16} style={{ color: MUTED }} /> : <ChevronDown size={16} style={{ color: MUTED }} />}
                    </div>
                  </button>
                  {expanded === job.id && (
                    <div className="px-5 pb-5 border-t" style={{ borderColor: BORDER }}>
                      <p className="text-sm mt-4 mb-5" style={{ color: MUTED }}>{job.description}</p>
                      <a href={`mailto:careers@thriftkro.pk?subject=Application: ${job.title}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-extrabold text-sm hover:opacity-90 transition-all"
                        style={{ background: ORANGE, color: "white" }}>
                        Apply Now <ArrowRight size={15} />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {visible.length === 0 && (
          <div className="text-center py-16 rounded-2xl border" style={{ borderColor: BORDER }}>
            <p className="font-bold" style={{ color: INK }}>No openings in this category right now.</p>
            <p className="text-sm mt-2" style={{ color: MUTED }}>Check back soon — we're growing fast.</p>
          </div>
        )}

        <div className="mt-10 p-8 rounded-2xl text-center" style={{ background: INK }}>
          <p className="font-extrabold text-white text-lg">Don't see the right fit?</p>
          <p className="text-sm text-white/60 mt-2">Send your CV to <span style={{ color: YELLOW }}>careers@thriftkro.pk</span> — we keep strong applications on file.</p>
        </div>
      </div>
    </PageShell>
  );
}
