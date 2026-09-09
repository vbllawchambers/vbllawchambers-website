import React from 'react';
import { ArrowRight, Shield, Heart, Award, Home as HomeIcon, MapPin, CheckCircle, Scale } from 'lucide-react';

export default function Home({ onNavigate }) {
  const stats = [
    { number: '25+', label: 'Years of Experience' },
    { number: '500+', label: 'Court Cases Handled' },
    { number: '2,500+', label: 'Legal Consultations' },
    { number: '98%', label: 'Client Satisfaction' },
  ];

  const featuredPracticeAreas = [
    {
      icon: Heart,
      title: 'Family Law & Mediation',
      description: 'Compassionate guidance and resolution through marital disputes, child custody, and family settlements.',
    },
    {
      icon: HomeIcon,
      title: 'Real Estate & Property Law',
      description: 'Comprehensive property title examination, registered sale deeds, and boundary dispute resolution.',
    },
    {
      icon: Award,
      title: 'Notary & Will Drafting',
      description: 'Authorized Notary public attestation, testamentary wills, affidavits, and succession deeds.',
    },
    {
      icon: Shield,
      title: 'Criminal Defense & Bail',
      description: 'Aggressive trial defense, anticipatory bail petitions, and statutory compliance representation.',
    },
  ];

  const courts = [
    'Senior Civil Judge Court, Kavali',
    'District & Sessions Court, Nellore',
    'High Court of Andhra Pradesh',
    'Motor Accident Claims Tribunal (MACT)',
  ];

  const handleNavigate = (path) => {
    if (onNavigate) onNavigate(path);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1687289133469-b2a07a13b78b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdXN0aWNlJTIwc2NhbGVzJTIwY291cnRyb29tfGVufDF8fHx8MTc3MjAyMjE1MXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Justice Courtroom"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Bilingual trust badge */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Kavali • Nellore • Kandukur • Singarayakonda</span>
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium">
                విశ్వసనీయ న్యాయ సేవలు — 25+ ఏళ్ల నిబద్ధత
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl mb-6 font-bold tracking-tight leading-tight">
              Your Trusted Legal Partner in Andhra Pradesh
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              With over 25 years of courtroom experience, <strong>VBL Law Chambers</strong> provides compassionate, confidential, and resolute legal representation led by founding advocate <strong>Smt. V. Bhagya Lakshmi (B.Sc., B.L., Advocate & Notary)</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
                className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
              >
                Schedule Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="/practice-areas"
                onClick={(e) => { e.preventDefault(); handleNavigate('/practice-areas'); }}
                className="inline-flex items-center justify-center border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Our Practice Areas
              </a>
            </div>

            {/* Jurisdiction Chips */}
            <div className="pt-6 border-t border-slate-700/60">
              <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                <span>Courts of Practice</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {courts.map((court, idx) => (
                  <span key={idx} className="bg-slate-800/80 border border-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded-md">
                    {court}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-amber-600 py-12 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center text-white">
                <div className="text-4xl md:text-5xl font-extrabold mb-1">{stat.number}</div>
                <div className="text-sm md:text-base text-amber-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-2 font-bold text-slate-900">Our Practice Areas</h2>
            <div className="inline-block bg-amber-100 text-amber-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
              Kavali • Nellore • Kandukur • Singarayakonda
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We offer comprehensive legal representation across civil, criminal, family, property, and notary matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPracticeAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:-translate-y-1"
                >
                  <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl mb-3 font-semibold text-slate-900">{area.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{area.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <a
              href="/practice-areas"
              onClick={(e) => { e.preventDefault(); handleNavigate('/practice-areas'); }}
              className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold text-lg"
            >
              View All 8 Practice Areas
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose VBL Law Chambers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                Personalized Legal Counsel
              </div>
              <h2 className="text-4xl mb-6 font-bold text-slate-900">
                Why Choose VBL Law Chambers?
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl mb-2 text-amber-600 font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-600" />
                    <span>Direct Senior Advocate Representation</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Your matter is personally analyzed and represented by founding advocate Smt. V. Bhagya Lakshmi with 25+ years of litigation experience—never passed to inexperienced juniors.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-amber-600 font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-600" />
                    <span>Client-Focused & Compassionate Approach</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    We understand the emotional and financial strain of court cases. We offer clear, transparent advice and seek prompt resolution through trial or mediation.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-amber-600 font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-600" />
                    <span>Proven 25-Year Courtroom Track Record</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Over hundreds of successful civil decrees, family settlements, property title clears, and bail orders across Kavali and Nellore district courts.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-amber-600 font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-600" />
                    <span>Government Authorized Notary Services</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Seamless one-stop legal services: litigation, agreement drafting, and statutory notarization under one trusted roof.
                  </p>
                </div>
              </div>
              <a
                href="/about"
                onClick={(e) => { e.preventDefault(); handleNavigate('/about'); }}
                className="inline-flex items-center mt-8 bg-slate-900 text-white hover:bg-slate-800 px-8 py-3 rounded-lg text-base font-semibold transition-colors shadow"
              >
                Learn More About Our Chambers
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdHRvcm5leSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTk3OTc2NHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="VBL Law Chambers Advocate"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-sm p-4 rounded-xl text-white border border-amber-500/30">
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">VBL Law Chambers, Kavali</div>
                <div className="text-sm font-semibold">Smt. V. Bhagya Lakshmi, B.Sc., B.L.</div>
                <div className="text-xs text-slate-300">Advocate & Notary Public (Est. 1999)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Get Started CTA */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6 font-bold">Need Legal Advice or Notary Services?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Schedule a confidential consultation with Advocate V. Bhagya Lakshmi today.
          </p>
          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
            className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
          >
            Book Free Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
