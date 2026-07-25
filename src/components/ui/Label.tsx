import { MONO } from "@/constants/theme";

export function Label({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,17,8,0.45)" }}>{children}</span>;
}
