import React, { useState } from 'react';
import { MapPin, Mail, Clock, Send, Award, CheckCircle, MessageCircle, PhoneCall, ShieldCheck } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    consultationMode: 'in-person',
    region: 'kavali',
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

  const whatsappUrl = "https://api.whatsapp.com/send?phone=919876543210&text=Hello%20VBL%20Law%20Chambers,%20I%20would%20like%20to%20schedule%20a%20legal%20consultation%20with%20Advocate%20V.%20Bhagya%20Lakshmi.";

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-800/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Direct Chambers Consultation</span>
          </div>
          <h1 className="text-5xl mb-4 font-bold tracking-tight">Contact VBL Law Chambers</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Schedule a confidential consultation with Advocate Smt. V. Bhagya Lakshmi (B.Sc., B.L., Advocate & Notary) in Kavali.
          </p>
        </div>
      </section>

      {/* Main Contact & Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Chambers Profile & Quick Channels (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-3xl mb-3 font-bold text-slate-900">Get in Touch</h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  We are available for chamber visits, document notarization, and consultation regarding civil, family, property, and criminal matters.
                </p>
              </div>

              {/* Chambers Advocate Badge */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-6 border border-amber-500/30 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
                <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2 text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sole Principal Counsel</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">V. Bhagya Lakshmi</h3>
                <div className="text-xs text-amber-300 font-bold mb-3">
                  B.Sc., B.L. — Advocate & Notary Public (Est. 1999)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Practicing before Senior Civil Judge, Sessions & District Courts in Kavali and Nellore.
                </p>
              </div>

              {/* Instant WhatsApp Quick Action */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-0.5">Quick Assistance</div>
                  <div className="text-sm font-semibold text-slate-900">Direct WhatsApp Consultation</div>
                  <div className="text-xs text-slate-600">Send your query or document scan directly</div>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-md transition-transform hover:scale-105 flex-shrink-0"
                  aria-label="Direct WhatsApp Consultation"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                </a>
              </div>

              {/* Contact Details List */}
              <div className="space-y-4 pt-2">
                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="bg-amber-100 p-2.5 rounded-lg flex-shrink-0 text-amber-700">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-0.5">Office & Chambers Address</h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      H. No. 72, Brndavanam Colony,<br />
                      Kavali, SPSR Nellore Dist.,<br />
                      Andhra Pradesh - 524201
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="bg-amber-100 p-2.5 rounded-lg flex-shrink-0 text-amber-700">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-0.5">Official Chambers Email</h4>
                    <a
                      href="mailto:vbllawchambers@gmail.com"
                      className="text-amber-700 hover:text-amber-800 text-xs sm:text-sm font-medium break-all"
                    >
                      vbllawchambers@gmail.com
                    </a>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="bg-amber-100 p-2.5 rounded-lg flex-shrink-0 text-amber-700">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-0.5">Chambers Working Hours</h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: By Prior Appointment Only
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Consultation Booking Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-lg relative">
                <div className="mb-6">
                  <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                    Confidential Inquiry
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Schedule a Consultation
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Fill out the form below to request an appointment with senior advocate Smt. V. Bhagya Lakshmi.
                  </p>
                </div>

                {submitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center animate-in fade-in">
                    <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-2xl text-emerald-900 font-bold mb-2">Consultation Request Received</h3>
                    <p className="text-emerald-800 text-sm sm:text-base mb-6 max-w-lg mx-auto">
                      Thank you for contacting VBL Law Chambers. Advocate Smt. V. Bhagya Lakshmi's chambers will review your enquiry and get back to you promptly.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>Chat on WhatsApp Now</span>
                      </a>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            subject: '',
                            consultationMode: 'in-person',
                            region: 'kavali',
                            message: '',
                          });
                        }}
                        className="border border-slate-300 hover:bg-white text-slate-700 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">
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
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">
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
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                    </div>

                    {/* Phone & Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">
                          Practice Area / Matter *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        >
                          <option value="">Select practice area</option>
                          <option value="property">Real Estate & Property Law</option>
                          <option value="family">Family Law & Matrimonial</option>
                          <option value="will">Will Drafting & Estate Planning</option>
                          <option value="notary">Notary & Legal Attestation</option>
                          <option value="civil">Civil & Commercial Litigation</option>
                          <option value="criminal">Criminal Defense & Bail</option>
                          <option value="mact">Motor Accident Claims (MACT)</option>
                          <option value="corporate">Corporate & Commercial Law</option>
                          <option value="other">Other Legal Inquiry</option>
                        </select>
                      </div>
                    </div>

                    {/* Mode of Consultation & Region */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="consultationMode" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">
                          Preferred Mode *
                        </label>
                        <select
                          id="consultationMode"
                          name="consultationMode"
                          value={formData.consultationMode}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        >
                          <option value="in-person">In-Person Chamber Visit (Kavali)</option>
                          <option value="whatsapp">WhatsApp Consultation</option>
                          <option value="phone">Phone Call Consultation</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="region" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">
                          Location / Jurisdiction *
                        </label>
                        <select
                          id="region"
                          name="region"
                          value={formData.region}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        >
                          <option value="kavali">Kavali</option>
                          <option value="nellore">Nellore</option>
                          <option value="kandukur">Kandukur</option>
                          <option value="singarayakonda">Singarayakonda</option>
                          <option value="other-ap">Other Andhra Pradesh</option>
                          <option value="nri-outstation">NRI / Out of State</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">
                        Matter Summary / Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
                        placeholder="Please provide a brief summary of your legal inquiry or notary requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3.5 rounded-lg text-base font-semibold transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer border-0"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Consultation Request</span>
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                      All consultations and inquiries are treated with strict professional confidentiality.
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
          <div className="text-center mb-10">
            <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
              Chambers Premises
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Visit Our Chambers</h2>
            <p className="text-slate-600 text-sm sm:text-base">Conveniently situated in Kavali, SPSR Nellore District, Andhra Pradesh</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="p-8 sm:p-10 bg-slate-900 text-white flex flex-col justify-between">
                <div>
                  <MapPin className="w-10 h-10 text-amber-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">VBL Law Chambers</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    H. No. 72, Brndavanam Colony,<br />
                    Kavali, SPSR Nellore Dist.,<br />
                    Andhra Pradesh - 524201
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-800">
                  <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                    Court Jurisdiction
                  </div>
                  <div className="text-xs text-slate-300 leading-normal">
                    Senior Civil Judge Court, Kavali • District Court, Nellore • AP High Court
                  </div>
                  <div className="pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp Direct Message</span>
                    </a>
                  </div>
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
