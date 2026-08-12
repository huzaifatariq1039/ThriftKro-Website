import React, { useState } from "react";
import { Upload, Sparkles, Plus, ArrowRight } from "lucide-react";
import { ORANGE, INK } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label, Field, inputCls, inputStyle } from "@/components/ui";
import { SellerShell } from "../components/SellerShell";
import { productService } from "@/services/api/productService";

export default function SellerAdd({ s }: { s: Store }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Shoes");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("Excellent");
  const [sizes, setSizes] = useState<string[]>([]);
  const [images, setImages] = useState<{ file: File, preview: string, base64: string }[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDone, setAiDone] = useState(false);

  const simulateAi = () => {
    if (images.length === 0) {
      s.showToast("Please upload an image first!");
      return;
    }
    setAiLoading(true);
    setTimeout(() => {
      setName("Nike Dunk Low Retro Panda (2024)");
      setCategory("Shoes");
      setPrice("18500");
      setCondition("Excellent");
      setAiLoading(false);
      setAiDone(true);
    }, 1200);
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = async (e: any) => {
      const files = Array.from(e.target.files) as File[];
      if (files.length > 0) {
        const newImages = await Promise.all(
          files.map(
            (file) =>
              new Promise<{ file: File; preview: string; base64: string }>((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  resolve({
                    file,
                    preview: URL.createObjectURL(file),
                    base64: e.target?.result as string,
                  });
                };
                reader.readAsDataURL(file);
              })
          )
        );
        setImages(prev => [...prev, ...newImages]);
      }
    };
    input.click();
  };

  const submit = async () => {
    if (!name || !price) {
      s.showToast("Please enter item title and price.");
      return;
    }

    try {
      const finalImages = images.map(i => i.base64);
      const finalImg = finalImages.length > 0 ? finalImages[0] : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&auto=format";
      
      const res = await productService.createProduct({
        name,
        price: Number(price),
        originalPrice: Number(price) * 1.3,
        category,
        condition,
        size: sizes.length > 0 ? sizes.join(", ") : "One Size",
        img: finalImg,
        images: finalImages.length > 0 ? finalImages : [finalImg],
        description: `High quality ${category.toLowerCase()} - ${condition} condition.`,
      });

      if (res.data) {
        s.addSellerListing({
          id: typeof res.data.id === "number" ? res.data.id : Date.now(),
          name: res.data.name || name,
          price: res.data.price || Number(price),
          views: 0,
          status: "Active",
          img: res.data.img || finalImg,
        });
      }
      s.showToast("Listing published to marketplace ✓");
      s.setRoute("seller-listings");
    } catch (err: any) {
      s.showToast(err.message || "Failed to publish listing.");
    }
  };

  return (
    <SellerShell s={s}>
      <Label>NEW LISTING</Label>
      <h1 className="font-extrabold mt-1 mb-8" style={{ fontSize: 32, letterSpacing: "-0.03em", color: INK }}>Add an item</h1>
      <div className="max-w-2xl bg-white p-8 rounded-3xl" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
        
        {images.length > 0 ? (
          <div className="flex flex-wrap gap-4 mb-6">
            {images.map((img, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden" style={{ width: 120, height: 120 }}>
                <img src={img.preview} alt="upload" className="w-full h-full object-cover" />
                <button
                  onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "rgba(0,0,0,0.6)", color: "white" }}
                >✕</button>
              </div>
            ))}
            <button
              onClick={handleImageUpload}
              className="rounded-2xl flex flex-col items-center justify-center transition-opacity hover:opacity-80"
              style={{ width: 120, height: 120, background: "rgba(255,87,34,0.08)", color: ORANGE }}
            >
              <Plus size={24} />
            </button>
          </div>
        ) : (
          <div onClick={handleImageUpload} className="border-2 border-dashed rounded-2xl p-8 text-center mb-6 cursor-pointer hover:bg-black/5 transition-colors" style={{ borderColor: "rgba(26,17,8,0.15)" }}>
            <Upload size={32} style={{ color: ORANGE }} className="mx-auto mb-2" />
            <p className="font-bold text-sm" style={{ color: INK }}>Upload photos of your item</p>
            <p className="text-xs mb-4" style={{ color: "rgba(26,17,8,0.5)" }}>PNG, JPG up to 10MB</p>
            <button onClick={(e) => { e.stopPropagation(); simulateAi(); }} disabled={aiLoading} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold text-white" style={{ background: ORANGE }}>
              <Sparkles size={14} /> {aiLoading ? "AI analyzing photo…" : "Auto-fill with AI"}
            </button>
            {aiDone && <p className="text-xs font-bold text-emerald-600 mt-2">✓ AI identified Nike Dunk Low Panda · Suggested PKR 18,500</p>}
          </div>
        )}

        <div className="space-y-4">
          <Field label="Item title"><input className={inputCls} style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Vintage Denim Jacket" /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select className={inputCls} style={inputStyle} value={category} onChange={e => setCategory(e.target.value)}>
                {["Shoes", "Jackets", "Tops", "Bottoms", "Bags", "Accessories"].map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Price (PKR)"><input type="number" className={inputCls} style={inputStyle} value={price} onChange={e => setPrice(e.target.value)} placeholder="1500" /></Field>
          </div>
          <Field label="Sizes Available">
            <div className="flex gap-2 flex-wrap">
              {(() => {
                let availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
                if (category === "Pants" || category === "Trousers") availableSizes = ["28", "30", "32", "34", "36", "38", "40"];
                else if (category === "Shoes") availableSizes = ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"];
                
                return availableSizes.map(s => {
                  const isSelected = sizes.includes(s);
                  return (
                    <button 
                      key={s} 
                      type="button" 
                      onClick={() => setSizes(prev => isSelected ? prev.filter(x => x !== s) : [...prev, s])} 
                      className="px-4 py-2.5 rounded-xl text-xs font-bold transition-colors" 
                      style={{ background: isSelected ? INK : "#F5F2EE", color: isSelected ? "white" : INK }}
                    >
                      {s}
                    </button>
                  );
                });
              })()}
            </div>
          </Field>
          <Field label="Condition">
            <div className="flex gap-2">
              {["New", "Like New", "Excellent", "Good", "Fair"].map(c => (
                <button key={c} type="button" onClick={() => setCondition(c)} className="px-4 py-2.5 rounded-xl text-xs font-bold" style={{ background: condition === c ? INK : "#F5F2EE", color: condition === c ? "white" : INK }}>{c}</button>
              ))}
            </div>
          </Field>
          <button onClick={submit} className="w-full py-4 rounded-xl font-extrabold text-white flex items-center justify-center gap-2 mt-6" style={{ background: ORANGE }}>
            Publish Listing <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </SellerShell>
  );
}
