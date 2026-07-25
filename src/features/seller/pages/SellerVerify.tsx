import React, { useState } from "react";
import { Upload, Check } from "lucide-react";
import { ORANGE, INK } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label, Field, inputCls, inputStyle } from "@/components/ui";
import { SellerShell } from "../components/SellerShell";

export default function SellerVerify({ s }: { s: Store }) {
  const [cnic, setCnic] = useState("");
  const [submitted, setSubmitted] = useState(s.sellerKycApproved);
  return (
    <SellerShell s={s}>
      <Label>VERIFICATION</Label>
      <h1 className="font-extrabold mt-1 mb-2" style={{ fontSize: 32, letterSpacing: "-0.03em", color: INK }}>Identity & KYC</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(26,17,8,0.55)" }}>Verify your CNIC to receive payouts and get the blue checkmark.</p>

      <div className="max-w-md bg-white p-8 rounded-3xl space-y-4" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#E8F5E9" }}><Check size={32} style={{ color: "#2E7D32" }} strokeWidth={3} /></div>
            <p className="font-extrabold text-lg" style={{ color: INK }}>KYC Submitted ✓</p>
            <p className="text-sm mt-1" style={{ color: "rgba(26,17,8,0.5)" }}>Under review by our team. Takes ~24 hours.</p>
          </div>
        ) : (
          <>
            <Field label="CNIC Number (13 digits)"><input className={inputCls} style={inputStyle} value={cnic} onChange={e => setCnic(e.target.value)} placeholder="35202-XXXXXXX-X" /></Field>
            <Field label="Upload CNIC Front & Back">
              <div className="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer" style={{ borderColor: "rgba(26,17,8,0.15)" }}>
                <Upload size={24} style={{ color: ORANGE }} className="mx-auto mb-1" />
                <p className="text-xs font-bold" style={{ color: INK }}>Front & Back photos</p>
              </div>
            </Field>
            <button
              onClick={async () => {
                if (!cnic.trim()) {
                  s.showToast("Please enter your CNIC number.");
                  return;
                }
                await s.submitSellerVerificationAsync({ cnic_number: cnic.trim() });
                setSubmitted(true);
              }}
              className="w-full py-4 rounded-xl font-extrabold text-white mt-4 hover:opacity-90 transition-opacity"
              style={{ background: ORANGE }}
            >
              Submit Verification
            </button>
          </>
        )}
      </div>
    </SellerShell>
  );
}
