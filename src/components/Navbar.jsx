'use client';

export default function Navbar({ lang, setLang, t, activeTab, setActiveTab, citizen }) {
  const languages = ['en', 'hi', 'cg'];
  
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
