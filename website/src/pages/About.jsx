import React from 'react';
import { Shield, Heart, Target, Award, CheckCircle, ArrowRight, UserCheck, FileCheck, Scale } from 'lucide-react';

export default function About({ onNavigate }) {
  const handleNavigate = (path) => {
    if (onNavigate) onNavigate(path);
  };

  const coreValues = [
    {
      icon: Shield,
      title: 'Integrity & Ethics',
      description: 'We uphold the highest ethical standards, providing honest legal opinions without false assurances.',
    },
    {
      icon: Heart,
      title: 'Client Empathy',
      description: 'We understand the personal and emotional stakes of court matters and treat every client with dignity.',
    },
    {
      icon: Target,
      title: 'Strategic Rigor',
      description: 'Meticulous case preparation, sound legal research, and disciplined courtroom advocacy.',
    },
    {
      icon: Award,
      title: '25+ Years Experience',
      description: 'A quarter-century of proven courtroom dedication across Kavali, Nellore, and regional tribunals.',
    },
  ];

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Established 1999 • Kavali, Andhra Pradesh</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-4">
            About VBL Law Chambers
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-light">
            Over 25 years of distinguished legal advocacy, civil litigation, family mediation, property title scrutiny, and statutory notary practice.
          </p>
        </div>
      </section>

      {/* Our Story & Chambers Leadership */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 cols: Heritage Narrative */}
            <div className="lg:col-span-7">
              <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                Chambers Heritage
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-6">
                Dedicated to Justice, Diligence & Lasting Legal Clarity
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                <p>
                  Established in 1999 in Kavali, SPSR Nellore District, <strong>VBL Law Chambers</strong> was founded on the cornerstone principles of steadfast legal ethics, thorough statutory diligence, and accessible client representation.
                </p>
                <p>
                  Led by founding advocate <strong>Smt. V. Bhagya Lakshmi, B.Sc., B.L. (Advocate & Notary)</strong>, our chambers provides personalized legal counsel where every client's case receives direct, senior-level attention. Unlike high-turnover law firms that delegate critical casework to inexperienced associates, our clients benefit from a quarter-century of direct courtroom trials and personal oversight.
                </p>
                <p>
                  Over the past two and a half decades, we have handled hundreds of complex civil disputes, matrimonial settlements, property title scrutinies, testamentary wills, and court defense proceedings across local and appellate courts.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap gap-4">
                <a
                  href="/attorneys"
                  onClick={(e) => { e.preventDefault(); handleNavigate('/attorneys'); }}
                  className="inline-flex items-center bg-slate-900 hover:bg-slate-800 text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  <UserCheck className="w-4 h-4 mr-2 text-amber-400" />
                  <span>View Principal Advocate Profile</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
                <a
                  href="/practice-areas"
                  onClick={(e) => { e.preventDefault(); handleNavigate('/practice-areas'); }}
                  className="inline-flex items-center border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
                >
                  <span>Explore Practice Areas</span>
                </a>
              </div>
            </div>

            {/* Right 5 cols: Mission & Vision Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 sm:p-10 rounded-2xl border-2 border-amber-500/40 shadow-2xl relative overflow-hidden ring-2 ring-amber-400/20">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-600/10 rounded-full blur-3xl" />
                
                <div className="relative">
                  <div className="inline-block bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4 border border-amber-500/30">
                    Chambers Purpose
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold mb-3 text-white">Our Mission</h3>
                  <p className="text-slate-300 mb-8 leading-relaxed text-sm font-light">
                    To deliver exceptional, ethical legal counsel that resolves disputes promptly, safeguards property rights, and gives families total clarity through preventive legal planning and resolute courtroom advocacy.
                  </p>

                  <h3 className="text-2xl font-serif font-bold mb-3 text-white">Our Vision</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed text-sm font-light">
                    To remain the most trusted, dependable legal chambers in Kavali and SPSR Nellore District—renowned for integrity, professional empathy, and unwavering commitment to the rule of law.
                  </p>

                  <div className="pt-6 border-t border-slate-800 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-xs text-amber-300 font-semibold tracking-wide">
                      Authorized Notary Public • Govt. of Andhra Pradesh
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Ethical Pillars
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">Our Core Values</h2>
            <p className="text-base text-slate-600 leading-relaxed">
              These fundamental tenets guide our casework, consultation ethics, and client advocacy each day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="card-luxury p-8 text-center flex flex-col justify-between">
                  <div>
                    <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-amber-700 shadow-xs">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">{val.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{val.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pillars of Recognition */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Practice Distinction
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">Pillars of Practice</h2>
            <p className="text-base text-slate-600">
              Trusted by generations of families and property owners across SPSR Nellore District.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-luxury p-8 text-center bg-white border border-slate-200 shadow-xs group hover:border-amber-500/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-xs">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">25+ Years Court Practice</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Extensive courtroom trial record before Senior Civil Judge, Sessions, MACT, and appellate courts.
              </p>
            </div>

            <div className="card-luxury p-8 text-center bg-white border border-slate-200 shadow-xs group hover:border-amber-500/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-xs">
                <FileCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Authorized Notary Public</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Statutory attestation, sworn declarations, affidavits, testamentary wills, and powers of attorney.
              </p>
            </div>

            <div className="card-luxury p-8 text-center bg-white border border-slate-200 shadow-xs group hover:border-amber-500/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-xs">
                <Scale className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Direct Advocate Attention</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                No intermediaries or junior handoffs; full accountability and confidential handling from senior counsel.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
