import React, { useState } from 'react';
import { Briefcase, Heart, Home as HomeIcon, FileText, Shield, Scale, Activity, FileCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PracticeAreas({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('all');

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
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Practice Spectrum
          </div>
          <h1 className="text-5xl mb-4 font-bold tracking-tight">Our Legal Practice Areas</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Providing comprehensive litigation, counsel, and notary services across Kavali, Nellore, and Andhra Pradesh courts.
          </p>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="bg-slate-50 py-8 border-b border-slate-200 sticky top-20 z-40 backdrop-blur-md bg-slate-50/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer border ${
                  activeCategory === cat.id
                    ? 'bg-amber-600 text-white border-amber-600 shadow-md scale-105'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-amber-500 hover:text-amber-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-amber-500/50"
                >
                  <div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-amber-100 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-7 h-7 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl mb-2 font-bold text-slate-900">{area.title}</h3>
                        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{area.description}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
                        Services & Representation:
                      </h4>
                      <ul className="space-y-2.5">
                        {area.services.map((service, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium">Chambers Lead: Smt. V. Bhagya Lakshmi</span>
                    <a
                      href="/contact"
                      onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
                      className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-amber-700 gap-1"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Need Legal Assistance CTA */}
      <section className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4 font-bold text-slate-900">Need Guidance on a Specific Legal Matter?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Every legal challenge requires a tailored strategy. Contact our chambers in Kavali to consult directly with senior advocate Smt. V. Bhagya Lakshmi.
          </p>
          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
          >
            Schedule a Confidential Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
