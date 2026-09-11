import React from 'react';
import { ArrowRight, FileCheck, FileSignature, Building2, FileText, MapPin } from 'lucide-react';

export default function Home({ onNavigate }) {
  const stats = [
    { number: '25+', label: 'Years of Experience' },
    { number: '500+', label: 'Cases Won' },
    { number: '50+', label: 'Expert Attorneys' },
    { number: '98%', label: 'Client Satisfaction' },
  ];

  const featuredPracticeAreas = [
    {
      icon: FileCheck,
      title: 'Property Title Clearance',
      description: '30-year title verification, link document scrutiny, and comprehensive legal clearance reports.',
    },
    {
      icon: FileSignature,
      title: 'General Power of Attorney',
      description: 'Preparation, notarization, and registration of GPA and SPA instruments for property management.',
    },
    {
      icon: Building2,
      title: 'Development Agreements',
      description: 'Joint development agreements (JDA), builder collaboration contracts, and revenue sharing frameworks.',
    },
    {
      icon: FileText,
      title: 'Estate & Will Drafting',
      description: 'Complete testamentary planning, online will submission scrutiny, and succession advice.',
    },
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
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Serving Kavali, Nellore, Kandukur & Singarayakonda</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 font-bold tracking-tight">
              Your Trusted Legal Partner
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              With over 25 years of experience, we provide exceptional legal representation tailored to your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
                className="inline-flex items-center justify-center bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded text-lg font-medium transition-colors"
              >
                Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="/practice-areas"
                onClick={(e) => { e.preventDefault(); handleNavigate('/practice-areas'); }}
                className="inline-flex items-center justify-center border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-4 rounded text-lg font-medium transition-colors"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-amber-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
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
              We offer comprehensive legal services across multiple practice areas to meet all your legal needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPracticeAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-slate-200"
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
              View All Practice Areas
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
              <h2 className="text-4xl mb-6 font-bold text-slate-900">
                Why Choose VBL Law Chambers?
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">
                    Proven Track Record
                  </h3>
                  <p className="text-slate-600">
                    Over 25 years of successful outcomes for our clients across various legal disciplines.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">
                    Client-Centered Approach
                  </h3>
                  <p className="text-slate-600">
                    We listen to your needs and tailor our strategies to achieve your specific goals.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">
                    Dedicated Legal Team
                  </h3>
                  <p className="text-slate-600">
                    Our experienced attorneys are committed to providing the highest quality representation.
                  </p>
                </div>
              </div>
              <a
                href="/about"
                onClick={(e) => { e.preventDefault(); handleNavigate('/about'); }}
                className="inline-flex items-center mt-8 text-amber-700 hover:text-amber-800 font-semibold"
              >
                Learn More About Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdHRvcm5leSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTk3OTc2NHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Professional Advocate"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Get Started CTA */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6 font-bold">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Schedule a free consultation with one of our experienced attorneys today.
          </p>
          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
            className="inline-flex items-center bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded text-lg font-medium transition-colors"
          >
            Contact Us Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
