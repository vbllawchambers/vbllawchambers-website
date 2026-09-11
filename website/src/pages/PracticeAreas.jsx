import React from 'react';
import { Briefcase, Heart, Home as HomeIcon, FileText, Scale, FileCheck, Building2, FileSignature, ShieldCheck, ScrollText } from 'lucide-react';

export default function PracticeAreas({ onNavigate }) {
  const practiceAreas = [
    {
      icon: FileCheck,
      title: 'Legal Clearance of Property Documents',
      description: 'Comprehensive 30-year title verification, link document scrutiny, revenue verification, and official legal clearance reports for property buyers and investors.',
      services: [
        '30-Year Title Search & Chain Link Verification',
        'Encumbrance Certificate (EC) In-Depth Scrutiny',
        'Revenue Records Verification (1-B Namuna, Adangal & Pattadar)',
        'Sub-Registrar Office Record Verification & Scrutiny',
        'Legal Clearance Reports for Bank Loans & Property Purchases',
      ],
    },
    {
      icon: FileSignature,
      title: 'General Power of Attorney (GPA)',
      description: 'Preparation, notarization, and registration of General and Special Power of Attorney instruments for property management, transactions, and representation.',
      services: [
        'General Power of Attorney (GPA) Drafting & Execution',
        'Special Power of Attorney (SPA) for Specific Property / Court Acts',
        'NRI Power of Attorney Attestation & Authentication',
        'GPA Revocation, Cancellation Deeds & Public Notices',
        'Sub-Registrar Office Registration & Record Authentication',
      ],
    },
    {
      icon: Building2,
      title: 'Development Agreements',
      description: 'Strategic legal drafting and negotiation for joint development agreements (JDA), landowner-builder partnerships, and real estate project documentation.',
      services: [
        'Joint Development Agreements (JDA) Drafting & Vetting',
        'Landowner & Builder Revenue / Area Sharing Contracts',
        'Layout Approvals & Regulatory Compliance Advisory',
        'Construction Handover & Milestone Verification Clauses',
        'Breach Remedies, Penalty Clauses & Dispute Resolution',
      ],
    },
    {
      icon: ScrollText,
      title: 'Terms and Services',
      description: 'Drafting and vetting of commercial terms of service, master service agreements, and operational legal documentation for businesses and service providers.',
      services: [
        'Commercial Terms of Service (ToS) & User Policies',
        'Master Service Agreements (MSA) & Client Contracts',
        'Vendor & Supplier Service Level Agreements (SLA)',
        'Non-Disclosure & Confidentiality Agreements (NDA)',
        'Limitation of Liability & Indemnity Provision Drafting',
      ],
    },
    {
      icon: HomeIcon,
      title: 'Real Estate & Property Law',
      description: 'Complete real estate legal counsel for residential, agricultural, and commercial property transactions in Kavali, Nellore, and surrounding regions.',
      services: [
        'Sale Deed Drafting & Registration Assistance',
        'Gift Deeds, Settlement Deeds & Release Deeds',
        'Commercial & Residential Lease Agreements',
        'Agricultural Land & Layout Conversion Guidance',
        'Property & Boundary Dispute Advisory',
      ],
    },
    {
      icon: FileText,
      title: 'Estate Planning & Will Drafting',
      description: 'Comprehensive estate planning services to safeguard your legacy and ensure your testamentary succession intentions are legally unimpeachable.',
      services: [
        'Will Drafting & Codicil Preparation',
        'Testamentary Trust Deeds & Family Settlements',
        'Probate & Succession Certificate Assistance',
        'Legal Heir Succession Advisory',
        'Asset Protection & Estate Administration',
      ],
    },
    {
      icon: Heart,
      title: 'Family Law',
      description: 'Compassionate and resolute legal guidance through family matters, property settlements, and matrimonial dispute resolution.',
      services: [
        'Amicable Family Property Settlement Deeds',
        'Mutual Consent Divorce & Separation Proceedings',
        'Child Custody & Maintenance Agreements',
        'Spousal Support & Alimony Legal Guidance',
        'Family Mediation & Dispute Counseling',
      ],
    },
    {
      icon: Scale,
      title: 'Civil & Commercial Litigation',
      description: 'Strategic court representation in civil disputes, injunction proceedings, money recovery, and contractual enforcement.',
      services: [
        'Money Recovery Suits & Summary Suits',
        'Injunctions & Specific Performance of Contracts',
        'Partition Suits & Declaration of Title',
        'Execution Petitions & Decree Enforcement',
        'Civil Appeals & Revisions',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'Notary & Legal Documentation',
      description: 'Official notary public services and statutory document execution by Smt. V. Bhagya Lakshmi, authorized Advocate & Notary.',
      services: [
        'Affidavit Attestation & Sworn Declarations',
        'Certified True Copies & Official Notarization',
        'Indemnity Bonds & Legal Undertakings',
        'Attestation of Documents for Official Submissions',
        'Notary Register Entries & Verification Seals',
      ],
    },
    {
      icon: Briefcase,
      title: 'Corporate Law',
      description: 'Comprehensive legal advisory for enterprises, commercial partnerships, corporate compliance, and commercial agreements.',
      services: [
        'Business Formation & Legal Structuring',
        'Partnership Deeds & LLP Agreements',
        'Commercial Contract Drafting & Review',
        'Corporate Compliance & Regulatory Advisory',
        'Commercial Dispute Negotiation',
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
            We offer comprehensive legal services across civil documentation, property title clearance, development agreements, and testamentary planning.
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
                      <h2 className="text-2xl mb-2 font-semibold text-slate-900">{area.title}</h2>
                      <p className="text-slate-600 leading-relaxed">{area.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <h3 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-3">
                      Services Include:
                    </h3>
                    <ul className="space-y-2">
                      {area.services.map((service, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="text-amber-700 font-bold mt-0.5">•</span>
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
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded text-lg font-medium transition-colors"
          >
            Schedule a Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
