import React from 'react';
import { Mail, Linkedin } from 'lucide-react';

export default function Attorneys({ onNavigate }) {
  const attorneys = [
    {
      name: 'Sarah Mitchell',
      title: 'Senior Partner',
      specialization: 'Corporate Law & Business Litigation',
      image: 'https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBsYXd5ZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyMDIyMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'With over 20 years of experience, Sarah specializes in complex corporate transactions and business litigation. She has successfully represented Fortune 500 companies and startups alike.',
      education: 'J.D., Harvard Law School',
      email: 's.mitchell@sterlinglaw.com',
    },
    {
      name: 'Michael Chen',
      title: 'Partner',
      specialization: 'Criminal Defense & Trial Litigation',
      image: 'https://images.unsplash.com/photo-1658249682512-1bb162538ba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwYXR0b3JuZXklMjBidXNpbmVzcyUyMHN1aXR8ZW58MXx8fHwxNzcyMDIyMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Michael is a seasoned trial attorney with a proven track record in criminal defense. His aggressive advocacy and strategic approach have resulted in numerous favorable verdicts.',
      education: 'J.D., Yale Law School',
      email: 'm.chen@sterlinglaw.com',
    },
    {
      name: 'Emily Rodriguez',
      title: 'Partner',
      specialization: 'Family Law & Mediation',
      image: 'https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdHRvcm5leSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTk3OTc2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      bio: "Emily brings compassion and expertise to family law matters. She is certified in mediation and focuses on finding amicable solutions while protecting her clients' interests.",
      education: 'J.D., Columbia Law School',
      email: 'e.rodriguez@sterlinglaw.com',
    },
    {
      name: 'David Thompson',
      title: 'Associate Partner',
      specialization: 'Real Estate & Property Law',
      image: 'https://images.unsplash.com/photo-1658249682512-1bb162538ba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwYXR0b3JuZXklMjBidXNpbmVzcyUyMHN1aXR8ZW58MXx8fHwxNzcyMDIyMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'David has extensive experience in commercial and residential real estate transactions. His attention to detail ensures smooth closings and protects clients from potential legal issues.',
      education: 'J.D., NYU School of Law',
      email: 'd.thompson@sterlinglaw.com',
    },
    {
      name: 'Jennifer Park',
      title: 'Associate Partner',
      specialization: 'Personal Injury & Medical Malpractice',
      image: 'https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBsYXd5ZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyMDIyMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Jennifer is a passionate advocate for injury victims. She has secured millions in settlements and verdicts for clients injured due to negligence and malpractice.',
      education: 'J.D., Stanford Law School',
      email: 'j.park@sterlinglaw.com',
    },
    {
      name: 'Robert Williams',
      title: 'Associate Partner',
      specialization: 'Employment Law & Labor Relations',
      image: 'https://images.unsplash.com/photo-1658249682512-1bb162538ba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwYXR0b3JuZXklMjBidXNpbmVzcyUyMHN1aXR8ZW58MXx8fHwxNzcyMDIyMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Robert represents both employees and employers in workplace disputes. His balanced approach and deep understanding of labor law make him a trusted advisor.',
      education: 'J.D., Georgetown University Law Center',
      email: 'r.williams@sterlinglaw.com',
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
          <h1 className="text-5xl mb-4 font-bold tracking-tight">Our Attorneys</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Meet our team of experienced legal professionals dedicated to achieving the best outcomes for our clients.
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
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-slate-200"
              >
                <div className="relative h-80 overflow-hidden bg-slate-100">
                  <img
                    src={attorney.image}
                    alt={attorney.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl mb-1 font-bold text-slate-900">{attorney.name}</h3>
                  <p className="text-amber-600 font-semibold mb-2">{attorney.title}</p>
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
                      href="#"
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 transition-colors font-medium"
                    >
                      <Linkedin className="w-4 h-4 text-amber-600" />
                      <span>LinkedIn</span>
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
          <h2 className="text-4xl mb-4 font-bold text-slate-900">Join Our Team</h2>
          <p className="text-xl text-slate-600 mb-8">
            We're always looking for talented attorneys who share our commitment to excellence and client service.
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
