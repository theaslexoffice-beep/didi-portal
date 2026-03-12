import { FileText, Scale, AlertCircle, FileCheck, HelpCircle } from 'lucide-react';
import Card from '../ui/Card';

export default function LegalHub({ lang = 'en', onToolClick }) {
  const content = {
    en: {
      title: 'Legal Aid Tools',
      subtitle: 'Free legal assistance for common documents and procedures',
      tools: [
        {
          id: 'rti',
          icon: FileText,
          title: 'RTI Application',
          desc: 'Right to Information request generator',
          color: 'text-[#1D3557]'
        },
        {
          id: 'writ',
          icon: Scale,
          title: 'Writ Petition',
          desc: 'Constitutional remedy petition draft',
          color: 'text-[#E63946]'
        },
        {
          id: 'complaint',
          icon: AlertCircle,
          title: 'Consumer Complaint',
          desc: 'File consumer court complaint',
          color: 'text-[#F77F00]'
        },
        {
          id: 'affidavit',
          icon: FileCheck,
          title: 'Affidavit',
          desc: 'Generate sworn statement documents',
          color: 'text-[#2A9D8F]'
        },
        {
          id: 'legal-advice',
          icon: HelpCircle,
          title: 'Legal Advice',
          desc: 'Get basic legal guidance',
          color: 'text-gray-700'
        }
      ],
      disclaimer: 'Disclaimer: These tools provide basic templates. For complex cases, consult a qualified lawyer.'
    },
    hi: {
      title: 'कानूनी सहायता उपकरण',
      subtitle: 'सामान्य दस्तावेजों और प्रक्रियाओं के लिए मुफ्त कानूनी सहायता',
      tools: [
        {
          id: 'rti',
          icon: FileText,
          title: 'आरटीआई आवेदन',
          desc: 'सूचना का अधिकार अनुरोध जेनरेटर',
          color: 'text-[#1D3557]'
        },
        {
          id: 'writ',
          icon: Scale,
          title: 'रिट याचिका',
          desc: 'संवैधानिक उपाय याचिका मसौदा',
          color: 'text-[#E63946]'
        },
        {
          id: 'complaint',
          icon: AlertCircle,
          title: 'उपभोक्ता शिकायत',
          desc: 'उपभोक्ता अदालत शिकायत दर्ज करें',
          color: 'text-[#F77F00]'
        },
        {
          id: 'affidavit',
          icon: FileCheck,
          title: 'शपथपत्र',
          desc: 'शपथ पत्र दस्तावेज़ बनाएं',
          color: 'text-[#2A9D8F]'
        },
        {
          id: 'legal-advice',
          icon: HelpCircle,
          title: 'कानूनी सलाह',
          desc: 'बुनियादी कानूनी मार्गदर्शन प्राप्त करें',
          color: 'text-gray-700'
        }
      ],
      disclaimer: 'अस्वीकरण: ये उपकरण बुनियादी टेम्प्लेट प्रदान करते हैं। जटिल मामलों के लिए योग्य वकील से परामर्श करें।'
    }
  };

  const t = content[lang];

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {t.tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.id} hover onClick={() => onToolClick && onToolClick(tool.id)} className="text-center cursor-pointer group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className={`w-8 h-8 ${tool.color}`} strokeWidth={2} />
                </div>
                <h3 className="font-black text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-600">{tool.desc}</p>
              </Card>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-700">
            <strong className="text-gray-900">⚠️ {lang === 'en' ? 'Important' : 'महत्वपूर्ण'}:</strong> {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
