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
            onSchemeClick={(scheme) => {
              // Could open scheme detail modal
              console.log('Scheme clicked:', scheme);
            }}
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
    </div>
  );
}
