import { ShoppingBag, Package, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { ORANGE, YELLOW, INK, FONT } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";

export function RoleSwitchModal({ s }: { s: Store }) {
  if (!s.showRoleSwitch) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }} onClick={() => s.setShowRoleSwitch(false)}>
      <div className="bg-white rounded-3xl w-full max-w-md p-7" onClick={e => e.stopPropagation()} style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.3)" }}>
        <div className="flex items-center gap-3 mb-1">
          <Logo size={40} />
        </div>
        <p className="text-sm mt-3 mb-5" style={{ fontFamily: FONT, color: "rgba(26,17,8,0.55)" }}>You have both a Buyer & Seller account. Pick one to continue — you'll log in to confirm.</p>
        <button onClick={() => s.requestRoleSwitch("buyer")} disabled={s.role === "buyer"} className="w-full flex items-center gap-4 p-4 rounded-2xl mb-3 transition-all" style={{ boxShadow: `0 0 0 2px ${s.role === "buyer" ? "rgba(26,17,8,0.1)" : ORANGE}`, background: "#FFF3E0", opacity: s.role === "buyer" ? 0.55 : 1 }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: ORANGE }}><ShoppingBag size={22} color="white" /></div>
          <div className="flex-1 text-left">
            <p className="font-extrabold text-sm" style={{ fontFamily: FONT, color: ORANGE }}>Continue as Buyer {s.role === "buyer" && "(current)"}</p>
            <p className="text-xs" style={{ fontFamily: FONT, color: "rgba(26,17,8,0.5)" }}>Browse, try-on & shop</p>
          </div>
          <ArrowRight size={18} style={{ color: ORANGE }} />
        </button>
        <button onClick={() => s.requestRoleSwitch("seller")} disabled={s.role === "seller"} className="w-full flex items-center gap-4 p-4 rounded-2xl mb-4 transition-all" style={{ background: INK, opacity: s.role === "seller" ? 0.55 : 1 }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: YELLOW }}><Package size={22} color={INK} /></div>
          <div className="flex-1 text-left">
            <p className="font-extrabold text-sm text-white" style={{ fontFamily: FONT }}>Continue as Seller {s.role === "seller" && "(current)"}</p>
            <p className="text-xs text-white/50" style={{ fontFamily: FONT }}>Manage listings & orders</p>
          </div>
          <ArrowRight size={18} color="white" />
        </button>
        <button onClick={() => s.setShowRoleSwitch(false)} className="w-full py-3 rounded-xl text-sm font-semibold" style={{ fontFamily: FONT, color: "rgba(26,17,8,0.5)", boxShadow: "0 0 0 1px rgba(26,17,8,0.12)" }}>Cancel</button>
      </div>
    </div>
  );
}
