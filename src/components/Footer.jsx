export default function Footer({ t }) {
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
                <p className="text-xs text-gray-400">{t.footer?.tagline || 'Your Digital Civic Partner'}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t.footer?.desc || 'Empowering citizens through technology and community'}
            </p>
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
          <p className="text-xs text-gray-500">
            {t.footer?.rights || '© 2024 DIDI. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
