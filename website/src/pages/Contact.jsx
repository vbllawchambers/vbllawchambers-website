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
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Direct Chambers Consultation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-4">
            Contact VBL Law Chambers
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-light">
            Schedule a confidential legal consultation with Advocate <strong className="text-white font-semibold">Smt. V. Bhagya Lakshmi (B.Sc., B.L., Advocate & Notary)</strong> at our chambers in Kavali.
          </p>
        </div>
      </section>

      {/* Main Contact & Form Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Chambers Profile & Quick Channels (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                  Direct Chambers Access
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Get in Touch</h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  We are available for in-person chamber visits, document notarization, and confidential consultation regarding civil, family, property, and criminal matters.
                </p>
              </div>

              {/* Chambers Advocate Badge */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 border border-amber-500/40 shadow-xl relative overflow-hidden ring-1 ring-amber-400/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdHRvcm5leSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTk3OTc2NHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Smt. V. Bhagya Lakshmi, Advocate & Notary"
                    className="w-16 h-16 rounded-full object-cover object-top border-2 border-amber-400/80 shadow-md ring-2 ring-amber-400/20 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-0.5 text-xs uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Sole Principal Counsel</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white leading-tight">
                      Smt. V. Bhagya Lakshmi
                    </h3>
                    <div className="text-xs text-amber-300 font-semibold mt-0.5">
                      B.Sc., B.L. — Advocate & Notary Public
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-3 flex items-center justify-between">
                  <span>Senior Civil Judge Court, Kavali</span>
                  <span className="text-amber-400 font-semibold">25+ Yrs Practice</span>
                </div>
              </div>

              {/* Instant WhatsApp Quick Action */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm hover:border-emerald-400 transition-colors">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-0.5">Instant Contact</div>
                  <div className="text-sm font-bold text-slate-900">Direct WhatsApp Consultation</div>
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
              <div className="space-y-3.5 pt-1">
                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
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
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
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
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
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
              <div className="bg-white border border-slate-200/90 rounded-2xl p-8 sm:p-10 shadow-xl relative">
                <div className="mb-6">
                  <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                    Confidential Legal Request
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    Schedule a Consultation
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Fill out the form below to request an appointment with senior advocate Smt. V. Bhagya Lakshmi.
                  </p>
                </div>

                {submitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 sm:p-10 text-center animate-in fade-in">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-emerald-950 mb-2">
                      Consultation Request Received
                    </h3>
                    <p className="text-emerald-800 text-sm sm:text-base mb-6 max-w-lg mx-auto leading-relaxed">
                      Thank you for contacting VBL Law Chambers. Advocate Smt. V. Bhagya Lakshmi's chambers will review your enquiry and contact you promptly.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-md"
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
                        className="border border-slate-300 hover:bg-white text-slate-700 px-5 py-3 rounded-xl text-sm font-semibold transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Consultation Mode Interactive Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700">
                        Select Preferred Consultation Mode *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'in-person', label: 'In-Person Chamber Visit', icon: '🏛️' },
                          { id: 'whatsapp', label: 'WhatsApp Consultation', icon: '💬' },
                          { id: 'phone', label: 'Phone Call Discussion', icon: '📞' },
                        ].map((mode) => (
                          <button
                            type="button"
                            key={mode.id}
                            onClick={() => setFormData((prev) => ({ ...prev, consultationMode: mode.id }))}
                            className={`p-3 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer flex flex-col items-center gap-1 ${
                              formData.consultationMode === mode.id
                                ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-400/20 shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <span className="text-base">{mode.icon}</span>
                            <span>{mode.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

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

                    {/* Region Selector */}
                    <div>
                      <label htmlFor="region" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">
                        Client Location / Judicial Jurisdiction *
                      </label>
                      <select
                        id="region"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                      >
                        <option value="kavali">Kavali (Local Chambers)</option>
                        <option value="nellore">Nellore (District Courts)</option>
                        <option value="kandukur">Kandukur</option>
                        <option value="singarayakonda">Singarayakonda</option>
                        <option value="other-ap">Other Andhra Pradesh Jurisdiction</option>
                        <option value="nri-outstation">NRI / Out of State</option>
                      </select>
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
                        className="resize-none"
                        placeholder="Please provide a brief summary of your legal inquiry or notary requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3.5 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer border-0"
                    >
                      <Send className="w-4 h-4 text-amber-200" />
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
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
              Chambers Premises
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">Visit Our Chambers</h2>
            <p className="text-slate-600 text-sm sm:text-base">Conveniently situated in Kavali, SPSR Nellore District, Andhra Pradesh</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200/90">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="p-8 sm:p-10 bg-slate-950 text-white flex flex-col justify-between">
                <div>
                  <MapPin className="w-10 h-10 text-amber-500 mb-4" />
                  <h3 className="text-2xl font-serif font-bold mb-2">VBL Law Chambers</h3>
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
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm"
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
