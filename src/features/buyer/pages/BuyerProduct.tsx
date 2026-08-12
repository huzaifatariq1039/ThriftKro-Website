import React, { useState, useEffect } from "react";
import { ArrowLeft, Heart, Camera, Star, Shield, Minus, Plus, Truck } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, YELLOW, INK, PAPER, FONT, MONO, pk } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label } from "@/components/ui";
import { BuyerNav, ProductCard } from "../components/BuyerNav";
import { buyerService } from "@/services/api/buyerService";
import { productService } from "@/services/api/productService";
import { Product } from "@/types/types";

export default function BuyerProduct({ s }: { s: Store }) {
  const p = s.selectedProduct;
  const [size, setSize] = useState(p.size);
  const [qty, setQty] = useState(1);
  const liked = s.likedProducts.has(p.id);
  const [related, setRelated] = useState<Product[]>([]);
  const off = Math.round((1 - p.price / p.originalPrice) * 100);

  const [reviews, setReviews] = useState<any[]>([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Fetch reviews from backend
  useEffect(() => {
    let isMounted = true;
    setReviewsLoading(true);
    buyerService.getProductReviews(p.id)
      .then(res => {
        if (isMounted && res.data && res.data.length > 0) {
          setReviews(res.data.map((r: any) => ({
            id: r.id,
            name: r.buyer_name || r.hex_code || "Buyer",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&auto=format",
            rating: r.rating,
            date: r.created_at ? new Date(r.created_at).toLocaleDateString() : "Recently",
            comment: r.comment || "",
            verified: r.is_verified_purchase ?? true,
          })));
        }
      })
      .catch(err => console.warn("Failed to fetch reviews:", err))
      .finally(() => { if (isMounted) setReviewsLoading(false); });
    return () => { isMounted = false; };
  }, [p.id]);

  // Fetch related products from backend
  useEffect(() => {
    productService.getProducts({ category: p.category })
      .then(res => {
        if (res.data && res.data.length > 0) {
          setRelated(res.data.filter(x => x.id !== p.id).slice(0, 4));
        }
      })
      .catch(() => {});
  }, [p.id, p.category]);

  return (
    <div style={{ background: PAPER, minHeight: "100vh", fontFamily: FONT }}>
      <BuyerNav s={s} />
      <div className="max-w-7xl mx-auto px-8 py-8">
        <button onClick={() => s.setRoute("buyer-home")} className="flex items-center gap-2 text-sm font-semibold mb-6" style={{ color: "rgba(26,17,8,0.6)" }}><ArrowLeft size={16} /> Back to discover</button>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative rounded-[2rem] overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
            <ImageWithFallback src={p.img} alt={p.name} className="w-full aspect-square object-cover" />
            <button onClick={() => s.toggleLike(p.id)} className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: "0 6px 16px rgba(0,0,0,0.12)" }}><Heart size={20} fill={liked ? ORANGE : "none"} style={{ color: liked ? ORANGE : INK }} /></button>
            <button onClick={() => { s.setActiveVtoItem(0); s.setRoute("buyer-vto"); }} className="absolute bottom-5 left-5 flex items-center gap-2 px-4 py-2.5 rounded-full font-extrabold text-sm shadow-md transition-all hover:scale-105" style={{ background: YELLOW, color: INK }}><Camera size={16} /> Try it on</button>
          </div>
          <div>
            <Label>{p.brand.toUpperCase()} · {p.category.toUpperCase()}</Label>
            <h1 className="font-extrabold mt-2" style={{ fontSize: 38, lineHeight: 1.05, letterSpacing: "-0.03em", color: INK }}>{p.name}</h1>
            <div className="flex items-center gap-3 mt-4">
              <span className="font-extrabold" style={{ fontSize: 30, color: ORANGE }}>{pk(p.price)}</span>
              <span className="text-lg line-through" style={{ color: "rgba(26,17,8,0.35)" }}>{pk(p.originalPrice)}</span>
              <span className="px-2 py-1 rounded-full text-xs font-extrabold" style={{ background: YELLOW, color: INK, fontFamily: MONO }}>-{off}%</span>
            </div>
            <div className="flex gap-3 mt-6">
              {[["Condition", p.condition], ["Size", p.size], ["Category", p.category]].map(([l, v]) => (
                <div key={l} className="flex-1 rounded-2xl p-3 bg-white text-center" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}><Label>{l}</Label><p className="font-bold text-sm mt-1" style={{ color: INK }}>{v}</p></div>
              ))}
            </div>
            <div className="mt-6">
              <Label>Select size</Label>
              <div className="flex gap-2 mt-2">
                {(p.size ? p.size.split(",").map(s => s.trim()).filter(Boolean) : ["One Size"]).map((sz, idx) => (
                  <button key={idx} onClick={() => setSize(sz)} className="px-4 py-2.5 rounded-xl text-sm font-bold" style={{ background: size === sz ? INK : "white", color: size === sz ? "white" : INK, boxShadow: "0 0 0 1px rgba(26,17,8,0.1)" }}>{sz}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <Label>Quantity</Label>
              <div className="flex items-center gap-3 rounded-full px-2 py-1 bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.1)" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F2EFE9" }}><Minus size={15} /></button>
                <span className="font-bold w-5 text-center" style={{ fontFamily: MONO }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F2EFE9" }}><Plus size={15} /></button>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 p-4 rounded-2xl bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "#FFF3E0" }}><Star size={18} fill={ORANGE} style={{ color: ORANGE }} /></div>
              <div className="flex-1"><p className="font-bold text-sm" style={{ color: INK }}>{p.seller}</p><p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>{p.sellerRating} rating · Verified seller</p></div>
              <Shield size={18} style={{ color: ORANGE }} />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { s.setActiveVtoItem(0); s.setRoute("buyer-vto"); }} className="py-4 px-5 rounded-xl font-extrabold flex items-center gap-2" style={{ background: YELLOW, color: INK }}><Camera size={18} /> Try Kro</button>
              <button onClick={() => s.addToCart(p)} className="flex-1 py-4 rounded-xl font-extrabold bg-white hover:bg-gray-50" style={{ boxShadow: "0 0 0 1.5px rgba(26,17,8,0.15)", color: INK }}>Add to Cart</button>
              <button onClick={() => { s.addToCart(p); s.setRoute("buyer-cart"); }} className="flex-1 py-4 rounded-xl font-extrabold text-white hover:opacity-90" style={{ background: ORANGE }}>Buy Now</button>
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs" style={{ color: "rgba(26,17,8,0.5)" }}><Truck size={14} /> Delivery in 2-3 days · <Shield size={14} /> 7-day buyer protection</div>
          </div>
        </div>

        {/* ── Product Reviews Section ── */}
        <div className="mt-16 p-8 rounded-[2rem] bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.08)" }}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-extrabold text-2xl" style={{ color: INK }}>Product Reviews</h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#FFF3E0", color: ORANGE, fontFamily: MONO }}>
                  {reviews.length} Reviews
                </span>
              </div>
              <p className="text-xs mt-1" style={{ color: "rgba(26,17,8,0.5)" }}>
                Verified ratings & feedback from buyers across Pakistan
              </p>
            </div>
            <button
              onClick={() => setShowWriteReview(!showWriteReview)}
              className="px-5 py-2.5 rounded-full text-xs font-extrabold transition-opacity hover:opacity-90"
              style={{ background: INK, color: "white" }}
            >
              {showWriteReview ? "Cancel Review" : "+ Write a Review"}
            </button>
          </div>

          {/* Overall Rating Breakdown */}
          <div className="grid md:grid-cols-3 gap-6 p-6 rounded-2xl mb-8" style={{ background: "#FDFBF7" }}>
            <div className="flex flex-col items-center justify-center text-center md:border-r border-black/10 pr-4">
              <p className="font-extrabold text-4xl" style={{ color: INK }}>{p.sellerRating}</p>
              <div className="flex gap-1 my-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={16} fill={ORANGE} style={{ color: ORANGE }} />
                ))}
              </div>
              <p className="text-xs text-black/50">Based on {reviews.length} verified ratings</p>
            </div>
            <div className="col-span-2 space-y-2 flex flex-col justify-center">
              {[
                { label: "5 Stars", pct: "85%", count: Math.round(reviews.length * 0.85) },
                { label: "4 Stars", pct: "15%", count: Math.round(reviews.length * 0.15) },
                { label: "3 Stars", pct: "0%", count: 0 },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-3 text-xs font-semibold">
                  <span className="w-12 text-black/60">{b.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-black/5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: b.pct, background: ORANGE }} />
                  </div>
                  <span className="w-8 text-right text-black/40" style={{ fontFamily: MONO }}>{b.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Write Review Form */}
          {showWriteReview && (
            <div className="p-6 rounded-2xl mb-8 border border-orange-200 bg-orange-50/40">
              <h3 className="font-bold text-sm mb-3" style={{ color: INK }}>Write a Product Review</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-black/60">Your Rating:</span>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star size={20} fill={star <= newRating ? ORANGE : "none"} style={{ color: star <= newRating ? ORANGE : "rgba(26,17,8,0.3)" }} />
                  </button>
                ))}
              </div>
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Share details about condition, fit, delivery, or authenticity..."
                rows={3}
                className="w-full text-xs p-3 rounded-xl bg-white border border-black/10 outline-none focus:border-orange-500 mb-3"
              />
              <button
                onClick={async () => {
                  if (!newComment.trim()) return;
                  try {
                    await buyerService.submitReview(p.id, newRating, newComment);
                    // Add to local state optimistically
                    setReviews(prev => [{
                      id: Date.now(),
                      name: s.buyerProfile?.name || "You",
                      avatar: s.buyerProfile?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&auto=format",
                      rating: newRating,
                      date: "Just now",
                      comment: newComment,
                      verified: true,
                    }, ...prev]);
                    setNewComment("");
                    setShowWriteReview(false);
                    s.showToast("Review posted ✓");
                  } catch (err) {
                    s.showToast("Failed to post review. Please try again.");
                  }
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white"
                style={{ background: ORANGE }}
              >
                Post Review
              </button>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map(r => (
              <div key={r.id} className="p-4 rounded-2xl bg-[#FDFBF7] border" style={{ borderColor: "rgba(26,17,8,0.06)" }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <img src={r.avatar} alt={r.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-xs" style={{ color: INK }}>{r.name}</p>
                        {r.verified && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full" style={{ background: YELLOW, color: INK, fontFamily: MONO }}>
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-black/40">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(st => (
                      <Star key={st} size={13} fill={st <= r.rating ? ORANGE : "none"} style={{ color: st <= r.rating ? ORANGE : "rgba(26,17,8,0.2)" }} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-black/70 mt-1 leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-extrabold mb-6" style={{ fontSize: 24, letterSpacing: "-0.02em", color: INK }}>You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{related.map(r => <ProductCard key={r.id} p={r} s={s} />)}</div>
        </div>
      </div>
    </div>
  );
}
