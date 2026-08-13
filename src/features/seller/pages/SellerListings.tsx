import React, { useState, useEffect } from "react";
import { Plus, Trash2, Heart, Eye, Loader2 } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, INK, pk } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label } from "@/components/ui";
import { SellerShell } from "../components/SellerShell";
import { sellerService } from "@/services/api/sellerService";
import { SellerListing } from "@/types/types";

export default function SellerListings({ s }: { s: Store }) {
  const [listings, setListings] = useState<SellerListing[]>(s.sellerListings);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    sellerService.getSellerListings()
      .then(res => {
        if (isMounted && res.data && res.data.length > 0) {
          setListings(res.data);
          s.setSellerListings(res.data);
        }
      })
      .catch(err => {
        console.warn("Could not fetch seller listings:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const [tab, setTab] = useState<"active" | "trash">("active");

  const handleDelete = async (id: number) => {
    try {
      await sellerService.deleteListing(id);
    } catch (err) {
      console.warn("Delete API call error:", err);
    }
    setListings(prev => prev.map(x => x.id === id ? { ...x, status: "Trashed" } : x));
    s.setSellerListings(prev => prev.map(x => x.id === id ? { ...x, status: "Trashed" } : x));
    s.showToast("Listing moved to Trash");
  };

  const handleRestore = async (id: number) => {
    try {
      await sellerService.restoreListing(id);
    } catch (err) {
      console.warn("Restore API call error:", err);
    }
    setListings(prev => prev.map(x => x.id === id ? { ...x, status: "Active" } : x));
    s.setSellerListings(prev => prev.map(x => x.id === id ? { ...x, status: "Active" } : x));
    s.showToast("Listing restored");
  };

  const activeListings = listings.filter(x => x.status !== "Trashed");
  const trashedListings = listings.filter(x => x.status === "Trashed");
  const displayListings = tab === "active" ? activeListings : trashedListings;

  return (
    <SellerShell s={s}>
      <div className="flex items-center justify-between mb-6">
        <div><Label>INVENTORY</Label><h1 className="font-extrabold mt-1" style={{ fontSize: 32, letterSpacing: "-0.03em", color: INK }}>My Listings</h1></div>
        <button onClick={() => s.setRoute("seller-add")} className="px-6 py-3.5 rounded-full font-extrabold text-white flex items-center gap-2" style={{ background: ORANGE }}><Plus size={18} /> Add New</button>
      </div>

      <div className="flex gap-4 mb-6 border-b" style={{ borderColor: "rgba(26,17,8,0.1)" }}>
        <button 
          onClick={() => setTab("active")}
          className={`pb-3 font-bold text-sm transition-colors ${tab === "active" ? "border-b-2" : "text-gray-400"}`}
          style={{ borderColor: tab === "active" ? ORANGE : "transparent", color: tab === "active" ? INK : undefined }}
        >
          Active ({activeListings.length})
        </button>
        <button 
          onClick={() => setTab("trash")}
          className={`pb-3 font-bold text-sm transition-colors ${tab === "trash" ? "border-b-2" : "text-gray-400"}`}
          style={{ borderColor: tab === "trash" ? ORANGE : "transparent", color: tab === "trash" ? INK : undefined }}
        >
          Trash ({trashedListings.length})
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-sm text-gray-500 font-bold flex items-center justify-center gap-2">
          <Loader2 size={18} className="animate-spin text-orange-500" /> Loading seller inventory...
        </div>
      ) : displayListings.length === 0 ? (
        <div className="text-center py-16 text-gray-400 font-bold">
          {tab === "active" ? "No active listings found." : "Trash is empty."}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {displayListings.map(item => (
            <div key={item.id} className="rounded-3xl p-4 bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)", opacity: item.status === "Trashed" ? 0.6 : 1 }}>
              <ImageWithFallback src={item.img} alt={item.name} className="w-full aspect-square rounded-2xl object-cover mb-3" />
              <div className="flex items-center justify-between"><span className="text-xs font-bold" style={{ color: ORANGE }}>{item.category}</span><span className="text-xs px-2 py-0.5 rounded-full" style={{ background: item.status === "Trashed" ? "#FFEBEE" : "#E8F5E9", color: item.status === "Trashed" ? "#C62828" : "#2E7D32" }}>{item.status}</span></div>
              <p className="font-bold text-sm mt-1 truncate" style={{ color: INK }}>{item.name}</p>
              <p className="font-extrabold mt-1" style={{ color: ORANGE }}>{pk(item.price)}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t text-xs" style={{ borderColor: "rgba(26,17,8,0.06)", color: "rgba(26,17,8,0.5)" }}>
                <span className="flex items-center gap-1"><Eye size={12} /> {item.views}</span>
                <span className="flex items-center gap-1"><Heart size={12} /> {item.likes}</span>
                {tab === "active" ? (
                  <button onClick={() => handleDelete(item.id)} className="p-1 rounded text-red-500 hover:bg-red-50" title="Move to Trash"><Trash2 size={14} /></button>
                ) : (
                  <button onClick={() => handleRestore(item.id)} className="p-1 rounded text-green-600 font-bold hover:bg-green-50">Restore</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </SellerShell>
  );
}
