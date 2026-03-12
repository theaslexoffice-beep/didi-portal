'use client';
import { useState, useEffect, useRef } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';

export default function ChatBot({ t, lang }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [sessionId] = useState(() => 'chat_' + Math.random().toString(36).substring(2, 10));
  const messagesEndRef = useRef(null);
  
  const quickActions = [
    { icon: '🚨', text: 'Report Issue' },
    { icon: '🎁', text: 'Check Schemes' },
    { icon: '📍', text: 'Track My Issue' },
    { icon: '⚖️', text: 'Get Legal Help' }
  ];

  useEffect(() => {
    setMessages([{ role: 'didi', text: t.chat.greeting }]);
  }, [lang, t.chat.greeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text = input) => {
    const userMsg = text.trim();
    if (!userMsg || sending) return;
    
    setInput('');
    setMessages((m) => [...m, { role: 'user', text: userMsg }]);
    setSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, sessionId, lang }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((m) => [...m, { role: 'didi', text: data.response }]);
      }
    } catch {
      setMessages((m) => [...m, { role: 'didi', text: 'Sorry, something went wrong. Please try again.' }]);
    }
    setSending(false);
  };

  return (
    <section className="max-w-3xl mx-auto py-6 px-4 pb-24 md:pb-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-teal-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-5 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-3xl animate-pulse">
              🙏
            </div>
            <div>
              <h3 className="font-black text-2xl">{t.chat.title}</h3>
              <p className="text-sm text-teal-100">{t.chat.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm whitespace-pre-wrap shadow-md ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white rounded-br-sm'
                  : 'bg-white text-gray-700 border border-gray-200 rounded-bl-sm'
              }`}>
                {msg.role === 'didi' && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
                    <span className="text-lg">🙏</span>
                    <span className="text-xs font-bold text-teal-600">DIDI</span>
                  </div>
                )}
                {msg.text}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-400 px-5 py-3 rounded-2xl text-sm shadow-md border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🙏</span>
                  <span className="text-xs font-bold text-teal-600">DIDI</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => sendMessage(action.text)}
                className="flex-shrink-0 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
              >
                <span>{action.icon}</span>
                <span>{action.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={t.chat.placeholder}
            className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-teal-300 focus:border-teal-400 outline-none transition"
          />
          <Button 
            onClick={() => sendMessage()} 
            disabled={sending || !input.trim()} 
            variant="secondary"
            className="flex-shrink-0"
          >
            {t.chat.send}
          </Button>
        </div>
      </div>
    </section>
  );
}
