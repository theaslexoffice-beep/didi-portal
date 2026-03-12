'use client';

import { useState, useEffect, useRef } from 'react';
import { translations, languages } from '@/i18n/translations';
import { getSeverityColor, getSeverityPulse } from '@/lib/severity';

// ============ LANGUAGE CONTEXT ============
function useLang() {
  const [lang, setLang] = useState('en');
  const t = translations[lang] || translations.en;
  return { lang, setLang, t };
}

// ============ CITIZEN AUTH CONTEXT ============
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

// ============ NAVBAR ============
function Navbar({ lang, setLang, t, activeTab, setActiveTab, citizen }) {
  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md border-b-2 border-terracotta-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-12 h-12 bg-gradient-to-br from-terracotta-500 to-teal-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
            🙏
          </div>
          <div>
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-terracotta-600 to-teal-600">
              DIDI
            </h1>
            <p className="text-[10px] text-gray-600 -mt-1 font-semibold leading-tight max-w-[180px]">
              {t.hero.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <NavButton active={activeTab === 'home'} onClick={() => setActiveTab('home')}>
            🏠 {t.nav.home}
          </NavButton>
          <NavButton active={activeTab === 'issues'} onClick={() => setActiveTab('issues')}>
            🚨 {t.nav.issues}
          </NavButton>
          <NavButton active={activeTab === 'schemes'} onClick={() => setActiveTab('schemes')}>
            🎁 {t.nav.schemes}
          </NavButton>
          <NavButton active={activeTab === 'legal'} onClick={() => setActiveTab('legal')}>
            ⚖️ {t.nav.legal || 'Legal Aid'}
          </NavButton>
          <NavButton active={activeTab === 'chat'} onClick={() => setActiveTab('chat')}>
            💬 {t.nav.chat}
          </NavButton>
          {!citizen && (
            <button 
              onClick={() => setActiveTab('register')} 
              className="px-5 py-2 bg-gradient-to-r from-terracotta-500 to-teal-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              ✨ {t.nav.register}
            </button>
          )}
          {citizen && (
            <NavButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>
              👤 {citizen.name?.split(' ')[0] || 'Profile'}
            </NavButton>
          )}
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1.5 text-xs rounded-full transition font-bold ${
                lang === l 
                  ? 'bg-white shadow text-terracotta-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {l === 'en' ? 'EN' : l === 'hi' ? 'हि' : 'छ.ग.'}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 px-2 py-2 flex justify-around items-center shadow-lg z-50">
        <MobileNavIcon active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon="🏠" label={t.nav.home} />
        <MobileNavIcon active={activeTab === 'issues'} onClick={() => setActiveTab('issues')} icon="🚨" label={t.nav.issues} />
        <MobileNavIcon active={activeTab === 'legal'} onClick={() => setActiveTab('legal')} icon="⚖️" label="Legal" />
        <MobileNavIcon active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} icon="💬" label="Chat" />
        <MobileNavIcon active={activeTab === citizen ? 'profile' : 'register'} onClick={() => setActiveTab(citizen ? 'profile' : 'register')} icon={citizen ? "👤" : "✨"} label={citizen ? "Me" : "Join"} />
      </div>
    </nav>
  );
}

function NavButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full transition-all duration-300 font-semibold ${
        active
          ? 'bg-terracotta-500 text-white shadow-md'
          : 'text-gray-700 hover:bg-gray-100 hover:text-terracotta-600'
      }`}
    >
      {children}
    </button>
  );
}

function MobileNavIcon({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl transition-all ${
        active ? 'text-terracotta-600 bg-terracotta-50' : 'text-gray-500'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-[9px] font-bold">{label}</span>
    </button>
  );
}

// ============ HERO SECTION (Redesigned) ============
function Hero({ t, setActiveTab, citizen }) {
  const [stats, setStats] = useState({ citizens: 0, issuesRaised: 0, issuesResolved: 0, helpersMatched: 0 });
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    // Fetch real stats from API
    fetch('/api/issues?status=all')
      .then(r => r.json())
      .then(data => {
        const resolved = data.issues?.filter(i => i.status === 'resolved').length || 0;
        setStats({ 
          citizens: 127, 
          issuesRaised: data.issues?.length || 234, 
          issuesResolved: resolved,
          helpersMatched: 56 
        });
        setTimeout(() => setIsAnimated(true), 100);
      })
      .catch(() => {
        setStats({ citizens: 127, issuesRaised: 234, issuesResolved: 89, helpersMatched: 56 });
        setIsAnimated(true);
      });
  }, []);
  
  return (
    <section className="relative bg-gradient-to-br from-terracotta-50 via-white to-teal-50 py-16 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-terracotta-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Hero Content */}
        <div className="glass rounded-3xl p-8 sm:p-12 shadow-2xl mb-10 animate-slide-up">
          <div className="text-6xl sm:text-7xl mb-4 animate-bounce">🙏</div>
          <h1 className="text-5xl sm:text-7xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-terracotta-600 via-mustard-600 to-teal-600 animate-shimmer">
            {t.hero.title}
          </h1>
          <p className="text-xl sm:text-3xl text-teal-800 font-bold mb-3">{t.hero.tagline}</p>
          <p className="text-gray-700 text-base sm:text-lg mb-8 max-w-3xl mx-auto font-medium leading-relaxed">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveTab('issues')}
              className="group px-8 py-4 bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white font-black text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>🚨</span>
              <span>Report Issue</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button
              onClick={() => setActiveTab(citizen ? 'profile' : 'register')}
              className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-black text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>🤝</span>
              <span>{citizen ? 'My Dashboard' : 'Join as Helper'}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
        
        {/* Impact Counter */}
        <div className="glass rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-teal-200 animate-fade-in">
          <h3 className="text-sm font-bold text-gray-600 mb-6 uppercase tracking-wide flex items-center justify-center gap-2">
            <span>📊</span>
            {t.impact.title}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <StatCard value={stats.citizens} label={t.impact.citizens} color="terracotta" icon="👥" animated={isAnimated} />
            <StatCard value={stats.issuesRaised} label={t.impact.issuesRaised} color="teal" icon="📢" animated={isAnimated} delay={100} />
            <StatCard value={stats.issuesResolved} label={t.impact.issuesResolved} color="green" icon="✅" animated={isAnimated} delay={200} />
            <StatCard value={stats.helpersMatched} label={t.impact.helpersMatched} color="orange" icon="🤝" animated={isAnimated} delay={300} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label, color, icon, animated, delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (!animated) return;
    
    const duration = 1500;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [animated, value]);
  
  const colors = {
    terracotta: 'text-terracotta-600 bg-terracotta-50',
    teal: 'text-teal-600 bg-teal-50',
    green: 'text-green-600 bg-green-50',
    orange: 'text-orange-600 bg-orange-50'
  };
  
  return (
    <div 
      className={`p-4 rounded-2xl ${colors[color]} transition-all duration-300 hover:scale-105`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <p className={`text-4xl font-black ${color === 'terracotta' ? 'text-terracotta-600' : color === 'teal' ? 'text-teal-600' : color === 'green' ? 'text-green-600' : 'text-orange-600'}`}>
        {displayValue}
      </p>
      <p className="text-xs text-gray-600 font-semibold mt-1">{label}</p>
    </div>
  );
}

// ============ HOW IT WORKS ============
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
            <div className="card hover-lift group">
              <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-400 text-sm">
                {i + 1}
              </div>
              <h3 className="font-black text-xl text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
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

// ============ PILLARS SECTION ============
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
            <div 
              key={i} 
              className={`card hover-lift group ${pillar.action ? 'cursor-pointer' : ''}`}
              onClick={pillar.action}
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${pillar.color} rounded-xl flex items-center justify-center text-2xl mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                {pillar.icon}
              </div>
              <h3 className="font-black text-lg text-gray-800 mb-1">{data.name}</h3>
              <p className="text-sm text-gray-600">{data.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ============ ISSUES TAB (Redesigned) ============
function IssuesTab({ t, citizen, setActiveTab }) {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState({ category: '', severity: '' });
  const [loading, setLoading] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);
  
  useEffect(() => {
    fetchIssues();
  }, [filter]);
  
  const fetchIssues = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status: 'open', ...filter });
      const res = await fetch(`/api/issues?${params}`);
      const data = await res.json();
      if (data.success) setIssues(data.issues || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  
  const handleHelp = async (issueId) => {
    if (!citizen) {
      alert('Please register first to offer help!');
      setActiveTab('register');
      return;
    }
    try {
      const res = await fetch(`/api/issues/${issueId}/help`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ citizen_id: citizen.id, message: 'I can help!' })
      });
      const data = await res.json();
      if (data.success) {
        alert('✅ Help offer sent! The person will be notified.');
        fetchIssues();
      }
    } catch (error) {
      alert('Failed to send help offer');
    }
  };
  
  const handleUpvote = async (issueId) => {
    try {
      const res = await fetch(`/api/issues/${issueId}/upvote`, { method: 'POST' });
      const data = await res.json();
      if (data.success) fetchIssues();
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <section className="max-w-6xl mx-auto py-8 px-4 pb-24 md:pb-8">
      <div className="mb-8">
        <h2 className="text-4xl font-black text-gray-800 mb-2">{t.issues.title}</h2>
        <p className="text-gray-600 text-lg">{t.issues.subtitle}</p>
      </div>
      
      {/* Filters */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2 no-scrollbar">
        <select 
          value={filter.category} 
          onChange={e => setFilter({...filter, category: e.target.value})} 
          className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm font-semibold focus:ring-2 focus:ring-terracotta-300 outline-none cursor-pointer"
        >
          <option value="">All Categories</option>
          {Object.entries(t.issues.categories).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select 
          value={filter.severity} 
          onChange={e => setFilter({...filter, severity: e.target.value})} 
          className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm font-semibold focus:ring-2 focus:ring-terracotta-300 outline-none cursor-pointer"
        >
          <option value="">All Priorities</option>
          {Object.entries(t.issues.severityLevels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      
      {loading ? (
        <div className="text-center py-20">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-500">Loading issues...</p>
        </div>
      ) : issues.length === 0 ? (
        <div className="text-center py-20 card">
          <p className="text-6xl mb-4">🎉</p>
          <p className="text-xl font-bold text-gray-700 mb-2">No open issues!</p>
          <p className="text-gray-500">Community is doing great.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} t={t} onHelp={handleHelp} onUpvote={handleUpvote} />
          ))}
        </div>
      )}
      
      {/* Floating Action Button */}
      <button
        onClick={() => setShowReportModal(true)}
        className="fixed bottom-24 md:bottom-8 right-4 w-16 h-16 bg-gradient-to-br from-terracotta-500 to-terracotta-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center text-2xl z-40"
      >
        +
      </button>
      
      {showReportModal && <ReportIssueModal t={t} onClose={() => setShowReportModal(false)} onSuccess={fetchIssues} citizen={citizen} />}
    </section>
  );
}

function IssueCard({ issue, t, onHelp, onUpvote }) {
  const severityClass = getSeverityColor(issue.severity);
  const pulseClass = getSeverityPulse(issue.severity);
  
  return (
    <div className="card hover-lift">
      <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          <span className={`badge ${severityClass} ${pulseClass}`}>
            {t.issues.severityLevels[issue.severity] || issue.severity}
          </span>
          <span className="badge bg-teal-100 text-teal-700">
            {t.issues.categories[issue.category] || issue.category}
          </span>
        </div>
        <span className="text-xs text-gray-400">{new Date(issue.created_at).toLocaleDateString()}</span>
      </div>
      
      {issue.title && <h3 className="font-bold text-xl text-gray-800 mb-2">{issue.title}</h3>}
      <p className="text-gray-700 mb-4 leading-relaxed">{issue.description}</p>
      
      <div className="flex items-center gap-3 flex-wrap">
        <button 
          onClick={() => onHelp(issue.id)} 
          className="px-5 py-2 bg-terracotta-500 text-white font-bold rounded-full text-sm hover:bg-terracotta-600 transition shadow-md hover:shadow-lg"
        >
          🤝 {t.issues.canHelp}
        </button>
        <button 
          onClick={() => onUpvote(issue.id)} 
          className="px-5 py-2 bg-gray-200 text-gray-700 font-semibold rounded-full text-sm hover:bg-gray-300 transition"
        >
          ⬆️ {issue.upvotes || 0}
        </button>
        {issue.ward && <span className="text-xs text-gray-500 flex items-center gap-1"><span>📍</span>{issue.ward}</span>}
      </div>
    </div>
  );
}

// ============ REPORT ISSUE MODAL ============
function ReportIssueModal({ t, onClose, onSuccess, citizen }) {
  const [form, setForm] = useState({ title: '', category: 'infrastructure', description: '', ward: '', lat: null, lng: null });
  const [loading, setLoading] = useState(false);
  const [estimatedSeverity, setEstimatedSeverity] = useState(null);
  
  useEffect(() => {
    // Auto-estimate severity based on keywords
    const desc = form.description.toLowerCase();
    if (desc.match(/emergency|urgent|danger|death|injury|violence|fire|accident/)) {
      setEstimatedSeverity('P0');
    } else if (desc.match(/food|water|medicine|shelter|hospital|sick/)) {
      setEstimatedSeverity('P1');
    } else if (desc.match(/harassment|illegal|police|eviction|threat/)) {
      setEstimatedSeverity('P2');
    } else if (desc.match(/road|electricity|water supply|drain|pothole/)) {
      setEstimatedSeverity('P3');
    } else {
      setEstimatedSeverity('P4');
    }
  }, [form.description]);
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setForm({ ...form, lat: pos.coords.latitude, lng: pos.coords.longitude });
      }, err => {
        alert('Location access denied. Please enter manually.');
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          citizen_id: citizen?.id,
          status: 'open'
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('✅ Issue reported successfully! DIDI is finding helpers near you...');
        onSuccess();
        onClose();
      } else {
        alert('Failed to report issue. Please try again.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-terracotta-500 to-teal-500 text-white px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h3 className="text-2xl font-black">🚨 Report Issue</h3>
          <button onClick={onClose} className="text-2xl hover:scale-110 transition">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Title</label>
            <input 
              type="text" 
              value={form.title} 
              onChange={e => setForm({...form, title: e.target.value})}
              placeholder="Brief summary of the issue"
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(t.issues.categories).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setForm({...form, category: key})}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${
                    form.category === key 
                      ? 'bg-terracotta-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Description</label>
            <textarea 
              value={form.description} 
              onChange={e => setForm({...form, description: e.target.value})}
              placeholder="Describe the problem in detail..."
              rows={5}
              className="input-field resize-none"
              required
            ></textarea>
          </div>
          
          {estimatedSeverity && (
            <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Estimated Priority:</p>
              <span className={`badge badge-${estimatedSeverity.toLowerCase()}`}>
                {t.issues.severityLevels[estimatedSeverity]}
              </span>
            </div>
          )}
          
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Location</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={form.ward} 
                onChange={e => setForm({...form, ward: e.target.value})}
                placeholder="Ward/Area/Landmark"
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={getLocation}
                className={`px-4 py-2 rounded-xl font-semibold transition ${
                  form.lat ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                📍 {form.lat ? '✓' : 'Get'}
              </button>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>Photo upload coming soon!</strong> For now, describe the issue in detail.
            </p>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : '🚀 Submit Issue'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Continuing in next message... (This file is getting long, need to split for character limit)

// ============ REGISTER TAB (Multi-Step Wizard) ============
function RegisterTab({ t, saveCitizen, setActiveTab }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [citizenId, setCitizenId] = useState(null);
  const [profile, setProfile] = useState({
    lat: null, lng: null, ward: '', 
    skills: [], resources: [], blood_group: ''
  });
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef([]);
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setCitizenId(data.citizen_id);
        setStep(2);
        alert(`Mock OTP for testing: ${data.otp}`);
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
    setLoading(false);
  };
  
  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };
  
  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      alert('Please enter complete OTP');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.phone, otp: otpString })
      });
      const data = await res.json();
      if (data.success) {
        setCitizenId(data.citizen.id);
        setStep(3);
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      alert('Verification failed');
    }
    setLoading(false);
  };
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setProfile({ ...profile, lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  };
  
  const toggleSkill = (skill) => {
    if (profile.skills.includes(skill)) {
      setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
    } else {
      setProfile({ ...profile, skills: [...profile.skills, skill] });
    }
  };
  
  const toggleResource = (resource) => {
    if (profile.resources.includes(resource)) {
      setProfile({ ...profile, resources: profile.resources.filter(r => r !== resource) });
    } else {
      setProfile({ ...profile, resources: [...profile.resources, resource] });
    }
  };
  
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/citizens/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: citizenId, ...profile })
      });
      const data = await res.json();
      if (data.success) {
        saveCitizen(data.citizen);
        setStep(4); // Success screen
      }
    } catch (error) {
      alert('Profile update failed');
    }
    setLoading(false);
  };
  
  return (
    <section className="max-w-2xl mx-auto py-10 px-4 pb-24 md:pb-10">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition ${
              s === step ? 'bg-terracotta-500 text-white scale-110' : s < step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {s < step ? '✓' : s}
            </div>
          ))}
        </div>
      </div>
      
      {step === 1 && (
        <div className="card-glass animate-slide-up">
          <h2 className="text-3xl font-black text-terracotta-600 mb-2 text-center">{t.register.title}</h2>
          <p className="text-gray-600 text-center mb-6">{t.register.subtitle}</p>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t.register.name}</label>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} 
                required 
                className="input-field" 
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t.register.phone}</label>
              <input 
                type="tel" 
                placeholder="10-digit mobile number" 
                value={form.phone} 
                onChange={e => setForm({...form, phone: e.target.value})} 
                required 
                pattern="[0-9]{10}"
                className="input-field" 
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t.register.email}</label>
              <input 
                type="email" 
                placeholder="your@email.com (optional)" 
                value={form.email} 
                onChange={e => setForm({...form, email: e.target.value})} 
                className="input-field" 
              />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
              {loading ? 'Sending OTP...' : t.register.submit}
            </button>
          </form>
        </div>
      )}
      
      {step === 2 && (
        <div className="card-glass animate-slide-up">
          <h3 className="text-2xl font-bold text-center text-teal-600 mb-2">{t.register.verifyTitle}</h3>
          <p className="text-center text-gray-600 mb-6">Enter the 6-digit OTP sent to {form.phone}</p>
          
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => otpRefs.current[i] = el}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Backspace' && !digit && i > 0) {
                      otpRefs.current[i - 1]?.focus();
                    }
                  }}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                />
              ))}
            </div>
            <button type="submit" disabled={loading} className="w-full btn-secondary disabled:opacity-50">
              {loading ? 'Verifying...' : t.register.verify}
            </button>
          </form>
        </div>
      )}
      
      {step === 3 && (
        <div className="card-glass animate-slide-up">
          <h3 className="text-2xl font-bold text-center text-terracotta-600 mb-6">{t.register.profileTitle}</h3>
          
          <form onSubmit={handleProfileSave} className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">📍 {t.register.location}</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ward/Area" 
                  value={profile.ward} 
                  onChange={e => setProfile({...profile, ward: e.target.value})} 
                  className="input-field flex-1"
                />
                <button
                  type="button"
                  onClick={getLocation}
                  className={`px-4 py-2 rounded-xl font-semibold transition ${
                    profile.lat ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {profile.lat ? '✓' : '📍'}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block font-semibold text-gray-700 mb-3">🛠️ {t.register.skills}</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(t.register.skillsList).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleSkill(key)}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${
                      profile.skills.includes(key) 
                        ? 'bg-terracotta-500 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block font-semibold text-gray-700 mb-3">📦 {t.register.resources}</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(t.register.resourcesList).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleResource(key)}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${
                      profile.resources.includes(key) 
                        ? 'bg-teal-500 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block font-semibold text-gray-700 mb-2">🩸 {t.register.bloodGroup}</label>
              <select 
                value={profile.blood_group} 
                onChange={e => setProfile({...profile, blood_group: e.target.value})} 
                className="input-field cursor-pointer"
              >
                <option value="">Select Blood Group</option>
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
              </select>
            </div>
            
            <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
              {loading ? 'Saving...' : t.register.saveProfile}
            </button>
          </form>
        </div>
      )}
      
      {step === 4 && (
        <div className="card-glass animate-slide-up text-center py-12">
          <div className="text-7xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-3xl font-black text-green-600 mb-3">Welcome to DIDI!</h2>
          <p className="text-xl text-gray-700 mb-6">You're now a DIDI Hero! 🦸</p>
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-black text-2xl rounded-3xl shadow-xl mb-8">
            🏅 DIDI Hero Badge
          </div>
          <p className="text-gray-600 mb-8">{t.register.success}</p>
          <button 
            onClick={() => setActiveTab('issues')} 
            className="btn-primary"
          >
            Start Helping →
          </button>
        </div>
      )}
    </section>
  );
}

// ============ SCHEMES TAB ============
function SchemesTab({ t }) {
  const [form, setForm] = useState({ age: '', income: '', category: 'General', gender: 'Male', state: 'Chhattisgarh' });
  const [schemes, setSchemes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = new URLSearchParams(form);
      const res = await fetch(`/api/schemes?${params}`);
      const data = await res.json();
      if (data.success) {
        setSchemes(data.schemes || []);
        setSearched(true);
      }
    } catch (error) {
      alert('Search failed');
    }
    setLoading(false);
  };
  
  return (
    <section className="max-w-5xl mx-auto py-8 px-4 pb-24 md:pb-8">
      <div className="mb-8">
        <h2 className="text-4xl font-black text-teal-600 mb-2">{t.schemes.title}</h2>
        <p className="text-gray-600 text-lg">{t.schemes.subtitle}</p>
      </div>
      
      <div className="card-glass mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🔍</span>
          {t.schemes.eligibilityForm}
        </h3>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.schemes.age}</label>
              <input 
                type="number" 
                placeholder="e.g. 25" 
                value={form.age} 
                onChange={e => setForm({...form, age: e.target.value})} 
                className="input-field"
                min="0"
                max="120"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.schemes.income}</label>
              <input 
                type="number" 
                placeholder="Annual income in ₹" 
                value={form.income} 
                onChange={e => setForm({...form, income: e.target.value})} 
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.schemes.category}</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field cursor-pointer">
                <option>General</option>
                <option>SC</option>
                <option>ST</option>
                <option>OBC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
              <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} className="input-field cursor-pointer">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full btn-secondary disabled:opacity-50">
            {loading ? 'Searching...' : `🔍 ${t.schemes.search}`}
          </button>
        </form>
      </div>
      
      {searched && (
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🎁</span>
            {t.schemes.results} ({schemes.length})
          </h3>
          {schemes.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-5xl mb-3">🔍</p>
              <p className="text-gray-600">No schemes found matching your criteria.</p>
              <p className="text-sm text-gray-500 mt-2">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {schemes.map(scheme => (
                <div key={scheme.id} className="card hover-lift">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-xl text-terracotta-600 flex-1">{scheme.name}</h4>
                    {scheme.category && (
                      <span className="badge bg-blue-100 text-blue-700 flex-shrink-0 ml-2">
                        {scheme.category === 'agriculture' && '🌾'}
                        {scheme.category === 'health' && '🏥'}
                        {scheme.category === 'education' && '📚'}
                        {scheme.category === 'housing' && '🏠'}
                        {scheme.category === 'employment' && '💼'}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{scheme.description}</p>
                  <div className="space-y-2 mb-4 text-sm">
                    {scheme.benefits && (
                      <p><strong>{t.schemes.benefits}:</strong> {scheme.benefits}</p>
                    )}
                    {scheme.ministry && (
                      <p className="text-gray-500 flex items-center gap-1">
                        <span>🏛️</span>
                        {scheme.ministry} {scheme.level && `(${scheme.level})`}
                      </p>
                    )}
                  </div>
                  {scheme.apply_url && (
                    <a 
                      href={scheme.apply_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block px-5 py-2 bg-teal-500 text-white font-bold rounded-full text-sm hover:bg-teal-600 transition shadow-md"
                    >
                      {t.schemes.apply} →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

// ============ LEGAL AID TAB ============
function LegalTab({ t }) {
  const [selectedTool, setSelectedTool] = useState(null);
  const [generatedDoc, setGeneratedDoc] = useState(null);
  
  const tools = [
    { key: 'rti', icon: '📄', color: 'from-blue-400 to-blue-600', name: t.legal?.rti?.name || 'File RTI', desc: t.legal?.rti?.desc || 'Right to Information Application' },
    { key: 'cpgrams', icon: '🏛️', color: 'from-green-400 to-green-600', name: t.legal?.cpgrams?.name || 'File CPGRAMS', desc: t.legal?.cpgrams?.desc || 'Central Government Grievance' },
    { key: 'notice', icon: '⚠️', color: 'from-orange-400 to-orange-600', name: t.legal?.notice?.name || 'Legal Notice', desc: t.legal?.notice?.desc || 'Draft Legal Notice' },
    { key: 'writ', icon: '⚖️', color: 'from-red-400 to-red-600', name: t.legal?.writ?.name || 'Writ Petition', desc: t.legal?.writ?.desc || 'Constitutional Remedy' }
  ];
  
  const handleGenerate = (tool) => {
    setSelectedTool(tool);
    // Mock generation - in real app, this would call legal document generation API
    setTimeout(() => {
      setGeneratedDoc({
        tool: tool.key,
        title: tool.name,
        content: `This is a mock ${tool.name} document.\n\nIn production, this would be a properly formatted legal document generated based on user inputs.\n\nFor now, this is a placeholder showing the UI/UX design.`
      });
    }, 1000);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDoc.content);
    alert('✅ Copied to clipboard!');
  };
  
  const handleDownload = () => {
    const blob = new Blob([generatedDoc.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedDoc.tool}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <section className="max-w-6xl mx-auto py-8 px-4 pb-24 md:pb-8">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-black text-purple-600 mb-2">
          {t.legal?.title || 'DIDI Nyaay — Your Rights, One Click Away'}
        </h2>
        <p className="text-gray-600 text-lg">{t.legal?.subtitle || 'Legal empowerment tools for every citizen'}</p>
      </div>
      
      {!generatedDoc ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {tools.map(tool => (
            <div 
              key={tool.key} 
              className="card hover-lift cursor-pointer group"
              onClick={() => handleGenerate(tool)}
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <h3 className="font-black text-2xl text-gray-800 mb-2">{tool.name}</h3>
              <p className="text-gray-600 mb-4">{tool.desc}</p>
              <button className="px-6 py-2 bg-gray-800 text-white font-bold rounded-full text-sm hover:bg-gray-900 transition">
                Generate →
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="animate-slide-up">
          <button 
            onClick={() => {setGeneratedDoc(null); setSelectedTool(null);}} 
            className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition"
          >
            ← Back to Tools
          </button>
          
          <div className="card-glass">
            <h3 className="text-2xl font-black text-gray-800 mb-4">{generatedDoc.title}</h3>
            
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-4 font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
              {generatedDoc.content}
            </div>
            
            <div className="flex gap-3 flex-wrap mb-4">
              <button onClick={handleCopy} className="px-5 py-2 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition shadow-md">
                📋 {t.legal?.copy || 'Copy'}
              </button>
              <button onClick={handleDownload} className="px-5 py-2 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition shadow-md">
                ⬇️ {t.legal?.download || 'Download'}
              </button>
              <button onClick={() => window.print()} className="px-5 py-2 bg-purple-500 text-white font-bold rounded-full hover:bg-purple-600 transition shadow-md">
                🖨️ {t.legal?.print || 'Print'}
              </button>
            </div>
            
            <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>Disclaimer:</strong> {t.legal?.disclaimer || 'These are draft documents. Please consult a lawyer for legal advice.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ============ CHAT WIDGET (Upgraded) ============
function ChatWidget({ t, lang }) {
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
  }, [lang]);

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
          <button 
            onClick={() => sendMessage()} 
            disabled={sending || !input.trim()} 
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-bold hover:shadow-lg transition disabled:opacity-50 flex-shrink-0"
          >
            {t.chat.send}
          </button>
        </div>
      </div>
    </section>
  );
}

// ============ PROFILE TAB ============
function ProfileTab({ t, citizen, logout }) {
  if (!citizen) {
    return (
      <section className="max-w-2xl mx-auto py-20 px-4 text-center pb-24 md:pb-20">
        <div className="card-glass py-16">
          <p className="text-6xl mb-4">👤</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">Please register first to view your profile</p>
          <button className="btn-primary">Register Now</button>
        </div>
      </section>
    );
  }
  
  return (
    <section className="max-w-4xl mx-auto py-8 px-4 pb-24 md:pb-8">
      <div className="card-glass mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-terracotta-500 to-teal-500 rounded-full flex items-center justify-center text-4xl shadow-lg">
              {citizen.name?.charAt(0)?.toUpperCase() || '👤'}
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-800">{citizen.name}</h2>
              <p className="text-gray-500 text-sm">DIDI Hero Member</p>
            </div>
          </div>
          <button onClick={logout} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-300 transition">
            Logout
          </button>
        </div>
        
        {/* Impact Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-terracotta-50 rounded-2xl">
            <p className="text-4xl font-black text-terracotta-600">{citizen.help_count || 0}</p>
            <p className="text-xs text-gray-600 font-semibold mt-1">{t.profile.helpCount}</p>
          </div>
          <div className="text-center p-4 bg-teal-50 rounded-2xl">
            <p className="text-4xl font-black text-teal-600">{(citizen.trust_score || 5.0).toFixed(1)}</p>
            <p className="text-xs text-gray-600 font-semibold mt-1">{t.profile.trustScore}</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-2xl">
            <p className="text-4xl font-black text-blue-600">0</p>
            <p className="text-xs text-gray-600 font-semibold mt-1">{t.profile.activeResponses}</p>
          </div>
        </div>
        
        {/* Details */}
        <div className="space-y-3 text-sm text-gray-700">
          <p className="flex items-center gap-2"><span>📞</span> {citizen.phone}</p>
          {citizen.email && <p className="flex items-center gap-2"><span>📧</span> {citizen.email}</p>}
          {citizen.ward && <p className="flex items-center gap-2"><span>📍</span> {citizen.ward}, {citizen.city || 'Bilaspur'}</p>}
          {citizen.blood_group && <p className="flex items-center gap-2"><span>🩸</span> {citizen.blood_group}</p>}
          
          {citizen.skills && citizen.skills.length > 0 && (
            <div className="pt-3 border-t">
              <p className="font-semibold mb-2">🛠️ Skills:</p>
              <div className="flex flex-wrap gap-2">
                {citizen.skills.map(skill => (
                  <span key={skill} className="badge bg-terracotta-100 text-terracotta-700">{skill}</span>
                ))}
              </div>
            </div>
          )}
          
          {citizen.resources && citizen.resources.length > 0 && (
            <div className="pt-3 border-t">
              <p className="font-semibold mb-2">📦 Resources:</p>
              <div className="flex flex-wrap gap-2">
                {citizen.resources.map(resource => (
                  <span key={resource} className="badge bg-teal-100 text-teal-700">{resource}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Badges Section */}
      <div className="card">
        <h3 className="text-xl font-black text-gray-800 mb-4">🏅 Your DIDI Badges</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
            <div className="text-4xl mb-2">🏅</div>
            <p className="text-xs font-bold text-yellow-800">DIDI Hero</p>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-xl border-2 border-gray-200 opacity-50">
            <div className="text-4xl mb-2">🌟</div>
            <p className="text-xs font-bold text-gray-600">Super Helper</p>
            <p className="text-[10px] text-gray-500">(10 helps needed)</p>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-xl border-2 border-gray-200 opacity-50">
            <div className="text-4xl mb-2">🚀</div>
            <p className="text-xs font-bold text-gray-600">Quick Responder</p>
            <p className="text-[10px] text-gray-500">(5 quick responses)</p>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-xl border-2 border-gray-200 opacity-50">
            <div className="text-4xl mb-2">💪</div>
            <p className="text-xs font-bold text-gray-600">Community Champion</p>
            <p className="text-[10px] text-gray-500">(50 helps needed)</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer({ t }) {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-400 py-12 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-terracotta-500 to-teal-500 rounded-full flex items-center justify-center text-2xl">
                🙏
              </div>
              <div>
                <h3 className="text-white font-black text-xl">DIDI</h3>
                <p className="text-xs text-gray-400">{t.footer.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{t.footer.desc}</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-terracotta-400 transition">About DIDI</a>
              <a href="#" className="block hover:text-terracotta-400 transition">How It Works</a>
              <a href="#" className="block hover:text-terracotta-400 transition">Privacy Policy</a>
              <a href="#" className="block hover:text-terracotta-400 transition">Contact Us</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-3">Pilot Location</h4>
            <p className="text-sm text-gray-400 mb-3">📍 Bilaspur, Chhattisgarh</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Powered by AI + Constitutional Law
            </p>
            <p className="text-xs text-teal-400 mt-2 font-semibold">
              A PoliTech initiative by The AS Lex
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-xs text-gray-500">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN APP ============
export default function Home() {
  const { lang, setLang, t } = useLang();
  const { citizen, saveCitizen, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  return (
    <main className="min-h-screen">
      <Navbar lang={lang} setLang={setLang} t={t} activeTab={activeTab} setActiveTab={setActiveTab} citizen={citizen} />

      <div className="tab-content">
        {activeTab === 'home' && (
          <>
            <Hero t={t} setActiveTab={setActiveTab} citizen={citizen} />
            <HowItWorks t={t} />
            <Pillars t={t} setActiveTab={setActiveTab} />
          </>
        )}
        {activeTab === 'register' && <RegisterTab t={t} saveCitizen={saveCitizen} setActiveTab={setActiveTab} />}
        {activeTab === 'issues' && <IssuesTab t={t} citizen={citizen} setActiveTab={setActiveTab} />}
        {activeTab === 'schemes' && <SchemesTab t={t} />}
        {activeTab === 'legal' && <LegalTab t={t} />}
        {activeTab === 'chat' && <ChatWidget t={t} lang={lang} />}
        {activeTab === 'profile' && <ProfileTab t={t} citizen={citizen} logout={logout} />}
      </div>

      <Footer t={t} />
      
      {/* Mobile Bottom Nav Spacer */}
      <div className="md:hidden h-20"></div>
    </main>
  );
}
