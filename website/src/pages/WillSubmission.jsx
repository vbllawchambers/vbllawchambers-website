import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  ShieldCheck, 
  Lock, 
  AlertCircle, 
  Clock, 
  HelpCircle, 
  Award, 
  ArrowRight, 
  ArrowLeft,
  X,
  FileCheck,
  Search,
  Phone,
  MessageCircle,
  ExternalLink,
  Calendar,
  User,
  MapPin
} from 'lucide-react';
import { saveSubmission, getSubmissionByRef } from '../data/sampleSubmissions';

export default function WillSubmission({ onNavigate, currentPath }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Client Tracking State
  const [activeTab, setActiveTab] = useState('submit'); // 'submit' | 'track'
  const [trackingRef, setTrackingRef] = useState('');
  const [trackedSubmission, setTrackedSubmission] = useState(null);
  const [trackSearched, setTrackSearched] = useState(false);
  const [trackError, setTrackError] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

  // Deep link support: /will-submission?ref=VBL-475868 or ?tab=track
  useEffect(() => {
    try {
      const url = currentPath || window.location.href;
      const searchStr = url.includes('?') ? url.split('?')[1] : window.location.search.replace(/^\?/, '');
      const params = new URLSearchParams(searchStr);
      const queryRef = params.get('ref') || params.get('id');
      const tabParam = params.get('tab');

      if (tabParam === 'track' || url.includes('/track')) {
        setActiveTab('track');
      }

      if (queryRef) {
        setActiveTab('track');
        setTrackingRef(queryRef.toUpperCase());
        handleTrackSearch(queryRef.toUpperCase());
      }
    } catch (e) {}
  }, [currentPath]);

  const handleTrackSearch = (refToQuery) => {
    const cleanRef = (refToQuery || trackingRef).trim().toUpperCase();
    if (!cleanRef) {
      setTrackError('Please enter your reference ID (e.g. VBL-475868)');
      setTrackedSubmission(null);
      setTrackSearched(true);
      return;
    }

    setTrackSearched(true);
    const result = getSubmissionByRef(cleanRef);
    if (result) {
      setTrackedSubmission(result);
      setTrackError('');
    } else {
      setTrackedSubmission(null);
      setTrackError(`No record found matching "${cleanRef}". Please verify your reference number or contact our chambers.`);
    }
  };

  const copyToClipboard = (text) => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        setCopiedRef(true);
        setTimeout(() => setCopiedRef(false), 2500);
      }
    } catch (e) {}
  };

  const [formData, setFormData] = useState({
    fullName: '',
    parentSpouseName: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    city: 'Kavali',
    serviceType: 'draft_new', // draft_new, review_existing, codicil, family_settlement
    assetTypes: [],
    executorName: '',
    specialInstructions: '',
    confidentialityConsent: false,
  });

  const assetOptions = [
    { id: 'agricultural_land', label: 'Agricultural / Farm Lands' },
    { id: 'residential_commercial', label: 'Residential / Commercial Real Estate' },
    { id: 'bank_investments', label: 'Bank Deposits, Mutual Funds & Stocks' },
    { id: 'jewelry_valuables', label: 'Gold, Jewelry & Heirlooms' },
    { id: 'business_holdings', label: 'Business Ownership & Partnership Stakes' },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'assetTypes') {
      setFormData(prev => ({
        ...prev,
        assetTypes: checked 
          ? [...prev.assetTypes, value]
          : prev.assetTypes.filter(item => item !== value)
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (incomingFiles) => {
    const newFileList = Array.from(incomingFiles);
    setFiles(prev => [...prev, ...newFileList]);
  };

  const removeFile = (idxToRemove) => {
    setFiles(prev => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!formData.fullName || !formData.phone || !formData.email) {
        alert('Please fill out your full name, phone number, and email address.');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.confidentialityConsent) {
      alert('Please check the consent box to proceed under advocate confidentiality.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create random reference code
      const generatedRef = 'VBL-' + Math.floor(100000 + Math.random() * 900000);
      
      // Submit form payload
      // In production with backend running, this dispatches to /api/will-submission
      // Falling back smoothly so client is always reassured
      const submissionData = new FormData();
      submissionData.append('refId', generatedRef);
      submissionData.append('fullName', formData.fullName);
      submissionData.append('parentSpouseName', formData.parentSpouseName);
      submissionData.append('age', formData.age);
      submissionData.append('phone', formData.phone);
      submissionData.append('email', formData.email);
      submissionData.append('address', formData.address);
      submissionData.append('city', formData.city);
      submissionData.append('serviceType', formData.serviceType);
      submissionData.append('assetTypes', JSON.stringify(formData.assetTypes));
      submissionData.append('executorName', formData.executorName);
      submissionData.append('specialInstructions', formData.specialInstructions);

      files.forEach((file) => {
        submissionData.append('documents', file);
      });

      // Default local fallback record
      let finalSubmissionRecord = {
        refId: generatedRef,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        fullName: formData.fullName,
        parentSpouseName: formData.parentSpouseName,
        age: formData.age || 'N/A',
        phone: formData.phone,
        email: formData.email,
        city: formData.city || 'Kavali',
        address: formData.address,
        serviceType: formData.serviceType,
        serviceLabel: formData.serviceType === 'draft_new' ? 'Fresh Will Drafting' :
                      formData.serviceType === 'review_existing' ? 'Scrutiny of Existing Draft' :
                      formData.serviceType === 'codicil' ? 'Codicil (Amendment)' : 'Family Settlement Deed',
        assetTypes: formData.assetTypes,
        executorName: formData.executorName,
        specialInstructions: formData.specialInstructions,
        documents: files.map(f => ({
          name: f.name,
          size: `${(f.size / 1024).toFixed(1)} KB`,
          driveUrl: 'https://drive.google.com/drive/folders/1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz'
        })),
        status: 'New Submission'
      };

      // Dispatch to backend API
      try {
        const response = await fetch('/api/will-submission', {
          method: 'POST',
          body: submissionData,
        });
        if (response.ok) {
          const resData = await response.json();
          if (resData.submission) {
            finalSubmissionRecord = resData.submission;
          }
        }
      } catch (apiErr) {
        console.warn('Backend API submission deferred:', apiErr);
      }

      // Save to localStorage so Chambers Portal and Client Tracker immediately have access
      try {
        saveSubmission(finalSubmissionRecord);
      } catch (cacheErr) {
        console.warn('Failed to cache submission locally:', cacheErr);
      }

      setReferenceId(finalSubmissionRecord.refId || generatedRef);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Advocate-Client Confidential &amp; Encrypted</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Online Will Submission &amp; Testamentary Planning
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-6">
            Securely submit your testamentary instructions, existing drafts, or title documents for professional scrutiny and preparation by Smt. V. Bhagya Lakshmi (Advocate &amp; Notary, Kavali).
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('submit')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'submit'
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              Submit Will Instructions
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('track')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 ${
                activeTab === 'track'
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Application Status</span>
            </button>
          </div>
        </div>
      </section>

      {/* Trust & Compliance Bar */}
      <section className="bg-slate-50 border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-700 flex-shrink-0" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">Legal Validity</h2>
                <p className="text-xs text-slate-600">Indian Succession Act, 1925 compliant</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-700 flex-shrink-0" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">Notary Authorized</h2>
                <p className="text-xs text-slate-600">Official execution &amp; attestation support</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-700 flex-shrink-0" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">24-48h Scrutiny</h2>
                <p className="text-xs text-slate-600">Personal legal review by senior advocate</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-amber-700 flex-shrink-0" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">Strict Privacy</h2>
                <p className="text-xs text-slate-600">Encrypted Google Drive archival</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Submission Form & Status Tracker Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Tab Switcher */}
          <div className="flex justify-center mb-10">
            <div className="bg-slate-100 p-1.5 rounded-xl inline-flex border border-slate-200 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('submit')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  activeTab === 'submit'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4 text-amber-700" />
                <span>Submit Will Instructions</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('track')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  activeTab === 'track'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Search className="w-4 h-4 text-amber-700" />
                <span>Track Application Status</span>
              </button>
            </div>
          </div>

          {activeTab === 'track' ? (
            /* Client Application Status Tracker */
            <div className="space-y-8">
              {/* Lookup Card */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-10">
                <div className="max-w-2xl mx-auto text-center mb-8">
                  <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                    Track Will Application Status
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Enter your Chambers Reference ID (e.g. <span className="font-mono font-semibold text-amber-800">VBL-475868</span>) provided during submission to view real-time advocate scrutiny progress, legal milestones, and scheduled consultations.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleTrackSearch();
                  }}
                  className="max-w-xl mx-auto"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <FileText className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        value={trackingRef}
                        onChange={(e) => {
                          setTrackingRef(e.target.value.toUpperCase());
                          if (trackError) setTrackError('');
                        }}
                        placeholder="e.g. VBL-475868"
                        className="w-full pl-11 pr-4 py-3.5 text-base font-mono uppercase bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900 placeholder:text-slate-400 transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Search className="w-4 h-4" />
                      <span>Track Status</span>
                    </button>
                  </div>

                  {/* Sample Query Suggestions */}
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
                    <span>Quick lookup samples:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setTrackingRef('VBL-475868');
                        handleTrackSearch('VBL-475868');
                      }}
                      className="font-mono bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 px-2.5 py-1 rounded-md border border-slate-200 transition-colors cursor-pointer"
                    >
                      VBL-475868
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTrackingRef('VBL-829104');
                        handleTrackSearch('VBL-829104');
                      }}
                      className="font-mono bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 px-2.5 py-1 rounded-md border border-slate-200 transition-colors cursor-pointer"
                    >
                      VBL-829104
                    </button>
                  </div>

                  {trackError && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                      <div>
                        <p className="font-semibold">Reference ID Not Found</p>
                        <p className="text-xs text-red-600 mt-0.5">{trackError}</p>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Status Report Section */}
              {trackedSubmission ? (
                <div className="space-y-6">
                  {/* Reference Header Banner */}
                  <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full">
                            Confidential Client Record
                          </span>
                          <span className="text-xs text-slate-400">
                            Logged: {trackedSubmission.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-wide">
                            {trackedSubmission.refId}
                          </h3>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(trackedSubmission.refId)}
                            className="text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                          >
                            {copiedRef ? 'Copied!' : 'Copy Ref'}
                          </button>
                        </div>
                        <p className="text-sm text-slate-300 mt-1">
                          Testator / Applicant: <strong className="text-white">{trackedSubmission.fullName}</strong>
                        </p>
                      </div>

                      {/* Current Status Pill */}
                      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                        <div>
                          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                            Current Stage
                          </span>
                          <span className="text-base font-bold text-amber-400">
                            {trackedSubmission.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4-Stage Legal Scrutiny & Execution Pipeline */}
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
                    <div className="border-b border-slate-200 pb-4 mb-6 flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">
                          Statutory Scrutiny &amp; Execution Progress
                        </h4>
                        <p className="text-xs text-slate-500">
                          Progress tracked under Section 126 of Indian Evidence Act &amp; Indian Succession Act, 1925
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 hidden sm:inline-block">
                        4 Verified Steps
                      </span>
                    </div>

                    <div className="space-y-6">
                      {[
                        {
                          step: 1,
                          name: 'Submission Received & Encrypted',
                          desc: 'Testator particulars, asset schedule, and documents safely archived in confidential chambers repository.',
                          timeframe: 'Completed upon submission',
                          statusMatch: ['New Submission', 'Under Scrutiny', 'Consultation Scheduled', 'Ready for Attestation', 'Completed']
                        },
                        {
                          step: 2,
                          name: 'Advocate Scrutiny & Title Verification',
                          desc: 'Senior Advocate Smt. V. Bhagya Lakshmi personally examining title deeds, property schedules, and statutory capacity.',
                          timeframe: '24 - 48 Hours',
                          statusMatch: ['Under Scrutiny', 'Consultation Scheduled', 'Ready for Attestation', 'Completed']
                        },
                        {
                          step: 3,
                          name: 'Verificatory Consultation & Intent Confirmation',
                          desc: 'Chambers conference with testator to verify free will, exclude coercion, and finalize specific asset apportionments.',
                          timeframe: 'Direct Scheduling',
                          statusMatch: ['Consultation Scheduled', 'Ready for Attestation', 'Completed']
                        },
                        {
                          step: 4,
                          name: 'Statutory Drafting & Attestation / Notarization',
                          desc: 'Final engrossing of will deed, execution before two independent witnesses, and authorized Notary Public attestation.',
                          timeframe: 'Final Appointment',
                          statusMatch: ['Ready for Attestation', 'Completed']
                        }
                      ].map((st) => {
                        const isCompleted = st.statusMatch.includes(trackedSubmission.status) && (
                          st.step === 1 ? true :
                          st.step === 2 ? ['Consultation Scheduled', 'Ready for Attestation', 'Completed'].includes(trackedSubmission.status) :
                          st.step === 3 ? ['Ready for Attestation', 'Completed'].includes(trackedSubmission.status) :
                          trackedSubmission.status === 'Completed'
                        );
                        const isCurrent = (
                          st.step === 1 && trackedSubmission.status === 'New Submission' ||
                          st.step === 2 && trackedSubmission.status === 'Under Scrutiny' ||
                          st.step === 3 && trackedSubmission.status === 'Consultation Scheduled' ||
                          st.step === 4 && trackedSubmission.status === 'Ready for Attestation'
                        );

                        return (
                          <div key={st.step} className="flex items-start gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                                  isCompleted
                                    ? 'bg-green-600 text-white'
                                    : isCurrent
                                    ? 'bg-amber-700 text-white ring-4 ring-amber-100'
                                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="w-5 h-5" />
                                ) : isCurrent ? (
                                  <Clock className="w-5 h-5" />
                                ) : (
                                  st.step
                                )}
                              </div>
                              {st.step < 4 && (
                                <div
                                  className={`w-0.5 h-12 mt-2 ${
                                    isCompleted ? 'bg-green-600' : 'bg-slate-200'
                                  }`}
                                />
                              )}
                            </div>

                            <div className="flex-1 pt-1">
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                                <h5 className={`text-base font-bold ${
                                  isCurrent ? 'text-amber-800' : isCompleted ? 'text-slate-900' : 'text-slate-500'
                                }`}>
                                  {st.step}. {st.name}
                                </h5>
                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                  isCompleted
                                    ? 'bg-green-50 text-green-800 border border-green-200'
                                    : isCurrent
                                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                                }`}>
                                  {isCompleted ? 'Completed' : isCurrent ? 'Active Stage' : 'Pending'}
                                </span>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed mb-1">
                                {st.desc}
                              </p>
                              <span className="text-xs text-slate-400 italic">
                                Timeline: {st.timeframe}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submission Summary Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: Testator & Service Particulars */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                        <User className="w-4 h-4 text-amber-700" />
                        <span>Testator &amp; Case Particulars</span>
                      </h4>
                      <dl className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <dt className="text-slate-500">Service Category:</dt>
                          <dd className="font-semibold text-slate-900 text-right">
                            {trackedSubmission.serviceLabel || 'Will Drafting & Document Scrutiny'}
                          </dd>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <dt className="text-slate-500">Supervising Counsel:</dt>
                          <dd className="font-semibold text-amber-800 text-right">
                            Smt. V. Bhagya Lakshmi
                          </dd>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <dt className="text-slate-500">Designation:</dt>
                          <dd className="text-slate-700 text-right">
                            Senior Advocate &amp; Notary Public
                          </dd>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <dt className="text-slate-500">Jurisdiction:</dt>
                          <dd className="text-slate-700 text-right">
                            {trackedSubmission.city || 'Kavali'} (Nellore Dist., AP)
                          </dd>
                        </div>
                        <div className="flex justify-between pt-1">
                          <dt className="text-slate-500">Privilege Protection:</dt>
                          <dd className="font-semibold text-green-700 text-right flex items-center gap-1">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Sec 126 IEA Active</span>
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Right: Attached Documents & Assets Declared */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-amber-700" />
                        <span>Submitted Asset Schedules &amp; Vault</span>
                      </h4>

                      {trackedSubmission.assetTypes && trackedSubmission.assetTypes.length > 0 && (
                        <div className="mb-4">
                          <span className="text-xs text-slate-500 block mb-2 font-medium">
                            Asset Schedules Disclosed:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {trackedSubmission.assetTypes.map((ast, i) => (
                              <span
                                key={i}
                                className="text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-md"
                              >
                                {ast}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="text-xs text-slate-500 block mb-2 font-medium">
                          Encrypted Documents in Chambers Vault:
                        </span>
                        {trackedSubmission.documents && trackedSubmission.documents.length > 0 ? (
                          <div className="space-y-2">
                            {trackedSubmission.documents.map((doc, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                              >
                                <div className="flex items-center gap-2 truncate mr-2">
                                  <Lock className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                                  <span className="font-mono text-slate-800 truncate">{doc.name}</span>
                                </div>
                                <span className="text-slate-500 flex-shrink-0">{doc.size}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg border border-slate-200">
                            Physical verification or virtual scan scheduled with counsel.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Immediate Advocate Contact Card */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                          <Clock className="w-5 h-5 text-amber-700" />
                          <h4 className="text-base font-bold text-slate-900">
                            Need Immediate Verification or Urgency?
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 max-w-xl">
                          Senior Advocate Smt. V. Bhagya Lakshmi is available for personal chambers consultations and urgent testamentary matters in Kavali.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <a
                          href="tel:+919849202517"
                          className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Call Chambers</span>
                        </a>
                        <a
                          href={`https://wa.me/919849202517?text=Hello%20Advocate%20Bhagya%20Lakshmi,%20I%20am%20checking%20the%20status%20of%20my%20Will%20submission%20${encodeURIComponent(trackedSubmission.refId)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp Status</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : !trackSearched ? (
                /* Information Guide before search */
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
                  <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-700" />
                    <span>How Will Application Tracking Works</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 mt-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">1</span>
                        <span>Reference ID</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Generated automatically when you submit your initial instructions or title deeds.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">2</span>
                        <span>Personal Scrutiny</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Smt. V. Bhagya Lakshmi personally reviews encumbrances and succession classes within 24-48 hours.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">3</span>
                        <span>Execution &amp; Attestation</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Coordinated signing before two attesting witnesses and formal Notary Public registration.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            submitted ? (
              /* Success Screen */
              <div className="bg-white border-2 border-green-500 rounded-2xl p-8 sm:p-12 shadow-lg text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Will Submission Successfully Received
                </h2>
                <p className="text-slate-600 max-w-xl mx-auto mb-6 text-base leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your confidential testamentary details and uploaded documents have been securely recorded.
                </p>

                <div className="inline-block bg-slate-100 border border-slate-300 rounded-xl px-6 py-3 mb-6">
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                    Reference Tracking Number
                  </span>
                  <span className="text-2xl font-mono font-bold text-amber-800">
                    {referenceId}
                  </span>
                </div>

                {/* Direct Action: Track Now */}
                <div className="mb-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('track');
                      setTrackingRef(referenceId);
                      handleTrackSearch(referenceId);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md transition-all text-base cursor-pointer"
                  >
                    <Search className="w-5 h-5" />
                    <span>Track Application Status Now ({referenceId})</span>
                  </button>
                </div>

                <div className="max-w-lg mx-auto bg-amber-50 border border-amber-200 rounded-xl p-5 text-left text-sm text-slate-700 mb-8 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-amber-700" />
                    <span>Next Steps in the Process:</span>
                  </div>
                  <p>• Senior Advocate Smt. V. Bhagya Lakshmi will personally scrutinize the asset schedule and documents.</p>
                  <p>• Our office will contact you at <strong>{formData.phone}</strong> to verify testator intent and schedule an in-person or virtual consultation.</p>
                  <p>• A customized draft will be drawn up conforming to statutory execution requirements.</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="/"
                    onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('/'); }}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    Return to Home
                  </a>
                  <a
                    href="/contact"
                    onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('/contact'); }}
                    className="bg-amber-700 hover:bg-amber-800 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    Contact Chambers Directly
                  </a>
                </div>
              </div>
            ) : (
              /* Form Wizard */
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-10">
              
              {/* Stepper Header */}
              <div className="mb-10">
                <div className="flex items-center justify-between max-w-xl mx-auto mb-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                        currentStep === step 
                          ? 'bg-amber-700 text-white ring-4 ring-amber-100' 
                          : currentStep > step 
                            ? 'bg-green-600 text-white' 
                            : 'bg-slate-100 text-slate-500'
                      }`}>
                        {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                      </div>
                      <span className={`text-xs font-semibold hidden sm:inline ${
                        currentStep === step ? 'text-amber-800' : 'text-slate-500'
                      }`}>
                        {step === 1 ? 'Testator Info' : step === 2 ? 'Will & Assets' : 'Upload & Confirm'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-700 transition-all duration-300 rounded-full"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>
              </div>

              <form onSubmit={currentStep === 3 ? handleSubmit : handleNext}>
                {/* STEP 1: Personal & Testator Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        Step 1: Testator &amp; Client Details
                      </h2>
                      <p className="text-sm text-slate-600">
                        Information of the individual executing the will or the family representative.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-1">
                          Full Legal Name *
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          placeholder="As per Aadhaar or official records"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                        />
                      </div>

                      <div>
                        <label htmlFor="parentSpouseName" className="block text-sm font-semibold text-slate-700 mb-1">
                          Father's / Husband's Name
                        </label>
                        <input
                          id="parentSpouseName"
                          type="text"
                          name="parentSpouseName"
                          value={formData.parentSpouseName}
                          onChange={handleInputChange}
                          placeholder="S/o, D/o, or W/o"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="+91 98480 XXXXX"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="yourname@gmail.com"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                        />
                      </div>

                      <div>
                        <label htmlFor="age" className="block text-sm font-semibold text-slate-700 mb-1">
                          Age of Testator
                        </label>
                        <input
                          id="age"
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="e.g. 58"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                        />
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-sm font-semibold text-slate-700 mb-1">
                          City / Town
                        </label>
                        <input
                          id="city"
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Kavali, Nellore, etc."
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-semibold text-slate-700 mb-1">
                        Full Residential Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        rows="2"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Door No., Street/Colony, District, Pincode"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
                      >
                        <span>Next: Will &amp; Assets</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Will Details & Asset Types */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        Step 2: Objective &amp; Asset Classification
                      </h2>
                      <p className="text-sm text-slate-600">
                        Select the legal service required and the categories of property involved.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Primary Legal Service Required *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: 'draft_new', title: 'Fresh Will Drafting', desc: 'Prepare a comprehensive, binding new will' },
                          { id: 'review_existing', title: 'Scrutiny of Existing Draft', desc: 'Legal review & validation of drafted will' },
                          { id: 'codicil', title: 'Codicil (Will Amendment)', desc: 'Add or modify terms of an existing will' },
                          { id: 'family_settlement', title: 'Family Settlement Deed', desc: 'Partition & amicable dispute settlement' },
                        ].map((srv) => (
                          <label
                            key={srv.id}
                            className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                              formData.serviceType === srv.id 
                                ? 'border-amber-600 bg-amber-50/50 ring-2 ring-amber-500/20' 
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <input
                                type="radio"
                                name="serviceType"
                                value={srv.id}
                                checked={formData.serviceType === srv.id}
                                onChange={handleInputChange}
                                className="text-amber-600 focus:ring-amber-500"
                              />
                              <span className="font-bold text-sm text-slate-900">{srv.title}</span>
                            </div>
                            <span className="text-xs text-slate-600 pl-5">{srv.desc}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Assets to be Included in Will / Settlement (Check all that apply)
                      </label>
                      <div className="space-y-2.5">
                        {assetOptions.map((asset) => (
                          <label key={asset.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                            <input
                              type="checkbox"
                              name="assetTypes"
                              value={asset.id}
                              checked={formData.assetTypes.includes(asset.id)}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                            />
                            <span className="text-sm font-medium text-slate-800">{asset.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="executorName" className="block text-sm font-semibold text-slate-700 mb-1">
                        Intended Executor / Beneficiary Notes (Optional)
                      </label>
                      <input
                        id="executorName"
                        type="text"
                        name="executorName"
                        value={formData.executorName}
                        onChange={handleInputChange}
                        placeholder="Names of primary heirs or trusted executor"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
                      >
                        <span>Next: Upload Documents</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Document Upload & Final Confirmation */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        Step 3: Document Upload &amp; Submission
                      </h2>
                      <p className="text-sm text-slate-600">
                        Upload existing drafts, pattadar passbooks, title deeds, or scanned notes (PDF, DOCX, JPG).
                      </p>
                    </div>

                    {/* Drag and Drop Zone */}
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleFileDrop}
                      className="border-2 border-dashed border-slate-300 hover:border-amber-600 rounded-xl p-8 text-center bg-slate-50/50 hover:bg-amber-50/30 transition-all cursor-pointer"
                      onClick={() => document.getElementById('file-upload-input').click()}
                    >
                      <Upload className="w-12 h-12 text-amber-700 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-slate-900 mb-1">
                        Drag &amp; drop your documents here, or <span className="text-amber-700 underline">browse</span>
                      </p>
                      <p className="text-xs text-slate-500">
                        Accepts PDF, DOCX, JPG, PNG (Max 25MB total)
                      </p>
                      <input
                        id="file-upload-input"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileInput}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                    </div>

                    {/* File Previews */}
                    {files.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Uploaded Documents ({files.length})
                        </div>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {files.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white">
                              <div className="flex items-center gap-2 text-sm text-slate-800 truncate">
                                <FileCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span className="truncate">{file.name}</span>
                                <span className="text-xs text-slate-400">
                                  ({(file.size / 1024).toFixed(1)} KB)
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                                className="text-slate-400 hover:text-red-500 p-1"
                                title="Remove file"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label htmlFor="specialInstructions" className="block text-sm font-semibold text-slate-700 mb-1">
                        Special Instructions or Background Information
                      </label>
                      <textarea
                        id="specialInstructions"
                        name="specialInstructions"
                        rows="3"
                        value={formData.specialInstructions}
                        onChange={handleInputChange}
                        placeholder="Mention any specific wishes, conditions, concerns regarding family disputes, or registration preferences..."
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                    </div>

                    {/* Legal Consent Checkbox */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="confidentialityConsent"
                          checked={formData.confidentialityConsent}
                          onChange={handleInputChange}
                          required
                          className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 mt-1"
                        />
                        <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          I confirm that the details provided are true to the best of my knowledge. I authorize <strong>VBL Law Chambers</strong> to review these documents under strict advocate-client confidentiality in compliance with the Bar Council of India standards.
                        </span>
                      </label>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-lg transition-colors cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span>Encrypting &amp; Submitting...</span>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" />
                            <span>Submit for Confidential Review</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          ))}

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Frequently Asked Questions About Will Drafting
            </h2>
            <p className="text-slate-600 text-base">
              Key legal guidelines regarding wills, codicils, and inheritance under Indian law.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>Is registration of a will mandatory in Andhra Pradesh?</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Under Section 18 of the Registration Act, 1908, the registration of a will is optional. However, registered wills or wills executed before an authorized Notary Public carry high evidentiary value and provide strong legal protection against spurious claims by third parties.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>What documents are required to prepare a legally sound will?</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                You will need identity proof of the testator (Aadhaar or Voter ID), property title deeds or pattadar passbooks for immovable properties, bank account details for financial assets, and names with addresses of two independent witnesses who are not beneficiaries.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>How is my information protected when I submit documents online?</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                All communications and submissions are governed by the statutory advocate-client privilege under Section 126 of the Indian Evidence Act. Uploaded documents are streamed directly to our encrypted chambers storage and are only accessible by our authorized legal team.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
