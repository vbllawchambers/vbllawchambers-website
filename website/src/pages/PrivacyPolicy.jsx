import React from 'react';
import { Shield, Lock, FileText, CheckCircle2, ExternalLink, ArrowLeft, AlertCircle } from 'lucide-react';

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
              Legal Document &amp; OAuth Compliance
            </span>
            <span className="text-slate-400 text-xs">
              Last Updated: March 2026
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            VBL Law Chambers &amp; VBL Automation Platform | Complete disclosures regarding data collection, protection, and Google API Services User Data Policy compliance.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12 space-y-10 text-slate-700 leading-relaxed">
          
          {/* Section 1: Application Identity */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. Application Identity &amp; Developer Details</h2>
            </div>
            <p className="mb-4">
              This Privacy Policy applies to the application registered under Google Cloud Platform as <strong>VBL Law Chambers</strong> (also operating as <strong>VBL Automation</strong>, <strong>VBL Advocate Social Automation</strong>, or <strong>Advocate Social Automation Platform</strong>), hereafter referred to as the <strong>"Application"</strong> or <strong>"App"</strong>.
            </p>
            <ul className="space-y-2 list-disc pl-5 text-slate-700">
              <li><strong>Organization / Entity Name:</strong> VBL Law Chambers (Founded in 1999)</li>
              <li><strong>Developer / Technical Contact:</strong> CS Hari Krishna / VBL Law Chambers Engineering</li>
              <li><strong>Official Application Homepage:</strong> <a href="https://vbllawchambers.com" className="text-amber-600 hover:underline font-medium">https://vbllawchambers.com</a></li>
              <li><strong>Office Address:</strong> H. No. 72, Brndavanam Colony, Kavali, SPSR Nellore District, Andhra Pradesh - 524201, India</li>
              <li><strong>Official Contact Email:</strong> <a href="mailto:vbllawchambers@gmail.com" className="text-amber-600 hover:underline font-medium">vbllawchambers@gmail.com</a></li>
            </ul>
          </section>

          {/* Section 2: Data Collection */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. Categories of Data We Access and Collect</h2>
            </div>
            <p className="mb-4">
              Our application accesses data that you provide directly to us or authorize through third-party APIs. We collect, or process on behalf of our users, the following categories of personal data when you use or interact with our products and services:
            </p>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Direct Consultation Data:</strong> Name, cell phone number, email address, practice area, and case descriptions submitted voluntarily via our client inquiry form.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Technical Website Data:</strong> IP address, browser type, referring pages, device characteristics, and timestamps to maintain site security, prevent abuse, and optimize server performance.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Google User Data Accessed by the Application:</strong> When authenticating via Google OAuth 2.0, our application accesses your Google user identifier, email address associated with your Google account, YouTube channel name/ID, and video upload metadata.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3: Google API & YouTube User Data Disclosure */}
          <section className="bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. Google API Services &amp; YouTube User Data Disclosures</h2>
            </div>
            
            <p className="text-slate-700">
              Our application integrates with <strong>Google API Services</strong> (specifically the <strong>YouTube Data API v3</strong>, scopes <code>https://www.googleapis.com/auth/youtube.upload</code> and <code>https://www.googleapis.com/auth/youtube</code>) to facilitate authorized publishing, scheduling, and management of legal awareness videos on our official channel (<a href="https://www.youtube.com/@vbllawchambers" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">@vbllawchambers</a>).
            </p>

            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r text-amber-900 font-medium text-sm leading-relaxed">
              VBL Law Chambers' use and transfer of information received from Google APIs to any other app will adhere to the{' '}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-800 underline inline-flex items-center gap-1 font-bold"
              >
                Google API Services User Data Policy <ExternalLink className="w-3.5 h-3.5" />
              </a>
              , including the Limited Use requirements.
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">A. How We Use Google User Data</h3>
              <p className="text-sm text-slate-700">
                We will use your data strictly to provide you with the services you requested, such as uploading, scheduling, and publishing educational legal awareness videos to YouTube on your behalf.
              </p>

              <h3 className="text-lg font-bold text-slate-900">B. Sharing, Transfer, and Disclosure of Google User Data</h3>
              <p className="text-sm font-semibold text-slate-800">
                We do not transfer or disclose your information to third parties for purposes other than the ones provided.
              </p>
              <ul className="text-sm space-y-1 list-disc pl-5 text-slate-600">
                <li>We will not sell your data to third parties, data brokers, or information resellers under any circumstances.</li>
                <li>We do not share, sell, or disclose Google user data to advertising networks or marketing intermediaries.</li>
                <li>Google user data is utilized solely within our dedicated internal workflow instance to execute the explicit actions requested by the account administrator.</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-900">C. Affirmation of Prohibited Uses &amp; AI/ML Restrictions</h3>
              <ul className="text-sm space-y-2 list-disc pl-5 text-slate-600">
                <li>Google user data is <strong>NEVER</strong> used for targeted advertising, personalized advertisements, retargeted advertisements, user advertisements, or interest-based advertisements.</li>
                <li>Google user data is <strong>NEVER</strong> used for determining credit-worthiness or for lending purposes.</li>
                <li>Google user data is <strong>NEVER</strong> sold to data brokers or provided to information resellers.</li>
                <li><strong>AI/ML Prohibitions:</strong> Our application affirms that Google user data and Google Workspace APIs are <strong>NOT</strong> used to develop, improve, or train generalized or non-personalized artificial intelligence (AI) and/or machine learning (ML) models.</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Data Protection */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">4. Data Protection Mechanisms for Sensitive Data</h2>
            </div>
            <p className="mb-4">
              Security procedures are in place to protect the confidentiality of your data:
            </p>
            <ul className="space-y-2 list-disc pl-5 text-slate-700">
              <li><strong>We use encryption to protect your information:</strong> All data in transit is encrypted using industry-standard SSL/TLS 256-bit cryptographic protocols (HTTPS).</li>
              <li><strong>Encrypted Credential Storage:</strong> OAuth 2.0 access tokens, refresh tokens, and client secrets are stored in encrypted, isolated environments using AES-256 encryption at rest.</li>
              <li><strong>Access Controls:</strong> Administrative access is restricted to verified personnel via multi-factor authentication (MFA) and strict role-based access controls.</li>
            </ul>
          </section>

          {/* Section 5: Data Retention & Deletion */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">5. Data Retention and Deletion Policy</h2>
            </div>
            <p className="mb-4">
              We store your personal information for a period of time that is consistent with our business purposes. We will retain your personal information for the length of time needed to fulfill the purposes outlined in this privacy policy unless a longer retention period is required or permitted by law.
            </p>
            <ul className="space-y-2 list-disc pl-5 text-slate-700">
              <li><strong>Automatic Deletion:</strong> When the data retention period expires for a given type of data, we will securely delete or destroy it.</li>
              <li><strong>User-Initiated Deletion:</strong> You may request for your data to be deleted at any time by emailing us at <a href="mailto:vbllawchambers@gmail.com" className="text-amber-600 hover:underline">vbllawchambers@gmail.com</a>. Upon receipt of your request, all associated OAuth credentials, tokens, and personal records will be permanently purged from our servers within 48 hours.</li>
              <li><strong>Immediate Revocation via Google:</strong> You can revoke the application's access to your Google account at any moment through <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Google Security Settings (Third-party apps with account access)</a>. Revoking access invalidates all active OAuth tokens immediately.</li>
            </ul>
          </section>

          {/* Section 6: Advocate-Client Privilege */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">6. Advocate-Client Privilege &amp; Professional Secrecy</h2>
            </div>
            <p>
              In accordance with the Indian Evidence Act, 1872, and the statutory ethics governed by the <strong>Bar Council of India</strong>, all privileged information, documents, and discussions shared with our advocates pursuant to professional legal representation are protected by attorney-client privilege and treated with absolute confidentiality.
            </p>
          </section>

          {/* Section 7: Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Third-Party Service Providers</h2>
            <p className="mb-3">
              For further details regarding the privacy and data practices of third-party platforms utilized by our workflows, please review their respective policies:
            </p>
            <ul className="space-y-1 list-disc pl-5 text-slate-700">
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Google Privacy Policy</a></li>
              <li><a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">YouTube Terms of Service</a></li>
            </ul>
          </section>

          {/* Section 8: Contact */}
          <section className="border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Contact &amp; Grievance Redressal</h2>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-sm space-y-2">
              <p className="font-semibold text-slate-900">VBL Law Chambers</p>
              <p className="text-slate-600">Attn: Privacy &amp; Data Protection Officer (CS Hari Krishna)</p>
              <p className="text-slate-600">H. No. 72, Brndavanam Colony, Kavali, SPSR Nellore District, Andhra Pradesh - 524201, India</p>
              <p className="text-slate-600">
                Email: <a href="mailto:vbllawchambers@gmail.com" className="text-amber-600 hover:underline font-medium">vbllawchambers@gmail.com</a>
              </p>
              <p className="text-slate-600">
                Official Website: <a href="https://vbllawchambers.com" className="text-amber-600 hover:underline font-medium">https://vbllawchambers.com</a>
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
