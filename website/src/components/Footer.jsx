import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Mail, Shield, Scale, ArrowUpRight } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (onNavigate) onNavigate(path);
  };

  return (
    <footer className="bg-slate-950 text-white border-t-2 border-amber-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Social Media (4 cols) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3.5 mb-4">
              <img
                src="/vbl_logo.jpeg"
                alt="VBL Law Chambers Emblem"
                className="h-12 w-12 rounded-full object-cover border-2 border-amber-500/60 shadow-lg ring-2 ring-amber-400/20"
              />
              <div>
                <span className="text-xl font-serif font-bold tracking-wider text-white uppercase block leading-tight">
                  VBL LAW CHAMBERS
                </span>
                <span className="text-xs text-amber-400 font-semibold tracking-wide flex items-center gap-1.5">
                  <span>Advocates & Legal Consultants</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 font-normal">Est. 1999</span>
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Providing resolute courtroom advocacy, civil litigation, family mediation, and government authorized notary services for over two and a half decades in Andhra Pradesh.
            </p>
            
            {/* Social Media Links */}
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-3 flex items-center gap-2">
                <span>Official Social Media</span>
                <div className="h-px bg-slate-800 flex-grow" />
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://www.facebook.com/profile.php?id=61593945870418"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-amber-600 text-slate-300 hover:text-white p-2.5 rounded-lg transition-all shadow-sm flex items-center justify-center"
                  aria-label="Facebook"
                  title="Facebook - VBL Law Chambers"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/vbllawchambers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-amber-600 text-slate-300 hover:text-white p-2.5 rounded-lg transition-all shadow-sm flex items-center justify-center"
                  aria-label="Instagram"
                  title="Instagram - @vbllawchambers"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/@vbllawchambers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-amber-600 text-slate-300 hover:text-white p-2.5 rounded-lg transition-all shadow-sm flex items-center justify-center"
                  aria-label="YouTube"
                  title="YouTube - VBL Law Chambers"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://www.threads.net/@vbllawchambers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-amber-600 text-slate-300 hover:text-white p-2.5 rounded-lg transition-all shadow-sm flex items-center justify-center"
                  aria-label="Threads"
                  title="Threads - @vbllawchambers"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 192 192">
                    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4107 44.745 97.2616 44.745 97.1104 44.745C80.8931 44.745 68.3908 51.5204 60.2789 64.0847L75.3902 74.8398C81.1685 65.8863 90.0076 61.642 97.0957 61.642C97.1895 61.642 97.2833 61.642 97.377 61.6439C111.458 61.7335 119.789 71.4939 121.282 89.9675C114.773 87.5255 107.575 86.2081 99.8247 86.2081C69.3454 86.2081 48.7429 102.327 48.7429 126.111C48.7429 148.066 66.8687 162.745 89.9702 162.745C113.626 162.745 128.563 150.316 134.697 132.846C140.096 142.128 148.889 147.458 160.771 147.458C174.606 147.458 183.257 137.051 183.257 119.924C183.257 88.4239 159.206 63.8118 122.257 63.8118C82.5186 63.8118 55.4526 92.4287 55.4526 128.665C55.4526 167.351 84.4533 192 121.574 192C140.672 192 158.487 184.238 171.745 170.076L158.625 156.402C148.647 167.062 135.253 172.932 121.574 172.932C94.2185 172.932 73.5204 153.864 73.5204 128.665C73.5204 103.466 92.8547 82.8797 122.257 82.8797C149.378 82.8797 165.189 101.401 165.189 119.924C165.189 128.91 160.916 132.846 155.197 132.846C147.962 132.846 142.923 126.966 142.062 115.352C142.029 114.92 142.001 114.475 141.977 114.019C141.879 112.164 141.83 110.231 141.83 108.225C141.83 101.621 141.732 95.194 141.537 88.9883ZM122.756 112.569C122.22 125.753 115.659 135.289 102.392 135.289C91.134 135.289 82.8021 127.34 82.8021 116.149C82.8021 103.58 92.2036 96.1137 106.822 96.1137C112.443 96.1137 117.838 97.1706 122.756 99.2089V112.569Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <div className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 pb-1 border-b border-slate-800 flex items-center justify-between">
              <span>Navigation</span>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleNavClick(e, '/')}
                  className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleNavClick(e, '/about')}
                  className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a
                  href="/practice-areas"
                  onClick={(e) => handleNavClick(e, '/practice-areas')}
                  className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Practice Areas</span>
                </a>
              </li>
              <li>
                <a
                  href="/attorneys"
                  onClick={(e) => handleNavClick(e, '/attorneys')}
                  className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Advocate Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNavClick(e, '/contact')}
                  className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Practice Areas (3 cols) */}
          <div className="lg:col-span-3">
            <div className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 pb-1 border-b border-slate-800 flex items-center justify-between">
              <span>Key Practice Areas</span>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href="/practice-areas"
                  onClick={(e) => handleNavClick(e, '/practice-areas')}
                  className="hover:text-amber-400 transition-colors block"
                >
                  • Real Estate & Property Title Scrutiny
                </a>
              </li>
              <li>
                <a
                  href="/practice-areas"
                  onClick={(e) => handleNavClick(e, '/practice-areas')}
                  className="hover:text-amber-400 transition-colors block"
                >
                  • Family Law & Matrimonial Mediation
                </a>
              </li>
              <li>
                <a
                  href="/practice-areas"
                  onClick={(e) => handleNavClick(e, '/practice-areas')}
                  className="hover:text-amber-400 transition-colors block"
                >
                  • Registered Will Drafting & Succession
                </a>
              </li>
              <li>
                <a
                  href="/practice-areas"
                  onClick={(e) => handleNavClick(e, '/practice-areas')}
                  className="hover:text-amber-400 transition-colors block"
                >
                  • Government Authorized Notary Services
                </a>
              </li>
              <li>
                <a
                  href="/practice-areas"
                  onClick={(e) => handleNavClick(e, '/practice-areas')}
                  className="hover:text-amber-400 transition-colors block"
                >
                  • Civil & Commercial Litigation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Office Location (3 cols) */}
          <div className="lg:col-span-3">
            <div className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 pb-1 border-b border-slate-800 flex items-center justify-between">
              <span>Chambers Premises</span>
            </div>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-amber-500" />
                <span className="leading-relaxed">
                  H. No. 72, Brndavanam Colony,<br />
                  Kavali, SPSR Nellore Dist.,<br />
                  Andhra Pradesh - 524201
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 flex-shrink-0 text-amber-500" />
                <a href="mailto:vbllawchambers@gmail.com" className="hover:text-amber-400 transition-colors break-all">
                  vbllawchambers@gmail.com
                </a>
              </li>
              <li className="pt-2 border-t border-slate-800/80 text-xs text-amber-400/90 font-medium">
                Senior Civil Judge Court, Kavali • District Court, Nellore • AP High Court
              </li>
            </ul>
          </div>
        </div>

        {/* Bar Council of India Legal Notice Disclaimer */}
        <div className="pt-8 pb-4 border-b border-slate-800/60 text-xs text-slate-500 leading-relaxed text-center max-w-4xl mx-auto">
          <p>
            <strong>Disclaimer:</strong> As per the rules of the Bar Council of India, advocates are not permitted to solicit work or advertise in any manner. By accessing this website (www.vbllawchambers.com), you acknowledge that you are seeking information of your own accord and that there has been no advertisement, personal communication, or solicitation by VBL Law Chambers or its members.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} VBL Law Chambers. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Sole Counsel: Smt. V. Bhagya Lakshmi, B.Sc., B.L.</span>
            <span>•</span>
            <span>Kavali, Andhra Pradesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
