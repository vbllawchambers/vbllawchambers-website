import React, { useState } from 'react';
import { Scale, Menu, X } from 'lucide-react';

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
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); handleNavClick('/'); }}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="bg-amber-600 p-2.5 rounded-lg shadow-sm">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl tracking-tight font-bold text-white uppercase">VBL LAW CHAMBERS</div>
              <div className="text-xs text-amber-500 font-medium">Advocates & Legal Consultants</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }}
                className={`text-sm font-medium hover:text-amber-500 transition-colors ${
                  isActive(item.path) ? 'text-amber-500 font-semibold' : 'text-slate-200'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-md text-sm font-semibold transition-colors shadow-sm"
            >
              Free Consultation
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-white hover:text-amber-500 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }}
                className={`block py-3 text-sm hover:text-amber-500 transition-colors ${
                  isActive(item.path) ? 'text-amber-500 font-semibold' : 'text-slate-200'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }}
              className="block mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md text-sm text-center font-semibold transition-colors"
            >
              Free Consultation
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
