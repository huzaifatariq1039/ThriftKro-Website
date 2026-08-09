import React, { useState, useEffect } from "react";
import { Download, Eye } from "lucide-react";
import { C, FONT, MONO, kycRequests, KycReq } from "../data/adminData";
import { KycModal } from "../components/KycModal";
import { adminService } from "@/services/api/adminService";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    PENDING: { bg: `${C.yellow}25`, color: C.yellow, label: "PENDING" },
    UNDER_REVIEW: { bg: `${C.orange}20`, color: C.orange, label: "UNDER REVIEW" },
    APPROVED: { bg: `${C.green}20`, color: C.green, label: "APPROVED" },
    REJECTED: { bg: `${C.red}20`, color: C.red, label: "REJECTED" },
  };
  const s = map[status] ?? { bg: `${C.textDim}20`, color: C.textMuted, label: status };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full font-semibold tracking-wide"
      style={{ background: s.bg, color: s.color, fontFamily: MONO, fontSize: 10 }}>
      {s.label}
    </span>
  );
}

export default function PageKyc() {
  const [modal, setModal] = useState<KycReq | null>(null);
  const [filter, setFilter] = useState("ALL");
  const [requestsList, setRequestsList] = useState<any[]>(kycRequests);

  const fetchQueue = () => {
    let isMounted = true;
    adminService.getKycQueue()
      .then(res => {
        if (isMounted && res.data && res.data.length > 0) {
          const mapped = res.data.map((item: any) => ({
            id: `KYC-${item.id}`,
            shop: item.shop || "Seller Shop",
            owner: item.name || "Seller",
            type: item.type || "Shop",
            cnic: item.cnic,
            phone: item.phone,
            city: item.city,
            submitted: item.submitted || "Recently",
            revenue: item.revenue || "PKR 0",
            status: item.status,
            cnicFront: item.cnicFront || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600",
            cnicBack: item.cnicBack || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600",
            aiVerified: item.aiVerified,
            productsProof: item.productsProof || []
          }));
          setRequestsList(mapped);
        }
      })
      .catch(err => console.warn("Could not load KYC queue:", err));
    return () => { isMounted = false; };
  };

  useEffect(() => {
    const cleanup = fetchQueue();
    // Poll every 5 seconds for real-time updates
    const intervalId = setInterval(fetchQueue, 5000);
    return () => {
      cleanup();
      clearInterval(intervalId);
    };
  }, []);

  const filters = ["ALL", "PENDING", "UNDER_REVIEW", "APPROVED", "REJECTED"];
  const visible = filter === "ALL" ? requestsList : requestsList.filter(r => r.status === filter);

  return (
    <div className="space-y-5">
      {modal && <KycModal request={modal} onClose={() => setModal(null)} onSuccess={fetchQueue} />}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Requests", value: requestsList.length.toString(), color: C.orange },
          { label: "Pending Review", value: requestsList.filter(r => r.status === "PENDING").length.toString(), color: C.yellow },
          { label: "Under Review", value: requestsList.filter(r => r.status === "UNDER_REVIEW").length.toString(), color: C.teal },
          { label: "Approved", value: requestsList.filter(r => r.status === "APPROVED").length.toString(), color: C.green },
        ].map(c => (
          <div key={c.label} className="p-5 rounded-xl border" style={{ background: C.surface, borderColor: C.border }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.textDim, fontFamily: MONO }}>{c.label}</p>
            <p className="text-3xl font-bold" style={{ color: c.color, fontFamily: FONT }}>{c.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border overflow-hidden" style={{ background: C.surface, borderColor: C.border }}>
        <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: C.border }}>
          <h3 className="text-sm font-bold" style={{ color: C.text, fontFamily: FONT }}>All KYC Requests</h3>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: C.border }}>
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 text-xs font-semibold transition-all"
                  style={{ background: filter === f ? C.orange : "transparent", color: filter === f ? "#1A1108" : C.textDim, fontFamily: MONO }}>
                  {f === "ALL" ? "All" : f.replace("_", " ")}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium hover:bg-white/5"
              style={{ borderColor: C.border, color: C.textMuted, fontFamily: FONT }}><Download size={11} /> Export</button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: `${C.bg}80` }}>
              {["Shop Name", "Type", "CNIC", "Phone", "City", "Submitted", "Revenue", "Status", "Action"].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: C.textDim, fontFamily: MONO, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((req, i) => (
              <tr key={req.id} className="border-b hover:bg-white/[0.02] transition-colors"
                style={{ borderColor: i === visible.length - 1 ? "transparent" : `${C.border}40` }}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ background: `${C.orange}20`, color: C.orange }}>{req.shop[0]}</div>
                    <div><p className="text-xs font-semibold" style={{ color: C.text, fontFamily: FONT }}>{req.shop}</p>
                      <p className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>{req.id}</p></div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: `${C.orange}15`, color: C.orange, fontFamily: MONO }}>{req.type}</span>
                </td>
                <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textMuted, fontFamily: MONO }}>{req.cnic}</span></td>
                <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textMuted, fontFamily: MONO }}>{req.phone}</span></td>
                <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textMuted, fontFamily: FONT }}>{req.city}</span></td>
                <td className="px-4 py-3"><span className="text-xs" style={{ color: C.textMuted, fontFamily: MONO }}>{req.submitted}</span></td>
                <td className="px-4 py-3"><span className="text-xs font-semibold" style={{ color: C.yellow, fontFamily: MONO }}>{req.revenue}</span></td>
                <td className="px-4 py-3"><StatusBadge status={req.status} /></td>
                <td className="px-4 py-3">
                  <button onClick={() => setModal(req)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 active:scale-95 transition-all"
                    style={{ background: C.orange, color: "#1A1108", fontFamily: FONT }}>
                    <Eye size={10} /> Review
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
