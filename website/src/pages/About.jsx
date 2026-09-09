import React from 'react';
import { Shield, Heart, Target, Award, CheckCircle, ArrowRight, UserCheck } from 'lucide-react';

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
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-800/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Established 1999 • Kavali, Andhra Pradesh</span>
          </div>
          <h1 className="text-5xl mb-4 font-bold tracking-tight">About VBL Law Chambers</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Over 25 years of distinguished legal advocacy, civil litigation, family mediation, property scrutiny, and notary services.
          </p>
        </div>
      </section>

      {/* Our Story & Chambers Leadership */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-600 font-bold mb-2">Our Heritage</div>
              <h2 className="text-4xl mb-6 font-bold text-slate-900">Dedicated to Justice & Legal Clarity</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Established in 1999 in Kavali, SPSR Nellore District, <strong>VBL Law Chambers</strong> was founded on the cornerstone principles of steadfast legal ethics, meticulous statutory diligence, and accessible client representation.
                </p>
                <p>
                  Led by founding advocate <strong>Smt. V. Bhagya Lakshmi, B.Sc., B.L. (Advocate & Notary)</strong>, our chambers provides personalized legal counsel where every client's case receives direct, senior-level attention. Unlike high-turnover firms that delegate critical matters to inexperienced associates, our clients benefit from 25+ years of direct trial experience and personalized oversight.
                </p>
                <p>
                  Over the past two and a half decades, we have handled hundreds of complex civil disputes, matrimonial settlements, property title scrutinies, testamentary wills, and court defense proceedings across local and appellate courts.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap gap-4">
                <a
                  href="/attorneys"
                  onClick={(e) => { e.preventDefault(); handleNavigate('/attorneys'); }}
                  className="inline-flex items-center bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors shadow"
                >
                  <UserCheck className="w-4 h-4 mr-2 text-amber-400" />
                  View Advocate Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
                <a
                  href="/practice-areas"
                  onClick={(e) => { e.preventDefault(); handleNavigate('/practice-areas'); }}
                  className="inline-flex items-center border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
                >
                  Explore Practice Areas
                </a>
              </div>
            </div>

            {/* Mission & Vision Card */}
            <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-600/10 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="inline-block bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                  Chambers Purpose
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white">Our Mission</h3>
                <p className="text-slate-300 mb-8 leading-relaxed text-sm sm:text-base">
                  To deliver exceptional, ethical legal counsel that resolves disputes promptly, safeguards property rights, and gives families total clarity through preventive legal planning and resolute courtroom advocacy.
                </p>

                <h3 className="text-2xl font-bold mb-3 text-white">Our Vision</h3>
                <p className="text-slate-300 mb-6 leading-relaxed text-sm sm:text-base">
                  To remain the most trusted, dependable legal chambers in Kavali and SPSR Nellore District—renowned for integrity, professional empathy, and unwavering commitment to the rule of law.
                </p>

                <div className="pt-6 border-t border-slate-800 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-500" />
                  <span className="text-xs text-amber-300 font-medium tracking-wide">
                    Authorized Notary Public • Government of Andhra Pradesh
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 font-bold text-slate-900">Our Core Values</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These fundamental tenets guide our daily casework, consultation ethics, and client advocacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center border border-slate-200">
                  <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl mb-3 font-semibold text-slate-900">{val.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pillars of Recognition */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 font-bold text-slate-900">Pillars of Practice</h2>
            <p className="text-lg text-slate-600">
              Trusted by generations of families and businesses across SPSR Nellore District.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-slate-200 p-8 rounded-xl text-center shadow-sm bg-slate-50/50 hover:border-amber-500/50 transition-colors">
              <div className="text-amber-600 text-3xl mb-3">★★★★★</div>
              <h3 className="text-xl mb-2 font-bold text-slate-900">25+ Years Court Practice</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Extensive courtroom trials before Senior Civil Judge, Sessions, MACT, and appellate courts.
              </p>
            </div>

            <div className="border border-slate-200 p-8 rounded-xl text-center shadow-sm bg-slate-50/50 hover:border-amber-500/50 transition-colors">
              <div className="text-amber-600 text-3xl mb-3">📜</div>
              <h3 className="text-xl mb-2 font-bold text-slate-900">Authorized Notary Public</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Legally empowered for statutory notarization, sworn declarations, affidavits, and wills.
              </p>
            </div>

            <div className="border border-slate-200 p-8 rounded-xl text-center shadow-sm bg-slate-50/50 hover:border-amber-500/50 transition-colors">
              <div className="text-amber-600 text-3xl mb-3">⚖️</div>
              <h3 className="text-xl mb-2 font-bold text-slate-900">Direct Advocate Attention</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                No intermediaries or junior handoffs; full accountability and confidential handling.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
