import { useState } from 'react';

export default function SellerMessages() {
  const messages = [
    {
      id: 1,
      name: 'Ali Khan',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
      time: '10:42 AM',
      last: 'Is this still available?',
      unread: 2,
      item: 'Air Jordan 1 Retro'
    },
    {
      id: 2,
      name: 'Sara Ahmed',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      time: 'Yesterday',
      last: 'Can you do 2000?',
      unread: 0,
      item: 'Vintage Denim Jacket'
    }
  ];

  const [active, setActive] = useState(messages[0].id);
  const chat = messages.find(m => m.id === active);

  return (
    <div className="flex h-[calc(100vh-80px)] animate-fade-in">
      
      {/* ─── Sidebar List ─── */}
      <div
        className="w-full max-w-[320px] border-r overflow-y-auto hidden md:block"
        style={{ borderColor: "rgba(26,17,8,0.08)", background: 'white' }}
      >
        {messages.map(m => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className="w-full flex items-center gap-3 p-4 border-b text-left transition-colors hover:bg-black/5"
            style={{
              borderColor: "rgba(26,17,8,0.06)",
              background: active === m.id ? "#F2EFE9" : "transparent"
            }}
          >
            <img
              src={m.avatar}
              alt={m.name}
              className="w-12 h-12 rounded-full object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="font-bold text-sm truncate" style={{ color: '#1A1108' }}>
                  {m.name}
                </p>
                <span
                  className="text-[10px]"
                  style={{ color: "rgba(26,17,8,0.4)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {m.time}
                </span>
              </div>
              <p className="text-xs truncate" style={{ color: "rgba(26,17,8,0.55)" }}>
                {m.last}
              </p>
            </div>
            {m.unread > 0 && (
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white shrink-0"
                style={{ background: '#FF5C00', fontFamily: "'JetBrains Mono', monospace" }}
              >
                {m.unread}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ─── Chat View ─── */}
      <div className="flex-1 flex flex-col bg-white">
        
        {/* Chat Header */}
        <div
          className="flex items-center gap-3 p-4 border-b"
          style={{ borderColor: "rgba(26,17,8,0.08)" }}
        >
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-sm" style={{ color: '#1A1108' }}>
              {chat.name}
            </p>
            <p className="text-xs" style={{ color: "rgba(26,17,8,0.5)" }}>
              Re: {chat.item}
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div
          className="flex-1 overflow-y-auto p-6 space-y-4"
          style={{ background: "#F7F4EF" }}
        >
          <div
            className="max-w-xs px-4 py-2.5 rounded-2xl rounded-tl-sm bg-white"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <p className="text-sm" style={{ color: '#1A1108' }}>{chat.last}</p>
          </div>
          
          <div
            className="max-w-xs ml-auto px-4 py-2.5 rounded-2xl rounded-tr-sm"
            style={{ background: '#FF5C00' }}
          >
            <p className="text-sm text-white">Yes it's available! Would you like to place an order?</p>
          </div>
        </div>

        {/* Input Area */}
        <div
          className="p-4 border-t flex items-center gap-2 bg-white"
          style={{ borderColor: "rgba(26,17,8,0.08)" }}
        >
          <input
            placeholder="Type a message…"
            className="flex-1 px-4 py-3 rounded-full text-sm outline-none"
            style={{
              background: '#FBF9F8',
              boxShadow: "0 0 0 1px rgba(26,17,8,0.1)"
            }}
          />
          <button
            className="px-5 py-3 rounded-full font-extrabold text-white text-sm transition-transform hover:-translate-y-0.5"
            style={{ background: '#FF5C00', boxShadow: '0 4px 12px rgba(255,92,0,0.2)' }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
