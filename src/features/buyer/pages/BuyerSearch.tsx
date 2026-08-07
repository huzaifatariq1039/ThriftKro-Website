import React, { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { ORANGE, INK, PAPER, FONT } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { BuyerNav, ProductCard } from "../components/BuyerNav";
import { productService } from "@/services/api/productService";
import { Product } from "@/types/types";

export default function BuyerSearch({ s }: { s: Store }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setSearching(true);
      productService.getProducts({ q: q.trim() })
        .then(res => {
          setResults(res.data && res.data.length > 0 ? res.data : []);
        })
        .catch(() => {
          setResults([]);
        })
        .finally(() => setSearching(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [q]);

  return (
    <div style={{ background: PAPER, minHeight: "100vh", fontFamily: FONT }}>
      <BuyerNav s={s} />
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-white max-w-2xl mx-auto mb-8" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
          <Search size={20} style={{ color: "rgba(26,17,8,0.4)" }} />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search sneakers, jackets, vintage tees..."
            className="flex-1 bg-transparent text-base outline-none font-semibold"
            style={{ color: INK }}
            autoFocus
          />
          {searching && <Loader2 size={18} className="animate-spin text-orange-500" />}
        </div>
        {q.trim() && (
          <div>
            <p className="text-sm font-bold mb-4" style={{ color: "rgba(26,17,8,0.5)" }}>{results.length} results for "{q}"</p>
            {results.length === 0 && !searching ? (
              <p className="text-center py-16 text-sm" style={{ color: "rgba(26,17,8,0.4)" }}>No products found. Try a different search term.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{results.map(p => <ProductCard key={p.id} p={p} s={s} />)}</div>
            )}
          </div>
        )}
        {!q.trim() && (
          <div className="text-center py-16">
            <p className="text-sm font-bold mb-3" style={{ color: "rgba(26,17,8,0.4)" }}>Popular searches</p>
            <div className="flex gap-2 justify-center flex-wrap">
              {["Jordan 1", "Y2K Cargo", "Levi's Jacket", "Vintage Tee", "Samba"].map(k => (
                <button key={k} onClick={() => setQ(k)} className="px-4 py-2 rounded-full text-xs font-bold bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.1)", color: ORANGE }}>{k}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
