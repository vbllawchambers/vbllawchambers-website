import React from 'react';
import { Mail, Phone, Award } from 'lucide-react';

export default function Attorneys({ onNavigate }) {
  const attorneys = [
    {
      name: 'V. Bhagya Lakshmi',
      title: 'Founder & Senior Advocate',
      credentials: 'B.Sc., B.L. | Advocate & Notary',
      specialization: 'Civil, Criminal, Family Law, Property & Notary Practice',
      image: 'https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBsYXd5ZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyMDIyMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'With over 25 years of distinguished courtroom experience, Smt. V. Bhagya Lakshmi is the founding advocate of VBL Law Chambers. She is an authorized Advocate & Notary based in Kavali, SPSR Nellore District, recognized for compassionate family dispute resolution, meticulous property verification, and staunch defense in civil and criminal litigation.',
      education: 'B.Sc., B.L. — High Court of Andhra Pradesh Bar',
      email: 'vbllawchambers@gmail.com',
      isLeader: true,
    },
    {
      name: 'Michael Chen',
      title: 'Partner',
      credentials: 'LL.B., LL.M.',
      specialization: 'Criminal Defense & Trial Litigation',
      image: 'https://images.unsplash.com/photo-1658249682512-1bb162538ba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwYXR0b3JuZXklMjBidXNpbmVzcyUyMHN1aXR8ZW58MXx8fHwxNzcyMDIyMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Michael is a seasoned trial attorney with a proven track record in criminal defense and trial litigation. His aggressive advocacy and strategic approach have resulted in numerous favorable verdicts.',
      education: 'LL.B., National Law School',
      email: 'vbllawchambers@gmail.com',
      isLeader: false,
    },
    {
      name: 'Emily Rodriguez',
      title: 'Partner',
      credentials: 'B.A. LL.B.',
      specialization: 'Family Law & Mediation',
      image: 'https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdHRvcm5leSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTk3OTc2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Emily brings compassion and expertise to family law matters. She specializes in dispute mediation, divorce settlements, and safeguarding family interests.',
      education: 'B.A. LL.B. (Hons)',
      email: 'vbllawchambers@gmail.com',
      isLeader: false,
    },
    {
      name: 'David Thompson',
      title: 'Associate Partner',
      credentials: 'B.Com, LL.B.',
      specialization: 'Real Estate & Property Law',
      image: 'https://images.unsplash.com/photo-1658249682512-1bb162538ba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwYXR0b3JuZXklMjBidXNpbmVzcyUyMHN1aXR8ZW58MXx8fHwxNzcyMDIyMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'David has extensive experience in commercial, agricultural, and residential real estate transactions. His scrutiny ensures seamless registration and title protection.',
      education: 'LL.B., University Law College',
      email: 'vbllawchambers@gmail.com',
      isLeader: false,
    },
    {
      name: 'Jennifer Park',
      title: 'Associate Partner',
      credentials: 'B.Sc., LL.B.',
      specialization: 'Personal Injury & Motor Accident Claims',
      image: 'https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBsYXd5ZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyMDIyMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Jennifer is an advocate for motor accident and liability victims before the MACT tribunal. She has secured substantial settlements and relief for aggrieved clients.',
      education: 'LL.B., Law Academy',
      email: 'vbllawchambers@gmail.com',
      isLeader: false,
    },
    {
      name: 'Robert Williams',
      title: 'Associate Partner',
      credentials: 'B.A., LL.B.',
      specialization: 'Estate Planning & Corporate Governance',
      image: 'https://images.unsplash.com/photo-1658249682512-1bb162538ba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwYXR0b3JuZXklMjBidXNpbmVzcyUyMHN1aXR8ZW58MXx8fHwxNzcyMDIyMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Robert specializes in will drafting, power of attorney, commercial contracts, and dispute resolution for organizations and private individuals.',
      education: 'LL.B., Faculty of Law',
      email: 'vbllawchambers@gmail.com',
      isLeader: false,
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
          <h1 className="text-5xl mb-4 font-bold tracking-tight">Our Advocates & Legal Team</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Meet our team of experienced legal professionals dedicated to achieving the best outcomes for our clients across Kavali, Nellore, and Andhra Pradesh.
          </p>
        </div>
      </section>

      {/* Attorney Profiles Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attorneys.map((attorney, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border ${
                  attorney.isLeader ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-200'
                }`}
              >
                <div className="relative h-80 overflow-hidden bg-slate-100">
                  <img
                    src={attorney.image}
                    alt={attorney.name}
                    className="w-full h-full object-cover"
                  />
                  {attorney.isLeader && (
                    <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow">
                      Managing Advocate
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl mb-1 font-bold text-slate-900">{attorney.name}</h3>
                  <p className="text-amber-600 font-semibold mb-1">{attorney.title}</p>
                  {attorney.credentials && (
                    <p className="text-xs text-slate-500 font-medium mb-3">{attorney.credentials}</p>
                  )}
                  <p className="text-sm font-medium text-slate-700 mb-4">{attorney.specialization}</p>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{attorney.bio}</p>
                  <p className="text-sm text-slate-500 mb-4 italic font-medium">{attorney.education}</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                    <a
                      href={`mailto:${attorney.email}`}
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 transition-colors font-medium"
                    >
                      <Mail className="w-4 h-4 text-amber-600" />
                      <span>Email</span>
                    </a>
                    <a
                      href="/contact"
                      onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 transition-colors font-medium ml-auto"
                    >
                      <span>Consult</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4 font-bold text-slate-900">Join Our Chambers</h2>
          <p className="text-xl text-slate-600 mb-8">
            We are always open to collaborating with dedicated junior advocates and legal interns who share our commitment to justice and client service.
          </p>
          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded text-lg font-medium transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
