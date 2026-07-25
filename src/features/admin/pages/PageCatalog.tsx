import React, { useState } from "react";
import { Search, Eye, Ban } from "lucide-react";
import { C, FONT, MONO, allProducts } from "../data/adminData";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    LIVE: { bg: `${C.green}20`, color: C.green, label: "LIVE" },
    FLAGGED: { bg: `${C.red}20`, color: C.red, label: "FLAGGED" },
    PENDING: { bg: `${C.yellow}25`, color: C.yellow, label: "PENDING" },
  };
  const s = map[status] ?? { bg: `${C.textDim}20`, color: C.textMuted, label: status };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full font-semibold tracking-wide"
      style={{ background: s.bg, color: s.color, fontFamily: MONO, fontSize: 10 }}>
      {s.label}
    </span>
  );
}

export default function PageCatalog() {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const filters = ["ALL", "LIVE", "FLAGGED", "PENDING"];
  const visible = allProducts.filter(p => {
    const matchF = filter === "ALL" || p.status === filter;
    const matchS = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.seller.toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: "1,284", color: C.orange },
          { label: "AI Verified", value: "1,041", color: C.green },
          { label: "Flagged", value: "43", color: C.red },
          { label: "Avg AI Score", value: "84%", color: C.yellow },
        ].map(c => (
          <div key={c.label} className="p-5 rounded-xl border" style={{ background: C.surface, borderColor: C.border }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.textDim, fontFamily: MONO }}>{c.label}</p>
            <p className="text-3xl font-bold" style={{ color: c.color, fontFamily: FONT }}>{c.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border overflow-hidden" style={{ background: C.surface, borderColor: C.border }}>
        <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: C.border }}>
          <h3 className="text-sm font-bold" style={{ color: C.text, fontFamily: FONT }}>Product Catalog</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border" style={{ background: C.bg, borderColor: C.border }}>
              <Search size={11} style={{ color: C.textDim }} />
              <input className="bg-transparent text-xs outline-none w-40" style={{ color: C.text, fontFamily: FONT }}
                placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: C.border }}>
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 text-xs font-semibold transition-all"
                  style={{ background: filter === f ? C.orange : "transparent", color: filter === f ? "#1A1108" : C.textDim, fontFamily: MONO }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: `${C.bg}80` }}>
              {["Product", "Seller", "Category", "Condition", "Price", "AI Score", "Status", "Action"].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: C.textDim, fontFamily: MONO, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((p, i) => (
              <tr key={p.id} className="border-b hover:bg-white/[0.02] transition-colors"
                style={{ borderColor: i === visible.length - 1 ? "transparent" : `${C.border}40` }}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.img} alt={p.name} className="w-9 h-9 rounded-lg object-cover" style={{ background: C.bg }} />
                    <div><p className="text-xs font-semibold" style={{ color: C.text, fontFamily: FONT }}>{p.name}</p>
                      <p className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>{p.id}</p></div>
                  </div>
                </td>
                <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textMuted, fontFamily: FONT }}>{p.seller}</span></td>
                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-md" style={{ background: `${C.orange}12`, color: C.orange, fontFamily: MONO }}>{p.category}</span></td>
                <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textMuted, fontFamily: FONT }}>{p.condition}</span></td>
                <td className="px-4 py-3"><span className="text-xs font-semibold" style={{ color: C.yellow, fontFamily: MONO }}>PKR {p.price.toLocaleString()}</span></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full overflow-hidden" style={{ background: C.border }}>
                      <div className="h-full rounded-full" style={{ width: `${p.aiScore}%`, background: p.aiScore >= 70 ? C.green : C.red }} />
                    </div>
                    <span className="text-xs font-semibold" style={{ color: p.aiScore >= 70 ? C.green : C.red, fontFamily: MONO }}>{p.aiScore}%</span>
                  </div>
                </td>
                <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"><Eye size={13} style={{ color: C.orange }} /></button>
                    {p.status === "FLAGGED" && (
                      <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"><Ban size={13} style={{ color: C.red }} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
