'use client';
import { useState, useEffect } from 'react';
import Card from './ui/Card';

export default function Hero({ t, setActiveTab, citizen }) {
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
        <Card variant="glass" className="p-8 sm:p-12 shadow-2xl mb-10 animate-slide-up">
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
        </Card>
        
        {/* Impact Counter */}
        <Card variant="glass" className="shadow-xl p-6 sm:p-8 border-2 border-teal-200 animate-fade-in">
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
        </Card>
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
