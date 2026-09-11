import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ currentPath, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/practice-areas', label: 'Practice Areas' },
    { path: '/attorneys', label: 'Attorneys' },
    { path: '/will-submission', label: 'Will Drafting' },
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
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); handleNavClick('/'); }}
            className="flex items-center gap-3.5 hover:opacity-90 transition-opacity"
          >
            <img
              src="/vbl_logo.jpeg"
              alt="VBL Law Chambers Emblem"
              className="h-12 w-12 rounded-full object-cover border border-amber-500/50 shadow-md ring-2 ring-amber-400/20"
            />
            <div>
              <div className="text-xl tracking-tight font-bold text-white uppercase leading-tight">
                VBL LAW CHAMBERS
              </div>
              <div className="text-xs text-amber-500 font-semibold tracking-wide">
                Advocates &amp; Legal Consultants
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }}
                className={`text-sm font-medium hover:text-amber-400 transition-colors ${
                  isActive(item.path) ? 'text-amber-400 font-semibold' : 'text-slate-200'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }}
              className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2.5 rounded-md text-sm font-semibold transition-colors shadow-sm"
            >
              Free Consultation
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`md:hidden inline-flex items-center justify-center p-2.5 rounded-xl border transition-all duration-200 focus:outline-none active:scale-95 ${
              isOpen
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-sm'
                : 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:text-amber-400 hover:border-amber-500/40 hover:bg-slate-800'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }}
                className={`block px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive(item.path)
                    ? 'bg-amber-500/10 text-amber-400 font-semibold border-l-4 border-amber-500'
                    : 'text-slate-200 hover:bg-slate-800 hover:text-amber-400'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }}
                className="block w-full bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg text-sm text-center font-semibold transition-colors shadow-sm"
              >
                Free Consultation
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
