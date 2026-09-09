import React from 'react';
import { Shield, Lock, FileText, CheckCircle2, ExternalLink, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy({ onNavigate }) {
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
              Legal Document
            </span>
            <span className="text-slate-400 text-xs">
              Last Updated: March 2026
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            VBL Law Chambers is committed to safeguarding the privacy and confidentiality of our clients, website visitors, and platform users in accordance with applicable laws and Bar Council of India standards.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12 space-y-10 text-slate-700 leading-relaxed">
          
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. Introduction</h2>
            </div>
            <p className="mb-4">
              <strong>VBL Law Chambers</strong> ("we", "our", or "us"), founded in 1999 and headquartered in Kavali, SPSR Nellore District, Andhra Pradesh, operates the website <a href="https://www.vbllawchambers.com" className="text-amber-600 hover:underline font-medium">https://www.vbllawchambers.com</a> and its associated legal automation tools.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and protect personal information obtained through our website, communication forms, and connected service integrations. By using our website and services, you consent to the practices described in this policy.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. Information We Collect</h2>
            </div>
            <p className="mb-4">We collect information in the following categories:</p>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Information Provided Voluntarily:</strong> When you submit a consultation inquiry or contact form on our website, we may collect your name, email address, phone number, subject matter, and brief description of your legal query.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Technical & Analytics Data:</strong> Browser type, operating system, IP address, referring URLs, and general traffic patterns to maintain website functionality, security, and performance.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Authorized Automation Integration Data:</strong> For authorized internal legal team members publishing educational awareness content across verified social channels (such as YouTube, Meta, and Instagram).
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3: Google API & YouTube Disclosure */}
          <section className="bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. Google API Services & YouTube User Data Disclosure</h2>
            </div>
            <p className="mb-4 text-slate-700">
              Our automation infrastructure integrates with <strong>Google API Services</strong> (including YouTube Data API) to allow authorized firm administrators to schedule and publish legal awareness videos to our official YouTube channel (<a href="https://www.youtube.com/@vbllawchambers" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">@vbllawchambers</a>).
            </p>
            <div className="space-y-4 text-slate-700">
              <div className="p-4 bg-white rounded border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">Compliance with Google API Services User Data Policy:</h3>
                <p className="text-sm leading-relaxed mb-3">
                  VBL Law Chambers' use and transfer of information received from Google APIs adheres to the{' '}
                  <a
                    href="https://developers.google.com/terms/api-services-user-data-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    Google API Services User Data Policy <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  , including the Limited Use requirements.
                </p>
                <ul className="text-sm space-y-2 list-disc pl-5 text-slate-600">
                  <li><strong>Scope of Access:</strong> We strictly request only the minimum permissions necessary (such as uploading videos and managing scheduled uploads on the official VBL Law Chambers YouTube channel).</li>
                  <li><strong>No Sale or Marketing Transfer:</strong> We never sell, rent, or transfer Google user data to third parties, data brokers, or advertising networks.</li>
                  <li><strong>Internal Automated Execution Only:</strong> Google API credentials and tokens are stored securely in isolated, encrypted local storage for the sole purpose of scheduled video publication.</li>
                  <li><strong>User Control & Revocation:</strong> You can revoke access to your Google account at any time via the{' '}
                    <a
                      href="https://myaccount.google.com/permissions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      Google Security Settings <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    .
                  </li>
                  <li><strong>Google Privacy Policy:</strong> For more details regarding how Google collects and processes data, please view the{' '}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      Google Privacy Policy <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    .
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">4. How We Use Collected Information</h2>
            </div>
            <p className="mb-4">Information gathered through our portal is strictly utilized for:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Evaluating and responding to client consultation requests and legal inquiries.</li>
              <li>Providing professional legal consultation, advisory, and litigation representation once formally engaged.</li>
              <li>Administering and maintaining our website security and preventing fraudulent usage.</li>
              <li>Fulfilling legal, statutory, and regulatory compliance obligations in India.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">5. Advocate-Client Privilege & Confidentiality</h2>
            </div>
            <p>
              In accordance with the Indian Evidence Act and the professional standards codified by the Bar Council of India, all communications, documents, and disclosures shared with our advocates pursuant to legal representation are protected by professional privilege and treated with strict confidentiality.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">6. Data Security & Retention</h2>
            </div>
            <p className="mb-4">
              We employ industry-standard administrative, technical, and physical security measures (including HTTPS/TLS encryption and encrypted authentication storage) to protect information against unauthorized access, loss, or alteration.
            </p>
            <p>
              Personal information submitted via general inquiries is retained only as long as necessary to respond to your request or as required by applicable legal record-keeping standards.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">7. Your Rights</h2>
            </div>
            <p className="mb-4">
              You have the right to request access to, correction of, or deletion of personal information provided to us through the website. You may contact us at any time using the contact details below to exercise these rights.
            </p>
          </section>

          {/* Section 8 */}
          <section className="border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Contact Us</h2>
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy, please contact our chambers:
            </p>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-sm space-y-2">
              <p className="font-semibold text-slate-900">VBL Law Chambers</p>
              <p className="text-slate-600">Attn: Privacy & Legal Officer</p>
              <p className="text-slate-600">H. No. 72, Brndavanam Colony, Kavali, SPSR Nellore District, Andhra Pradesh - 524201, India</p>
              <p className="text-slate-600">
                Email:{' '}
                <a href="mailto:vbllawchambers@gmail.com" className="text-amber-600 hover:underline font-medium">
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
