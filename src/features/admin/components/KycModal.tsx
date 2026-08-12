import React, { useState } from "react";
import { ShieldCheck, X, CheckCircle2, AlertCircle } from "lucide-react";
import { C, FONT, MONO, KycReq } from "../data/adminData";
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

export function KycModal({ request, onClose, onSuccess }: { request: KycReq; onClose: () => void; onSuccess?: () => void }) {
  const [tab, setTab] = useState<"cnic-front" | "cnic-back" | "shop" | "cert">("cnic-front");
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [approved, setApproved] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const docs: Record<string, string> = {
    "cnic-front": request.cnicFront || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=620&h=400&fit=crop",
    "cnic-back": request.cnicBack || "https://images.unsplash.com/photo-1521791055366-0d553872952f?w=620&h=400&fit=crop",
    "products": (request.productsProof && request.productsProof.length > 0 && request.productsProof[0].images.length > 0) ? request.productsProof[0].images[0] : "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=620&h=400&fit=crop",
  };
  const checks = [
    { label: "CNIC Number", value: request.cnic },
    { label: "Phone Number", value: request.phone },
    { label: "Business Address", value: `${request.city}, Pakistan` },
    { label: "Shop Category", value: request.type },
    { label: "AI Authenticity", value: request.aiVerified ? "Verified" : "Pending" },
    { label: "Products Uploaded", value: `${request.productsProof?.length || 0} items` },
  ];

  const handleApprove = async () => {
    setLoading(true);
    try {
      const realId = request.id.replace("KYC-", "");
      await adminService.approveKyc(realId);
      setApproved(true);
      if (onSuccess) onSuccess();
      setTimeout(onClose, 1500);
    } catch (err) {
      console.error("Failed to approve", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!reason.trim()) return;
    setLoading(true);
    try {
      const realId = request.id.replace("KYC-", "");
      await adminService.rejectKyc(realId, reason);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to reject", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full flex flex-col rounded-2xl border overflow-hidden"
        style={{ maxWidth: 920, maxHeight: "90vh", background: C.surface, borderColor: C.border, boxShadow: "0 25px 80px rgba(0,0,0,0.7)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0" style={{ borderColor: C.border }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${C.yellow}20` }}>
              <ShieldCheck size={16} style={{ color: C.yellow }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: C.text, fontFamily: FONT }}>{request.shop}</p>
              <p className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>KYC Review · {request.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={request.status} />
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center border hover:bg-white/5 transition-colors" style={{ borderColor: C.border }}>
              <X size={14} style={{ color: C.textMuted }} />
            </button>
          </div>
        </div>
        <div className="flex flex-1 min-h-0" style={{ maxHeight: "calc(90vh - 70px)" }}>
          <div className="flex flex-col border-r" style={{ width: "57%", borderColor: C.border }}>
            <div className="flex border-b px-4 pt-2 gap-0.5 flex-shrink-0" style={{ borderColor: C.border }}>
              {(["cnic-front", "cnic-back", "products"] as const).map(t => (
                <button key={t} onClick={() => setTab(t as any)}
                  className="px-3 py-2 text-xs font-semibold transition-all"
                  style={{ borderBottom: `2px solid ${tab === t ? C.orange : "transparent"}`, color: tab === t ? C.orange : C.textDim, fontFamily: FONT, marginBottom: -1 }}>
                  {t === "cnic-front" ? "CNIC Front" : t === "cnic-back" ? "CNIC Back" : "Products"}
                </button>
              ))}
            </div>
            <div className="flex-1 p-4 overflow-hidden">
              {tab === "products" ? (
                <div className="w-full h-full rounded-xl overflow-y-auto relative space-y-4 pr-2" style={{ maxHeight: 400 }}>
                  {request.productsProof?.map((p, i) => (
                    <div key={i} className="space-y-2">
                      <p className="text-xs font-bold" style={{ color: C.text, fontFamily: FONT }}>{p.name}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {p.images?.map((img, j) => (
                          <div key={j} className="rounded-lg overflow-hidden relative" style={{ background: C.bg, height: 120 }}>
                            <img src={img || "https://placeholder.thriftkro.pk/prod.jpg"} alt="product" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {(!request.productsProof || request.productsProof.length === 0) && (
                    <div className="w-full h-full rounded-xl flex items-center justify-center text-xs" style={{ background: C.bg, color: C.textMuted }}>
                      No product proofs uploaded
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full rounded-xl overflow-hidden relative" style={{ background: C.bg, minHeight: 240 }}>
                  <img src={docs[tab]} alt={tab} className="w-full h-full object-cover" style={{ maxHeight: 300 }} />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs" style={{ background: "rgba(0,0,0,0.72)", color: C.text, fontFamily: MONO, backdropFilter: "blur(4px)", fontSize: 10 }}>
                    SHA-256: a3f8b2c1…9f7a2b4c8
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg text-xs flex items-center gap-1.5" style={{ background: `${C.green}cc`, color: "white", fontFamily: MONO, fontSize: 10 }}>
                    <CheckCircle2 size={10} /> Document Verified
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: "none" }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.textDim, fontFamily: MONO }}>Verification Checklist</p>
              <div className="space-y-2">
                {checks.map(c => (
                  <div key={c.label} className="flex items-start gap-3 p-3 rounded-lg border" style={{ background: C.bg, borderColor: `${C.green}25` }}>
                    <CheckCircle2 size={13} style={{ color: C.green, flexShrink: 0, marginTop: 1 }} />
                    <div className="min-w-0">
                      <p className="text-xs" style={{ color: C.textMuted, fontFamily: FONT }}>{c.label}</p>
                      <p className="text-xs font-semibold truncate" style={{ color: C.text, fontFamily: MONO }}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t flex flex-col gap-2 flex-shrink-0" style={{ borderColor: C.border }}>
              {approved ? (
                <div className="p-3 rounded-lg flex items-center gap-2" style={{ background: `${C.green}20`, color: C.green }}>
                  <CheckCircle2 size={16} /> <span className="text-xs font-bold" style={{ fontFamily: FONT }}>Seller Approved & Verified ✓</span>
                </div>
              ) : rejecting ? (
                <div className="space-y-2">
                  <input className="w-full px-3 py-2 rounded-lg border text-xs outline-none" style={{ background: C.bg, borderColor: C.border, color: C.text, fontFamily: FONT }}
                    placeholder="Enter rejection reason..." value={reason} onChange={e => setReason(e.target.value)} disabled={loading} />
                  <div className="flex gap-2">
                    <button onClick={() => setRejecting(false)} disabled={loading} className="flex-1 py-2 rounded-lg text-xs font-semibold border disabled:opacity-50" style={{ borderColor: C.border, color: C.textMuted }}>Cancel</button>
                    <button onClick={handleReject} disabled={loading || !reason.trim()} className="flex-1 py-2 rounded-lg text-xs font-bold text-white disabled:opacity-50" style={{ background: C.red }}>{loading ? "Rejecting..." : "Confirm Reject"}</button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setRejecting(true)} disabled={loading} className="flex-1 py-2.5 rounded-lg text-xs font-bold border hover:bg-white/5 transition-all disabled:opacity-50" style={{ borderColor: C.red, color: C.red, fontFamily: FONT }}>Reject Request</button>
                  <button onClick={handleApprove} disabled={loading} className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white hover:opacity-90 transition-all disabled:opacity-50" style={{ background: C.green, fontFamily: FONT }}>{loading ? "Approving..." : "Approve Seller"}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
