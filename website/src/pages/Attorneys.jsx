import React from 'react';
import { Mail, Phone, Award, Shield, CheckCircle, MapPin, Calendar, FileText, ArrowRight, MessageCircle, Scale, GraduationCap } from 'lucide-react';

export default function Attorneys({ onNavigate }) {
  const handleNavigate = (path) => {
    if (onNavigate) onNavigate(path);
  };

  const specializations = [
    {
      title: 'Property Law & Title Scrutiny',
      desc: '30-year encumbrance verification, search reports, registered sale deeds, and partition suits.',
    },
    {
      title: 'Family Law & Marital Mediation',
      desc: 'Compassionate divorce proceedings, child custody, alimony, and mutual consent dispute settlements.',
    },
    {
      title: 'Civil & Commercial Litigation',
      desc: 'Injunctions, partition suits, money recovery, specific performance, and contractual disputes.',
    },
    {
      title: 'Criminal Defense & Bail',
      desc: 'Trial advocacy, anticipatory bail, regular bail petitions, and NI Act Sec 138 cheque bounce defense.',
    },
    {
      title: 'Will Drafting & Estate Planning',
      desc: 'Drafting registered testamentary wills, codicils, family trust deeds, and succession planning.',
    },
    {
      title: 'Government Authorized Notary',
      desc: 'Official statutory notarization, sworn affidavits, declarations, agreements, and power of attorney.',
    },
  ];

  const courts = [
    'Senior Civil Judge Court, Kavali',
    'Additional District & Sessions Court, Kavali',
    'Principal District & Sessions Court, Nellore',
    'High Court of Andhra Pradesh',
    'Motor Accident Claims Tribunal (MACT)',
  ];

  const whatsappUrl = "https://api.whatsapp.com/send?phone=919876543210&text=Hello%20VBL%20Law%20Chambers,%20I%20would%20like%20to%20schedule%20a%20legal%20consultation%20with%20Advocate%20V.%20Bhagya%20Lakshmi.";

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Chambers Leadership • Est. 1999</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-4">
            Principal Advocate & Counsel
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-light">
            Dedicated trial advocacy, confidential family counsel, and authorized notary services led by founding advocate <strong className="text-white font-semibold">Smt. V. Bhagya Lakshmi</strong> with over 25 years of courtroom dedication in Kavali.
          </p>
        </div>
      </section>

      {/* Main Executive Profile */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Portrait & Credentials Badges (5 cols) */}
              <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl" />
                
                <div>
                  {/* Portrait Card with Regal Double Border */}
                  <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-2xl mb-8 ring-4 ring-amber-400/20 group">
                    <img
                      src="https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdHRvcm5leSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTk3OTc2NHww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Smt. V. Bhagya Lakshmi, Sole Principal Advocate & Notary"
                      className="w-full h-[420px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent p-6 text-center">
                      <span className="bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg border border-amber-400/40">
                        Sole Principal Advocate & Notary
                      </span>
                    </div>
                  </div>

                  {/* Badges Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3.5 bg-slate-850/90 border border-slate-750 p-3.5 rounded-xl hover:border-amber-500/40 transition-colors">
                      <div className="bg-amber-500/20 p-2.5 rounded-xl text-amber-400 flex-shrink-0 border border-amber-500/30">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Court Experience</div>
                        <div className="text-sm font-bold text-white">25+ Years in Active Trial Practice</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 bg-slate-850/90 border border-slate-750 p-3.5 rounded-xl hover:border-amber-500/40 transition-colors">
                      <div className="bg-amber-500/20 p-2.5 rounded-xl text-amber-400 flex-shrink-0 border border-amber-500/30">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Official Appointment</div>
                        <div className="text-sm font-bold text-white">Government Authorized Notary Public</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 bg-slate-850/90 border border-slate-750 p-3.5 rounded-xl hover:border-amber-500/40 transition-colors">
                      <div className="bg-amber-500/20 p-2.5 rounded-xl text-amber-400 flex-shrink-0 border border-amber-500/30">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Chambers Jurisdiction</div>
                        <div className="text-sm font-bold text-white">Kavali • Nellore • Kandukur</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dual Contact Buttons */}
                <div className="pt-8 border-t border-slate-800/90 mt-8 space-y-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Direct WhatsApp Consultation</span>
                  </a>

                  <a
                    href="mailto:vbllawchambers@gmail.com"
                    className="flex items-center justify-center gap-2.5 w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/30 text-slate-200 py-3 rounded-xl font-medium text-xs transition-colors"
                  >
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span>vbllawchambers@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Bio, Credentials & Areas (7 cols) */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-white">
                <div>
                  <div className="border-b border-slate-200 pb-6 mb-6">
                    <div className="text-xs text-amber-700 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                      <span>Founder & Sole Principal Counsel</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-2.5">
                      Smt. V. Bhagya Lakshmi
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                      <span className="bg-amber-50 border border-amber-300/80 text-amber-900 font-bold px-3 py-1 rounded-md text-xs sm:text-sm flex items-center gap-1.5 shadow-xs">
                        <GraduationCap className="w-4 h-4 text-amber-700" />
                        <span>B.Sc., B.L.</span>
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="font-semibold text-slate-800">Advocate & Notary Public</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600">Enrolled Bar Council of Andhra Pradesh (1999)</span>
                    </div>
                  </div>

                  {/* Biography */}
                  <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                    <p>
                      Smt. <strong>V. Bhagya Lakshmi</strong> founded <strong>VBL Law Chambers</strong> in 1999. Over the past two and a half decades, she has earned a distinguished reputation across civil litigation, family mediation, land revenue disputes, and criminal defense courts in SPSR Nellore District.
                    </p>
                    <p>
                      Her courtroom philosophy pairs thorough evidentiary scrutiny with clear, empathetic client communication. Known for providing candid evaluations of legal merit rather than unwarranted promises, she is sought after for intricate partition suits, property title scrutinies, marital conciliations, and trial defense.
                    </p>

                    {/* Editorial Pullquote */}
                    <div className="my-5 p-4 sm:p-5 rounded-xl bg-amber-50/80 border-l-4 border-amber-600 shadow-xs">
                      <p className="text-amber-950 font-serif italic text-sm sm:text-base leading-relaxed">
                        "Every case brought before our chambers is given direct senior counsel, meticulous statutory scrutiny, and steadfast courtroom representation."
                      </p>
                    </div>

                    <p>
                      In her statutory capacity as an authorized <strong>Notary Public</strong>, Smt. Bhagya Lakshmi executes sworn affidavits, declarations, powers of attorney, commercial agreements, and registered testamentary wills with rigorous statutory adherence.
                    </p>
                  </div>

                  {/* Specializations Grid */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-600" />
                        <span>Core Practice Areas & Casework</span>
                      </h3>
                      <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        Senior Advocacy
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {specializations.map((spec, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-4 hover:border-amber-500/60 hover:bg-white transition-all shadow-xs group"
                        >
                          <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5 group-hover:text-amber-700 transition-colors">
                            <span className="w-2 h-2 rounded-full bg-amber-600 flex-shrink-0" />
                            <span>{spec.title}</span>
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed pl-3.5">{spec.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Courts of Practice */}
                  <div className="mb-8 bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-xs">
                    <h3 className="text-xs uppercase tracking-wider text-slate-700 font-bold mb-3 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-amber-600" />
                      <span>Regular Courts & Tribunals of Practice</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {courts.map((court, cIdx) => (
                        <span
                          key={cIdx}
                          className="bg-white border border-slate-200 hover:border-amber-400 text-slate-800 text-xs font-medium px-3 py-1.5 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>{court}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Consultation CTA button */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
                  <a
                    href="/contact"
                    onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
                    className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 gap-2"
                  >
                    <Calendar className="w-4 h-4 text-amber-200" />
                    <span>Schedule Consultation with Advocate</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/practice-areas"
                    onClick={(e) => { e.preventDefault(); handleNavigate('/practice-areas'); }}
                    className="inline-flex items-center justify-center border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3.5 rounded-xl text-sm font-semibold transition-colors"
                  >
                    <span>View All Services</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote / Chambers Philosophy */}
      <section className="py-20 bg-white border-t border-slate-200 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-amber-100 p-3.5 rounded-full mb-4 text-amber-700 shadow-xs">
            <Shield className="w-8 h-8" />
          </div>
          <blockquote className="text-2xl sm:text-3xl font-serif text-slate-900 italic leading-relaxed mb-6 font-medium">
            "Justice is not only won through assertive courtroom argument; it is built through meticulous preparation, uncompromising statutory truth, and providing clients with clarity and peace of mind."
          </blockquote>
          <div className="text-sm font-bold text-amber-700 uppercase tracking-widest">
            — Smt. V. Bhagya Lakshmi, B.Sc., B.L.
          </div>
          <div className="text-xs text-slate-500 mt-1">Founding Advocate & Notary Public, VBL Law Chambers</div>
        </div>
      </section>

      {/* Junior Counsel & Chamber Practice CTA */}
      <section className="bg-slate-950 text-white py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            Chambers Association
          </div>
          <h2 className="text-3xl font-serif font-bold mb-3">Chamber Internships & Associate Practice</h2>
          <p className="text-base text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
            VBL Law Chambers welcomes motivated junior advocates and law graduates committed to courtroom trials, legal documentation, and notary procedures in Kavali and Nellore.
          </p>
          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Inquire for Chamber Association
          </a>
        </div>
      </section>
    </div>
  );
}
