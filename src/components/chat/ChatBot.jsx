'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import Button from '../ui/Button';

export default function ChatBot({ lang = 'en' }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: lang === 'en' 
        ? 'Namaste! I\'m DIDI, your digital assistant. How can I help you today?' 
        : 'नमस्ते! मैं डीडी हूं, आपकी डिजिटल सहायक। आज मैं आपकी कैसे मदद कर सकती हूं?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, language: lang })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: lang === 'en' 
          ? 'Sorry, I encountered an error. Please try again.' 
          : 'क्षमा करें, मुझे त्रुटि हुई। कृपया पुनः प्रयास करें।' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const quickReplies = lang === 'en' ? [
    'How do I report an issue?',
    'What schemes am I eligible for?',
    'How to file RTI?',
    'Check my complaint status'
  ] : [
    'मैं शिकायत कैसे दर्ज करूं?',
    'मैं किन योजनाओं के लिए पात्र हूं?',
    'आरटीआई कैसे दाखिल करें?',
    'मेरी शिकायत की स्थिति जांचें'
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2A9D8F] to-[#264653] text-white p-6 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <Bot className="w-7 h-7 text-[#2A9D8F]" />
          </div>
          <div>
            <h2 className="text-xl font-black">DIDI</h2>
            <p className="text-sm text-white/80">{lang === 'en' ? 'Your Digital Assistant' : 'आपकी डिजिटल सहायक'}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-didi'}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="chat-bubble-didi flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length === 1 && (
        <div className="p-4 bg-white border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 mb-2">{lang === 'en' ? 'Quick Actions:' : 'त्वरित क्रियाएं:'}</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(reply);
                  setTimeout(() => handleSend(), 100);
                }}
                className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white p-4 rounded-b-2xl border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={lang === 'en' ? 'Type your message...' : 'अपना संदेश टाइप करें...'}
            className="input flex-1"
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
