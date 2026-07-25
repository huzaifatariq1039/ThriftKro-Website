import React, { useState, ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { C, FONT, MONO, revenueWeek, revenueMonth } from "../data/adminData";

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 200, h = 36, pad = 2;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pts = data.map((v, i) => [pad + (i / (data.length - 1)) * (w - pad * 2), h - pad - ((v - min) / range) * (h - pad * 2)]);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${(h - pad).toFixed(1)} L${pts[0][0].toFixed(1)},${(h - pad).toFixed(1)} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 36 }} preserveAspectRatio="none">
      <path d={area} fill={color} fillOpacity={0.15} />
      <path d={line} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DualAreaChart({ data, series, height = 200 }: {
  data: Record<string, any>[]; series: { key: string; color: string; label: string }[]; height?: number;
}) {
  const W = 560, H = height, pL = 44, pR = 8, pT = 8, pB = 28;
  const iW = W - pL - pR, iH = H - pT - pB;
  const allV = series.flatMap(s => data.map(d => d[s.key] as number));
  const vMax = Math.max(...allV) * 1.1 || 1;
  const xOf = (i: number) => pL + (i / (data.length - 1)) * iW;
  const yOf = (v: number) => pT + iH - (v / vMax) * iH;
  const fmt = (v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v);
  const ticks = [0, .25, .5, .75, 1].map(t => t * vMax);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      {ticks.map((v, i) => (
        <line key={i} x1={pL} x2={W - pR} y1={yOf(v)} y2={yOf(v)} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
      ))}
      {ticks.slice(1).map((v, i) => (
        <text key={i} x={pL - 6} y={yOf(v) + 4} textAnchor="end" fontSize={10} fill="rgba(255,255,255,0.3)" fontFamily={MONO}>{fmt(v)}</text>
      ))}
      {data.map((d, i) => (
        <text key={i} x={xOf(i)} y={H - 6} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.3)" fontFamily={MONO}>{d.day}</text>
      ))}
      {series.map(s => {
        const pts = data.map((d, i) => [xOf(i), yOf(d[s.key] as number)] as [number, number]);
        const lp = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
        const ap = `${lp} L${pts[pts.length - 1][0].toFixed(1)},${yOf(0).toFixed(1)} L${pts[0][0].toFixed(1)},${yOf(0).toFixed(1)} Z`;
        return (
          <g key={s.key}>
            <path d={ap} fill={s.color} fillOpacity={0.08} />
            <path d={lp} fill="none" stroke={s.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={3} fill={s.color} fillOpacity={0.9} />)}
          </g>
        );
      })}
    </svg>
  );
}

function KpiCard({ title, value, sub, trend, trendVal, children, accent }: {
  title: string; value: string; sub: string; trend?: "up" | "down"; trendVal?: string; children?: ReactNode; accent?: string;
}) {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl border" style={{ background: C.surface, borderColor: C.border }}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-widest" style={{ color: C.textDim, fontFamily: MONO }}>{title}</p>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: trend === "up" ? `${C.green}20` : `${C.red}20`, color: trend === "up" ? C.green : C.red, fontFamily: MONO }}>
            {trend === "up" ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}{trendVal}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight" style={{ color: accent ?? C.text, fontFamily: FONT }}>{value}</p>
        <p className="text-xs mt-0.5" style={{ color: C.textMuted, fontFamily: FONT }}>{sub}</p>
      </div>
      {children}
    </div>
  );
}

export default function PageRevenue() {
  const [range, setRange] = useState<"week" | "month">("month");
  const data = range === "week" ? revenueWeek : revenueMonth;
  const topSellers = [
    { name: "KarachiKicks", gmv: "PKR 284,000", orders: 94, pct: 18 },
    { name: "VintageLahore", gmv: "PKR 221,500", orders: 78, pct: 14 },
    { name: "SneakerHeadKHI", gmv: "PKR 198,200", orders: 63, pct: 12 },
    { name: "RetroRWP", gmv: "PKR 145,900", orders: 51, pct: 9 },
    { name: "LuxeArchivePK", gmv: "PKR 118,400", orders: 32, pct: 7 },
  ];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        <KpiCard title="Total Revenue (Jun)" value="PKR 142,500" sub="2% of GMV as platform fee" trend="up" trendVal="+14.2%" accent={C.green}>
          <Sparkline data={revenueMonth.map(d => d.revenue)} color={C.green} />
        </KpiCard>
        <KpiCard title="GMV (Jun)" value="PKR 7,125,000" sub="Gross merchandise volume" trend="up" trendVal="+8.7%" accent={C.orange}>
          <Sparkline data={revenueMonth.map(d => d.gmv)} color={C.orange} />
        </KpiCard>
        <KpiCard title="Avg Order Value" value="PKR 1,840" sub="Across 3,875 orders" trend="up" trendVal="+3.1%" accent={C.yellow}>
          <Sparkline data={[1400, 1520, 1700, 1680, 1790, 1840]} color={C.yellow} />
        </KpiCard>
        <KpiCard title="Platform Take Rate" value="2.0%" sub="Fixed escrow fee per order" accent={C.teal} />
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 340px" }}>
        <div className="rounded-xl border p-5" style={{ background: C.surface, borderColor: C.border }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold" style={{ color: C.text, fontFamily: FONT }}>Revenue & GMV Trend</h3>
            <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: C.border }}>
              {(["week", "month"] as const).map(r => (
                <button key={r} onClick={() => setRange(r)} className="px-3 py-1.5 text-xs font-semibold transition-all"
                  style={{ background: range === r ? C.orange : "transparent", color: range === r ? "#1A1108" : C.textDim, fontFamily: FONT }}>
                  {r === "week" ? "Week" : "6 Months"}
                </button>
              ))}
            </div>
          </div>
          <DualAreaChart data={data} series={[{ key: "gmv", color: C.orange, label: "GMV" }, { key: "revenue", color: C.green, label: "Revenue" }]} height={220} />
        </div>
        <div className="rounded-xl border p-5" style={{ background: C.surface, borderColor: C.border }}>
          <h3 className="text-sm font-bold mb-4" style={{ color: C.text, fontFamily: FONT }}>Top Sellers by GMV</h3>
          <div className="space-y-3">
            {topSellers.map((s, i) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `${C.orange}20`, color: C.orange, fontFamily: MONO }}>{i + 1}</span>
                    <span className="text-xs font-semibold" style={{ color: C.text, fontFamily: FONT }}>{s.name}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: C.yellow, fontFamily: MONO }}>{s.gmv}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.border }}>
                  <div className="h-full rounded-full" style={{ width: `${s.pct * 5}%`, background: `linear-gradient(90deg,${C.orange},${C.yellow})` }} />
                </div>
                <p className="text-xs mt-0.5" style={{ color: C.textDim, fontFamily: MONO }}>{s.orders} orders</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
