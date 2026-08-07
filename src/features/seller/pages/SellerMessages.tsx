import React, { useState, useEffect, useRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ORANGE, INK } from "@/constants/theme";
import { mockMessages as contacts } from "@/services/mockData";
import type { Store } from "@/hooks/useStore";
import { Label } from "@/components/ui";
import { SellerShell } from "../components/SellerShell";
import { chatService, ChatMessage } from "@/services/api/chatService";
import { authService } from "@/services/api/authService";

export default function SellerMessages({ s }: { s: Store }) {
  const [activeId, setActiveId] = useState(contacts[0].id);
  const activeChat = contacts.find(c => c.id === activeId)!;
  const [txt, setTxt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch current user ID and initialize WebSocket
  useEffect(() => {
    let isMounted = true;
    authService.getCurrentUser().then(user => {
      if (isMounted && user?.id) {
        setUserId(user.id);
        const wsUrl = chatService.getWebSocketUrl(user.id);
        const ws = new WebSocket(wsUrl);
        
        ws.onmessage = (event) => {
          const parts = event.data.split("|", 1);
          if (parts.length === 2) {
            const receiverId = parts[0];
            const content = parts[1];
            // This is a naive parsing based on backend implementation.
            // A more robust implementation would expect JSON.
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              sender_id: user.id === receiverId ? "other" : user.id, // simplified
              receiver_id: receiverId,
              content: content,
              timestamp: new Date().toISOString()
            }]);
          } else {
             // Try to handle as JSON if backend sends JSON later
             try {
               const msg = JSON.parse(event.data);
               setMessages(prev => [...prev, msg]);
             } catch (e) {
               // Fallback for raw text
               setMessages(prev => [...prev, {
                 id: Date.now().toString(),
                 sender_id: "other", // Assuming received means from other
                 receiver_id: user.id,
                 content: event.data,
                 timestamp: new Date().toISOString()
               }]);
             }
          }
        };

        ws.onopen = () => console.log("Chat WS connected");
        ws.onclose = () => console.log("Chat WS disconnected");
        wsRef.current = ws;
      }
    });

    return () => {
      isMounted = false;
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // Fetch chat history when active contact changes
  useEffect(() => {
    // For demo purposes, we're using the mock contact ID (which might be a string like "1").
    // In a real app, we'd use the UUID of the contact.
    // If backend expects UUID, this might fail unless activeId is a valid UUID.
    // To prevent crashing, we will just try to fetch, and if it fails, it returns [].
    setLoadingHistory(true);
    chatService.getHistory(String(activeId))
      .then(res => setMessages(res.data || []))
      .catch(() => setMessages([]))
      .finally(() => setLoadingHistory(false));
  }, [activeId]);

  const handleSend = () => {
    if (!txt.trim() || !userId) return;
    
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      // Backend expects: "receiver_id|message"
      const payload = `${activeId}|${txt}`;
      wsRef.current.send(payload);
      
      // Optimistically add to UI
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender_id: userId,
        receiver_id: String(activeId),
        content: txt,
        timestamp: new Date().toISOString()
      }]);
      setTxt("");
    } else {
      s.showToast("Connection offline. Trying to reconnect...");
    }
  };
  return (
    <SellerShell s={s}>
      <Label>MESSAGES</Label>
      <h1 className="font-extrabold mt-1 mb-6" style={{ fontSize: 32, letterSpacing: "-0.03em", color: INK }}>Buyer chats</h1>
      <div className="bg-white rounded-3xl overflow-hidden flex h-[580px]" style={{ boxShadow: "0 0 0 1px rgba(26,17,8,0.06)" }}>
        <div className="w-80 border-r flex flex-col" style={{ borderColor: "rgba(26,17,8,0.06)" }}>
          <div className="p-4 border-b font-bold text-sm" style={{ borderColor: "rgba(26,17,8,0.06)", color: INK }}>Conversations ({contacts.length})</div>
          <div className="flex-1 overflow-y-auto">
            {contacts.map(c => (
              <button key={c.id} onClick={() => setActiveId(c.id)} className="w-full flex items-center gap-3 p-4 border-b text-left transition-colors" style={{ background: activeId === c.id ? "#FFF3E0" : "transparent", borderColor: "rgba(26,17,8,0.04)" }}>
                <ImageWithFallback src={c.avatar} alt={c.name} className="w-11 h-11 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline"><p className="font-bold text-sm truncate" style={{ color: INK }}>{c.name}</p><span className="text-[10px]" style={{ color: "rgba(26,17,8,0.4)" }}>{c.time}</span></div>
                  <p className="text-xs truncate" style={{ color: "rgba(26,17,8,0.5)" }}>{c.last}</p>
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
            {loadingHistory ? (
              <div className="flex justify-center items-center h-full text-orange-500">
                <Loader2 className="animate-spin" size={24} />
              </div>
            ) : messages.length > 0 ? (
              messages.map(m => {
                const isMine = m.sender_id === userId;
                return (
                  <div key={m.id} className={`max-w-md p-4 rounded-2xl ${isMine ? 'bg-orange-500 text-white self-end' : 'bg-white self-start'}`} style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <p className="text-sm" style={{ color: isMine ? '#fff' : INK }}>{m.content}</p>
                    <span className={`text-[10px] mt-1 block opacity-70 ${isMine ? 'text-right' : ''}`}>
                      {new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="max-w-md p-4 rounded-2xl bg-white self-start opacity-70" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <p className="text-sm text-gray-500">No previous messages.</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-white border-t flex gap-2" style={{ borderColor: "rgba(26,17,8,0.06)" }}>
            <input 
              value={txt} 
              onChange={e => setTxt(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..." 
              className="flex-1 px-4 py-3 rounded-xl text-sm bg-[#F5F2EE] outline-none" 
              disabled={!userId}
            />
            <button onClick={handleSend} disabled={!userId} className="px-5 py-3 rounded-xl font-bold text-white flex items-center gap-2 disabled:opacity-50" style={{ background: ORANGE }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </SellerShell>
  );
}
