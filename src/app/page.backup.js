'use client';

import { useState, useEffect, useRef } from 'react';
import { translations, languages } from '@/i18n/translations';

// ============ LANGUAGE CONTEXT ============
function useLang() {
  const [lang, setLang] = useState('en');
  const t = translations[lang] || translations.en;
  return { lang, setLang, t };
}

// ============ NAVBAR ============
function Navbar({ lang, setLang, t, activeTab, setActiveTab }) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🙏</span>
          <div>
            <h1 className="text-lg font-bold text-terracotta-600">DIDI</h1>
            <p className="text-[10px] text-gray-500 -mt-1">{t.hero.tagline}</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-sm">
          <button onClick={() => setActiveTab('home')} className={`px-3 py-1.5 rounded-full transition ${activeTab === 'home' ? 'bg-terracotta-50 text-terracotta-600 font-medium' : 'text-gray-600 hover:text-terracotta-600'}`}>
            {t.nav.home}
          </button>
          <button onClick={() => setActiveTab('complaints')} className={`px-3 py-1.5 rounded-full transition ${activeTab === 'complaints' ? 'bg-terracotta-50 text-terracotta-600 font-medium' : 'text-gray-600 hover:text-terracotta-600'}`}>
            {t.nav.complaints}
          </button>
          <button onClick={() => setActiveTab('chat')} className={`px-3 py-1.5 rounded-full transition ${activeTab === 'chat' ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-600 hover:text-teal-600'}`}>
            💬 {t.nav.chat}
          </button>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-full p-0.5">
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2.5 py-1 text-xs rounded-full transition font-medium ${lang === l ? 'bg-white shadow text-terracotta-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {l === 'en' ? 'EN' : l === 'hi' ? 'हि' : 'छ.ग.'}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="sm:hidden flex justify-center gap-2 pb-2 px-4">
        <button onClick={() => setActiveTab('home')} className={`flex-1 text-center py-1.5 text-xs rounded-full ${activeTab === 'home' ? 'bg-terracotta-50 text-terracotta-600 font-medium' : 'text-gray-500'}`}>
          {t.nav.home}
        </button>
        <button onClick={() => setActiveTab('complaints')} className={`flex-1 text-center py-1.5 text-xs rounded-full ${activeTab === 'complaints' ? 'bg-terracotta-50 text-terracotta-600 font-medium' : 'text-gray-500'}`}>
          {t.nav.complaints}
        </button>
        <button onClick={() => setActiveTab('chat')} className={`flex-1 text-center py-1.5 text-xs rounded-full ${activeTab === 'chat' ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-500'}`}>
          💬 {t.nav.chat}
        </button>
      </div>
    </nav>
  );
}

// ============ HERO SECTION ============
function Hero({ t, setActiveTab }) {
  return (
    <section className="bg-gradient-to-br from-terracotta-50 via-white to-teal-50 py-16 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="text-6xl mb-4">🙏</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-terracotta-600 mb-2">{t.hero.title}</h1>
        <p className="text-xl text-teal-700 font-medium mb-3">{t.hero.tagline}</p>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">{t.hero.subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setActiveTab('form')}
            className="px-6 py-3 bg-terracotta-500 text-white font-semibold rounded-full shadow-lg hover:bg-terracotta-600 transition transform hover:scale-105"
          >
            📝 {t.hero.cta}
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-full shadow-lg hover:bg-teal-600 transition transform hover:scale-105"
          >
            💬 {t.hero.chatCta}
          </button>
        </div>
      </div>
    </section>
  );
}

// ============ COMPLAINT FORM ============
function ComplaintForm({ t, lang }) {
  const [form, setForm] = useState({ name: '', whatsapp: '', email: '', category: 'other', description: '' });
  const [status, setStatus] = useState(null); // null, 'submitting', 'success', 'error'
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.whatsapp || form.whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = t.form.invalidPhone;
    if (!form.description.trim()) e.description = t.form.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', whatsapp: '', email: '', category: 'other', description: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <p className="text-lg text-teal-700 font-medium">{t.form.success}</p>
        <button onClick={() => setStatus(null)} className="mt-6 px-5 py-2 bg-terracotta-500 text-white rounded-full text-sm hover:bg-terracotta-600">
          {t.form.title}
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-terracotta-600 mb-6 text-center">📝 {t.form.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.name}</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.form.namePlaceholder} className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-terracotta-200 focus:border-terracotta-400 outline-none" />
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.whatsapp} <span className="text-red-500">*</span></label>
          <input type="tel" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder={t.form.whatsappPlaceholder} className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-terracotta-200 focus:border-terracotta-400 outline-none ${errors.whatsapp ? 'border-red-400' : ''}`} />
          {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.email}</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.form.emailPlaceholder} className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-terracotta-200 focus:border-terracotta-400 outline-none" />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.category}</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-terracotta-200 focus:border-terracotta-400 outline-none bg-white">
            {Object.entries(t.form.categories).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.complaint} <span className="text-red-500">*</span></label>
          <textarea rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder={t.form.complaintPlaceholder} className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-terracotta-200 focus:border-terracotta-400 outline-none resize-none ${errors.description ? 'border-red-400' : ''}`} />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Submit */}
        <button type="submit" disabled={status === 'submitting'} className="w-full py-3 bg-terracotta-500 text-white font-semibold rounded-xl hover:bg-terracotta-600 transition disabled:opacity-50">
          {status === 'submitting' ? t.form.submitting : t.form.submit}
        </button>

        {status === 'error' && <p className="text-red-500 text-sm text-center">{t.form.error}</p>}
      </form>
    </section>
  );
}

// ============ COMPLAINTS LIST ============
function ComplaintsList({ t }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/complaints')
      .then((r) => r.json())
      .then((data) => {
        setComplaints(data.complaints || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categoryMap = t.form.categories;

  return (
    <section className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-terracotta-600 mb-1 text-center">{t.complaints.title}</h2>
      <p className="text-sm text-gray-500 text-center mb-8">{t.complaints.subtitle}</p>

      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading...</div>
      ) : complaints.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-gray-500">{t.complaints.empty}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-teal-50 text-teal-700">
                    {categoryMap[c.category] || c.category}
                  </span>
                  {c.status === 'resolved' && (
                    <span className="ml-2 inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-green-50 text-green-700">
                      ✅ {t.complaints.status.resolved}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{c.description}</p>
              {c.name && c.name !== 'Anonymous' && (
                <p className="text-xs text-gray-400 mt-2">— {c.name}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ============ CHAT WITH DIDI ============
function ChatWidget({ t, lang }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [sessionId] = useState(() => 'chat_' + Math.random().toString(36).substring(2, 10));
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Auto-greeting
    setMessages([{ role: 'didi', text: t.chat.greeting }]);
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    const userMsg = input.trim();
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
    <section className="max-w-2xl mx-auto py-6 px-4">
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {/* Chat header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🙏</div>
            <div>
              <h3 className="font-bold text-lg">{t.chat.title}</h3>
              <p className="text-xs text-teal-100">{t.chat.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-terracotta-500 text-white rounded-br-sm'
                  : 'bg-white text-gray-700 shadow-sm border rounded-bl-sm'
              }`}>
                {msg.role === 'didi' && <span className="text-xs font-bold text-teal-600 block mb-1">DIDI 🙏</span>}
                {msg.text}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-400 px-4 py-2.5 rounded-2xl text-sm shadow-sm border rounded-bl-sm">
                <span className="text-xs font-bold text-teal-600 block mb-1">DIDI 🙏</span>
                {t.chat.thinking}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t bg-white flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={t.chat.placeholder}
            className="flex-1 px-4 py-2.5 border rounded-full text-sm focus:ring-2 focus:ring-teal-200 focus:border-teal-400 outline-none"
          />
          <button onClick={sendMessage} disabled={sending || !input.trim()} className="px-5 py-2.5 bg-teal-500 text-white rounded-full text-sm font-medium hover:bg-teal-600 transition disabled:opacity-50">
            {t.chat.send}
          </button>
        </div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer({ t }) {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4 mt-16">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-white font-semibold mb-1">🙏 {t.footer.tagline}</p>
        <p className="text-sm mb-3">{t.footer.desc}</p>
        <p className="text-xs">{t.footer.rights}</p>
      </div>
    </footer>
  );
}

// ============ MAIN PAGE ============
export default function Home() {
  const { lang, setLang, t } = useLang();
  const [activeTab, setActiveTab] = useState('home');

  return (
    <main>
      <Navbar lang={lang} setLang={setLang} t={t} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'home' && (
        <>
          <Hero t={t} setActiveTab={setActiveTab} />
          <ComplaintForm t={t} lang={lang} />
        </>
      )}
      {activeTab === 'form' && <ComplaintForm t={t} lang={lang} />}
      {activeTab === 'complaints' && <ComplaintsList t={t} />}
      {activeTab === 'chat' && <ChatWidget t={t} lang={lang} />}

      <Footer t={t} />
    </main>
  );
}
