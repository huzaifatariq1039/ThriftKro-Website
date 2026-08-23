import { ORANGE, FONT, MONO } from "@/constants/theme";

export function PageLoader() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAFAFA]" style={{ fontFamily: FONT }}>
      <div className="w-10 h-10 rounded-full border-3 border-t-transparent animate-spin" style={{ borderColor: `${ORANGE}30`, borderTopColor: ORANGE }} />
      <p className="mt-4 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(26,17,8,0.4)", fontFamily: MONO }}>
        Loading…
      </p>
    </div>
  );
}

export function SectionLoader({ text = "Loading…" }: { text?: string }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16" style={{ fontFamily: FONT }}>
      <div className="w-8 h-8 rounded-full border-3 border-t-transparent animate-spin" style={{ borderColor: `${ORANGE}30`, borderTopColor: ORANGE }} />
      <p className="mt-4 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(26,17,8,0.4)", fontFamily: MONO }}>
        {text}
      </p>
    </div>
  );
}
