"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useLocale } from "./LocaleProvider";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const { t, locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: t("chat_greeting") }]);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          locale,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-terracotta text-white w-16 h-16 rounded-full 
                     shadow-lg hover:bg-terracotta-dark transition-all duration-300 
                     flex items-center justify-center hover:scale-110"
          aria-label="Chat with DIDI"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-4 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-2rem)]
                        bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-terracotta text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🙏</span>
              <div>
                <p className="font-bold">DIDI</p>
                <p className="text-xs text-white/80">{t("app_tagline")}</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-white/20 p-1 rounded"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-teal text-white rounded-br-md"
                      : "bg-cream text-gray-800 rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-cream text-gray-500 px-4 py-2 rounded-2xl rounded-bl-md text-sm">
                  DIDI सोच रही है...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t p-3 flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={t("chat_placeholder")}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm 
                         focus:ring-2 focus:ring-teal focus:border-transparent outline-none"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="bg-terracotta text-white p-2 rounded-lg hover:bg-terracotta-dark 
                         disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
