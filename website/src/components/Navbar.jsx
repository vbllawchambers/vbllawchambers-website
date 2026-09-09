import React, { useState } from 'react';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';

export default function Navbar({ currentPath, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/practice-areas', label: 'Practice Areas' },
    { path: '/attorneys', label: 'Attorneys' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const handleNavClick = (path) => {
    setIsOpen(false);
    onNavigate(path);
  };

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md text-white sticky top-0 z-50 border-b border-slate-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); handleNavClick('/'); }}
            className="flex items-center gap-3.5 hover:opacity-95 transition-opacity group"
          >
            <div className="flex-shrink-0">
              <img
                src="/vbl_logo.jpeg"
                alt="VBL Law Chambers Official Emblem"
                className="h-12 w-12 rounded-full object-cover border-2 border-amber-500/70 shadow-md ring-2 ring-amber-400/25 group-hover:ring-amber-400/60 group-hover:border-amber-400 transition-all"
              />
            </div>
            <div>
              <div className="text-xl font-serif tracking-wider font-bold text-white uppercase leading-tight group-hover:text-amber-300 transition-colors">
                VBL LAW CHAMBERS
              </div>
              <div className="text-xs text-amber-400 font-semibold tracking-wide flex items-center gap-1.5">
                <span>Advocates & Legal Consultants</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 font-normal">Est. 1999</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    active
                      ? 'text-amber-400 font-semibold bg-slate-800/80'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-1 inset-x-4 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </a>
              );
            })}

            <div className="ml-4 pl-4 border-l border-slate-800">
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }}
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-amber-500/30"
              >
                <span>Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-800/80 space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-amber-600/20 text-amber-400 font-semibold border-l-2 border-amber-500'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-3 px-2">
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }}
                className="block w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg text-sm text-center font-semibold transition-colors shadow-md"
              >
                Schedule Free Consultation
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
