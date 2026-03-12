'use client';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import Button from '../ui/Button';

export default function Header({ onLanguageChange, currentLang = 'en', onTabChange, activeTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'home', label: { en: 'Home', hi: 'होम' } },
    { id: 'issues', label: { en: 'Issues', hi: 'मुद्दे' } },
    { id: 'schemes', label: { en: 'Schemes', hi: 'योजनाएं' } },
    { id: 'legal', label: { en: 'Legal Aid', hi: 'कानूनी सहायता' } },
    { id: 'chat', label: { en: 'Chat', hi: 'चैट' } },
  ];

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#E63946] rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🙏</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900">DIDI</h1>
              <p className="text-xs text-gray-500">{currentLang === 'hi' ? 'बिलासपुर' : 'Bilaspur'}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#E63946] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.label[currentLang]}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => onLanguageChange(currentLang === 'en' ? 'hi' : 'en')}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{currentLang === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            {/* Login Button */}
            <Button variant="primary" size="sm" className="hidden sm:inline-flex">
              {currentLang === 'hi' ? 'लॉग इन' : 'Login'}
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slideUp">
            <nav className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg text-left font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#E63946] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.label[currentLang]}
                </button>
              ))}
              <button
                onClick={() => onLanguageChange(currentLang === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">{currentLang === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
