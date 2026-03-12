'use client';

import { useState, useEffect } from 'react';
import { translations } from '@/i18n/translations';

// Components
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import IssuesList from '@/components/IssuesList';
import RegisterForm from '@/components/RegisterForm';
import SchemesFinder from '@/components/SchemesFinder';
import LegalAid from '@/components/LegalAid';
import ChatBot from '@/components/ChatBot';
import ProfilePage from '@/components/ProfilePage';
import Card from '@/components/ui/Card';

// ============ HOOKS ============
function useLang() {
  const [lang, setLang] = useState('en');
  const t = translations[lang] || translations.en;
  return { lang, setLang, t };
}

function useAuth() {
  const [citizen, setCitizen] = useState(null);
  
  useEffect(() => {
    const stored = localStorage.getItem('didi_citizen');
    if (stored) setCitizen(JSON.parse(stored));
  }, []);
  
  const saveCitizen = (c) => {
    setCitizen(c);
    localStorage.setItem('didi_citizen', JSON.stringify(c));
  };
  
  const logout = () => {
    setCitizen(null);
    localStorage.removeItem('didi_citizen');
  };
  
  return { citizen, saveCitizen, logout };
}

// ============ HOME SECTIONS ============
function HowItWorks({ t }) {
  const steps = [
    { icon: '📱', title: t.howItWorks?.step1Title || 'Report', desc: t.howItWorks?.step1Desc || 'Citizen reports via any channel', color: 'from-blue-400 to-blue-600' },
    { icon: '🧠', title: t.howItWorks?.step2Title || 'AI Classifies', desc: t.howItWorks?.step2Desc || 'Severity + category auto-assigned', color: 'from-purple-400 to-purple-600' },
    { icon: '🤝', title: t.howItWorks?.step3Title || 'Match', desc: t.howItWorks?.step3Desc || 'Nearest helper found in <60 seconds', color: 'from-teal-400 to-teal-600' },
    { icon: '⚖️', title: t.howItWorks?.step4Title || 'Escalate', desc: t.howItWorks?.step4Desc || 'If unresolved → RTI → Legal Notice → High Court', color: 'from-terracotta-400 to-terracotta-600' }
  ];
  
  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-black text-gray-800 mb-3">
          {t.howItWorks?.title || 'How DIDI Works'}
        </h2>
        <p className="text-gray-600 text-lg">{t.howItWorks?.subtitle || 'From problem to solution in 4 steps'}</p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <Card hover>
              <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-400 text-sm">
                {i + 1}
              </div>
              <h3 className="font-black text-xl text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
            </Card>
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-3xl text-gray-300">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Pillars({ t, setActiveTab }) {
  const pillars = [
    { key: 'samadhan', icon: '🚨', color: 'from-red-400 to-red-600', action: () => setActiveTab('issues') },
    { key: 'sarkar', icon: '🏛️', color: 'from-blue-400 to-blue-600', action: () => setActiveTab('schemes') },
    { key: 'nyaay', icon: '⚖️', color: 'from-purple-400 to-purple-600', action: () => setActiveTab('legal') },
    { key: 'samaj', icon: '🤝', color: 'from-teal-400 to-teal-600', action: () => setActiveTab('register') },
    { key: 'data', icon: '📊', color: 'from-green-400 to-green-600', action: null },
    { key: 'awaaz', icon: '📢', color: 'from-orange-400 to-orange-600', action: null },
    { key: 'connect', icon: '📱', color: 'from-indigo-400 to-indigo-600', action: () => setActiveTab('chat') }
  ];
  
  return (
    <section className="max-w-7xl mx-auto py-16 px-4 bg-white/50 rounded-3xl my-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-black text-gray-800 mb-3">
          {t.pillars?.title || 'The 7 Pillars of DIDI'}
        </h2>
        <p className="text-gray-600 text-lg">{t.pillars?.subtitle || 'A complete ecosystem for citizen empowerment'}</p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, i) => {
          const data = t.pillars?.[pillar.key] || { name: pillar.key, desc: 'Coming soon' };
          return (
            <Card 
              key={i} 
              hover={!!pillar.action}
              onClick={pillar.action}
              className={pillar.action ? 'cursor-pointer' : ''}
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${pillar.color} rounded-xl flex items-center justify-center text-2xl mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                {pillar.icon}
              </div>
              <h3 className="font-black text-lg text-gray-800 mb-1">{data.name}</h3>
              <p className="text-sm text-gray-600">{data.desc}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

// ============ MAIN APP ============
export default function Home() {
  const { lang, setLang, t } = useLang();
  const { citizen, saveCitizen, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  return (
    <main className="min-h-screen">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        t={t} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        citizen={citizen} 
      />

      <div className="tab-content">
        {activeTab === 'home' && (
          <>
            <Hero t={t} setActiveTab={setActiveTab} citizen={citizen} />
            <HowItWorks t={t} />
            <Pillars t={t} setActiveTab={setActiveTab} />
          </>
        )}
        {activeTab === 'register' && (
          <RegisterForm t={t} saveCitizen={saveCitizen} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'issues' && (
          <IssuesList t={t} citizen={citizen} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'schemes' && (
          <SchemesFinder t={t} />
        )}
        {activeTab === 'legal' && (
          <LegalAid t={t} />
        )}
        {activeTab === 'chat' && (
          <ChatBot t={t} lang={lang} />
        )}
        {activeTab === 'profile' && (
          <ProfilePage t={t} citizen={citizen} logout={logout} setActiveTab={setActiveTab} />
        )}
      </div>

      <Footer t={t} />
      
      {/* Mobile Bottom Nav Spacer */}
      <div className="md:hidden h-20"></div>
    </main>
  );
}
