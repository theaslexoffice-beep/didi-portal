import { FileText, Bell, CheckCircle } from 'lucide-react';

export default function HowItWorks({ lang = 'en' }) {
  const content = {
    en: {
      title: 'How It Works',
      subtitle: 'Three simple steps to make a difference',
      steps: [
        { icon: FileText, title: 'Report', desc: 'Submit your issue with details and photos' },
        { icon: Bell, title: 'We Act', desc: 'Authorities review and take action' },
        { icon: CheckCircle, title: 'Resolved', desc: 'Track progress until resolution' }
      ]
    },
    hi: {
      title: 'यह कैसे काम करता है',
      subtitle: 'बदलाव लाने के लिए तीन सरल कदम',
      steps: [
        { icon: FileText, title: 'रिपोर्ट करें', desc: 'विवरण और फोटो के साथ अपनी समस्या जमा करें' },
        { icon: Bell, title: 'हम कार्य करते हैं', desc: 'अधिकारी समीक्षा करते हैं और कार्रवाई करते हैं' },
        { icon: CheckCircle, title: 'हल किया गया', desc: 'समाधान तक प्रगति ट्रैक करें' }
      ]
    }
  };

  const t = content[lang];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t.title}</h2>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative">
                {/* Connector Line (desktop only) */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#E63946] to-transparent" />
                )}
                
                <div className="text-center">
                  {/* Icon Circle */}
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#E63946] to-[#D62839] flex items-center justify-center shadow-lg">
                    <Icon className="w-16 h-16 text-white" strokeWidth={2} />
                  </div>
                  
                  {/* Content */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#E63946] text-white font-bold text-sm mb-3">
                      {idx + 1}
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
