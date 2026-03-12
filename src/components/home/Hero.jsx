'use client';
import { useEffect, useState } from 'react';
import { AlertCircle, Gift, TrendingUp, Users } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero({ lang = 'en', onTabChange }) {
  const [stats, setStats] = useState({ issues: 0, resolved: 0, citizens: 0, schemes: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      setStats({ issues: 247, resolved: 89, citizens: 156, schemes: 58 }); // Fallback
    } finally {
      setLoading(false);
    }
  };

  const content = {
    en: {
      headline: 'Your Voice Matters.',
      subheadline: 'Report. Resolve. Rebuild Bilaspur together.',
      reportBtn: 'Report an Issue',
      schemesBtn: 'Find Schemes',
      statLabels: {
        issues: 'Issues Reported',
        resolved: 'Resolved',
        citizens: 'Citizens',
        schemes: 'Schemes'
      }
    },
    hi: {
      headline: 'आपकी आवाज़ मायने रखती है।',
      subheadline: 'रिपोर्ट करें। समाधान करें। बिलासपुर को साथ में बनाएं।',
      reportBtn: 'शिकायत दर्ज करें',
      schemesBtn: 'योजनाएं खोजें',
      statLabels: {
        issues: 'शिकायतें',
        resolved: 'हल किया',
        citizens: 'नागरिक',
        schemes: 'योजनाएं'
      }
    }
  };

  const t = content[lang];

  const statsData = [
    { icon: AlertCircle, value: stats.issues, label: t.statLabels.issues, color: 'text-[#E63946]' },
    { icon: TrendingUp, value: stats.resolved, label: t.statLabels.resolved, color: 'text-[#2A9D8F]' },
    { icon: Users, value: stats.citizens, label: t.statLabels.citizens, color: 'text-[#1D3557]' },
    { icon: Gift, value: stats.schemes, label: t.statLabels.schemes, color: 'text-[#F77F00]' }
  ];

  return (
    <section className="relative overflow-hidden hero-gradient py-20 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 text-balance">
            {t.headline}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            {t.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => onTabChange('issues')}
              className="bg-[#E63946] hover:bg-[#D62839] w-full sm:w-auto"
            >
              {t.reportBtn}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => onTabChange('schemes')}
              className="bg-white text-[#1D3557] hover:bg-gray-50 border-white w-full sm:w-auto"
            >
              {t.schemesBtn}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-200"
              >
                <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} strokeWidth={2.5} />
                <div className="text-3xl md:text-4xl font-black font-mono text-gray-900 mb-1">
                  {loading ? '...' : stat.value.toLocaleString()}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
