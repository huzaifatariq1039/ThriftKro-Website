import { ImageWithFallback } from "@/components/ImageWithFallback";
import logoImg from "@/assets/logo.png";
import { INK, FONT } from "@/constants/theme";

export function Logo({ size = 34, onClick, light }: { size?: number; onClick?: () => void; light?: boolean }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 select-none">
      <div style={{ width: size, height: size }} className="rounded-lg overflow-hidden flex-shrink-0">
        <ImageWithFallback src={logoImg} alt="Thrift Kro" className="w-full h-full object-contain" />
      </div>
      <span className="font-extrabold tracking-tight" style={{ color: light ? "#FFFFFF" : INK, fontFamily: FONT, fontSize: 18, letterSpacing: "-0.02em" }}>Thrift&nbsp;Kro</span>
    </button>
  );
}
