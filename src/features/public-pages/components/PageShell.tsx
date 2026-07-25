import React from "react";
import { ArrowLeft } from "lucide-react";
import { INK, PAPER, FONT } from "@/constants/theme";
import type { Store } from "@/hooks/useStore";
import { Logo } from "@/components/ui";

const BORDER = "rgba(26,17,8,0.08)";

export function PageShell({ s, children, title }: { s: Store; children: React.ReactNode; title: string }) {
  return (
    <div className="min-h-screen" style={{ background: PAPER, fontFamily: FONT }}>
      <header className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between border-b" style={{ borderColor: BORDER }}>
        <Logo />
        <button onClick={() => s.setRoute("landing")} className="flex items-center gap-2 text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>
          <ArrowLeft size={15} /> Back to Home
        </button>
      </header>
      <main>{children}</main>
      <footer className="border-t mt-20 py-10 text-center" style={{ borderColor: BORDER }}>
        <p className="text-xs" style={{ color: "rgba(26,17,8,0.4)" }}>© 2026 THRIFT KRO · {title.toUpperCase()} · MADE IN PAKISTAN 🇵🇰</p>
      </footer>
    </div>
  );
}
