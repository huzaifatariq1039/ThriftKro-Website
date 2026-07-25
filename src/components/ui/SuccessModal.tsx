import { Check, Truck, Star, Shield } from "lucide-react";
import { ORANGE, FONT } from "@/constants/theme";
import { pk } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";

export function SuccessModal({ s }: { s: Store }) {
  if (!s.showSuccess) return null;
  const item = s.purchasedItems[0];
  if (!item) return null;
  const d = new Date(); d.setDate(d.getDate() + 3);
  const dateStr = d.toLocaleDateString("en-PK", { weekday: "short", day: "numeric", month: "short" });
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}>
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden" style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.35)" }}>
        <div className="px-6 pt-9 pb-7 flex flex-col items-center" style={{ background: "linear-gradient(160deg,#FF5722,#FF8A50)" }}>
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4"><Check size={36} style={{ color: ORANGE }} strokeWidth={3} /></div>
          <p className="text-white text-xl font-extrabold mb-1" style={{ fontFamily: FONT }}>Order Placed! 🎉</p>
          <p className="text-white/80 text-sm" style={{ fontFamily: FONT }}>Your order is confirmed and on its way.</p>
        </div>
        <div className="px-6 py-5">
          <div className="flex gap-3 p-3 rounded-2xl mb-4" style={{ background: "#F5F2EE" }}>
            <img src={item.img} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="text-xs" style={{ fontFamily: FONT, color: "rgba(26,17,8,0.5)" }}>{item.brand}</p>
              <p className="text-sm font-bold" style={{ fontFamily: FONT }}>{item.name}</p>
              <p className="text-sm font-extrabold mt-1" style={{ color: ORANGE, fontFamily: FONT }}>{pk(item.price)}</p>
            </div>
          </div>
          <div className="space-y-2 mb-5">
            {[[<Truck size={14} />, "Est. Delivery", dateStr], [<Star size={14} />, "Seller", item.seller], [<Shield size={14} />, "Buyer Protection", "Active for 7 days"]].map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <span style={{ color: ORANGE }}>{r[0] as React.ReactNode}</span>
                <span className="text-xs" style={{ fontFamily: FONT, color: "rgba(26,17,8,0.5)" }}>{r[1] as string}:</span>
                <span className="text-xs font-semibold" style={{ fontFamily: FONT }}>{r[2] as string}</span>
              </div>
            ))}
          </div>
          {s.purchasedItems.length > 1 && <p className="text-xs text-center mb-3" style={{ fontFamily: FONT, color: "rgba(26,17,8,0.5)" }}>+{s.purchasedItems.length - 1} more item(s) in this order</p>}
          <div className="flex gap-2">
            <button onClick={() => { s.setShowSuccess(false); s.setRoute("buyer-orders"); }} className="flex-1 py-3 rounded-xl text-sm font-bold" style={{ fontFamily: FONT, boxShadow: "0 0 0 1.5px rgba(26,17,8,0.15)" }}>Track Order</button>
            <button onClick={() => { s.setShowSuccess(false); s.setRoute("buyer-home"); }} className="flex-1 py-3 rounded-xl text-sm font-extrabold" style={{ background: ORANGE, color: "white", fontFamily: FONT }}>Keep Shopping</button>
          </div>
        </div>
      </div>
    </div>
  );
}
