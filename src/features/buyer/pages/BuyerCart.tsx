import React from "react";
import { ShoppingBag, Trash2, Shield } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, INK, PAPER, FONT, pk } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Label } from "@/components/ui";
import { BuyerNav } from "../components/BuyerNav";

export default function BuyerCart({ s }: { s: Store }) {
  const subtotal = s.cartItems.reduce((a, i) => a + i.price, 0);
  const shipping = s.cartItems.length ? 199 : 0;
  const total = subtotal + shipping;
  return (
    <div style={{ background: PAPER, minHeight: "100vh", fontFamily: FONT }}>
      <BuyerNav s={s} />
      <div className="max-w-7xl mx-auto px-8 py-8">
        <h1 className="font-extrabold mb-8" style={{ fontSize: 34, letterSpacing: "-0.03em", color: INK }}>Your Cart</h1>
        {s.cartItems.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag size={48} style={{ color: "rgba(26,17,8,0.2)" }} className="mx-auto mb-4" />
            <p className="font-bold text-lg" style={{ color: INK }}>Your cart is empty</p>
            <p className="text-sm mb-6" style={{ color: "rgba(26,17,8,0.5)" }}>Find something you love.</p>
            <button onClick={() => s.setRoute("buyer-home")} className="px-6 py-3 rounded-full font-extrabold text-white" style={{ background: ORANGE }}>Start shopping</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {s.cartItems.map(i => (
                <div key={i.id} className="flex gap-4 p-4 rounded-2xl bg-white" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
                  <ImageWithFallback src={i.img} alt={i.name} className="w-24 h-24 rounded-xl object-cover" />
                  <div className="flex-1">
                    <Label>{i.brand.toUpperCase()} · {i.condition}</Label>
                    <p className="font-bold" style={{ color: INK }}>{i.name}</p>
                    <p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>Size {i.size} · {i.seller}</p>
                    <p className="font-extrabold mt-2" style={{ color: ORANGE }}>{pk(i.price)}</p>
                  </div>
                  <button onClick={() => s.removeFromCart(i.id)} className="self-start w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#FDECEA" }}><Trash2 size={16} style={{ color: "#DC2626" }} /></button>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-6 bg-white h-fit" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
              <h3 className="font-extrabold mb-4" style={{ color: INK }}>Order Summary</h3>
              {[["Subtotal", subtotal], ["Shipping", shipping]].map(([l, v]) => (
                <div key={l as string} className="flex justify-between text-sm py-1.5" style={{ color: "rgba(26,17,8,0.6)" }}><span>{l as string}</span><span className="font-semibold" style={{ color: INK }}>{pk(v as number)}</span></div>
              ))}
              <div className="border-t my-3" style={{ borderColor: "rgba(26,17,8,0.08)" }} />
              <div className="flex justify-between font-extrabold text-lg mb-5" style={{ color: INK }}><span>Total</span><span style={{ color: ORANGE }}>{pk(total)}</span></div>
              <button
                onClick={async () => {
                  try {
                    await s.checkoutAsync(s.cartItems);
                  } catch (err: any) {
                    s.showToast(err.message || "Checkout failed. Check your wallet balance.");
                  }
                }}
                className="w-full py-4 rounded-xl font-extrabold text-white hover:opacity-90 transition-opacity"
                style={{ background: ORANGE }}
              >
                Checkout · {pk(total)}
              </button>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs" style={{ color: "rgba(26,17,8,0.5)" }}><Shield size={14} /> Secure checkout · Buyer protection</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
