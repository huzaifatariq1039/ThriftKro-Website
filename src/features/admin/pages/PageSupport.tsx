import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { C, FONT, MONO, disputes } from "../data/adminData";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    OPEN: { bg: `${C.red}20`, color: C.red, label: "OPEN" },
    RESOLVED: { bg: `${C.green}20`, color: C.green, label: "RESOLVED" },
  };
  const s = map[status] ?? { bg: `${C.textDim}20`, color: C.textMuted, label: status };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full font-semibold tracking-wide"
      style={{ background: s.bg, color: s.color, fontFamily: MONO, fontSize: 10 }}>
      {s.label}
    </span>
  );
}

export default function PageSupport() {
  const [activeDispute, setActiveDispute] = useState<typeof disputes[0] | null>(null);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Open Disputes", value: "2", color: C.red },
          { label: "Resolved (30d)", value: "18", color: C.green },
          { label: "Avg Resolution", value: "1.4d", color: C.yellow },
          { label: "Dispute Rate", value: "0.56%", color: C.orange },
        ].map(c => (
          <div key={c.label} className="p-5 rounded-xl border" style={{ background: C.surface, borderColor: C.border }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.textDim, fontFamily: MONO }}>{c.label}</p>
            <p className="text-3xl font-bold" style={{ color: c.color, fontFamily: FONT }}>{c.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 380px" }}>
        <div className="rounded-xl border overflow-hidden" style={{ background: C.surface, borderColor: C.border }}>
          <div className="px-5 py-3.5 border-b" style={{ borderColor: C.border }}>
            <h3 className="text-sm font-bold" style={{ color: C.text, fontFamily: FONT }}>Dispute Queue</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ background: `${C.bg}80` }}>
                {["Dispute ID", "Order", "Buyer", "Seller", "Item", "Amount", "Reason", "Status", "Opened"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide"
                    style={{ color: C.textDim, fontFamily: MONO, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {disputes.map((d, i) => (
                <tr key={d.id} className="border-b hover:bg-white/[0.02] transition-colors cursor-pointer"
                  style={{ borderColor: i === disputes.length - 1 ? "transparent" : `${C.border}40` }}
                  onClick={() => setActiveDispute(d)}>
                  <td className="px-4 py-3"><span className="text-xs font-semibold" style={{ color: C.orange, fontFamily: MONO }}>{d.id}</span></td>
                  <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textMuted, fontFamily: MONO }}>{d.order}</span></td>
                  <td className="px-4 py-3"><span className="text-xs" style={{ color: C.text, fontFamily: FONT }}>{d.buyer}</span></td>
                  <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textMuted, fontFamily: FONT }}>{d.seller}</span></td>
                  <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textMuted, fontFamily: FONT }}>{d.item}</span></td>
                  <td className="px-4 py-3"><span className="text-xs font-semibold" style={{ color: C.yellow, fontFamily: MONO }}>PKR {d.amount.toLocaleString()}</span></td>
                  <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textMuted, fontFamily: FONT }}>{d.reason}</span></td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>{d.opened}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Dispute detail */}
        <div className="rounded-xl border p-5" style={{ background: C.surface, borderColor: C.border }}>
          {activeDispute ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold" style={{ color: C.text, fontFamily: FONT }}>Dispute Detail</h3>
                <StatusBadge status={activeDispute.status} />
              </div>
              <div className="space-y-3">
                {[
                  ["Dispute ID", activeDispute.id],
                  ["Order", activeDispute.order],
                  ["Item", activeDispute.item],
                  ["Amount", `PKR ${activeDispute.amount.toLocaleString()}`],
                  ["Buyer", activeDispute.buyer],
                  ["Seller", activeDispute.seller],
                  ["Reason", activeDispute.reason],
                  ["Opened", activeDispute.opened],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-4">
                    <span className="text-xs" style={{ color: C.textDim, fontFamily: MONO, flexShrink: 0 }}>{k}</span>
                    <span className="text-xs font-semibold text-right" style={{ color: C.text, fontFamily: FONT }}>{v}</span>
                  </div>
                ))}
              </div>
              {activeDispute.status === "OPEN" && (
                <div className="mt-5 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: C.textDim, fontFamily: MONO }}>Admin Actions</p>
                  <button className="w-full py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-all"
                    style={{ background: C.green, color: "white", fontFamily: FONT }}>
                    Resolve — Refund Buyer
                  </button>
                  <button className="w-full py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-all"
                    style={{ background: C.orange, color: "#1A1108", fontFamily: FONT }}>
                    Resolve — Release to Seller
                  </button>
                  <button className="w-full py-2.5 rounded-xl text-xs font-semibold border hover:bg-white/5 transition-all"
                    style={{ borderColor: C.border, color: C.textMuted, fontFamily: FONT }}>
                    Escalate to Legal
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${C.orange}15` }}>
                <MessageSquare size={22} style={{ color: C.orange }} />
              </div>
              <p className="text-sm font-semibold" style={{ color: C.text, fontFamily: FONT }}>Select a dispute</p>
              <p className="text-xs" style={{ color: C.textDim, fontFamily: FONT }}>Click any row to view details and take action</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
