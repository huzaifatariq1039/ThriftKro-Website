import React, { useEffect, useState } from "react";
import { Upload, Plus, ArrowRight, Loader2 } from "lucide-react";
import { ORANGE, INK } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label, Field, inputCls, inputStyle } from "@/components/ui";
import { SellerShell } from "../components/SellerShell";
import { CategoryDto, productService } from "@/services/api/productService";

export default function SellerAdd({ s }: { s: Store }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("Excellent");
  const [sizes, setSizes] = useState<string[]>([]);
  const [stockPerVariant, setStockPerVariant] = useState("1");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<{ file: File, preview: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const category = categories.find(item => item.id === categoryId)?.name || "";

  useEffect(() => {
    let isMounted = true;
    productService.getCategories()
      .then(response => {
        if (!isMounted) return;
        setCategories(response.data);
        setCategoryId(current => current || response.data[0]?.id || "");
      })
      .catch((err: any) => {
        if (isMounted) s.showToast(err?.message || "Could not load product categories.");
      })
      .finally(() => {
        if (isMounted) setCategoriesLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e: any) => {
      const files = Array.from(e.target.files || []) as File[];
      const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
      const validFiles = files.filter(file => allowedTypes.has(file.type) && file.size <= 5 * 1024 * 1024);
      if (validFiles.length !== files.length) {
        s.showToast("Only JPEG, PNG, or WebP images up to 5MB are allowed.");
      }
      setImages(previous => [
        ...previous,
        ...validFiles.slice(0, Math.max(0, 8 - previous.length)).map(file => ({
          file,
          preview: URL.createObjectURL(file),
        })),
      ]);
    };
    input.click();
  };

  const submit = async () => {
    const numericPrice = Number(price);
    const numericStock = Number(stockPerVariant);
    if (!name.trim() || !Number.isFinite(numericPrice) || numericPrice <= 0) {
      s.showToast("Please enter an item title and a valid positive price.");
      return;
    }
    if (!categoryId) {
      s.showToast("Please select a category loaded from the marketplace.");
      return;
    }
    if (images.length === 0) {
      s.showToast("Please upload at least one product image.");
      return;
    }
    if (!Number.isInteger(numericStock) || numericStock < 0) {
      s.showToast("Stock per variant must be a non-negative whole number.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await productService.createProduct({
        name: name.trim(),
        description: description.trim() || undefined,
        price: numericPrice,
        originalPrice: numericPrice * 1.3,
        categoryId,
        brand: brand.trim() || undefined,
        condition,
        imageFiles: images.map(image => image.file),
        variants: (sizes.length > 0 ? sizes : ["One Size"]).map(size => ({
          attributes: { size },
          quantityInStock: numericStock,
        })),
        tags: tags.split(",").map(tag => tag.trim()).filter(Boolean),
      });

      if (res.data) {
        s.addSellerListing({
          id: res.data.id,
          name: res.data.name || name,
          price: res.data.price || numericPrice,
          views: 0,
          status: "Active",
          category,
          img: res.data.img,
        });
      }
      s.showToast("Listing published to marketplace ✓");
      images.forEach(image => URL.revokeObjectURL(image.preview));
      s.setRoute("seller-listings");
    } catch (err: any) {
      s.showToast(err.message || "Failed to publish listing.");
    } finally {
      setSubmitting(false);
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
                  onClick={() => {
                    URL.revokeObjectURL(img.preview);
                    setImages(prev => prev.filter((_, i) => i !== idx));
                  }}
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
            <p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>JPEG, PNG, or WebP · up to 5MB each · maximum 8 images</p>
          </div>
        )}

        <div className="space-y-4">
          <Field label="Item title"><input className={inputCls} style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Vintage Denim Jacket" /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select className={inputCls} style={inputStyle} value={categoryId} onChange={e => setCategoryId(e.target.value)} disabled={categoriesLoading || categories.length === 0}>
                {categoriesLoading && <option value="">Loading categories…</option>}
                {!categoriesLoading && categories.length === 0 && <option value="">No categories available</option>}
                {categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </Field>
            <Field label="Price (PKR)"><input type="number" className={inputCls} style={inputStyle} value={price} onChange={e => setPrice(e.target.value)} placeholder="1500" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Brand"><input className={inputCls} style={inputStyle} value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g. Levi's" /></Field>
            <Field label="Stock per size"><input type="number" min="0" step="1" className={inputCls} style={inputStyle} value={stockPerVariant} onChange={e => setStockPerVariant(e.target.value)} /></Field>
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
          <Field label="Description"><textarea className={inputCls} style={inputStyle} rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the item's condition, material, and any defects." /></Field>
          <Field label="Tags (comma separated)"><input className={inputCls} style={inputStyle} value={tags} onChange={e => setTags(e.target.value)} placeholder="vintage, denim, streetwear" /></Field>
          <button disabled={submitting || categoriesLoading || categories.length === 0} onClick={submit} className="w-full py-4 rounded-xl font-extrabold text-white flex items-center justify-center gap-2 mt-6 disabled:opacity-50" style={{ background: ORANGE }}>
            {submitting ? <><Loader2 size={18} className="animate-spin" /> Uploading & publishing…</> : <>Publish Listing <ArrowRight size={18} /></>}
          </button>
        </div>
      </div>
    </SellerShell>
  );
}
