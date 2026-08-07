import React, { useState, useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { INK, PAPER, FONT } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { BuyerNav, ProductCard } from "../components/BuyerNav";
import { buyerService } from "@/services/api/buyerService";
import { productService } from "@/services/api/productService";
import { Product } from "@/types/types";
import { mockProducts } from "@/services/mockData";

function SubPage({ s, title, back, children }: { s: Store; title: string; back: any; children: React.ReactNode }) {
  return (
    <div style={{ background: PAPER, minHeight: "100vh", fontFamily: FONT }}>
      <BuyerNav s={s} />
      <div className="max-w-3xl mx-auto px-8 py-8">
        <button onClick={() => s.setRoute(back)} className="flex items-center gap-2 text-sm font-semibold mb-4" style={{ color: "rgba(26,17,8,0.6)" }}><ArrowLeft size={16} /> Back</button>
        <h1 className="font-extrabold mb-8" style={{ fontSize: 30, letterSpacing: "-0.03em", color: INK }}>{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default function BuyerWishlist({ s }: { s: Store }) {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    buyerService.getWishlist()
      .then(res => {
        if (isMounted && res.data && res.data.items && res.data.items.length > 0) {
          // Map backend wishlist items to Product type
          const products: Product[] = res.data.items.map((item: any) => {
            const p = item.product;
            return {
              id: String(p?.id || item.id),
              name: p?.name || "Wishlist Item",
              brand: p?.brand || "Brand",
              price: p?.price || 0,
              originalPrice: p?.original_price || p?.price || 0,
              img: p?.image_url || p?.img || "",
              category: p?.category || "Apparel",
              size: p?.size || "M",
              condition: p?.condition || "Good",
              seller: p?.seller_name || "Seller",
              sellerRating: 4.5,
            };
          });
          setWishlistProducts(products);
        } else if (isMounted) {
          // Fall back to local liked products
          const liked = mockProducts.filter(p => s.likedProducts.has(p.id));
          setWishlistProducts(liked);
        }
      })
      .catch(() => {
        // Fall back to local liked products
        const liked = mockProducts.filter(p => s.likedProducts.has(p.id));
        setWishlistProducts(liked);
      })
      .finally(() => { if (isMounted) setLoading(false); });
    return () => { isMounted = false; };
  }, [s.likedProducts]);

  return (
    <SubPage s={s} title="Wishlist" back="buyer-profile">
      {loading ? (
        <div className="text-center py-16 text-sm text-gray-500 font-bold flex items-center justify-center gap-2">
          <Loader2 size={18} className="animate-spin text-orange-500" /> Loading wishlist...
        </div>
      ) : wishlistProducts.length === 0 ? (
        <p className="text-center py-16 text-sm" style={{ color: "rgba(26,17,8,0.4)" }}>Nothing saved yet — tap the heart on any item.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">{wishlistProducts.map(p => <ProductCard key={p.id} p={p} s={s} />)}</div>
      )}
    </SubPage>
  );
}
