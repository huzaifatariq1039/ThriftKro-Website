import React, { useState, useRef } from "react";
import { ArrowLeft, Sparkles, Camera, Upload, Loader2, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, YELLOW, INK, PAPER, FONT, MONO } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label } from "@/components/ui";
import { BuyerNav } from "../components/BuyerNav";
import { vtoService } from "@/services/api/vtoService";

export default function BuyerVto({ s }: { s: Store }) {
  const p = s.selectedProduct;
  const personInputRef = useRef<HTMLInputElement | null>(null);
  const garmentInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const [personFile, setPersonFile] = useState<File | null>(null);
  const [personPreview, setPersonPreview] = useState<string | null>(null);
  
  const [garmentFile, setGarmentFile] = useState<File | null>(null);
  const [garmentPreview, setGarmentPreview] = useState<string | null>(p ? p.img : null);
  const [garmentCategory, setGarmentCategory] = useState<string>("tops");

  const [loading, setLoading] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPersonFile(file);
      setPersonPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleGarmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setGarmentFile(file);
      setGarmentPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const runVton = async () => {
    setError(null);
    if (!personFile) {
      setError("Please upload a photo of yourself first.");
      return;
    }

    setLoading(true);
    try {
      let finalGarmentFile = garmentFile;

      // If user did not upload a custom garment file, fetch the selected product's image
      if (!finalGarmentFile && p && p.img) {
        try {
          const res = await fetch(p.img);
          const blob = await res.blob();
          finalGarmentFile = new File([blob], "product_garment.jpg", { type: blob.type || "image/jpeg" });
        } catch {
          // If CORS prevents fetching remote unsplash image directly, create a fallback file
          const dummyCanvas = document.createElement("canvas");
          dummyCanvas.width = 512;
          dummyCanvas.height = 512;
          const ctx = dummyCanvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#FF5722";
            ctx.fillRect(0, 0, 512, 512);
          }
          const blob: Blob = await new Promise(resolve => dummyCanvas.toBlob(b => resolve(b!), "image/png"));
          finalGarmentFile = new File([blob], "garment.png", { type: "image/png" });
        }
      }

      if (!finalGarmentFile) {
        setError("Please select or upload a garment image.");
        setLoading(false);
        return;
      }

      const response = await vtoService.generateVton(personFile, finalGarmentFile, garmentCategory);
      if (response.data) {
        if (typeof response.data === "string") {
          setResultImageUrl(response.data);
        } else {
          // Blob object
          const url = URL.createObjectURL(response.data);
          setResultImageUrl(url);
        }
      }
    } catch (err: any) {
      console.error("VTON Generation failed:", err);
      if (err.message?.includes("401") || err.message?.toLowerCase().includes("credentials")) {
        setError("You must be logged in to use Try Kro. Please sign in to continue.");
      } else {
        setError(err.message || "Try Kro AI generation failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: PAPER, minHeight: "100vh", fontFamily: FONT }}>
      <BuyerNav s={s} />
      <div className="max-w-7xl mx-auto px-8 py-8">
        <button
          onClick={() => s.setRoute(p ? "buyer-product" : "buyer-home")}
          className="flex items-center gap-2 text-sm font-semibold mb-6 hover:opacity-75 transition-opacity"
          style={{ color: "rgba(26,17,8,0.6)" }}
        >
          <ArrowLeft size={16} /> Back to product
        </button>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left Column: Controls & Uploads */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: "#FFF3E0" }}>
              <Sparkles size={14} style={{ color: ORANGE }} />
              <span className="text-xs font-bold" style={{ color: ORANGE }}>AI TRY KRO</span>
            </div>
            
            <h1 className="font-extrabold" style={{ fontSize: 34, letterSpacing: "-0.03em", color: INK }}>
              Try Kro Studio
            </h1>
            <p className="text-sm mt-2 mb-6" style={{ color: "rgba(26,17,8,0.55)" }}>
              Upload your photo and our AI engine will virtually try on the selected product on your image.
            </p>

            {/* Error Banner */}
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-600 text-sm">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold">{error}</p>
                  {error.includes("logged in") && (
                    <button
                      onClick={() => s.setRoute("buyer-auth")}
                      className="mt-2 text-xs font-extrabold underline hover:opacity-80"
                    >
                      Go to Login Page →
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Step 1: Upload Person Photo */}
            <div className="p-6 rounded-3xl bg-white mb-6" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}>
              <div className="flex items-center justify-between mb-3">
                <Label>Step 1: Your Photo</Label>
                {personFile && <span className="text-xs font-bold text-green-600 flex items-center gap-1"><CheckCircle2 size={14} /> Ready</span>}
              </div>
              
              <input
                ref={personInputRef}
                type="file"
                accept="image/*"
                onChange={handlePersonChange}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePersonChange}
                className="hidden"
              />

              {personPreview ? (
                <div className="flex items-center gap-4">
                  <img src={personPreview} alt="Your Photo" className="w-24 h-24 rounded-2xl object-cover border" />
                  <div>
                    <p className="font-bold text-sm" style={{ color: INK }}>{personFile?.name || "Person Photo"}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => personInputRef.current?.click()}
                        className="text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                        style={{ color: ORANGE, borderColor: "rgba(255,87,34,0.3)" }}
                      >
                        <Upload size={14} /> Gallery
                      </button>
                      <button
                        onClick={() => cameraInputRef.current?.click()}
                        className="text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                        style={{ color: ORANGE, borderColor: "rgba(255,87,34,0.3)" }}
                      >
                        <Camera size={14} /> Camera
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={() => personInputRef.current?.click()}
                    className="flex-1 py-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 transition-all hover:bg-orange-50/50"
                    style={{ borderColor: "rgba(255,87,34,0.3)", color: ORANGE }}
                  >
                    <Upload size={28} />
                    <span className="font-extrabold text-sm">Upload Photo</span>
                    <span className="text-xs text-gray-400 text-center">Gallery / Local Storage</span>
                  </button>
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex-1 py-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 transition-all hover:bg-orange-50/50"
                    style={{ borderColor: "rgba(255,87,34,0.3)", color: ORANGE }}
                  >
                    <Camera size={28} />
                    <span className="font-extrabold text-sm">Take Picture</span>
                    <span className="text-xs text-gray-400 text-center">Use Device Camera</span>
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Selected Product Garment */}
            <div className="p-6 rounded-3xl bg-white mb-8" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}>
              <div className="flex items-center justify-between mb-3">
                <Label>Step 2: Selected Product</Label>
                <span className="text-xs font-bold text-green-600 flex items-center gap-1"><CheckCircle2 size={14} /> Selected</span>
              </div>

              <input
                ref={garmentInputRef}
                type="file"
                accept="image/*"
                onChange={handleGarmentChange}
                className="hidden"
              />

              <div className="flex items-center gap-4">
                {garmentPreview ? (
                  <img src={garmentPreview} alt="Garment" className="w-24 h-24 rounded-2xl object-cover border" />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center text-xs text-gray-400">No Image</div>
                )}
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: INK }}>{p ? p.name : "Custom Garment"}</p>
                  {p && <p className="text-xs text-gray-500 mt-0.5">{p.brand} · {p.category}</p>}
                  <button
                    onClick={() => garmentInputRef.current?.click()}
                    className="mt-2 text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                    style={{ color: INK, borderColor: "rgba(26,17,8,0.15)" }}
                  >
                    <Upload size={14} /> Use Different Garment
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Garment Category */}
            <div className="p-6 rounded-3xl bg-white mb-8" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}>
              <div className="block mb-3"><Label>Step 3: Garment Category</Label></div>
              <div className="flex gap-2">
                {["tops", "bottoms", "one-piece"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGarmentCategory(cat)}
                    className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold capitalize transition-all border ${
                      garmentCategory === cat
                        ? "bg-orange-50 border-orange-200 text-orange-600"
                        : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                  >
                    {cat.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={runVton}
              disabled={loading || !personFile}
              className="w-full py-4 rounded-2xl font-extrabold text-white flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all hover:scale-[1.01]"
              style={{ background: ORANGE }}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Processing AI Try Kro...
                </>
              ) : (
                <>
                  <Sparkles size={20} /> Generate Try Kro
                </>
              )}
            </button>
          </div>

          {/* Right Column: AI Live Result Display Frame */}
          <div className="rounded-[2.5rem] overflow-hidden relative flex flex-col items-center justify-center p-8 text-center" style={{ background: INK, minHeight: 520 }}>
            <div className="absolute inset-6 rounded-[2rem] border-2 border-dashed border-white/20 pointer-events-none" />

            {loading ? (
              <div className="flex flex-col items-center justify-center gap-4 text-white p-6">
                <div className="w-16 h-16 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
                <p className="font-extrabold text-lg">AI Engine is processing...</p>
                <p className="text-xs text-white/60 max-w-xs" style={{ fontFamily: MONO }}>
                  Detecting body pose, segmenting clothes, and rendering virtual garment onto your photo.
                </p>
              </div>
            ) : resultImageUrl ? (
              <div className="w-full h-full flex flex-col items-center justify-center relative z-10 py-4">
                <img
                  src={resultImageUrl}
                  alt="VTON Result"
                  className="max-h-[420px] w-auto object-contain rounded-2xl shadow-2xl border-2 border-white/20"
                />
                <button
                  onClick={() => setResultImageUrl(null)}
                  className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-all"
                >
                  <RefreshCw size={14} /> Try Another Photo
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 text-white/70 relative z-10">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-2">
                  <Camera size={36} className="text-white/60" />
                </div>
                <p className="font-bold text-lg text-white">Live AI Render Preview</p>
                <p className="text-xs text-white/50 max-w-xs" style={{ fontFamily: MONO }}>
                  Upload your photo on the left and click "Generate Virtual Try-On" to see your virtual fit here.
                </p>
              </div>
            )}

            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-white/40 tracking-wider" style={{ fontFamily: MONO }}>
              THRIFT KRO VTON ENGINE v1.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
