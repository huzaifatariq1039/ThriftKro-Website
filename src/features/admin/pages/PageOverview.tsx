import React, { useState, useEffect, ReactNode } from "react";
import {
  Package, CreditCard, ShieldCheck, User, Clock, Lock, Cpu, AlertCircle,
  CheckCircle2, Truck,
} from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";
import { C, FONT, MONO, aiLogs0 } from "../data/adminData";
import { adminService } from "@/services/api/adminService";
import { productService } from "@/services/api/productService";

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

function KpiCard({ title, value, sub, children, accent }: {
  title: string; value: string; sub: string; children?: ReactNode; accent?: string;
}) {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl border" style={{ background: C.surface, borderColor: C.border }}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-widest" style={{ color: C.textDim, fontFamily: MONO }}>{title}</p>
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight" style={{ color: accent ?? C.text, fontFamily: FONT }}>{value}</p>
        <p className="text-xs mt-0.5" style={{ color: C.textMuted, fontFamily: FONT }}>{sub}</p>
      </div>
      {children}
    </div>
  );
}

function formatCurrency(value: unknown): string {
  const amount = typeof value === "number" ? value : Number(value);
  return Number.isFinite(amount) ? `PKR ${amount.toLocaleString()}` : "PKR 0";
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
  const [metrics, setMetrics] = useState({
    gmv: "PKR 0",
    revenue: "PKR 0",
    settledPaymentVolume: "PKR 0",
    pendingPaymentValue: "PKR 0",
    totalProducts: 0,
    activeSellers: "0 total",
    escrowHold: "PKR 0",
    pulse: {
      users: "0",
      orders: "0",
      inProgress: "0",
      completed: "0",
      closed: "0",
      sellerOrders: "0",
    }
  });
  const [kycQueue, setKycQueue] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    
    const fetchDashboardData = () => {
      Promise.all([
        adminService.getOverviewMetrics(),
        productService.getProducts(),
        adminService.getKycQueue(),
      ]).then(([metricsRes, productsRes, kycRes]) => {
        if (!isMounted) return;
        
        const prodCount = productsRes.data ? productsRes.data.length : 0;
        
        setMetrics({
          gmv: formatCurrency(metricsRes.data?.gmv),
          revenue: formatCurrency(metricsRes.data?.revenue),
          settledPaymentVolume: formatCurrency(metricsRes.data?.settledPaymentVolume),
          pendingPaymentValue: formatCurrency(metricsRes.data?.pendingPaymentValue),
          totalProducts: prodCount,
          activeSellers: `${metricsRes.data?.activeListings || prodCount || 0} Products Listed`,
          escrowHold: formatCurrency(metricsRes.data?.escrowHold),
          pulse: {
            users: String(metricsRes.data?.usersTotal || 0),
            orders: String(metricsRes.data?.ordersTotal || 0),
            inProgress: String(metricsRes.data?.ordersInProgress || 0),
            completed: String(metricsRes.data?.ordersCompleted || 0),
            closed: String(metricsRes.data?.ordersClosed || 0),
            sellerOrders: String(metricsRes.data?.sellerOrdersTotal || 0),
          }
        });

        if (kycRes.data && kycRes.data.length > 0) {
          setKycQueue(kycRes.data);
        }
      }).catch(err => console.warn("Failed to fetch admin metrics:", err));
    };

    fetchDashboardData();
    const intervalId = setInterval(fetchDashboardData, 5000);

    return () => { 
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const checkoutBreakdown = [
    { name: "Open", value: Number(metrics.pulse.inProgress), color: C.yellow },
    { name: "Completed", value: Number(metrics.pulse.completed), color: C.green },
    { name: "Closed", value: Number(metrics.pulse.closed), color: C.red },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        <KpiCard title="Recognized Platform Revenue" value={metrics.revenue} sub="Platform fees from settled payments only" accent={C.green} />
        <KpiCard title="Settled Merchandise GMV" value={metrics.gmv} sub="Settled merchandise value · excludes fees and shipping" accent={C.orange} />
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
            <div className="mb-4">
              <h3 className="text-sm font-bold" style={{ color: C.text, fontFamily: FONT }}>Financial Settlement Snapshot</h3>
              <p className="text-xs mt-0.5" style={{ color: C.textDim, fontFamily: FONT }}>Lifetime values from persisted payment states</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Settled Payment Volume", value: metrics.settledPaymentVolume, color: C.orange },
                { label: "Recognized Revenue", value: metrics.revenue, color: C.green },
                { label: "Escrow Held", value: metrics.escrowHold, color: C.yellow },
                { label: "Pending Payment Pipeline", value: metrics.pendingPaymentValue, color: C.textMuted },
              ].map(item => (
                <div key={item.label} className="rounded-lg border p-3" style={{ background: C.bg, borderColor: C.border }}>
                  <p className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>{item.label}</p>
                  <p className="text-lg font-bold mt-1" style={{ color: item.color, fontFamily: FONT }}>{item.value}</p>
                </div>
              ))}
            </div>
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
              <div className="flex items-center gap-2"><CreditCard size={13} style={{ color: C.orange }} /><h3 className="text-sm font-bold" style={{ color: C.text, fontFamily: FONT }}>Checkout Status Breakdown</h3></div>
              <span className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>{metrics.pulse.orders} checkouts</span>
            </div>
            <div className="flex items-center gap-3">
              <div style={{ flexShrink: 0 }}>
                <PieChart width={120} height={120}>
                  <Pie data={checkoutBreakdown} cx={60} cy={60} innerRadius={36} outerRadius={54} paddingAngle={2} dataKey="value" strokeWidth={0}>
                    {checkoutBreakdown.map(e => <Cell key={`checkout-${e.name}`} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </div>
              <div className="flex-1 space-y-1.5">
                {checkoutBreakdown.map(item => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} /><span className="text-xs" style={{ color: C.textMuted, fontFamily: FONT }}>{item.name}</span></div>
                    <span className="text-xs font-semibold" style={{ color: C.text, fontFamily: MONO }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 p-3 rounded-lg flex items-center justify-between" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
              <div><p className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>Escrow Held</p><p className="text-sm font-bold" style={{ color: C.yellow, fontFamily: FONT }}>{metrics.escrowHold}</p></div>
              <div className="text-right"><p className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>Vendor Fulfillment Units</p><p className="text-sm font-bold" style={{ color: C.orange, fontFamily: FONT }}>{metrics.pulse.sellerOrders}</p></div>
            </div>
          </div>
          <div className="rounded-xl border p-4" style={{ background: C.surface, borderColor: C.border }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.textDim, fontFamily: MONO }}>Platform Pulse</p>
            <div className="space-y-2.5">
              {[
                { label: "Total Platform Users", value: metrics.pulse.users, icon: User, color: C.orange },
                { label: "Total Checkout Orders", value: metrics.pulse.orders, icon: Package, color: C.yellow },
                { label: "Orders In Progress", value: metrics.pulse.inProgress, icon: Truck, color: C.green },
                { label: "Pending KYC Requests", value: String(kycQueue.length), icon: ShieldCheck, color: C.red },
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
