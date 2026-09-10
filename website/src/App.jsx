import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PracticeAreas from './pages/PracticeAreas';
import Attorneys from './pages/Attorneys';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const getInitialPath = () => {
    const pathname = window.location.pathname;
    if (['/about', '/practice-areas', '/attorneys', '/contact', '/privacy-policy', '/terms-of-service'].includes(pathname)) {
      return pathname;
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getInitialPath());
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/about':
        return <About onNavigate={navigateTo} />;
      case '/practice-areas':
        return <PracticeAreas onNavigate={navigateTo} />;
      case '/attorneys':
        return <Attorneys onNavigate={navigateTo} />;
      case '/contact':
        return <Contact onNavigate={navigateTo} />;
      case '/privacy-policy':
        return <PrivacyPolicy onNavigate={navigateTo} />;
      case '/terms-of-service':
        return <TermsOfService onNavigate={navigateTo} />;
      case '/':
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={navigateTo} />
      <Analytics />
    </div>
  );
}
