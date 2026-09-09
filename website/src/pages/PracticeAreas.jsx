import React from 'react';
import { Briefcase, Heart, Home as HomeIcon, FileText, Shield, Scale, Activity, FileCheck } from 'lucide-react';

export default function PracticeAreas({ onNavigate }) {
  const practiceAreas = [
    {
      icon: Briefcase,
      title: 'Corporate Law',
      description: 'Comprehensive legal services for businesses including formation, contracts, commercial agreements, and corporate compliance.',
      services: [
        'Business Formation & Structuring',
        'Contract Drafting & Negotiation',
        'Commercial Agreements & Partnerships',
        'Corporate Governance',
        'Compliance & Regulatory Matters',
      ],
    },
    {
      icon: Heart,
      title: 'Family Law',
      description: 'Compassionate and resolute legal guidance through sensitive family matters with a focus on protecting your interests.',
      services: [
        'Divorce & Separation Proceedings',
        'Child Custody & Maintenance Support',
        'Alimony & Spousal Support',
        'Family Property Settlement',
        'Prenuptial & Family Agreements',
      ],
    },
    {
      icon: HomeIcon,
      title: 'Real Estate & Property Law',
      description: 'Complete real estate legal counsel for residential, agricultural, and commercial property transactions in Kavali & Nellore.',
      services: [
        'Property Title Search & Examination',
        'Sale Deed Drafting & Registration',
        'Lease & Tenancy Agreements',
        'Land Revenue & Zoning Verification',
        'Property & Boundary Disputes',
      ],
    },
    {
      icon: FileText,
      title: 'Estate Planning & Will Drafting',
      description: 'Comprehensive estate planning services to protect your assets and ensure your family succession wishes are honored.',
      services: [
        'Will Drafting & Testamentary Deeds',
        'Power of Attorney (General & Special)',
        'Trust Creation & Settlement Deeds',
        'Probate & Estate Administration',
        'Asset Protection & Succession Planning',
      ],
    },
    {
      icon: Shield,
      title: 'Criminal Defense',
      description: 'Aggressive defense for clients facing criminal charges before magistrate, sessions, and appellate courts.',
      services: [
        'Bail & Anticipatory Bail Petitions',
        'Cheque Bounce (Sec 138 NI Act)',
        'White Collar Offenses',
        'Trial Advocacy & Cross-Examination',
        'Criminal Appeals & Revisions',
      ],
    },
    {
      icon: Scale,
      title: 'Civil & Commercial Litigation',
      description: 'Strategic court representation in complex civil disputes, money recovery, and contractual litigation.',
      services: [
        'Money Recovery Suits',
        'Injunctions & Specific Performance',
        'Partition Suits',
        'Execution Proceedings',
        'Appeals & Writ Petitions',
      ],
    },
    {
      icon: Activity,
      title: 'Personal Injury & Motor Accidents',
      description: 'Fighting for rightful compensation for victims of motor accidents, negligence, and liability claims.',
      services: [
        'Motor Accident Claims Tribunal (MACT)',
        'Accident Compensation Claims',
        'Insurance Claim Settlement',
        'Negligence & Liability Representation',
        'Tribunal Appeals',
      ],
    },
    {
      icon: FileCheck,
      title: 'Notary & Legal Documentation',
      description: 'Official notary public and documentation services by authorized advocate & notary.',
      services: [
        'Affidavit Attestation & Verification',
        'Certified True Copies & Notarization',
        'Sworn Declarations & Undertakings',
        'Agreement Drafting & Execution',
        'Legal Opinion & Verification Reports',
      ],
    },
  ];

  const handleNavigate = (path) => {
    if (onNavigate) onNavigate(path);
  };

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl mb-4 font-bold tracking-tight">Practice Areas</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            We offer comprehensive legal services across multiple practice areas to meet all your legal needs.
          </p>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practiceAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-amber-100 w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl mb-2 font-semibold text-slate-900">{area.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{area.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <h4 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-3">
                      Services Include:
                    </h4>
                    <ul className="space-y-2">
                      {area.services.map((service, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="text-amber-600 font-bold mt-0.5">•</span>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
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
          <h2 className="text-4xl mb-4 font-bold text-slate-900">Need Legal Assistance?</h2>
          <p className="text-xl text-slate-600 mb-8">
            Don't see your specific legal need listed? Contact us to discuss how we can help.
          </p>
          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded text-lg font-medium transition-colors"
          >
            Schedule a Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
