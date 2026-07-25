import React, { useState } from "react";
import { Plus } from "lucide-react";
import { C, FONT, MONO } from "../data/adminData";

export default function PageSettings() {
  const [escrowFee, setEscrowFee] = useState("2.0");
  const [aiThreshold, setAiThreshold] = useState("70");
  const [autoApprove, setAutoApprove] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const Toggle = ({ on, set }: { on: boolean; set: (v: boolean) => void }) => (
    <button onClick={() => set(!on)} className="flex items-center justify-center w-10 h-5 rounded-full transition-all"
      style={{ background: on ? C.orange : `${C.textDim}40` }}>
      <span className="w-3.5 h-3.5 rounded-full bg-white transition-all" style={{ transform: on ? "translateX(9px)" : "translateX(-9px)" }} />
    </button>
  );
  return (
    <div className="space-y-5 max-w-3xl">
      <div className="rounded-xl border overflow-hidden" style={{ background: C.surface, borderColor: C.border }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: C.border }}>
          <h3 className="text-sm font-bold" style={{ color: C.text, fontFamily: FONT }}>Platform Configuration</h3>
          <p className="text-xs mt-0.5" style={{ color: C.textDim, fontFamily: FONT }}>Global settings that affect all transactions and verifications</p>
        </div>
        <div className="px-6 py-5 space-y-5">
          {[
            { label: "Escrow Fee (%)", sub: "Platform commission taken per completed order", val: escrowFee, set: setEscrowFee },
            { label: "AI Verification Threshold (%)", sub: "Minimum similarity score to auto-approve a product listing", val: aiThreshold, set: setAiThreshold },
          ].map(f => (
            <div key={f.label} className="flex items-center justify-between gap-8">
              <div>
                <p className="text-sm font-semibold" style={{ color: C.text, fontFamily: FONT }}>{f.label}</p>
                <p className="text-xs mt-0.5" style={{ color: C.textDim, fontFamily: FONT }}>{f.sub}</p>
              </div>
              <input className="w-24 px-3 py-2 rounded-lg border text-sm text-center outline-none font-semibold"
                style={{ background: C.bg, borderColor: C.border, color: C.orange, fontFamily: MONO }}
                value={f.val} onChange={e => f.set(e.target.value)} />
            </div>
          ))}
          <div className="h-px" style={{ background: C.border }} />
          {[
            { label: "Auto-Approve Verified Sellers", sub: "Automatically approve KYC if all checks pass", val: autoApprove, set: setAutoApprove },
            { label: "Email Alerts for Disputes", sub: "Send admin email when a new dispute is opened", val: emailAlerts, set: setEmailAlerts },
            { label: "Maintenance Mode", sub: "Take platform offline for scheduled maintenance", val: maintenanceMode, set: setMaintenanceMode },
          ].map(f => (
            <div key={f.label} className="flex items-center justify-between gap-8">
              <div>
                <p className="text-sm font-semibold" style={{ color: f.label === "Maintenance Mode" && f.val ? C.red : C.text, fontFamily: FONT }}>{f.label}</p>
                <p className="text-xs mt-0.5" style={{ color: C.textDim, fontFamily: FONT }}>{f.sub}</p>
              </div>
              <Toggle on={f.val} set={f.set} />
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t flex justify-end" style={{ borderColor: C.border }}>
          <button className="px-5 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-all"
            style={{ background: C.orange, color: "#1A1108", fontFamily: FONT }}>
            Save Changes
          </button>
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ background: C.surface, borderColor: C.border }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: C.border }}>
          <h3 className="text-sm font-bold" style={{ color: C.text, fontFamily: FONT }}>Admin Accounts</h3>
        </div>
        <div className="divide-y" style={{ borderColor: C.border }}>
          {[
            { name: "System Admin", email: "admin@thriftkro.pk", role: "Super Admin", active: true },
            { name: "Ops Manager", email: "ops@thriftkro.pk", role: "Ops Admin", active: true },
            { name: "Support Lead", email: "support@thriftkro.pk", role: "Support", active: false },
          ].map(u => (
            <div key={u.email} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: `${C.orange}20`, color: C.orange, fontFamily: FONT }}>{u.name[0]}</div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: C.text, fontFamily: FONT }}>{u.name}</p>
                  <p className="text-xs" style={{ color: C.textDim, fontFamily: MONO }}>{u.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${C.orange}15`, color: C.orange, fontFamily: MONO }}>{u.role}</span>
                <span className="w-2 h-2 rounded-full" style={{ background: u.active ? C.green : C.textDim }} />
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t" style={{ borderColor: C.border }}>
          <button className="flex items-center gap-2 text-sm font-semibold" style={{ color: C.orange, fontFamily: FONT }}>
            <Plus size={14} /> Invite Admin
          </button>
        </div>
      </div>

      <div className="rounded-xl border p-5" style={{ background: `${C.red}08`, borderColor: `${C.red}30` }}>
        <h3 className="text-sm font-bold mb-1" style={{ color: C.red, fontFamily: FONT }}>Danger Zone</h3>
        <p className="text-xs mb-4" style={{ color: C.textMuted, fontFamily: FONT }}>These actions are irreversible. Proceed with caution.</p>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg text-xs font-bold border hover:bg-red-500/10 transition-all"
            style={{ borderColor: `${C.red}50`, color: C.red, fontFamily: FONT }}>Flush Escrow Cache</button>
          <button className="px-4 py-2 rounded-lg text-xs font-bold border hover:bg-red-500/10 transition-all"
            style={{ borderColor: `${C.red}50`, color: C.red, fontFamily: FONT }}>Reset AI Audit Queue</button>
        </div>
      </div>
    </div>
  );
}
