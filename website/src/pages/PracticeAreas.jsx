import React, { useState } from 'react';
import { Briefcase, Heart, Home as HomeIcon, FileText, Shield, Scale, Activity, FileCheck, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';

export default function PracticeAreas({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const whatsappUrl = "https://api.whatsapp.com/send?phone=919876543210&text=Hello%20VBL%20Law%20Chambers,%20I%20would%20like%20to%20inquire%20about%20your%20legal%20services.";

  const categories = [
    { id: 'all', label: 'All Practice Areas' },
    { id: 'property', label: 'Property & Real Estate' },
    { id: 'family', label: 'Family & Matrimonial' },
    { id: 'notary', label: 'Notary & Wills' },
    { id: 'litigation', label: 'Civil & Corporate' },
    { id: 'criminal', label: 'Criminal Defense' },
  ];

  const practiceAreas = [
    {
      category: 'litigation',
      icon: Briefcase,
      title: 'Corporate & Commercial Law',
      description: 'Comprehensive legal services for businesses including formation, contracts, commercial agreements, and corporate compliance.',
      services: [
        'Business Formation & Partnership Deeds',
        'Commercial Contract Drafting & Review',
        'Vendor & Franchise Agreements',
        'Corporate Dispute Mediation',
        'Statutory Compliance & Registrations',
      ],
    },
    {
      category: 'family',
      icon: Heart,
      title: 'Family Law & Matrimonial Matters',
      description: 'Compassionate and resolute legal guidance through sensitive family matters with a focus on protecting your interests.',
      services: [
        'Divorce & Judicial Separation Proceedings',
        'Child Custody & Maintenance Petitions',
        'Alimony & Spousal Support Claims',
        'Family Property Settlement Deeds',
        'Mutual Consent Dispute Mediation',
      ],
    },
    {
      category: 'property',
      icon: HomeIcon,
      title: 'Real Estate & Property Law',
      description: 'Complete real estate legal counsel for residential, agricultural, and commercial property transactions in Kavali & Nellore.',
      services: [
        'Property Title Search & 30-Year Encumbrance Scrutiny',
        'Sale Deed Drafting & Registration Assistance',
        'Lease, Tenancy & Mortgage Deeds',
        'Pattadar Passbook & Land Revenue Inquiries',
        'Property Partition & Boundary Suits',
      ],
    },
    {
      category: 'notary',
      icon: FileText,
      title: 'Will Drafting & Estate Planning',
      description: 'Comprehensive succession and estate planning to safeguard your assets and ensure your family wishes are honored.',
      services: [
        'Registered Will Drafting & Testamentary Codicils',
        'General & Special Power of Attorney (GPA / SPA)',
        'Family Trust Deeds & Gift Settlements',
        'Probate & Succession Certificate Petitions',
        'Asset Succession & Partition Agreements',
      ],
    },
    {
      category: 'criminal',
      icon: Shield,
      title: 'Criminal Defense & Trial Advocacy',
      description: 'Aggressive defense for clients facing criminal charges before magistrate, sessions, and appellate courts.',
      services: [
        'Regular Bail & Anticipatory Bail Petitions',
        'Negotiable Instruments Act (Sec 138 Cheque Bounce)',
        'Trial Advocacy, Evidence & Cross-Examination',
        'IPC / Bharatiya Nyaya Sanhita Defense',
        'Criminal Appeals & Revision Applications',
      ],
    },
    {
      category: 'litigation',
      icon: Scale,
      title: 'Civil & Commercial Litigation',
      description: 'Strategic court representation in complex civil disputes, recovery suits, and contractual enforcement.',
      services: [
        'Money Recovery Suits & Promissory Notes',
        'Permanent & Temporary Injunctions',
        'Specific Performance of Contracts',
        'Civil Appeals & Execution Petitions',
        'Arbitration & Lok Adalat Conciliation',
      ],
    },
    {
      category: 'litigation',
      icon: Activity,
      title: 'Motor Accident Claims (MACT)',
      description: 'Fighting for rightful compensation for victims of motor vehicle accidents, injury, and dependency claims.',
      services: [
        'MACT Original Petitions & Claim Filings',
        'Accident Compensation Quantification',
        'Insurance Company Settlement Defense',
        'Death & Permanent Disability Claims',
        'High Court MACT Appellate Petitions',
      ],
    },
    {
      category: 'notary',
      icon: FileCheck,
      title: 'Government Authorized Notary Services',
      description: 'Official statutory notary public and legal documentation services by authorized Advocate & Notary.',
      services: [
        'Affidavit Attestation & Verification',
        'Certified True Copies & Notarization Stamps',
        'Sworn Declarations & Indemnity Bonds',
        'Commercial Agreement Attestation',
        'Notary Legal Opinion & Verification Certificates',
      ],
    },
  ];

  const filteredAreas = activeCategory === 'all'
    ? practiceAreas
    : practiceAreas.filter((a) => a.category === activeCategory);

  const handleNavigate = (path) => {
    if (onNavigate) onNavigate(path);
  };

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm">
            <span>Comprehensive Legal Spectrum</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-4">
            Practice Areas & Legal Services
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-light">
            Providing assertive courtroom advocacy, property title scrutiny, matrimonial mediation, and government authorized notary services across Kavali, Nellore, and Andhra Pradesh courts.
          </p>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="bg-white/95 backdrop-blur-md py-6 border-b border-slate-200 sticky top-20 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                  activeCategory === cat.id
                    ? 'bg-amber-600 text-white border-amber-600 shadow-md scale-105'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-amber-400 hover:text-amber-700 hover:bg-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="card-luxury p-8 sm:p-10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-amber-700 shadow-xs">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1.5">
                          {area.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          {area.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-slate-100">
                      <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3.5">
                        Scope of Services & Representation:
                      </h4>
                      <ul className="space-y-2.5">
                        {area.services.map((service, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span className="text-xs text-slate-500 font-medium">
                        Senior Counsel: Smt. V. Bhagya Lakshmi
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition-colors border border-emerald-200"
                        title="Inquire about this practice on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href="/contact"
                        onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
                      >
                        <span>Book Consult</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Need Legal Assistance CTA */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            Direct Chamber Access
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-4">
            Need Guidance on a Specific Legal Matter?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Every legal challenge requires a tailored strategy. Contact our chambers in Kavali to consult directly with senior advocate Smt. V. Bhagya Lakshmi.
          </p>
          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Schedule a Confidential Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
