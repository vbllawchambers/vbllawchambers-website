import React from 'react';
import { Scale, AlertCircle, FileText, Globe, CheckCircle2, ArrowLeft, ExternalLink } from 'lucide-react';

export default function TermsOfService({ onNavigate }) {
  const handleNav = (path) => {
    if (onNavigate) onNavigate(path);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => handleNav('/')}
            className="inline-flex items-center gap-2 text-sm text-amber-500 hover:text-amber-400 font-medium mb-6 transition-colors cursor-pointer bg-transparent border-0 p-0"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
              Legal Terms
            </span>
            <span className="text-slate-400 text-xs">
              Last Updated: March 2026
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            Please review these terms governing the use of the VBL Law Chambers official website and related automation services.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12 space-y-10 text-slate-700 leading-relaxed">
          
          {/* Section 1: Bar Council of India Notice */}
          <section className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="w-6 h-6 text-amber-700 flex-shrink-0" />
              <h2 className="text-xl font-bold text-slate-900">Important Legal Notice & Bar Council of India Disclaimer</h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              As per the rules of the <strong>Bar Council of India</strong>, advocates are not permitted to solicit work or advertise in any manner. By visiting this website (<a href="https://www.vbllawchambers.com" className="text-amber-700 hover:underline font-medium">www.vbllawchambers.com</a>), you acknowledge and confirm that:
            </p>
            <ul className="text-sm space-y-2 text-slate-700 list-disc pl-5">
              <li>You are seeking information relating to VBL Law Chambers of your own accord and there has been no advertisement, personal communication, solicitation, invitation, or inducement of any sort whatsoever.</li>
              <li>The information provided under this website is solely available at your request for informational and educational purposes only and should not be interpreted as legal advice or solicitation.</li>
              <li>Browsing this website, downloading information, or submitting a contact form does not create an advocate-client relationship between you and VBL Law Chambers. An advocate-client relationship is only created upon formal mutual agreement and receipt of a signed Vakalatnama or engagement letter.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <Scale className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            </div>
            <p>
              By accessing and using this website, you agree to comply with and be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you should immediately discontinue use of this website.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. Intellectual Property Rights</h2>
            </div>
            <p className="mb-4">
              All content on this website, including but not limited to the VBL Law Chambers name, logo, emblem, design, layout, graphics, text, and educational legal articles, is the intellectual property of VBL Law Chambers and is protected under applicable copyright, trademark, and intellectual property laws of India.
            </p>
            <p>
              You may view and print content from this website for personal, non-commercial informational use only. Any unauthorized reproduction, redistribution, modification, or commercial exploitation is strictly prohibited without prior written permission.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. Third-Party Integrations & Services</h2>
            </div>
            <p className="mb-4">
              Our website and internal automation platform may connect with third-party platforms for educational outreach, scheduling, and awareness (including YouTube, Meta, and Instagram).
            </p>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>YouTube API Services:</strong> By accessing YouTube content or using connected services, users agree to be bound by the{' '}
                  <a
                    href="https://www.youtube.com/t/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    YouTube Terms of Service <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  {' '}and the{' '}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    Google Terms of Service <ExternalLink className="w-3.5 h-3.5" />
                  </a>.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>External Links:</strong> This website may provide links to external websites (such as official court portals, government gazettes, and legal databases). We do not control or endorse the content or practices of these external sites.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">4. Limitation of Liability</h2>
            </div>
            <p className="mb-4">
              While we strive to ensure that all information on this website is accurate and current, VBL Law Chambers makes no warranties, representations, or guarantees of any kind, express or implied, regarding the completeness, accuracy, or suitability of the information contained herein.
            </p>
            <p>
              In no event shall VBL Law Chambers, its partners, advocates, or associates be liable for any loss, injury, claim, liability, or damages of any kind resulting from the use of or reliance on information presented on this site.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <Scale className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">5. Governing Law & Jurisdiction</h2>
            </div>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with the use of this website shall be subject to the exclusive jurisdiction of the competent courts located in Kavali / SPSR Nellore District, Andhra Pradesh, India.
            </p>
          </section>

          {/* Section 7 */}
          <section className="border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Contact Information</h2>
            <p className="mb-4">
              For any questions regarding these Terms of Service, please contact:
            </p>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-sm space-y-2">
              <p className="font-semibold text-slate-900">VBL Law Chambers</p>
              <p className="text-slate-600">H. No. 72, Brndavanam Colony, Kavali, SPSR Nellore District, Andhra Pradesh - 524201, India</p>
              <p className="text-slate-600">
                Email:{' '}
                <a href="mailto:vbllawchambers@gmail.com" className="text-amber-700 hover:underline font-medium">
                  vbllawchambers@gmail.com
                </a>
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
