import { INK, FONT } from "@/constants/theme";

export function Toast({ msg }: { msg: string | null }) {
  if (!msg) return null;
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[70] px-5 py-3 rounded-full font-bold text-sm animate-[fadeIn_0.2s]" style={{ background: INK, color: "white", fontFamily: FONT, boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}>
      {msg}
    </div>
  );
}
