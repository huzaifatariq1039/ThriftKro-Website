import { ORANGE } from "@/constants/theme";

export function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="w-12 h-7 rounded-full flex-shrink-0 transition-colors relative" style={{ background: on ? ORANGE : "#CBCED4" }}>
      <span className="absolute top-0.5 w-6 h-6 rounded-full bg-white transition-all" style={{ left: on ? 22 : 2, boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
    </button>
  );
}
