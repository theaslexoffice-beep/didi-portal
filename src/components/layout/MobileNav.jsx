'use client';
import { Home, AlertCircle, Gift, Scale, MessageCircle } from 'lucide-react';

export default function MobileNav({ activeTab, onTabChange, lang = 'en' }) {
  const items = [
    { id: 'home', icon: Home, label: { en: 'Home', hi: 'होम' } },
    { id: 'issues', icon: AlertCircle, label: { en: 'Issues', hi: 'मुद्दे' } },
    { id: 'schemes', icon: Gift, label: { en: 'Schemes', hi: 'योजनाएं' } },
    { id: 'legal', icon: Scale, label: { en: 'Legal', hi: 'कानूनी' } },
    { id: 'chat', icon: MessageCircle, label: { en: 'Chat', hi: 'चैट' } },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-3 min-h-[48px] transition-colors ${
                isActive ? 'text-[#E63946]' : 'text-gray-600'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label[lang]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
