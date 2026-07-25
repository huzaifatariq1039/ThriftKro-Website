import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { C, FONT, MONO } from "../data/adminData";
import { JobPost, defaultJobs } from "@/features/public-pages/pages/CareersPage";

export default function PageCareers() {
  const [jobs, setJobs] = useState<JobPost[]>(defaultJobs);
  const [showForm, setShowForm] = useState(false);
  const blank: Omit<JobPost, "id"> = { title: "", type: "Full-time", department: "", location: "", posted: "", description: "", active: true };
  const [draft, setDraft] = useState(blank);

  const addJob = () => {
    if (!draft.title.trim()) return;
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    setJobs(p => [...p, { ...draft, id: Date.now(), posted: today }]);
    setDraft(blank); setShowForm(false);
  };
  const toggle = (id: number) => setJobs(p => p.map(j => j.id === id ? { ...j, active: !j.active } : j));
  const remove = (id: number) => setJobs(p => p.filter(j => j.id !== id));

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Openings", value: String(jobs.filter(j => j.active).length), color: C.green },
          { label: "Total Posts", value: String(jobs.length), color: C.orange },
          { label: "Internships", value: String(jobs.filter(j => j.type === "Internship" && j.active).length), color: C.yellow },
        ].map(c => (
          <div key={c.label} className="p-5 rounded-xl border" style={{ background: C.surface, borderColor: C.border }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.textDim, fontFamily: MONO }}>{c.label}</p>
            <p className="text-3xl font-bold" style={{ color: c.color, fontFamily: FONT }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Job list */}
      <div className="rounded-xl border overflow-hidden" style={{ background: C.surface, borderColor: C.border }}>
        <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: C.border }}>
          <h3 className="text-sm font-bold" style={{ color: C.text, fontFamily: FONT }}>Job Postings</h3>
          <button onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold hover:opacity-90 active:scale-95 transition-all"
            style={{ background: C.orange, color: "#1A1108", fontFamily: FONT }}>
            <Plus size={12} /> New Posting
          </button>
        </div>

        {/* New job form */}
        {showForm && (
          <div className="px-5 py-5 border-b" style={{ borderColor: C.border, background: `${C.orange}06` }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange, fontFamily: MONO }}>New Job Posting</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input className="px-3 py-2 rounded-lg border text-xs outline-none"
                style={{ background: C.bg, borderColor: C.border, color: C.text, fontFamily: FONT }}
                placeholder="Job Title *" value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} />
              <select className="px-3 py-2 rounded-lg border text-xs outline-none"
                style={{ background: C.bg, borderColor: C.border, color: C.text, fontFamily: FONT }}
                value={draft.type} onChange={e => setDraft(d => ({ ...d, type: e.target.value as JobPost["type"] }))}>
                {["Full-time", "Internship", "Part-time"].map(t => <option key={t}>{t}</option>)}
              </select>
              <input className="px-3 py-2 rounded-lg border text-xs outline-none"
                style={{ background: C.bg, borderColor: C.border, color: C.text, fontFamily: FONT }}
                placeholder="Department" value={draft.department} onChange={e => setDraft(d => ({ ...d, department: e.target.value }))} />
              <input className="px-3 py-2 rounded-lg border text-xs outline-none"
                style={{ background: C.bg, borderColor: C.border, color: C.text, fontFamily: FONT }}
                placeholder="Location" value={draft.location} onChange={e => setDraft(d => ({ ...d, location: e.target.value }))} />
            </div>
            <textarea className="w-full px-3 py-2 rounded-lg border text-xs outline-none resize-none mb-3"
              style={{ background: C.bg, borderColor: C.border, color: C.text, fontFamily: FONT, height: 72 }}
              placeholder="Job description..." value={draft.description} onChange={e => setDraft(d => ({ ...d, description: e.target.value }))} />
            <div className="flex gap-2">
              <button onClick={addJob} className="px-4 py-2 rounded-lg text-xs font-bold hover:opacity-90 transition-all"
                style={{ background: C.orange, color: "#1A1108", fontFamily: FONT }}>Publish Job</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg text-xs font-semibold border hover:bg-white/5 transition-all"
                style={{ borderColor: C.border, color: C.textMuted, fontFamily: FONT }}>Cancel</button>
            </div>
          </div>
        )}

        <table className="w-full">
          <thead>
            <tr style={{ background: `${C.bg}80` }}>
              {["Title", "Type", "Department", "Location", "Posted", "Status", "Actions"].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: C.textDim, fontFamily: MONO, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobs.map((j, i) => (
              <tr key={j.id} className="border-b hover:bg-white/[0.02] transition-colors"
                style={{ borderColor: i === jobs.length - 1 ? "transparent" : `${C.border}40` }}>
                <td className="px-4 py-3"><span className="text-xs font-semibold" style={{ color: C.text, fontFamily: FONT }}>{j.title}</span></td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: j.type === "Internship" ? `${C.yellow}25` : `${C.orange}15`, color: j.type === "Internship" ? C.yellow : C.orange, fontFamily: MONO }}>{j.type}</span>
                </td>
                <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textMuted, fontFamily: FONT }}>{j.department}</span></td>
                <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textMuted, fontFamily: FONT }}>{j.location}</span></td>
                <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>{j.posted}</span></td>
                <td className="px-4 py-3">
                  <button onClick={() => toggle(j.id)} className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-all"
                    style={{ background: j.active ? `${C.green}20` : `${C.textDim}20`, color: j.active ? C.green : C.textDim, fontFamily: MONO }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: j.active ? C.green : C.textDim }} />
                    {j.active ? "Live" : "Hidden"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => remove(j.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
                    <Trash2 size={13} style={{ color: C.red }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
