import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
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
            We're here to help. Reach out to schedule a consultation or learn more about our services.
          </p>
        </div>
      </section>

      {/* Main Contact & Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Get in Touch */}
            <div>
              <h2 className="text-3xl mb-4 font-bold text-slate-900">Get in Touch</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Have a question or need legal assistance? Fill out the form or reach out to us directly.
              </p>

              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Office Location</h3>
                    <p className="text-slate-600">
                      123 Legal Avenue, Suite 500<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg flex-shrink-0">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Phone</h3>
                    <p className="text-slate-600">
                      <a href="tel:5551234567" className="hover:text-amber-600 transition-colors">
                        (555) 123-4567
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg flex-shrink-0">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600">
                      <a href="mailto:info@sterlinglaw.com" className="hover:text-amber-600 transition-colors">
                        info@sterlinglaw.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg flex-shrink-0">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Office Hours</h3>
                    <p className="text-slate-600">
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
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="text-green-600 text-5xl mb-4 font-bold">✓</div>
                    <h3 className="text-2xl text-green-800 font-bold mb-2">Thank You!</h3>
                    <p className="text-green-700">
                      Your message has been received. We'll get back to you within 24 hours.
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
                          placeholder="John Doe"
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
                          placeholder="john@example.com"
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
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-slate-700">
                          Subject *
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
                          <option value="real-estate">Real Estate</option>
                          <option value="personal-injury">Personal Injury</option>
                          <option value="employment">Employment Law</option>
                          <option value="estate">Estate Planning</option>
                          <option value="ip">Intellectual Property</option>
                          <option value="other">Other</option>
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
                        placeholder="Please describe your legal matter..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer border-0"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>

                    <p className="text-sm text-slate-500 text-center">
                      By submitting this form, you agree to our privacy policy and consent to be contacted by our team.
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
            <p className="text-slate-600">Conveniently located in the heart of the city</p>
          </div>
          <div className="bg-slate-300 h-96 rounded-lg flex items-center justify-center shadow-inner border border-slate-300">
            <div className="text-center text-slate-700">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-amber-600" />
              <p className="text-xl font-semibold mb-1">Sterling & Associates Headquarters</p>
              <p className="text-base text-slate-600">123 Legal Avenue, Suite 500, New York, NY 10001</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
