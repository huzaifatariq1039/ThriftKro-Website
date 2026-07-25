import React, { useState } from "react";
import { ORANGE, INK } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label, Field, inputCls, inputStyle } from "@/components/ui";
import { SellerShell } from "../components/SellerShell";

export default function SellerShopSetting({ s }: { s: Store }) {
  const [bank, setBank] = useState("Meezan Bank");
  const [iban, setIban] = useState("PK36 MEZN 0001 0203 0405 0607");
  return (
    <SellerShell s={s}>
      <Label>PAYOUT & SHOP</Label>
      <h1 className="font-extrabold mt-1 mb-8" style={{ fontSize: 32, letterSpacing: "-0.03em", color: INK }}>Shop settings</h1>
      <div className="max-w-md bg-white p-8 rounded-3xl space-y-4" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
        <Label>Payout Bank Account</Label>
        <Field label="Bank name"><input className={inputCls} style={inputStyle} value={bank} onChange={e => setBank(e.target.value)} /></Field>
        <Field label="IBAN / Account #"><input className={inputCls} style={inputStyle} value={iban} onChange={e => setIban(e.target.value)} /></Field>
        <button onClick={() => s.showToast("Payout info updated ✓")} className="w-full py-4 rounded-xl font-extrabold text-white mt-4" style={{ background: ORANGE }}>Save Payout Info</button>
      </div>
    </SellerShell>
  );
}
