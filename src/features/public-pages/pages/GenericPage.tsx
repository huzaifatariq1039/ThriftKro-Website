import React from "react";
import { PageShell } from "../components/PageShell";
import { Store } from "@/hooks/useStore";
import { FONT, INK, PAPER } from "@/constants/theme";

export default function GenericPage({ s, title }: { s: Store; title: string }) {
  return (
    <PageShell s={s} title={title}>
      <div className="max-w-4xl mx-auto px-8 py-20 min-h-[50vh]" style={{ fontFamily: FONT }}>
        <h1 className="text-4xl font-extrabold mb-8" style={{ color: INK }}>{title}</h1>
        <div className="prose prose-sm opacity-80" style={{ color: INK }}>
          <p>
            Welcome to the {title} page. This section is currently being updated with our latest policies and information. 
            Check back soon for the complete details regarding Thrift Kro's {title.toLowerCase()}.
          </p>
          <p className="mt-4">
            If you have immediate questions, please reach out to our support team.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
