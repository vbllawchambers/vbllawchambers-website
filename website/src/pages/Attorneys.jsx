import React from 'react';
import { Mail, Phone, Award, Shield, CheckCircle, MapPin, Calendar, FileText, ArrowRight } from 'lucide-react';

export default function Attorneys({ onNavigate }) {
  const handleNavigate = (path) => {
    if (onNavigate) onNavigate(path);
  };

  const specializations = [
    {
      title: 'Property Law & Title Scrutiny',
      desc: 'Title verification, search reports, sale deed conveyancing, and land boundary disputes.',
    },
    {
      title: 'Family Law & Marital Mediation',
      desc: 'Compassionate divorce proceedings, child custody, alimony, and mutual settlements.',
    },
    {
      title: 'Civil & Commercial Suits',
      desc: 'Injunctions, partition suits, money recovery, and contractual execution disputes.',
    },
    {
      title: 'Criminal Defense & Bail',
      desc: 'Aggressive trial defense, anticipatory bail, regular bail, and NI Act cheque bounce cases.',
    },
    {
      title: 'Will Drafting & Succession',
      desc: 'Drafting registered testamentary wills, family settlement deeds, and succession planning.',
    },
    {
      title: 'Government Authorized Notary',
      desc: 'Official notarization, affidavits, sworn declarations, agreements, and power of attorney.',
    },
  ];

  const courts = [
    'Senior Civil Judge Court, Kavali',
    'Additional District & Sessions Court, Kavali',
    'Principal District & Sessions Court, Nellore',
    'High Court of Andhra Pradesh',
    'Motor Accident Claims Tribunal (MACT)',
  ];

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-800/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Chambers Leadership</span>
          </div>
          <h1 className="text-5xl mb-4 font-bold tracking-tight">Principal Advocate & Counsel</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Ethical, resolute, and experienced legal counsel led by founding advocate Smt. V. Bhagya Lakshmi with over 25 years of courtroom dedication.
          </p>
        </div>
      </section>

      {/* Main Executive Profile */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Portrait & Credentials Badges */}
              <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-800 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl" />
                
                <div>
                  {/* Portrait Card */}
                  <div className="relative mx-auto max-w-sm rounded-xl overflow-hidden border-2 border-amber-500/40 shadow-2xl mb-8 group">
                    <img
                      src="https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBsYXd5ZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyMDIyMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Smt. V. Bhagya Lakshmi"
                      className="w-full h-96 object-cover object-top"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent p-6 text-center">
                      <span className="bg-amber-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow">
                        Managing Advocate
                      </span>
                    </div>
                  </div>

                  {/* Badges Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700 p-3 rounded-lg">
                      <Award className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-slate-400">Experience</div>
                        <div className="text-sm font-semibold text-white">25+ Years in Active Practice</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700 p-3 rounded-lg">
                      <Shield className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-slate-400">Official Appointment</div>
                        <div className="text-sm font-semibold text-white">Advocate & Notary Public</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700 p-3 rounded-lg">
                      <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-slate-400">Chambers Jurisdiction</div>
                        <div className="text-sm font-semibold text-white">Kavali • Nellore • Kandukur</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-700/80 mt-8">
                  <a
                    href="mailto:vbllawchambers@gmail.com"
                    className="flex items-center justify-center gap-2 w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold text-sm transition-colors shadow-md"
                  >
                    <Mail className="w-4 h-4" />
                    <span>vbllawchambers@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Bio, Credentials & Areas */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="border-b border-slate-200 pb-6 mb-6">
                    <div className="text-sm text-amber-600 font-bold uppercase tracking-wider mb-1">
                      Founder & Senior Advocate
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
                      V. Bhagya Lakshmi
                    </h2>
                    <div className="text-base text-slate-600 font-semibold flex flex-wrap items-center gap-2">
                      <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded text-sm">B.Sc., B.L.</span>
                      <span>•</span>
                      <span className="text-amber-700 font-medium">Advocate & Notary</span>
                      <span>•</span>
                      <span className="text-slate-500 font-normal">Kavali, Andhra Pradesh</span>
                    </div>
                  </div>

                  {/* Biography */}
                  <div className="space-y-4 text-slate-600 leading-relaxed mb-8">
                    <p>
                      Smt. <strong>V. Bhagya Lakshmi</strong> is the founder and principal advocate at <strong>VBL Law Chambers</strong>. With over two and a half decades of unblemished legal practice established in 1999, she has earned widespread respect across judicial forums in SPSR Nellore District and regional appellate courts.
                    </p>
                    <p>
                      Her practice encompasses comprehensive trial advocacy in civil disputes, sensitive family litigation, land revenue scrutiny, and criminal defense. Known for her analytical rigor, transparent client counsel, and ethical integrity, she provides both assertive courtroom representation and peaceful mediation for intricate domestic and property disputes.
                    </p>
                    <p>
                      As an authorized <strong>Notary Public</strong>, Smt. Bhagya Lakshmi also executes and attests official affidavits, power of attorney documents, declarations, agreements, and testamentary wills with meticulous statutory compliance.
                    </p>
                  </div>

                  {/* Specializations Grid */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-amber-600" />
                      <span>Key Practice Areas & Experience</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {specializations.map((spec, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 hover:border-amber-500 transition-colors">
                          <h4 className="text-sm font-bold text-slate-900 mb-1">{spec.title}</h4>
                          <p className="text-xs text-slate-600 leading-normal">{spec.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Courts of Practice */}
                  <div className="mb-8 bg-amber-50/60 border border-amber-200/80 rounded-xl p-5">
                    <h3 className="text-sm uppercase tracking-wider text-amber-800 font-bold mb-3 flex items-center gap-2">
                      <span>🏛️ Courts & Tribunals of Practice</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {courts.map((court, cIdx) => (
                        <span key={cIdx} className="bg-white border border-amber-300 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                          {court}
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
                    className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-3.5 rounded-lg text-base font-semibold transition-colors shadow-md gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Consultation with Advocate</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/practice-areas"
                    onClick={(e) => { e.preventDefault(); handleNavigate('/practice-areas'); }}
                    className="inline-flex items-center justify-center border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3.5 rounded-lg text-base font-semibold transition-colors"
                  >
                    <span>View Legal Services</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote / Chambers Philosophy */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-amber-100 p-3 rounded-full mb-4 text-amber-700">
            <Shield className="w-8 h-8" />
          </div>
          <blockquote className="text-xl sm:text-2xl font-serif text-slate-800 italic leading-relaxed mb-4">
            "Justice is not only won through aggressive argument in court; it is built through meticulous preparation, uncompromising truth, and providing clients with clarity and peace of mind."
          </blockquote>
          <div className="text-sm font-bold text-amber-700 uppercase tracking-widest">
            — Smt. V. Bhagya Lakshmi, B.Sc., B.L.
          </div>
          <div className="text-xs text-slate-500 mt-1">Founding Advocate & Notary, VBL Law Chambers</div>
        </div>
      </section>

      {/* Junior Counsel & Chamber Practice CTA */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-3 font-bold">Chambers Association & Internships</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            VBL Law Chambers welcomes motivated junior advocates and legal interns committed to trial advocacy, court filing, and notary procedures in Kavali and Nellore.
          </p>
          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-3.5 rounded-lg text-base font-semibold transition-colors shadow-md"
          >
            Inquire for Chamber Association
          </a>
        </div>
      </section>
    </div>
  );
}
