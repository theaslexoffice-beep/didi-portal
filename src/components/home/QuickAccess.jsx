import { Gift, Scale, MessageCircle } from 'lucide-react';
import Card from '../ui/Card';

export default function QuickAccess({ lang = 'en', onTabChange }) {
  const content = {
    en: {
      title: 'Quick Access',
      cards: [
        {
          icon: Gift,
          title: 'Government Schemes',
          desc: 'Find benefits you\'re eligible for',
          color: 'text-[#F77F00]',
          bg: 'bg-[#F77F00]/5',
          tab: 'schemes'
        },
        {
          icon: Scale,
          title: 'Legal Aid',
          desc: 'RTI, writs, and legal documents',
          color: 'text-[#1D3557]',
          bg: 'bg-[#1D3557]/5',
          tab: 'legal'
        },
        {
          icon: MessageCircle,
          title: 'Chat with DIDI',
          desc: 'Get instant answers to your questions',
          color: 'text-[#2A9D8F]',
          bg: 'bg-[#2A9D8F]/5',
          tab: 'chat'
        }
      ]
    },
    hi: {
      title: 'त्वरित पहुंच',
      cards: [
        {
          icon: Gift,
          title: 'सरकारी योजनाएं',
          desc: 'जानें आप किन लाभों के पात्र हैं',
          color: 'text-[#F77F00]',
          bg: 'bg-[#F77F00]/5',
          tab: 'schemes'
        },
        {
          icon: Scale,
          title: 'कानूनी सहायता',
          desc: 'आरटीआई, रिट और कानूनी दस्तावेज',
          color: 'text-[#1D3557]',
          bg: 'bg-[#1D3557]/5',
          tab: 'legal'
        },
        {
          icon: MessageCircle,
          title: 'डीडी से बात करें',
          desc: 'अपने सवालों के तुरंत जवाब पाएं',
          color: 'text-[#2A9D8F]',
          bg: 'bg-[#2A9D8F]/5',
          tab: 'chat'
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">{t.title}</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {t.cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card 
                key={idx} 
                hover 
                onClick={() => onTabChange(card.tab)}
                className="text-center cursor-pointer group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${card.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${card.color}`} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
