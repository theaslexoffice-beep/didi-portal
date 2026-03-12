import { Heart, Github, Twitter, Mail } from 'lucide-react';
import { LogoMark } from '../ui/Logo';

export default function Footer({ lang = 'en' }) {
  const content = {
    en: {
      tagline: 'Empowering citizens, building communities',
      madeWith: 'Made with',
      in: 'in Bilaspur',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      contact: 'Contact Us',
      copyright: '2024 DIDI Portal. All rights reserved.'
    },
    hi: {
      tagline: 'नागरिकों को सशक्त बनाना, समुदाय का निर्माण',
      madeWith: 'से बनाया गया',
      in: 'बिलासपुर में',
      privacy: 'गोपनीयता नीति',
      terms: 'सेवा की शर्तें',
      contact: 'संपर्क करें',
      copyright: '2024 DIDI पोर्टल। सर्वाधिकार सुरक्षित।'
    }
  };

  const t = content[lang];

  return (
    <footer className="bg-[#1D3557] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <LogoMark size={40} />
              <h2 className="text-2xl font-black">DIDI</h2>
            </div>
            <p className="text-gray-300 text-sm">{t.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">{lang === 'en' ? 'Quick Links' : 'त्वरित लिंक'}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'About Us' : 'हमारे बारे में'}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'How It Works' : 'यह कैसे काम करता है'}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'FAQ' : 'सामान्य प्रश्न'}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.contact}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">{lang === 'en' ? 'Legal' : 'कानूनी'}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">{t.privacy}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.terms}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Data Security' : 'डेटा सुरक्षा'}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Accessibility' : 'पहुंच'}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            {t.copyright}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Made with love */}
        <div className="text-center mt-6 text-sm text-gray-400 flex items-center justify-center gap-2">
          <span>{t.madeWith}</span>
          <Heart className="w-4 h-4 text-[#E63946] fill-current" />
          <span>{t.in}</span>
        </div>
      </div>
    </footer>
  );
}
