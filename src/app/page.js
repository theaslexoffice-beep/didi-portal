'use client';
import { useState } from 'react';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';

// Home Components
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import RecentIssues from '@/components/home/RecentIssues';
import QuickAccess from '@/components/home/QuickAccess';

// Issues Components
import IssuesList from '@/components/issues/IssuesList';
import ComplaintForm from '@/components/issues/ComplaintForm';

// Schemes Components
import SchemesList from '@/components/schemes/SchemesList';

// Legal Components
import LegalHub from '@/components/legal/LegalHub';

// Chat Component
import ChatBot from '@/components/chat/ChatBot';

// Auth Components
import LoginForm from '@/components/auth/LoginForm';

// Profile Component
import ProfilePage from '@/components/profile/ProfilePage';

// UI Components
import Modal from '@/components/ui/Modal';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState('en');
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Scroll to top on tab change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLoginModal(false);
    // Could also set to localStorage/cookies
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero lang={language} onTabChange={handleTabChange} />
            <HowItWorks lang={language} />
            <RecentIssues lang={language} onViewAll={() => handleTabChange('issues')} />
            <QuickAccess lang={language} onTabChange={handleTabChange} />
          </>
        );

      case 'issues':
        return (
          <IssuesList
            lang={language}
            onNewIssue={() => {
              if (!user) {
                setShowLoginModal(true);
              } else {
                setShowComplaintForm(true);
              }
            }}
            onIssueClick={(issue) => {
              // Could open issue detail modal
              console.log('Issue clicked:', issue);
            }}
          />
        );

      case 'schemes':
        return (
          <SchemesList
            lang={language}
            onSchemeClick={(scheme) => setSelectedScheme(scheme)}
          />
        );

      case 'legal':
        return (
          <LegalHub
            lang={language}
            onToolClick={(toolId) => {
              // Could open legal tool modal
              console.log('Legal tool clicked:', toolId);
            }}
          />
        );

      case 'chat':
        return <ChatBot lang={language} />;

      case 'profile':
        return user ? (
          <ProfilePage lang={language} user={user} />
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-600 mb-4">
              {language === 'en' ? 'Please login to view your profile' : 'अपनी प्रोफ़ाइल देखने के लिए कृपया लॉगिन करें'}
            </p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="btn-primary"
            >
              {language === 'en' ? 'Login' : 'लॉग इन'}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header
        onLanguageChange={setLanguage}
        currentLang={language}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      />

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer lang={language} />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        lang={language}
      />

      {/* Modals */}
      <Modal
        isOpen={showComplaintForm}
        onClose={() => setShowComplaintForm(false)}
        title={language === 'en' ? 'Report an Issue' : 'शिकायत दर्ज करें'}
        size="lg"
      >
        <ComplaintForm
          lang={language}
          onClose={() => setShowComplaintForm(false)}
          onSubmit={(data) => {
            console.log('Complaint submitted:', data);
            setShowComplaintForm(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        size="sm"
      >
        <LoginForm
          lang={language}
          onSuccess={handleLogin}
          onClose={() => setShowLoginModal(false)}
        />
      </Modal>

      {/* Scheme Detail Modal */}
      <Modal
        isOpen={!!selectedScheme}
        onClose={() => setSelectedScheme(null)}
        title={selectedScheme ? (language === 'hi' && selectedScheme.name_hi ? selectedScheme.name_hi : selectedScheme.name) : ''}
      >
        {selectedScheme && (
          <div className="space-y-5">
            {/* Ministry */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                {language === 'hi' ? 'मंत्रालय' : 'Ministry'}
              </p>
              <p className="text-sm text-gray-700">{selectedScheme.ministry}</p>
            </div>

            {/* Level */}
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                selectedScheme.level === 'central' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {selectedScheme.level === 'central' ? (language === 'hi' ? 'केंद्रीय योजना' : 'Central Scheme') : (language === 'hi' ? 'राज्य योजना (छ.ग.)' : 'State Scheme (CG)')}
              </span>
            </div>

            {/* Description */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                {language === 'hi' ? 'विवरण' : 'Description'}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {language === 'hi' && selectedScheme.description_hi ? selectedScheme.description_hi : selectedScheme.description}
              </p>
            </div>

            {/* Benefits */}
            {selectedScheme.benefits && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  {language === 'hi' ? 'लाभ' : 'Benefits'}
                </p>
                <p className="text-sm text-[#E63946] font-semibold leading-relaxed">{selectedScheme.benefits}</p>
              </div>
            )}

            {/* Eligibility */}
            {selectedScheme.eligibility && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  {language === 'hi' ? 'पात्रता' : 'Eligibility'}
                </p>
                {(() => {
                  try {
                    const elig = typeof selectedScheme.eligibility === 'string' 
                      ? JSON.parse(selectedScheme.eligibility) 
                      : selectedScheme.eligibility;
                    return (
                      <div className="text-sm text-gray-700 space-y-1">
                        {elig.age_min && <p>• Age: {elig.age_min}{elig.age_max ? ` - ${elig.age_max}` : '+'} years</p>}
                        {elig.income_max && <p>• Max Income: ₹{elig.income_max.toLocaleString('en-IN')}/year</p>}
                        {elig.gender && <p>• Gender: {elig.gender.join(', ')}</p>}
                        {elig.categories && <p>• Categories: {elig.categories.join(', ').toUpperCase()}</p>}
                        {elig.special_conditions && <p className="mt-2 text-gray-500 italic">Note: {elig.special_conditions}</p>}
                      </div>
                    );
                  } catch { return <p className="text-sm text-gray-500">Details available on application</p>; }
                })()}
              </div>
            )}

            {/* Documents Needed */}
            {selectedScheme.documents_needed && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  {language === 'hi' ? 'आवश्यक दस्तावेज' : 'Documents Needed'}
                </p>
                <p className="text-sm text-gray-700">{selectedScheme.documents_needed}</p>
              </div>
            )}

            {/* Apply Button */}
            {selectedScheme.apply_url && (
              <a
                href={selectedScheme.apply_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 bg-[#E63946] text-white font-semibold rounded-xl hover:bg-[#D62839] transition-all"
              >
                {language === 'hi' ? 'आवेदन करें →' : 'Apply Now →'}
              </a>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
