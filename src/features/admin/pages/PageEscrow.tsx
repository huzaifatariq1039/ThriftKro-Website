import React, { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { C, FONT, MONO, allOrders, escrowData } from "../data/adminData";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    IN_TRANSIT: { bg: `${C.orange}20`, color: C.orange, label: "IN TRANSIT" },
    SHIPPED: { bg: `${C.orange}18`, color: C.orange, label: "SHIPPED" },
    PROCESSING: { bg: `${C.yellow}20`, color: C.yellow, label: "PROCESSING" },
    DELIVERED: { bg: `${C.teal}20`, color: C.teal, label: "DELIVERED" },
    COMPLETED: { bg: `${C.green}20`, color: C.green, label: "COMPLETED" },
    DISPUTED: { bg: `${C.red}20`, color: C.red, label: "DISPUTED" },
    LOCKED: { bg: `${C.orange}20`, color: C.orange, label: "LOCKED" },
    RELEASED: { bg: `${C.green}20`, color: C.green, label: "RELEASED" },
  };
  const s = map[status] ?? { bg: `${C.textDim}20`, color: C.textMuted, label: status };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full font-semibold tracking-wide"
      style={{ background: s.bg, color: s.color, fontFamily: MONO, fontSize: 10 }}>
      {s.label}
    </span>
  );
}

export default function PageEscrow() {
  const [filter, setFilter] = useState("ALL");
  const filters = ["ALL", "PROCESSING", "IN_TRANSIT", "SHIPPED", "DELIVERED", "COMPLETED", "DISPUTED"];
  const visible = filter === "ALL" ? allOrders : allOrders.filter(o => o.status === filter);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: "1,240", color: C.orange },
          { label: "Locked in Escrow", value: "PKR 450K", color: C.yellow },
          { label: "Released Today", value: "PKR 98K", color: C.green },
          { label: "Disputed", value: "7", color: C.red },
        ].map(c => (
          <div key={c.label} className="p-5 rounded-xl border" style={{ background: C.surface, borderColor: C.border }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.textDim, fontFamily: MONO }}>{c.label}</p>
            <p className="text-2xl font-bold" style={{ color: c.color, fontFamily: FONT }}>{c.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 280px" }}>
        <div className="rounded-xl border overflow-hidden" style={{ background: C.surface, borderColor: C.border }}>
          <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: C.border }}>
            <h3 className="text-sm font-bold" style={{ color: C.text, fontFamily: FONT }}>Order & Escrow Ledger</h3>
            <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: C.border }}>
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)} className="px-2.5 py-1.5 text-xs font-semibold transition-all"
                  style={{ background: filter === f ? C.orange : "transparent", color: filter === f ? "#1A1108" : C.textDim, fontFamily: MONO }}>
                  {f === "ALL" ? "All" : f.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ background: `${C.bg}80` }}>
                {["Order ID", "Buyer", "Seller", "Item", "Amount", "Escrow", "Status", "Date"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide"
                    style={{ color: C.textDim, fontFamily: MONO, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((o, i) => (
                <tr key={o.id} className="border-b hover:bg-white/[0.02] transition-colors"
                  style={{ borderColor: i === visible.length - 1 ? "transparent" : `${C.border}40` }}>
                  <td className="px-4 py-3"><span className="text-xs font-semibold" style={{ color: C.orange, fontFamily: MONO }}>{o.id}</span></td>
                  <td className="px-4 py-3"><span className="text-xs" style={{ color: C.text, fontFamily: FONT }}>{o.buyer}</span></td>
                  <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textMuted, fontFamily: FONT }}>{o.seller}</span></td>
                  <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textMuted, fontFamily: FONT }}>{o.item}</span></td>
                  <td className="px-4 py-3"><span className="text-xs font-semibold" style={{ color: C.yellow, fontFamily: MONO }}>PKR {o.amount.toLocaleString()}</span></td>
                  <td className="px-4 py-3"><StatusBadge status={o.escrow} /></td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>{o.date}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border p-4" style={{ background: C.surface, borderColor: C.border }}>
          <h3 className="text-sm font-bold mb-4" style={{ color: C.text, fontFamily: FONT }}>Escrow Breakdown</h3>
          <PieChart width={230} height={160}>
            <Pie data={escrowData} cx={115} cy={75} innerRadius={44} outerRadius={68} paddingAngle={2} dataKey="value" strokeWidth={0}>
              {escrowData.map(e => <Cell key={`ec-${e.name}`} fill={e.color} />)}
            </Pie>
          </PieChart>
          <div className="space-y-2 mt-2">
            {escrowData.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: item.color }} /><span className="text-xs" style={{ color: C.textMuted, fontFamily: FONT }}>{item.name}</span></div>
                <span className="text-xs font-semibold" style={{ color: C.text, fontFamily: MONO }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
