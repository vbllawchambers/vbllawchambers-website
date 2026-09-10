import React, { useState } from 'react';
import { MapPin, Mail, Clock, Send, Award, CheckCircle } from 'lucide-react';

export default function Contact({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.subject && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl mb-4 font-bold tracking-tight">Contact Us</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Get in touch with our team for a free consultation. We're here to help with all your legal needs.
          </p>
        </div>
      </section>

      {/* Main Contact & Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Get in Touch & Advocate Profile */}
            <div>
              <h2 className="text-3xl mb-4 font-bold text-slate-900">Get in Touch</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We're available to answer your questions and discuss your legal needs. Reach out to us through any of the following channels.
              </p>

              {/* Chambers Advocate Badge */}
              <div className="bg-white border border-slate-200 border-l-4 border-l-amber-700 rounded-xl p-5 sm:p-6 mb-8 shadow-sm">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2.5">
                  <Award className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                  <span>Advocate & Notary In-Charge</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">V. Bhagya Lakshmi</h3>
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span className="bg-amber-700 text-white text-xs font-bold px-2 py-0.5 rounded">B.Sc., B.L.</span>
                  <span className="text-xs text-amber-800 font-semibold">Advocate & Notary</span>
                </div>
                <div className="pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                  <span>Kavali, SPSR Nellore Dist., Andhra Pradesh.</span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Location */}
                <div className="flex items-start gap-4 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1">Office Location</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      H. No. 72, Brndavanam Colony,<br />
                      Kavali, SPSR Nellore Dist.,<br />
                      Andhra Pradesh - 524201
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1">Email</h3>
                    <p className="text-sm text-slate-600">
                      <a href="mailto:vbllawchambers@gmail.com" className="hover:text-amber-700 transition-colors font-medium">
                        vbllawchambers@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1">Office Hours</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Consultation Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
                <h2 className="text-3xl mb-6 font-bold text-slate-900">
                  Schedule a Free Consultation
                </h2>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl text-green-800 font-bold mb-2">Thank You!</h3>
                    <p className="text-green-700 text-lg">
                      Your consultation request has been received. Our team at VBL Law Chambers will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold mb-2 text-slate-700">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your Full Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold mb-2 text-slate-700">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-slate-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-slate-700">
                          Subject / Matter *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a practice area</option>
                          <option value="corporate">Corporate Law</option>
                          <option value="criminal">Criminal Defense</option>
                          <option value="family">Family Law</option>
                          <option value="real-estate">Real Estate & Property Law</option>
                          <option value="estate-planning">Estate Planning & Will Drafting</option>
                          <option value="notary">Notary & Legal Documentation</option>
                          <option value="civil">Civil & Commercial Litigation</option>
                          <option value="motor-accidents">Personal Injury & MACT Claims</option>
                          <option value="other">Other Legal Enquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold mb-2 text-slate-700">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="resize-none"
                        placeholder="Please describe your legal matter or enquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer border-0"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>

                    <p className="text-sm text-slate-500 text-center">
                      By submitting this form, you agree to our{' '}
                      <a
                        href="/privacy-policy"
                        onClick={(e) => {
                          e.preventDefault();
                          if (onNavigate) onNavigate('/privacy-policy');
                        }}
                        className="text-amber-700 hover:text-amber-800 underline underline-offset-2"
                      >
                        privacy policy
                      </a>{' '}
                      and{' '}
                      <a
                        href="/terms-of-service"
                        onClick={(e) => {
                          e.preventDefault();
                          if (onNavigate) onNavigate('/terms-of-service');
                        }}
                        className="text-amber-700 hover:text-amber-800 underline underline-offset-2"
                      >
                        terms of service
                      </a>
                      , and consent to be contacted by our team.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Our Office Section */}
      <section className="bg-slate-100 py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-2 font-bold text-slate-900">Visit Our Office</h2>
            <p className="text-slate-600">Conveniently located in Kavali, SPSR Nellore District, Andhra Pradesh</p>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="p-8 bg-slate-900 text-white flex flex-col justify-center">
                <MapPin className="w-10 h-10 text-amber-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">VBL Law Chambers</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  H. No. 72, Brndavanam Colony,<br />
                  Kavali, SPSR Nellore Dist.,<br />
                  Andhra Pradesh - 524201
                </p>
                <div className="pt-4 border-t border-slate-800 text-xs text-amber-400 font-medium">
                  Jurisdiction: Kavali • Nellore • Kandukur • Singarayakonda
                </div>
              </div>
              
              <div className="md:col-span-2 h-96 relative bg-slate-200 flex items-center justify-center overflow-hidden">
                <iframe
                  title="VBL Law Chambers Office Location"
                  className="w-full h-full border-0"
                  loading="lazy"
                  src="https://maps.google.com/maps?q=Kavali,+Andhra+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
