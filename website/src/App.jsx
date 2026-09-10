import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PracticeAreas from './pages/PracticeAreas';
import Attorneys from './pages/Attorneys';
import Contact from './pages/Contact';
import WillSubmission from './pages/WillSubmission';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const ROUTE_METADATA = {
  '/': {
    title: 'Will Drafting Advocate in Kavali | VBL Law Chambers',
    description: 'VBL Law Chambers, Kavali — 25+ years of legal practice in will drafting, estate planning, property law and notary services across Kavali, Nellore, Kandukur and Singarayakonda.',
  },
  '/about': {
    title: 'About Us | VBL Law Chambers — 25+ Years Legal Practice Kavali',
    description: 'Founded in 1999, VBL Law Chambers provides dedicated legal advocacy, property scrutiny, and notary services in Kavali, SPSR Nellore District, Andhra Pradesh.',
  },
  '/practice-areas': {
    title: 'Legal Practice Areas | VBL Law Chambers | Kavali, Nellore',
    description: 'Comprehensive legal services in Civil, Criminal, Family Law, Will Drafting, Property Verification, Motor Accident Claims (MACT), and Notary Attestations.',
  },
  '/attorneys': {
    title: 'Our Advocates & Legal Team | VBL Law Chambers | Kavali',
    description: 'Led by Advocate & Notary Smt. V. Bhagya Lakshmi (B.Sc., B.L.) with 25+ years courtroom experience across Nellore district and High Court of Andhra Pradesh.',
  },
  '/will-submission': {
    title: 'Online Will Submission & Testamentary Planning | VBL Law Chambers',
    description: 'Confidential online will submission, testament scrutiny, codicil drafting, and estate planning with authorized Advocates & Notaries in Kavali, AP.',
  },
  '/contact': {
    title: 'Contact VBL Law Chambers | Kavali, SPSR Nellore District',
    description: 'Schedule a confidential legal consultation with VBL Law Chambers at Brndavanam Colony, Kavali, SPSR Nellore Dist., Andhra Pradesh.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | VBL Law Chambers',
    description: 'Official privacy policy and Google API Services User Data disclosure for VBL Law Chambers website and automation workflows.',
  },
  '/terms-of-service': {
    title: 'Terms of Service & Disclaimer | VBL Law Chambers',
    description: 'Terms of service and Bar Council of India disclaimer governing information and consultations at VBL Law Chambers.',
  },
};

export default function App() {
  const getInitialPath = () => {
    const pathname = window.location.pathname;
    if (['/about', '/practice-areas', '/attorneys', '/contact', '/will-submission', '/privacy-policy', '/terms-of-service'].includes(pathname)) {
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

  // Synchronize document title and description meta per route
  useEffect(() => {
    const meta = ROUTE_METADATA[currentPath] || ROUTE_METADATA['/'];
    if (meta) {
      document.title = meta.title;
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) {
        descTag.setAttribute('content', meta.description);
      }
      const canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) {
        canonicalTag.setAttribute('href', `https://vbllawchambers.com${currentPath === '/' ? '' : currentPath}`);
      }
    }
  }, [currentPath]);

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
      case '/will-submission':
        return <WillSubmission onNavigate={navigateTo} />;
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
      <SpeedInsights />
    </div>
  );
}
