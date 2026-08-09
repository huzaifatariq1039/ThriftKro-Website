import React, { useState, useEffect, useRef } from "react";
import {
  Check, ArrowRight, Upload, Plus, MapPin, ShieldCheck, Clock,
  AlertCircle, Download, Package, Camera, Smartphone, ScanFace
} from "lucide-react";
import { ORANGE, INK, FONT, MONO, PAPER } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Logo } from "@/components/ui";
import type { StoreType, VerificationProductProof, SellerVerificationFormData } from "@/types/types";

/* ── Constants ─────────────────────────────────────────────────────── */

const CITIES = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar"];
const STORE_TYPES: { value: StoreType; label: string }[] = [
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "SHOP", label: "Shop" },
  { value: "WAREHOUSE", label: "Warehouse" },
];

const STEP_LABELS = ["Store details", "CNIC", "Products & proof", "AI Verify", "Review"] as const;

const emptyForm: SellerVerificationFormData = {
  shopName: "",
  ownerFullName: "",
  cnicNumber: "",
  storeType: "INDIVIDUAL",
  phone: "",
  streetAddress: "",
  city: "Lahore",
  postalCode: "54000",
  cnicFrontFile: null,
  cnicFrontPreview: null,
  cnicBackFile: null,
  cnicBackPreview: null,
  products: [{ name: "", sizes: "", price: "", description: "", images: [] }],
  aiVerified: false,
  aiVerificationMethod: null,
  csvFile: null,
  csvFileName: null,
};

/* ── Shared Styles ─────────────────────────────────────────────────── */

const inputBase: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: 14,
  color: INK,
  boxShadow: "0 0 0 1px rgba(26,17,8,0.12)",
  background: "white",
};
const inputCls = "w-full px-4 py-3.5 rounded-xl outline-none transition-colors placeholder:text-[rgba(26,17,8,0.35)]";

const labelStyle: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "rgba(26,17,8,0.5)",
  display: "block",
  marginBottom: 8,
};

/* ── Sub-components ────────────────────────────────────────────────── */

function StepIndicator({ step, completedSteps }: { step: number; completedSteps: Set<number> }) {
  return (
    <div className="flex items-center gap-0 mb-10 select-none">
      {STEP_LABELS.map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = completedSteps.has(stepNum);
        const isCurrent = step === stepNum;
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <div
                className="flex-1 mx-2"
                style={{
                  height: 1,
                  borderTop: `2px dashed ${isCompleted || isCurrent ? ORANGE : "rgba(26,17,8,0.15)"}`,
                  maxWidth: 80,
                  minWidth: 30,
                }}
              />
            )}
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: isCompleted ? ORANGE : isCurrent ? ORANGE : "transparent",
                  color: isCompleted || isCurrent ? "white" : "rgba(26,17,8,0.35)",
                  boxShadow: !isCompleted && !isCurrent ? "inset 0 0 0 1.5px rgba(26,17,8,0.15)" : "none",
                  fontFamily: FONT,
                }}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : stepNum}
              </div>
              <span
                className="text-sm font-semibold whitespace-nowrap"
                style={{
                  color: isCurrent ? INK : isCompleted ? INK : "rgba(26,17,8,0.35)",
                  fontFamily: FONT,
                }}
              >
                {label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Field({ label, children, half }: { label: string; children: React.ReactNode; half?: boolean }) {
  return (
    <div style={{ flex: half ? "1 1 0" : undefined }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

/* ── Step 1: Store Details ─────────────────────────────────────────── */

function StepStoreDetails({
  form, setForm, onNext,
}: {
  form: SellerVerificationFormData;
  setForm: React.Dispatch<React.SetStateAction<SellerVerificationFormData>>;
  onNext: () => void;
}) {
  const valid = form.shopName.trim() && form.ownerFullName.trim() && form.phone.length === 11 && form.cnicNumber.length === 13 && form.streetAddress.trim();
  return (
    <div className="space-y-5 max-w-[720px]">
      <Field label="Shop Name">
        <input className={inputCls} style={inputBase} placeholder="e.g. Priya's Closet"
          value={form.shopName} onChange={e => setForm(f => ({ ...f, shopName: e.target.value }))} />
      </Field>

      <div className="flex gap-4">
        <Field label="Owner Full Name" half>
          <input className={inputCls} style={inputBase} placeholder="As on CNIC"
            value={form.ownerFullName} onChange={e => setForm(f => ({ ...f, ownerFullName: e.target.value }))} />
        </Field>
        <Field label="CNIC Number (13 digits)" half>
          <input className={inputCls} style={inputBase} placeholder="3520212345671" maxLength={13}
            value={form.cnicNumber} onChange={e => {
              const val = e.target.value.replace(/\D/g, "");
              setForm(f => ({ ...f, cnicNumber: val }));
            }} />
        </Field>
      </div>

      <Field label="Store Type">
        <select className={inputCls} style={{ ...inputBase, appearance: "auto" as any }}
          value={form.storeType} onChange={e => setForm(f => ({ ...f, storeType: e.target.value as StoreType }))}>
          {STORE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </Field>

      <Field label="Phone (11 digits)">
        <input className={inputCls} style={inputBase} placeholder="03XXXXXXXXX" maxLength={11}
          value={form.phone} onChange={e => {
            const val = e.target.value.replace(/\D/g, "");
            setForm(f => ({ ...f, phone: val }));
          }} />
      </Field>

      {/* Store Address Section */}
      <div>
        <p style={{ ...labelStyle, fontSize: 12, letterSpacing: "0.14em", marginBottom: 14, color: "rgba(26,17,8,0.4)" }}>
          Store Address
        </p>

        <Field label="Street Address">
          <div className="relative">
            <MapPin size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(26,17,8,0.3)" }} />
            <input className={inputCls} style={{ ...inputBase, paddingLeft: 38 }} placeholder="House / shop no, area"
              value={form.streetAddress} onChange={e => setForm(f => ({ ...f, streetAddress: e.target.value }))} />
          </div>
        </Field>

        <div className="flex gap-4 mt-4">
          <Field label="City" half>
            <select className={inputCls} style={{ ...inputBase, appearance: "auto" as any }}
              value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Postal Code" half>
            <input className={inputCls} style={inputBase} placeholder="54000"
              value={form.postalCode} onChange={e => setForm(f => ({ ...f, postalCode: e.target.value }))} />
          </Field>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!valid}
        className="w-full py-4 rounded-xl font-extrabold text-white flex items-center justify-center gap-2 mt-6 transition-opacity hover:opacity-90 disabled:opacity-40"
        style={{ background: ORANGE, fontFamily: FONT }}
      >
        Continue <ArrowRight size={16} />
      </button>
    </div>
  );
}

/* ── Step 2: CNIC Upload ────────────────────────────────────────────── */

function StepCnicUpload({
  form, setForm, onNext, onBack,
}: {
  form: SellerVerificationFormData;
  setForm: React.Dispatch<React.SetStateAction<SellerVerificationFormData>>;
  onNext: () => void;
  onBack: () => void;
}) {
  const valid = form.cnicFrontFile && form.cnicBackFile;

  const handleFileSelect = (side: "front" | "back") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const preview = URL.createObjectURL(file);
        if (side === "front") {
          setForm(f => ({ ...f, cnicFrontFile: file, cnicFrontPreview: preview }));
        } else {
          setForm(f => ({ ...f, cnicBackFile: file, cnicBackPreview: preview }));
        }
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6 max-w-[720px]">
      <p className="text-[rgba(26,17,8,0.6)] font-medium" style={{ fontFamily: FONT }}>
        Upload clear photos of the front and back of your CNIC. This is required for identity verification.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => handleFileSelect("front")}
          className="border-2 border-dashed border-[rgba(26,17,8,0.15)] rounded-2xl flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-black/5 transition-colors"
          style={{ aspectRatio: "1.6/1", background: form.cnicFrontPreview ? `url(${form.cnicFrontPreview}) center/cover no-repeat` : undefined }}
        >
          {!form.cnicFrontPreview && (
            <>
              <Upload className="text-[rgba(26,17,8,0.4)] mb-3" size={32} />
              <span className="font-semibold text-sm" style={{ color: INK, fontFamily: FONT }}>Upload Front Side</span>
            </>
          )}
        </div>

        <div 
          onClick={() => handleFileSelect("back")}
          className="border-2 border-dashed border-[rgba(26,17,8,0.15)] rounded-2xl flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-black/5 transition-colors"
          style={{ aspectRatio: "1.6/1", background: form.cnicBackPreview ? `url(${form.cnicBackPreview}) center/cover no-repeat` : undefined }}
        >
          {!form.cnicBackPreview && (
            <>
              <Upload className="text-[rgba(26,17,8,0.4)] mb-3" size={32} />
              <span className="font-semibold text-sm" style={{ color: INK, fontFamily: FONT }}>Upload Back Side</span>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={onBack}
          className="px-6 py-4 rounded-xl font-extrabold flex items-center justify-center transition-colors hover:bg-black/5"
          style={{ color: INK, fontFamily: FONT, boxShadow: "0 0 0 1px rgba(26,17,8,0.1) inset" }}
        >
          Back
        </button>
        <button onClick={onNext} disabled={!valid}
          className="flex-1 py-4 rounded-xl font-extrabold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-40"
          style={{ background: ORANGE, fontFamily: FONT }}
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ── Step 3: Products & Proof ──────────────────────────────────────── */

function StepProductsProof({
  form, setForm, onNext, onBack,
}: {
  form: SellerVerificationFormData;
  setForm: React.Dispatch<React.SetStateAction<SellerVerificationFormData>>;
  onNext: () => void;
  onBack: () => void;
}) {
  const updateProduct = (idx: number, patch: Partial<VerificationProductProof>) => {
    setForm(f => ({
      ...f,
      products: f.products.map((p, i) => (i === idx ? { ...p, ...patch } : p)),
    }));
  };

  const addProduct = () => {
    setForm(f => ({
      ...f,
      products: [...f.products, { name: "", sizes: "", price: "", description: "", images: [] }],
    }));
  };

  const handleImageUpload = (idx: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e: any) => {
      const files = Array.from(e.target.files) as File[];
      if (files.length > 0) {
        const newImages = files.map(file => ({
          file,
          preview: URL.createObjectURL(file)
        }));
        const existing = form.products[idx].images || [];
        updateProduct(idx, { images: [...existing, ...newImages] });
      }
    };
    input.click();
  };

  const removeImage = (prodIdx: number, imgIdx: number) => {
    const existing = form.products[prodIdx].images;
    updateProduct(prodIdx, { images: existing.filter((_, i) => i !== imgIdx) });
  };

  const hasAtLeastOneProduct = form.products.some(p => p.name.trim());

  return (
    <div className="max-w-[720px]">
      <p className="text-sm mb-6" style={{ color: "rgba(26,17,8,0.55)", fontFamily: FONT, lineHeight: 1.6 }}>
        Tell us what you'll sell and upload a real photo of each item as proof of ownership. Our team checks these to keep fakes off the platform.
      </p>

      <div className="space-y-6">
        {form.products.map((prod, idx) => (
          <div key={idx} className="p-6 rounded-2xl border space-y-4" style={{ borderColor: "rgba(26,17,8,0.1)", background: "white" }}>
            <Field label={`Product ${idx + 1} Name`}>
              <input className={inputCls} style={inputBase} placeholder="e.g. Nike Air Jordan 1"
                value={prod.name} onChange={e => updateProduct(idx, { name: e.target.value })} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Sizes Available">
                <input className={inputCls} style={inputBase} placeholder="e.g. M, L, XL"
                  value={prod.sizes} onChange={e => updateProduct(idx, { sizes: e.target.value })} />
              </Field>
              <Field label="Price (PKR)">
                <input className={inputCls} style={inputBase} placeholder="e.g. 2500" type="number"
                  value={prod.price} onChange={e => updateProduct(idx, { price: e.target.value })} />
              </Field>
            </div>

            <Field label="Description">
              <textarea className={inputCls} style={{ ...inputBase, resize: "none" }} rows={3} placeholder="Describe your product..."
                value={prod.description} onChange={e => updateProduct(idx, { description: e.target.value })} />
            </Field>

            <div>
              <p className="text-sm font-bold mb-2" style={{ color: INK, fontFamily: FONT }}>Images</p>
              <div className="flex flex-wrap gap-3">
                {prod.images.map((img, imgIdx) => (
                  <div key={imgIdx} className="relative rounded-xl overflow-hidden" style={{ width: 80, height: 80 }}>
                    <img src={img.preview || ""} alt="proof" className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeImage(idx, imgIdx)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ background: "rgba(0,0,0,0.6)", color: "white" }}
                    >✕</button>
                  </div>
                ))}
                
                <button
                  onClick={() => handleImageUpload(idx)}
                  className="rounded-xl flex flex-col items-center justify-center transition-opacity hover:opacity-80"
                  style={{ width: 80, height: 80, background: "rgba(255,87,34,0.08)", color: ORANGE, fontFamily: FONT }}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addProduct}
        className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 mt-4 transition-colors hover:bg-[rgba(26,17,8,0.03)]"
        style={{ border: "1px solid rgba(26,17,8,0.1)", color: INK, fontFamily: FONT }}
      >
        <Plus size={16} /> Add another product
      </button>

      <div className="flex gap-4 mt-8">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-xl font-extrabold transition-colors hover:bg-[rgba(26,17,8,0.03)]"
          style={{ border: "1px solid rgba(26,17,8,0.12)", color: INK, fontFamily: FONT }}
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!hasAtLeastOneProduct}
          className="flex-1 py-4 rounded-xl font-extrabold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-40"
          style={{ background: ORANGE, fontFamily: FONT }}
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ── Step 4: AI Verification ────────────────────────────────────────── */

function StepAiVerification({
  form, setForm, onNext, onBack,
}: {
  form: SellerVerificationFormData;
  setForm: React.Dispatch<React.SetStateAction<SellerVerificationFormData>>;
  onNext: () => void;
  onBack: () => void;
}) {
  const [scanning, setScanning] = useState(false);

  const handleSimulateScan = (method: "camera" | "upload") => {
    setForm(f => ({ ...f, aiVerificationMethod: method }));
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setForm(f => ({ ...f, aiVerified: true }));
    }, 2500);
  };

  return (
    <div className="max-w-[720px] space-y-6">
      <div className="p-6 rounded-2xl mb-6" style={{ background: INK }}>
        <div className="flex items-start gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ScanFace size={18} style={{ color: "#FFD600" }} />
          </div>
          <div>
            <p className="font-bold text-white text-sm" style={{ fontFamily: FONT }}>Live AI Verification</p>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.6)", fontFamily: FONT, lineHeight: 1.5 }}>
              To ensure authenticity, our AI model requires you to show the physical product. You can either turn on your camera or upload a live photo.
            </p>
          </div>
        </div>
      </div>

      {form.aiVerified ? (
        <div className="border-2 rounded-2xl p-10 text-center" style={{ borderColor: "rgba(46,158,79,0.3)", background: "rgba(46,158,79,0.05)" }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(46,158,79,0.15)" }}>
            <Check size={32} style={{ color: "#2E9E4F" }} />
          </div>
          <p className="font-bold text-lg" style={{ color: INK, fontFamily: FONT }}>Verification Successful</p>
          <p className="text-sm mt-2" style={{ color: "rgba(26,17,8,0.5)", fontFamily: FONT }}>
            Our AI has verified your products.
          </p>
        </div>
      ) : scanning ? (
        <div className="border-2 border-dashed rounded-2xl p-10 text-center flex flex-col items-center justify-center" style={{ borderColor: ORANGE, background: "rgba(255,87,34,0.05)" }}>
          <div className="animate-spin mb-4 text-[#FF5722]">
            <ScanFace size={48} />
          </div>
          <p className="font-bold text-lg" style={{ color: INK, fontFamily: FONT }}>Scanning Product...</p>
          <p className="text-sm mt-2" style={{ color: "rgba(26,17,8,0.5)", fontFamily: FONT }}>
            Please wait while our AI analyzes the item.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => handleSimulateScan("camera")}
            className="border-2 border-[rgba(26,17,8,0.1)] rounded-2xl p-8 text-center hover:bg-black/5 transition-colors flex flex-col items-center justify-center gap-4"
          >
            <Camera size={40} className="text-[rgba(26,17,8,0.6)]" />
            <div>
              <p className="font-bold" style={{ color: INK, fontFamily: FONT }}>Turn on Camera</p>
              <p className="text-xs mt-1" style={{ color: "rgba(26,17,8,0.5)", fontFamily: FONT }}>Scan live via webcam</p>
            </div>
          </button>
          <button
            onClick={() => handleSimulateScan("upload")}
            className="border-2 border-[rgba(26,17,8,0.1)] rounded-2xl p-8 text-center hover:bg-black/5 transition-colors flex flex-col items-center justify-center gap-4"
          >
            <Smartphone size={40} className="text-[rgba(26,17,8,0.6)]" />
            <div>
              <p className="font-bold" style={{ color: INK, fontFamily: FONT }}>Upload from Device</p>
              <p className="text-xs mt-1" style={{ color: "rgba(26,17,8,0.5)", fontFamily: FONT }}>Choose a live photo</p>
            </div>
          </button>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-xl font-extrabold transition-colors hover:bg-[rgba(26,17,8,0.03)]"
          style={{ border: "1px solid rgba(26,17,8,0.12)", color: INK, fontFamily: FONT }}
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!form.aiVerified}
          className="flex-1 py-4 rounded-xl font-extrabold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-40"
          style={{ background: ORANGE, fontFamily: FONT }}
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ── Step 4: Review ────────────────────────────────────────────────── */

function StepReview({
  form, onBack, onSubmit, submitting,
}: {
  form: SellerVerificationFormData;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  const productCount = form.products.filter(p => p.name.trim()).length;

  return (
    <div className="max-w-[720px]">
      {/* Summary card */}
      <div className="p-6 rounded-2xl border" style={{ borderColor: "rgba(26,17,8,0.1)", background: "white" }}>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,87,34,0.1)" }}>
              <ShieldCheck size={16} style={{ color: ORANGE }} />
            </div>
            <span className="font-bold text-sm" style={{ color: INK, fontFamily: FONT }}>{form.shopName || "My Store"}</span>
          </div>

          <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(26,17,8,0.6)", fontFamily: FONT }}>
            <MapPin size={14} style={{ color: "rgba(26,17,8,0.3)" }} />
            {form.streetAddress ? `${form.streetAddress}, ${form.city}` : form.city}
          </div>

          <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(26,17,8,0.6)", fontFamily: FONT }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(26,17,8,0.3)" }}>
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
            <span style={{ fontFamily: MONO, fontSize: 12 }}>
              {form.storeType.charAt(0) + form.storeType.slice(1).toLowerCase()}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(26,17,8,0.6)", fontFamily: FONT }}>
            <ShieldCheck size={14} style={{ color: "rgba(26,17,8,0.3)" }} />
            <span>{productCount} product{productCount !== 1 ? "s" : ""} with proof</span>
          </div>

          <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(26,17,8,0.6)", fontFamily: FONT }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(26,17,8,0.3)" }}>
              <rect x="3" y="4" width="18" height="16" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>{form.cnicFrontFile && form.cnicBackFile ? "CNIC Photos Uploaded" : "CNIC Missing"}</span>
          </div>

          <div className="flex items-center gap-2 text-sm" style={{ color: form.aiVerified ? "#2E9E4F" : "rgba(26,17,8,0.6)", fontFamily: FONT }}>
            <ScanFace size={14} style={{ color: form.aiVerified ? "#2E9E4F" : "rgba(26,17,8,0.3)" }} />
            <span className={form.aiVerified ? "font-bold" : ""}>
              {form.aiVerified ? "AI Authenticity Verified" : "AI Verification Pending"}
            </span>
          </div>
        </div>
      </div>

      {/* Info note */}
      <div className="flex items-start gap-3 p-4 rounded-xl mt-6" style={{ background: "rgba(255,87,34,0.06)" }}>
        <Clock size={16} style={{ color: ORANGE, flexShrink: 0, marginTop: 2 }} />
        <p className="text-xs" style={{ color: "rgba(26,17,8,0.6)", fontFamily: FONT, lineHeight: 1.6 }}>
          After you submit, our admin team reviews your store & proof photos (usually within <strong style={{ color: INK }}>24 hours</strong>). You can explore your dashboard while it's pending.
        </p>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-xl font-extrabold transition-colors hover:bg-[rgba(26,17,8,0.03)]"
          style={{ border: "1px solid rgba(26,17,8,0.12)", color: INK, fontFamily: FONT }}
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="flex-1 py-4 rounded-xl font-extrabold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ background: ORANGE, fontFamily: FONT }}
        >
          <ShieldCheck size={16} /> {submitting ? "Submitting..." : "Submit for review"}
        </button>
      </div>
    </div>
  );
}

/* ── Post-Submission Status Screens ────────────────────────────────── */

function PendingScreen() {
  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(255,214,0,0.15)" }}>
        <Clock size={36} style={{ color: "#E6AC00" }} />
      </div>
      <h2 className="font-extrabold text-xl mb-2" style={{ color: INK, fontFamily: FONT }}>Under Review</h2>
      <p className="text-sm" style={{ color: "rgba(26,17,8,0.5)", fontFamily: FONT, lineHeight: 1.6 }}>
        Your verification is being reviewed by our admin team.<br />This usually takes up to <strong style={{ color: INK }}>24 hours</strong>.
      </p>
      <div className="mt-6 p-4 rounded-xl flex items-center gap-3" style={{ background: "rgba(255,87,34,0.05)" }}>
        <Check size={16} style={{ color: "#2E9E4F" }} />
        <span className="text-xs font-semibold" style={{ color: "rgba(26,17,8,0.6)", fontFamily: FONT }}>
          You can explore your dashboard while it's pending.
        </span>
      </div>
    </div>
  );
}

function RejectedScreen({
  reason, attemptsLeft, onRetry,
}: {
  reason: string | null;
  attemptsLeft: number;
  onRetry: () => void;
}) {
  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(217,48,37,0.1)" }}>
        <AlertCircle size={36} style={{ color: "#D93025" }} />
      </div>
      <h2 className="font-extrabold text-xl mb-2" style={{ color: INK, fontFamily: FONT }}>Verification Rejected</h2>
      {reason && (
        <div className="p-4 rounded-xl mb-4 text-left" style={{ background: "rgba(217,48,37,0.06)" }}>
          <p className="text-xs font-semibold mb-1" style={{ color: "#D93025", fontFamily: MONO }}>REASON</p>
          <p className="text-sm" style={{ color: INK, fontFamily: FONT }}>{reason}</p>
        </div>
      )}
      <p className="text-sm mb-6" style={{ color: "rgba(26,17,8,0.5)", fontFamily: FONT }}>
        You have <strong style={{ color: INK }}>{attemptsLeft}</strong> attempt{attemptsLeft !== 1 ? "s" : ""} remaining. Please fix the issues and try again.
      </p>
      <button
        onClick={onRetry}
        className="px-8 py-3.5 rounded-xl font-extrabold text-white transition-opacity hover:opacity-90"
        style={{ background: ORANGE, fontFamily: FONT }}
      >
        Try Again
      </button>
    </div>
  );
}

function FrozenScreen({ freezeUntil }: { freezeUntil: string | null }) {
  const until = freezeUntil ? new Date(freezeUntil) : null;
  const daysLeft = until ? Math.max(0, Math.ceil((until.getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 7;

  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(26,17,8,0.06)" }}>
        <Clock size={36} style={{ color: "rgba(26,17,8,0.35)" }} />
      </div>
      <h2 className="font-extrabold text-xl mb-2" style={{ color: INK, fontFamily: FONT }}>Account Temporarily Frozen</h2>
      <p className="text-sm mb-4" style={{ color: "rgba(26,17,8,0.5)", fontFamily: FONT, lineHeight: 1.6 }}>
        You've used all 3 verification attempts. Your account is frozen for <strong style={{ color: INK }}>1 week</strong>.
      </p>
      <div className="p-4 rounded-xl" style={{ background: "rgba(26,17,8,0.04)" }}>
        <p className="text-xs" style={{ color: "rgba(26,17,8,0.45)", fontFamily: MONO }}>
          {until ? `Try again after ${until.toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}` : `~${daysLeft} days remaining`}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════ */

export default function SellerVerify({ s }: { s: Store }) {
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [form, setForm] = useState<SellerVerificationFormData>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  // Fetch verification status on mount
  useEffect(() => {
    s.fetchVerificationStatus();
  }, []);

  const goNext = () => {
    setCompletedSteps(prev => new Set(prev).add(step));
    setStep(s => Math.min(s + 1, 5));
  };
  const goBack = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await s.submitSellerVerificationAsync({
        business_name: form.shopName,
        business_type: form.storeType,
        phone_number: form.phone,
        address: form.streetAddress,
        city: form.city,
        cnic_number: form.cnicNumber || undefined,
        cnic_front_url: form.cnicFrontFile ? "https://placeholder.thriftkro.pk/cnic_front.jpg" : "",
        cnic_back_url: form.cnicBackFile ? "https://placeholder.thriftkro.pk/cnic_back.jpg" : "",
        shop_photo_urls: [],
        products_proof: form.products
          .filter(p => p.name.trim())
          .map((p, i) => ({
            name: p.name,
            sizes: p.sizes,
            price: p.price,
            description: p.description,
            images: p.images.map((_, j) => `https://placeholder.thriftkro.pk/proof_${i + 1}_${j + 1}.jpg`)
          })),
        ai_verified: form.aiVerified,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setStep(1);
    setCompletedSteps(new Set());
    setForm(emptyForm);
  };

  // Determine what to show based on verification status
  const verifyState = s.sellerVerified;
  const statusData = s.sellerVerificationStatus;
  const showWizard = verifyState === "unverified" || verifyState === "rejected";

  // If user just submitted and is now pending, show pending screen
  // Also check if the backend says pending
  const isPending = verifyState === "pending";
  const isFrozen = verifyState === "frozen";
  const isVerified = verifyState === "verified";
  const isRejected = verifyState === "rejected";

  return (
    <div className="min-h-screen" style={{ background: PAPER, fontFamily: FONT }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b" style={{ borderColor: "rgba(26,17,8,0.06)", background: "white" }}>
        <Logo size={34} />
        <button
          onClick={() => s.logout()}
          className="text-sm font-semibold transition-opacity hover:opacity-60"
          style={{ color: "rgba(26,17,8,0.5)", fontFamily: FONT }}
        >
          Log out
        </button>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-8 py-10">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck size={16} style={{ color: ORANGE }} />
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE, fontWeight: 700 }}>
            Seller Verification
          </span>
        </div>

        <h1 className="font-extrabold mb-2" style={{ fontSize: 32, letterSpacing: "-0.03em", color: INK }}>
          Let's verify your store
        </h1>
        <p className="text-sm mb-8" style={{ color: "rgba(26,17,8,0.55)", lineHeight: 1.6 }}>
          A quick check keeps Thrift Kro safe & trusted. Our team reviews every new seller before going live.
        </p>

        {/* Conditional content */}
        {isVerified && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(46,158,79,0.1)" }}>
              <Check size={36} style={{ color: "#2E9E4F" }} strokeWidth={3} />
            </div>
            <h2 className="font-extrabold text-xl mb-2" style={{ color: INK }}>Store Verified ✓</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(26,17,8,0.5)" }}>Your store is live. Start listing your products!</p>
            <button
              onClick={() => s.setRoute("seller-dashboard")}
              className="px-8 py-3.5 rounded-xl font-extrabold text-white transition-opacity hover:opacity-90"
              style={{ background: ORANGE }}
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {isPending && (
          <>
            <StepIndicator step={5} completedSteps={new Set([1, 2, 3, 4, 5])} />
            <PendingScreen />
          </>
        )}

        {isFrozen && (
          <FrozenScreen freezeUntil={statusData?.freeze_until || null} />
        )}

        {isRejected && !showWizard ? null : isRejected && (
          <RejectedScreen
            reason={statusData?.latest_request?.rejection_reason || null}
            attemptsLeft={Math.max(0, (statusData?.max_submissions_per_day ?? 3) - (statusData?.submissions_today ?? 0))}
            onRetry={handleRetry}
          />
        )}

        {verifyState === "unverified" && (
          <>
            <StepIndicator step={step} completedSteps={completedSteps} />
            {step === 1 && <StepStoreDetails form={form} setForm={setForm} onNext={goNext} />}
            {step === 2 && <StepCnicUpload form={form} setForm={setForm} onNext={goNext} onBack={goBack} />}
            {step === 3 && <StepProductsProof form={form} setForm={setForm} onNext={goNext} onBack={goBack} />}
            {step === 4 && <StepAiVerification form={form} setForm={setForm} onNext={goNext} onBack={goBack} />}
            {step === 5 && <StepReview form={form} onBack={goBack} onSubmit={handleSubmit} submitting={submitting} />}
          </>
        )}
      </div>
    </div>
  );
}
