import React, { useState } from "react";
import { Send } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, INK } from "@/constants/theme";
import { mockMessages as messages } from "@/services/mockData";
import type { Store } from "@/hooks/useStore";
import { Label } from "@/components/ui";
import { SellerShell } from "../components/SellerShell";

export default function SellerMessages({ s }: { s: Store }) {
  const [activeId, setActiveId] = useState(messages[0].id);
  const activeChat = messages.find(m => m.id === activeId)!;
  const [txt, setTxt] = useState("");
  return (
    <SellerShell s={s}>
      <Label>MESSAGES</Label>
      <h1 className="font-extrabold mt-1 mb-6" style={{ fontSize: 32, letterSpacing: "-0.03em", color: INK }}>Buyer chats</h1>
      <div className="bg-white rounded-3xl overflow-hidden flex h-[580px]" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
        <div className="w-80 border-r flex flex-col" style={{ borderColor: "rgba(26,17,8,0.06)" }}>
          <div className="p-4 border-b font-bold text-sm" style={{ borderColor: "rgba(26,17,8,0.06)", color: INK }}>Conversations ({messages.length})</div>
          <div className="flex-1 overflow-y-auto">
            {messages.map(m => (
              <button key={m.id} onClick={() => setActiveId(m.id)} className="w-full flex items-center gap-3 p-4 border-b text-left transition-colors" style={{ background: activeId === m.id ? "#FFF3E0" : "transparent", borderColor: "rgba(26,17,8,0.04)" }}>
                <ImageWithFallback src={m.avatar} alt={m.name} className="w-11 h-11 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline"><p className="font-bold text-sm truncate" style={{ color: INK }}>{m.name}</p><span className="text-[10px]" style={{ color: "rgba(26,17,8,0.4)" }}>{m.time}</span></div>
                  <p className="text-xs truncate" style={{ color: "rgba(26,17,8,0.5)" }}>{m.last}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-[#FAF8F5]">
          <div className="p-4 bg-white border-b flex items-center gap-3" style={{ borderColor: "rgba(26,17,8,0.06)" }}>
            <ImageWithFallback src={activeChat.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
            <div><p className="font-bold text-sm" style={{ color: INK }}>{activeChat.name}</p><p className="text-xs text-emerald-600 font-bold">Online</p></div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto space-y-3">
            <div className="max-w-md p-4 rounded-2xl bg-white self-start" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}><p className="text-sm" style={{ color: INK }}>{activeChat.last}</p></div>
          </div>
          <div className="p-4 bg-white border-t flex gap-2" style={{ borderColor: "rgba(26,17,8,0.06)" }}>
            <input value={txt} onChange={e => setTxt(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-3 rounded-xl text-sm bg-[#F5F2EE] outline-none" />
            <button onClick={() => { setTxt(""); s.showToast("Message sent ✓"); }} className="px-5 py-3 rounded-xl font-bold text-white flex items-center gap-2" style={{ background: ORANGE }}><Send size={16} /></button>
          </div>
        </div>
      </div>
    </SellerShell>
  );
}
