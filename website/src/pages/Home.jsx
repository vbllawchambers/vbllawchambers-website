import React from 'react';
import { ArrowRight, Shield, Heart, Award, Home as HomeIcon, MapPin, CheckCircle, Scale, MessageCircle, Calendar } from 'lucide-react';

export default function Home({ onNavigate }) {
  const stats = [
    { number: '25+', label: 'Years in Court Practice', subtitle: 'Established 1999' },
    { number: '500+', label: 'Court Decrees & Trials', subtitle: 'Trial & Appellate' },
    { number: '2,500+', label: 'Legal Consultations', subtitle: 'Civil, Family & Property' },
    { number: '99%', label: 'Client Trust & Confidentiality', subtitle: 'Ethical Diligence' },
  ];

  const featuredPracticeAreas = [
    {
      icon: HomeIcon,
      title: 'Real Estate & Property Law',
      description: '30-year title searches, registered sale deeds, encumbrance scrutiny, partition suits, and revenue boundary disputes.',
      badge: 'High Demand',
    },
    {
      icon: Heart,
      title: 'Family Law & Mediation',
      description: 'Compassionate divorce proceedings, child custody, maintenance petitions, alimony claims, and mutual settlements.',
      badge: 'Confidential',
    },
    {
      icon: Award,
      title: 'Notary & Will Drafting',
      description: 'Official statutory notary attestation, registered testamentary wills, codicils, succession planning, and affidavits.',
      badge: 'Authorized Notary',
    },
    {
      icon: Shield,
      title: 'Criminal Defense & Bail',
      description: 'Anticipatory bail, regular bail petitions, trial advocacy, Sec 138 cheque bounce matters, and police court filings.',
      badge: 'Urgent Representation',
    },
  ];

  const courts = [
    'Senior Civil Judge Court, Kavali',
    'Additional District & Sessions Court, Kavali',
    'Principal District Court, Nellore',
    'High Court of Andhra Pradesh',
    'Motor Accident Claims Tribunal (MACT)',
  ];

  const handleNavigate = (path) => {
    if (onNavigate) onNavigate(path);
  };

  const whatsappUrl = "https://api.whatsapp.com/send?phone=919876543210&text=Hello%20VBL%20Law%20Chambers,%20I%20would%20like%20to%20schedule%20a%20legal%20consultation%20with%20Advocate%20V.%20Bhagya%20Lakshmi.";

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white py-24 md:py-32 overflow-hidden">
        {/* Background Image with High-end Obsidian & Gold Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/75 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.15),transparent_60%)] z-10" />
        <img
          src="https://images.unsplash.com/photo-1687289133469-b2a07a13b78b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdXN0aWNlJTIwc2NhbGVzJTIwY291cnRyb29tfGVufDF8fHx8MTc3MjAyMjE1MXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Justice Courtroom"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Bilingual trust badge */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Kavali • Nellore • Kandukur • Singarayakonda</span>
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-200 text-xs font-medium backdrop-blur-sm">
                విశ్వసనీయ న్యాయ సేవలు — 25+ ఏళ్ల నిబద్ధత
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
              Resolving Legal Complexities with <span className="gold-gradient-text">25+ Years</span> of Courtroom Authority
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed font-light">
              Led by founding advocate <strong className="font-semibold text-white">Smt. V. Bhagya Lakshmi (B.Sc., B.L., Advocate & Notary)</strong>, VBL Law Chambers delivers assertive courtroom trial defense, compassionate family mediation, and government authorized notary services in SPSR Nellore District.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
                className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-amber-500/40 gap-2"
              >
                <Calendar className="w-5 h-5 text-amber-200" />
                <span>Schedule Confidential Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 px-6 py-4 rounded-xl text-base font-semibold transition-all backdrop-blur-sm gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

            {/* Jurisdiction Chips */}
            <div className="pt-6 border-t border-slate-800/80">
              <div className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-3 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>Courts of Practice & Jurisdiction</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {courts.map((court, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-900/80 border border-slate-800 text-slate-300 text-xs px-3 py-1 rounded-md backdrop-blur-sm shadow-xs"
                  >
                    {court}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elevated Stats Bar */}
      <section className="bg-slate-900 text-white py-14 border-y border-amber-600/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-850/60 border border-slate-800 p-6 rounded-xl text-center hover:border-amber-500/40 transition-colors shadow-sm"
              >
                <div className="text-4xl sm:text-5xl font-serif font-bold text-amber-400 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm font-semibold text-white mb-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400">
                  {stat.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Practice Spectrum
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">
              Core Legal Specializations
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We provide strategic courtroom litigation, title verification, and statutory notary services with complete personal attention from senior advocate Smt. V. Bhagya Lakshmi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredPracticeAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="card-luxury p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-12 h-12 rounded-xl flex items-center justify-center text-amber-700 shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {area.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
                      {area.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <a
                      href="/practice-areas"
                      onClick={(e) => { e.preventDefault(); handleNavigate('/practice-areas'); }}
                      className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 gap-1"
                    >
                      <span>Explore Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <a
              href="/practice-areas"
              onClick={(e) => { e.preventDefault(); handleNavigate('/practice-areas'); }}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-lg text-sm font-semibold transition-colors shadow-md"
            >
              <span>View All 8 Practice Areas</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose VBL Law Chambers */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 cols: Pillars */}
            <div className="lg:col-span-7">
              <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                Chambers Credibility
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-6">
                Why Families & Businesses Trust VBL Law Chambers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/50 hover:bg-white hover:shadow-md transition-all group">
                  <div className="bg-amber-100 w-10 h-10 rounded-xl flex items-center justify-center text-amber-700 mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-xs">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-amber-700 transition-colors">
                    Direct Senior Advocate Representation
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Every case is personally analyzed, drafted, and argued by founding advocate Smt. V. Bhagya Lakshmi with 25+ years of court litigation experience.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/50 hover:bg-white hover:shadow-md transition-all group">
                  <div className="bg-amber-100 w-10 h-10 rounded-xl flex items-center justify-center text-amber-700 mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-xs">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-amber-700 transition-colors">
                    Transparent & Empathetic Client Counsel
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Honest statutory merits and realistic judicial expectations without misleading promises. Direct case status updates at every court date.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/50 hover:bg-white hover:shadow-md transition-all group">
                  <div className="bg-amber-100 w-10 h-10 rounded-xl flex items-center justify-center text-amber-700 mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-xs">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-amber-700 transition-colors">
                    Authorized Government Notary Public
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Complete single-window legal services: official statutory notarization, sworn affidavits, declarations, and testamentary wills under one roof.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/50 hover:bg-white hover:shadow-md transition-all group">
                  <div className="bg-amber-100 w-10 h-10 rounded-xl flex items-center justify-center text-amber-700 mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-xs">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-amber-700 transition-colors">
                    Deep Regional Judicial Familiarity
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Established practice across Senior Civil Judge Courts, Sessions Courts, MACT, and Revenue tribunals throughout Kavali, Nellore, and surrounding mandals.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap gap-4">
                <a
                  href="/about"
                  onClick={(e) => { e.preventDefault(); handleNavigate('/about'); }}
                  className="inline-flex items-center bg-slate-900 hover:bg-slate-800 text-white px-7 py-3 rounded-lg text-sm font-semibold transition-colors shadow"
                >
                  <span>Chambers Heritage & Mission</span>
                  <ArrowRight className="ml-2 w-4 h-4 text-amber-400" />
                </a>
                <a
                  href="/attorneys"
                  onClick={(e) => { e.preventDefault(); handleNavigate('/attorneys'); }}
                  className="inline-flex items-center border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
                >
                  <span>View Principal Advocate Profile</span>
                </a>
              </div>
            </div>

            {/* Right 5 cols: Portrait Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/40 group">
                <img
                  src="https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdHRvcm5leSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTk3OTc2NHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Smt. V. Bhagya Lakshmi - VBL Law Chambers"
                  className="w-full h-[460px] object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-5 rounded-xl text-white border border-amber-500/40 shadow-xl">
                  <div className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Sole Principal Counsel</span>
                    <span className="text-slate-400 text-xs">Est. 1999</span>
                  </div>
                  <div className="text-lg font-serif font-bold text-white">
                    Smt. V. Bhagya Lakshmi
                  </div>
                  <div className="text-xs text-amber-200 font-semibold mb-2">
                    B.Sc., B.L. — Advocate & Notary Public
                  </div>
                  <div className="text-xs text-slate-300 leading-normal border-t border-slate-800 pt-2 flex items-center justify-between">
                    <span>Senior Civil Judge Court, Kavali</span>
                    <span className="text-amber-400">25+ Yrs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Get Started CTA */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4 border border-amber-500/30">
            Legal Guidance & Notary Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
            Require Legal Advice or Statutory Notarization?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Schedule a direct, confidential chamber appointment with Advocate Smt. V. Bhagya Lakshmi in Kavali today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
              className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-amber-500/40 gap-2"
            >
              <Calendar className="w-5 h-5 text-amber-200" />
              <span>Book Chamber Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 px-6 py-4 rounded-xl text-base font-semibold transition-all gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Direct WhatsApp Message</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
