import React, { useState, useEffect, ReactNode } from "react";
import {
  Package, CreditCard, ShieldCheck, Building2, User, Globe, Clock,
  Lock, ArrowUpRight, ArrowDownRight, Cpu, AlertCircle, CheckCircle2,
  Truck, AlertTriangle,
} from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";
import { C, FONT, MONO, revenueWeek, revenueMonth, escrowData, kycRequests, aiLogs0 } from "../data/adminData";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    PENDING: { bg: `${C.yellow}25`, color: C.yellow, label: "PENDING" },
    UNDER_REVIEW: { bg: `${C.orange}20`, color: C.orange, label: "UNDER REVIEW" },
    APPROVED: { bg: `${C.green}20`, color: C.green, label: "APPROVED" },
    REJECTED: { bg: `${C.red}20`, color: C.red, label: "REJECTED" },
    PASS: { bg: `${C.green}20`, color: C.green, label: "VERIFIED" },
    FAIL: { bg: `${C.red}20`, color: C.red, label: "FLAGGED" },
  };
  const s = map[status] ?? { bg: `${C.textDim}20`, color: C.textMuted, label: status };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full font-semibold tracking-wide"
      style={{ background: s.bg, color: s.color, fontFamily: MONO, fontSize: 10 }}>
      {s.label}
    </span>
  );
}

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

function AiStream() {
  const [logs, setLogs] = useState(aiLogs0);
  const [scanning, setScanning] = useState(false);
  useEffect(() => {
    const items = ["Puma Suede Classic", "Carhartt WIP Jacket", "Nike Dunk Low Panda", "Off-White Belt", "Stussy Crewneck", "Reebok Classic Leather"];
    const iv = setInterval(() => {
      const item = items[Math.floor(Math.random() * items.length)];
      const score = Math.floor(Math.random() * 70) + 25;
      const h = () => Math.random().toString(36).slice(2, 6);
      setScanning(true);
      setTimeout(() => {
        setLogs(p => [{ id: Date.now(), item, score, hash: `${h()}…${h()}`, time: "now", status: score >= 70 ? "PASS" : "FAIL" }, ...p].slice(0, 9));
        setScanning(false);
      }, 700);
    }, 4500);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="flex flex-col rounded-xl border overflow-hidden" style={{ background: C.surface, borderColor: C.border }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: C.border }}>
        <div className="flex items-center gap-2">
          <Cpu size={13} style={{ color: C.orange }} />
          <p className="text-sm font-semibold" style={{ color: C.text, fontFamily: FONT }}>Live AI Verification Stream</p>
        </div>
        <div className="flex items-center gap-1.5">
          {scanning && <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: C.orange }} />}
          <span className="text-xs" style={{ color: scanning ? C.orange : C.textDim, fontFamily: MONO }}>{scanning ? "SCANNING…" : "YOLOv8 + OpenCLIP"}</span>
        </div>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: 330, scrollbarWidth: "none" }}>
        {logs.map((log, i) => (
          <div key={log.id} className="flex items-start gap-3 px-4 py-2.5 border-b transition-all"
            style={{ borderColor: `${C.border}50`, background: i === 0 && scanning ? `${C.orange}08` : "transparent", opacity: i > 5 ? 0.45 : 1 }}>
            <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: log.status === "PASS" ? `${C.green}20` : `${C.red}20` }}>
              {log.status === "PASS" ? <CheckCircle2 size={11} style={{ color: C.green }} /> : <AlertCircle size={11} style={{ color: C.red }} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold truncate" style={{ color: C.text, fontFamily: FONT }}>{log.item}</p>
                <StatusBadge status={log.status} />
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs" style={{ color: log.score >= 70 ? C.green : C.red, fontFamily: MONO }}>{log.score}% match</span>
                <span className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>SHA-256: {log.hash}</span>
                <span className="text-xs ml-auto" style={{ color: C.textDim, fontFamily: MONO }}>{log.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PageOverview() {
  const [range, setRange] = useState<"week" | "month">("week");
  const [metrics, setMetrics] = useState({
    gmv: "PKR 7,125,000",
    revenue: "PKR 142,500",
    totalProducts: 0,
    activeSellers: "1,240 total",
    escrowHold: "PKR 450,000",
  });
  const [kycQueue, setKycQueue] = useState<any[]>(kycRequests);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      adminService.getOverviewMetrics(),
      productService.getProducts(),
      adminService.getKycQueue(),
    ]).then(([metricsRes, productsRes, kycRes]) => {
      if (!isMounted) return;
      
      const prodCount = productsRes.data ? productsRes.data.length : 0;
      const gmvVal = metricsRes.data?.gmv || "PKR 7,125,000";
      const escrowVal = metricsRes.data?.escrowHold || "PKR 450,000";

      setMetrics({
        gmv: gmvVal,
        revenue: metricsRes.data?.gmv ? `PKR ${(Math.round(parseFloat(gmvVal.replace(/[^0-9.]/g, "") || "7125000") * 0.02)).toLocaleString()}` : "PKR 142,500",
        totalProducts: prodCount,
        activeSellers: `${metricsRes.data?.activeListings || prodCount || 12} Products Listed`,
        escrowHold: escrowVal,
      });

      if (kycRes.data && kycRes.data.length > 0) {
        setKycQueue(kycRes.data);
      }
    }).catch(err => console.warn("Failed to fetch admin metrics:", err));

    return () => { isMounted = false; };
  }, []);

  const chartData = range === "week" ? revenueWeek : revenueMonth;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        <KpiCard title="Total Platform Revenue" value={metrics.revenue} sub="2% escrow fee · all transactions" trend="up" trendVal="+14.2%" accent={C.green}>
          <Sparkline data={revenueWeek.map(d => d.revenue)} color={C.green} />
        </KpiCard>
        <KpiCard title="Gross Merchandise Value" value={metrics.gmv} sub="Total sales volume · live marketplace" trend="up" trendVal="+8.7%" accent={C.orange}>
          <Sparkline data={revenueMonth.map(d => d.gmv)} color={C.orange} />
        </KpiCard>
        <KpiCard title="Listed Products" value={`${metrics.totalProducts} Items`} sub={metrics.activeSellers} accent={C.teal}>
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5" style={{ color: C.textDim, fontFamily: MONO }}>
              <span>Live Items Ratio</span><span style={{ color: C.teal }}>100%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.border }}>
              <div className="h-full rounded-full" style={{ width: "100%", background: `linear-gradient(90deg,${C.teal},${C.orange})` }} />
            </div>
          </div>
        </KpiCard>
        <KpiCard title="Escrow Locked Funds" value={metrics.escrowHold} sub="Active orders in escrow protection" accent={C.yellow}>
          <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg border" style={{ background: `${C.green}10`, borderColor: `${C.green}30` }}>
            <Lock size={11} style={{ color: C.green }} /><span className="text-xs font-semibold" style={{ color: C.green, fontFamily: MONO }}>Funds Safe</span>
            <span className="ml-auto text-xs" style={{ color: C.textDim, fontFamily: MONO }}>Protected</span>
          </div>
        </KpiCard>
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 390px" }}>
        <div className="space-y-4">
          <div className="rounded-xl border p-5" style={{ background: C.surface, borderColor: C.border }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold" style={{ color: C.text, fontFamily: FONT }}>Revenue & GMV Performance</h3>
                <p className="text-xs mt-0.5" style={{ color: C.textDim, fontFamily: FONT }}>{range === "week" ? "Last 7 days" : "Last 6 months"}</p>
              </div>
              <div className="flex items-center gap-3">
                {[{ label: "GMV", color: C.orange }, { label: "Revenue", color: C.green }].map(l => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 rounded-full inline-block" style={{ background: l.color }} /><span className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>{l.label}</span>
                  </div>
                ))}
                <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: C.border }}>
                  {(["week", "month"] as const).map(r => (
                    <button key={r} onClick={() => setRange(r)} className="px-3 py-1.5 text-xs font-semibold transition-all"
                      style={{ background: range === r ? C.orange : "transparent", color: range === r ? "#1A1108" : C.textDim, fontFamily: FONT }}>
                      {r === "week" ? "Week" : "Month"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <DualAreaChart data={chartData} series={[{ key: "gmv", color: C.orange, label: "GMV" }, { key: "revenue", color: C.green, label: "Revenue" }]} height={200} />
          </div>
          {/* mini KYC table */}
          <div className="rounded-xl border overflow-hidden" style={{ background: C.surface, borderColor: C.border }}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: C.border }}>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} style={{ color: C.yellow }} />
                <h3 className="text-sm font-bold" style={{ color: C.text, fontFamily: FONT }}>Pending Seller Verification Requests</h3>
                <span className="px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${C.red}20`, color: C.red, fontFamily: MONO, fontSize: 10 }}>{kycQueue.length} PENDING</span>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ background: `${C.bg}80` }}>
                  {["Shop Name", "Business Type", "CNIC Number", "Submitted", "Status"].map(h => (
                    <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold uppercase tracking-wide"
                      style={{ color: C.textDim, fontFamily: MONO, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {kycQueue.slice(0, 4).map((req, i) => (
                  <tr key={req.id} className="border-b hover:bg-white/[0.02] transition-colors"
                    style={{ borderColor: i === kycQueue.length - 1 ? "transparent" : `${C.border}40` }}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: `${C.orange}20`, color: C.orange, fontFamily: FONT }}>{(req.shopName || req.shop || "S")[0]}</div>
                        <div>
                          <p className="text-xs font-semibold" style={{ color: C.text, fontFamily: FONT }}>{req.shopName || req.shop || "Seller Store"}</p>
                          <p className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>#{req.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium"
                        style={{ background: `${C.orange}15`, color: C.orange, fontFamily: MONO, fontSize: 11 }}>
                        <User size={9} />{req.name || req.type || "Seller"}
                      </span>
                    </td>
                    <td className="px-5 py-3"><span className="text-xs" style={{ color: C.textMuted, fontFamily: MONO }}>{req.cnic}</span></td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5"><Clock size={10} style={{ color: C.textDim }} /><span className="text-xs" style={{ color: C.textMuted, fontFamily: MONO }}>{req.submitted || "Recently"}</span></div>
                    </td>
                    <td className="px-5 py-3"><StatusBadge status={(req.status || "PENDING").toUpperCase()} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-4">
          <AiStream />
          <div className="rounded-xl border p-4" style={{ background: C.surface, borderColor: C.border }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2"><CreditCard size={13} style={{ color: C.orange }} /><h3 className="text-sm font-bold" style={{ color: C.text, fontFamily: FONT }}>Escrow Status Breakdown</h3></div>
              <span className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>85 orders</span>
            </div>
            <div className="flex items-center gap-3">
              <div style={{ flexShrink: 0 }}>
                <PieChart width={120} height={120}>
                  <Pie data={escrowData} cx={60} cy={60} innerRadius={36} outerRadius={54} paddingAngle={2} dataKey="value" strokeWidth={0}>
                    {escrowData.map(e => <Cell key={`escrow-${e.name}`} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </div>
              <div className="flex-1 space-y-1.5">
                {escrowData.map(item => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} /><span className="text-xs" style={{ color: C.textMuted, fontFamily: FONT }}>{item.name}</span></div>
                    <span className="text-xs font-semibold" style={{ color: C.text, fontFamily: MONO }}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 p-3 rounded-lg flex items-center justify-between" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
              <div><p className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>Total Locked</p><p className="text-sm font-bold" style={{ color: C.yellow, fontFamily: FONT }}>PKR 450,000</p></div>
              <div className="text-right"><p className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>Disputed</p><p className="text-sm font-bold" style={{ color: C.red, fontFamily: FONT }}>PKR 27,000</p></div>
            </div>
          </div>
          <div className="rounded-xl border p-4" style={{ background: C.surface, borderColor: C.border }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.textDim, fontFamily: MONO }}>Platform Pulse</p>
            <div className="space-y-2.5">
              {[
                { label: "Products Published Today", value: "128", icon: Package, color: C.orange },
                { label: "AI Verifications Run", value: "847", icon: Cpu, color: C.yellow },
                { label: "New Orders (24h)", value: "63", icon: Truck, color: C.green },
                { label: "Active Disputes", value: "7", icon: AlertTriangle, color: C.red },
              ].map(item => {
                const Icon = item.icon; return (
                  <div key={item.label} className="flex items-center justify-between py-0.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${item.color}20` }}><Icon size={12} style={{ color: item.color }} /></div>
                      <span className="text-xs" style={{ color: C.textMuted, fontFamily: FONT }}>{item.label}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: item.color, fontFamily: MONO }}>{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
