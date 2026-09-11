import React from 'react';
import { Shield, Heart, Target, Award } from 'lucide-react';

export default function About() {
  const coreValues = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We uphold the highest ethical standards in all our legal practices.',
    },
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We understand the personal nature of legal matters and treat every client with empathy.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in every case, providing the best possible legal representation.',
    },
    {
      icon: Award,
      title: 'Experience',
      description: 'With over 25 years of experience, we bring proven expertise to every case.',
    },
  ];

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl mb-4 font-bold tracking-tight">About Us</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            VBL LAW CHAMBERS has been a trusted name in legal services for over two decades.
          </p>
        </div>
      </section>

      {/* Our Story & Mission/Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6 font-bold text-slate-900">Our Story</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Founded in 1999, VBL LAW CHAMBERS, has grown from a small practice to one of the most respected law firms in the region. Our commitment to excellence and client satisfaction has remained unchanged throughout our journey.
                </p>
                <p>
                  We pride ourselves on providing personalized legal services that address the unique needs of each client. Our team of experienced attorneys brings a wealth of knowledge across multiple practice areas, ensuring comprehensive legal support.
                </p>
                <p>
                  Over the years, we have successfully represented hundreds of clients in complex legal matters, earning a reputation for professionalism, integrity, and results.
                </p>
              </div>
            </div>

            <div className="bg-slate-100 p-8 rounded-lg border border-slate-200">
              <h3 className="text-2xl mb-4 font-bold text-slate-900">Our Mission</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                To provide exceptional legal representation while maintaining the highest standards of professionalism, integrity, and client service. We are committed to achieving the best possible outcomes for our clients through strategic thinking, meticulous preparation, and unwavering dedication.
              </p>
              <h3 className="text-2xl mb-4 font-bold text-slate-900">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be the premier law firm in the region, recognized for our legal expertise, innovative approaches, and commitment to justice. We strive to set the standard for excellence in legal services and make a positive impact in our community.
              </p>
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
              These values guide everything we do and shape how we serve our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-md text-center border border-slate-200">
                  <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-amber-700" />
                  </div>
                  <h3 className="text-xl mb-3 font-semibold text-slate-900">{val.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
