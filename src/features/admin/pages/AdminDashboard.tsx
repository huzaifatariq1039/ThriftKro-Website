import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { KycModal } from "../components/KycModal";
import PageOverview from "./PageOverview";
import PageKyc from "./PageKyc";
import PageCatalog from "./PageCatalog";
import PageEscrow from "./PageEscrow";
import PageRevenue from "./PageRevenue";
import PageSupport from "./PageSupport";
import PageCareers from "./PageCareers";
import PageSettings from "./PageSettings";
import { C, FONT, MONO } from "../data/adminData";

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [active, setActive] = useState("overview");
  const [kycModal, setKycModal] = useState<null | Parameters<typeof KycModal>[0]["request"]>(null);

  const pages = {
    overview: <PageOverview />,
    kyc: <PageKyc />,
    catalog: <PageCatalog />,
    escrow: <PageEscrow />,
    revenue: <PageRevenue />,
    support: <PageSupport />,
    careers: <PageCareers />,
    settings: <PageSettings />,
  } as const;

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: C.bg, fontFamily: FONT, color: C.text }}>
      <Sidebar active={active} setActive={setActive} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header page={active} />
        <main className="flex-1 overflow-y-auto px-6 py-5" style={{ scrollbarWidth: "none" }}>
          {pages[active as keyof typeof pages]}
        </main>
      </div>
      {kycModal && <KycModal request={kycModal} onClose={() => setKycModal(null)} />}
      <button onClick={onLogout} className="fixed bottom-5 right-5 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all z-50" style={{ background: C.orange, color: "#fff", fontFamily: MONO, boxShadow: `0 4px 20px ${C.orange}50` }}>
        Log out & Exit Admin
      </button>
    </div>
  );
}
