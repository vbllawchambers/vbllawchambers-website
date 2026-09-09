import React from 'react';
import { Scale, Facebook, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (onNavigate) onNavigate(path);
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-amber-600 p-2 rounded">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight">Sterling & Associates</span>
            </div>
            <p className="text-slate-400 text-sm">
              Providing exceptional legal services with integrity, dedication, and expertise for over 30 years.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleNavClick(e, '/')}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleNavClick(e, '/about')}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/practice-areas"
                  onClick={(e) => handleNavClick(e, '/practice-areas')}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  Practice Areas
                </a>
              </li>
              <li>
                <a
                  href="/attorneys"
                  onClick={(e) => handleNavClick(e, '/attorneys')}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  Our Attorneys
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNavClick(e, '/contact')}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Practice Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Practice Areas</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a
                  href="/practice-areas"
                  onClick={(e) => handleNavClick(e, '/practice-areas')}
                  className="hover:text-amber-500 transition-colors"
                >
                  Corporate Law
                </a>
              </li>
              <li>
                <a
                  href="/practice-areas"
                  onClick={(e) => handleNavClick(e, '/practice-areas')}
                  className="hover:text-amber-500 transition-colors"
                >
                  Criminal Defense
                </a>
              </li>
              <li>
                <a
                  href="/practice-areas"
                  onClick={(e) => handleNavClick(e, '/practice-areas')}
                  className="hover:text-amber-500 transition-colors"
                >
                  Family Law
                </a>
              </li>
              <li>
                <a
                  href="/practice-areas"
                  onClick={(e) => handleNavClick(e, '/practice-areas')}
                  className="hover:text-amber-500 transition-colors"
                >
                  Real Estate
                </a>
              </li>
              <li>
                <a
                  href="/practice-areas"
                  onClick={(e) => handleNavClick(e, '/practice-areas')}
                  className="hover:text-amber-500 transition-colors"
                >
                  Personal Injury
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-amber-500" />
                <span>
                  123 Legal Avenue, Suite 500<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-amber-500" />
                <a href="tel:5551234567" className="hover:text-amber-500 transition-colors">(555) 123-4567</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-amber-500" />
                <a href="mailto:info@sterlinglaw.com" className="hover:text-amber-500 transition-colors">info@sterlinglaw.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>© {currentYear} Sterling & Associates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
