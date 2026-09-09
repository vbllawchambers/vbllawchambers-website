import React from 'react';
import { Briefcase, Shield, Heart, Home as HomeIcon, Activity, Users, FileText, ShieldCheck } from 'lucide-react';

export default function PracticeAreas({ onNavigate }) {
  const practiceAreas = [
    {
      icon: Briefcase,
      title: 'Corporate Law',
      description: 'Comprehensive legal services for businesses including formation, contracts, mergers, acquisitions, and corporate governance.',
      services: [
        'Business Formation & Structuring',
        'Contract Drafting & Negotiation',
        'Mergers & Acquisitions',
        'Corporate Governance',
        'Compliance & Regulatory Matters',
      ],
    },
    {
      icon: Shield,
      title: 'Criminal Defense',
      description: 'Aggressive defense for clients facing criminal charges, from misdemeanors to serious felonies.',
      services: [
        'DUI/DWI Defense',
        'White Collar Crimes',
        'Drug Offenses',
        'Assault & Battery',
        'Federal Crimes',
      ],
    },
    {
      icon: Heart,
      title: 'Family Law',
      description: 'Compassionate legal guidance through sensitive family matters with a focus on protecting your interests.',
      services: [
        'Divorce & Separation',
        'Child Custody & Support',
        'Alimony & Spousal Support',
        'Adoption',
        'Prenuptial Agreements',
      ],
    },
    {
      icon: HomeIcon,
      title: 'Real Estate',
      description: 'Complete real estate legal services for residential and commercial property transactions.',
      services: [
        'Property Transactions',
        'Title Examination',
        'Lease Agreements',
        'Zoning & Land Use',
        'Property Disputes',
      ],
    },
    {
      icon: Activity,
      title: 'Personal Injury',
      description: 'Fighting for maximum compensation for victims of accidents and negligence.',
      services: [
        'Auto Accidents',
        'Slip & Fall',
        'Medical Malpractice',
        'Wrongful Death',
        'Product Liability',
      ],
    },
    {
      icon: Users,
      title: 'Employment Law',
      description: 'Protecting the rights of employees and employers in workplace legal matters.',
      services: [
        'Wrongful Termination',
        'Discrimination Claims',
        'Harassment Cases',
        'Employment Contracts',
        'Wage & Hour Disputes',
      ],
    },
    {
      icon: FileText,
      title: 'Estate Planning',
      description: 'Comprehensive estate planning services to protect your assets and ensure your wishes are honored.',
      services: [
        'Wills & Trusts',
        'Power of Attorney',
        'Healthcare Directives',
        'Probate & Estate Administration',
        'Asset Protection',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'Intellectual Property',
      description: 'Protecting your creative works, inventions, and brand identity.',
      services: [
        'Trademark Registration',
        'Copyright Protection',
        'Patent Applications',
        'IP Licensing',
        'Infringement Defense',
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
