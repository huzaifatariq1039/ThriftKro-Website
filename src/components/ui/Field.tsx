import { MONO } from "@/constants/theme";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block mb-2" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,17,8,0.5)" }}>{label}</label>
      {children}
    </div>
  );
}
