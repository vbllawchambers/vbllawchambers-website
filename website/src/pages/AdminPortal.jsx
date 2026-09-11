import React, { useState, useEffect } from 'react';
import {
  Lock,
  Search,
  Filter,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  LogOut,
  Folder,
  FolderOpen,
  Calendar,
  User,
  MapPin,
  FileCheck
} from 'lucide-react';

import { INITIAL_SAMPLE_SUBMISSIONS, getStoredSubmissions } from '../data/sampleSubmissions';

const CHAMBERS_PASSCODE = (import.meta.env.VITE_CHAMBERS_PASSCODE || 'vbl2026').toLowerCase().trim();

export default function AdminPortal({ onNavigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('vbl_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  const [submissions, setSubmissions] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Load submissions from local storage + API + sample data
  useEffect(() => {
    const loaded = getStoredSubmissions();
    setSubmissions(loaded);
    setSelectedSubmission(loaded[0] || null);

    // Also attempt fetching from API if backend is active
    fetch('/api/will-submissions')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.submissions)) {
          setSubmissions(data.submissions);
        }
      })
      .catch(() => {
        // Backend offline; sample & local data active
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === CHAMBERS_PASSCODE) {
      sessionStorage.setItem('vbl_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('vbl_admin_auth');
    setIsAuthenticated(false);
    setPasscode('');
  };

  const handleStatusChange = (refId, newStatus) => {
    setSubmissions((prev) => {
      const updated = prev.map((sub) => (sub.refId === refId ? { ...sub, status: newStatus } : sub));
      try {
        localStorage.setItem('vbl_will_submissions', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    if (selectedSubmission && selectedSubmission.refId === refId) {
      setSelectedSubmission((prev) => ({ ...prev, status: newStatus }));
    }
    fetch(`/api/will-submissions/${refId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).catch(() => {});
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesFilter = filterStatus === 'All' || sub.status === filterStatus;
    const matchesSearch =
      sub.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.refId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.phone.includes(searchQuery) ||
      sub.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Helper to generate WhatsApp deep-link
  const getWhatsAppLink = (sub) => {
    const cleanPhone = sub.phone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    const text = encodeURIComponent(
      `Namaste ${sub.fullName} garu, this is Advocate Smt. V. Bhagya Lakshmi's office (VBL Law Chambers, Kavali). We have received your Will Submission (${sub.refId}) and would like to discuss your legal instructions. When would be a convenient time for a brief call?`
    );
    return `https://wa.me/${phoneWithCountry}?text=${text}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-100 px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-amber-500/50 shadow-md">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>

          <h1 className="text-2xl font-bold text-center text-slate-900 mb-1">
            Chambers Management Portal
          </h1>
          <p className="text-xs text-center text-slate-500 mb-6">
            Authorized Advocates &amp; Notary Access — VBL Law Chambers, Kavali
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="passcode" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Chambers Passcode
              </label>
              <input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setAuthError(false); }}
                placeholder="Enter secret passcode (default: vbl2026)"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-slate-900 font-medium"
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-red-600 text-xs font-semibold bg-red-50 p-2.5 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Incorrect chambers passcode. Please try again.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-4 rounded-lg transition-colors cursor-pointer shadow-md"
            >
              Sign In to Chambers Portal
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('/'); }}
              className="text-xs text-slate-500 hover:text-amber-700 transition-colors font-medium"
            >
              ← Return to Public Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-16">
      {/* Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center font-bold text-white shadow">
              ⚖️
            </div>
            <div>
              <span className="font-bold text-base block tracking-tight leading-tight">
                VBL Law Chambers — Inquiries &amp; Submissions
              </span>
              <span className="text-xs text-amber-400 font-medium">
                Advocate &amp; Notary Admin Console • Kavali, AP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Drive Storage: Synced</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-slate-700"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Total Applications
            </span>
            <span className="text-3xl font-bold text-slate-900">{submissions.length}</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block mb-1">
              New Submissions
            </span>
            <span className="text-3xl font-bold text-amber-700">
              {submissions.filter(s => s.status === 'New Submission').length}
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
              Under Legal Scrutiny
            </span>
            <span className="text-3xl font-bold text-blue-600">
              {submissions.filter(s => s.status === 'Under Scrutiny').length}
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-green-600 uppercase tracking-wider block mb-1">
              Consultation Scheduled
            </span>
            <span className="text-3xl font-bold text-green-600">
              {submissions.filter(s => s.status === 'Consultation Scheduled').length}
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client, ref ID, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            {['All', 'New Submission', 'Under Scrutiny', 'Consultation Scheduled', 'Completed'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  filterStatus === status
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Layout: Submissions List & Detailed Client Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Submissions List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              <span>Client Submissions ({filteredSubmissions.length})</span>
            </div>

            {filteredSubmissions.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border border-slate-200 text-slate-500 text-sm">
                No submissions match your search.
              </div>
            ) : (
              filteredSubmissions.map((sub) => {
                const isSelected = selectedSubmission && selectedSubmission.refId === sub.refId;
                return (
                  <div
                    key={sub.refId}
                    onClick={() => setSelectedSubmission(sub)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer bg-white ${
                      isSelected
                        ? 'border-amber-600 ring-2 ring-amber-500/20 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {sub.refId}
                      </span>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        sub.status === 'New Submission' ? 'bg-amber-100 text-amber-800' :
                        sub.status === 'Under Scrutiny' ? 'bg-blue-100 text-blue-800' :
                        sub.status === 'Consultation Scheduled' ? 'bg-green-100 text-green-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {sub.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 mb-0.5">{sub.fullName}</h3>
                    <p className="text-xs text-slate-500 mb-2">
                      {sub.serviceLabel || sub.serviceType} • {sub.city} • Age {sub.age}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <FolderOpen className="w-3.5 h-3.5 text-slate-400" />
                        <span>{sub.documents?.length || 1} documents</span>
                      </span>
                      <span>{sub.date}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Active Client Dossier & Actions (7 cols) */}
          <div className="lg:col-span-7">
            {selectedSubmission ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 sticky top-24">
                
                {/* Dossier Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        {selectedSubmission.refId}
                      </span>
                      <span className="text-xs text-slate-500">{selectedSubmission.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {selectedSubmission.fullName}
                    </h2>
                    <p className="text-xs text-slate-600 font-medium">
                      {selectedSubmission.parentSpouseName} • Age {selectedSubmission.age}
                    </p>
                  </div>

                  {/* Status Dropdown */}
                  <div>
                    <label htmlFor="statusSelect" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Workflow Status
                    </label>
                    <select
                      id="statusSelect"
                      value={selectedSubmission.status}
                      onChange={(e) => handleStatusChange(selectedSubmission.refId, e.target.value)}
                      className="text-xs font-bold px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="New Submission">🟡 New Submission</option>
                      <option value="Under Scrutiny">🔵 Under Legal Scrutiny</option>
                      <option value="Consultation Scheduled">🟢 Consultation Scheduled</option>
                      <option value="Completed">✅ Will Executed / Completed</option>
                    </select>
                  </div>
                </div>

                {/* 1-Click Client Contact Bar */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">
                    Direct Client Communication Actions
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {/* WhatsApp Action */}
                    <a
                      href={getWhatsAppLink(selectedSubmission)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Client</span>
                    </a>

                    {/* Phone Call Action */}
                    <a
                      href={`tel:${selectedSubmission.phone}`}
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call ({selectedSubmission.phone})</span>
                    </a>

                    {/* Email Action */}
                    <a
                      href={`mailto:${selectedSubmission.email}?subject=VBL Law Chambers - Regarding Will Submission (${selectedSubmission.refId})`}
                      className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
                    >
                      <Mail className="w-4 h-4 text-amber-700" />
                      <span>Send Email</span>
                    </a>
                  </div>
                </div>

                {/* Client Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-100">
                    <span className="text-xs text-slate-400 font-semibold block mb-0.5">Service Requested</span>
                    <span className="font-bold text-slate-900">{selectedSubmission.serviceLabel || selectedSubmission.serviceType}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-100">
                    <span className="text-xs text-slate-400 font-semibold block mb-0.5">Location / City</span>
                    <span className="font-bold text-slate-900">{selectedSubmission.city}, Andhra Pradesh</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-100 sm:col-span-2">
                    <span className="text-xs text-slate-400 font-semibold block mb-0.5">Full Residential Address</span>
                    <span className="text-slate-800">{selectedSubmission.address || 'Address provided upon consultation'}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-100 sm:col-span-2">
                    <span className="text-xs text-slate-400 font-semibold block mb-1">Assets Scheduled for Testament</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSubmission.assetTypes && selectedSubmission.assetTypes.length > 0 ? (
                        selectedSubmission.assetTypes.map((asset, i) => (
                          <span key={i} className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-medium border border-slate-200">
                            {asset}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500">General Estate Assets</span>
                      )}
                    </div>
                  </div>

                  {selectedSubmission.executorName && (
                    <div className="p-3.5 rounded-xl bg-white border border-slate-100 sm:col-span-2">
                      <span className="text-xs text-slate-400 font-semibold block mb-0.5">Designated Executor / Beneficiary Notes</span>
                      <span className="font-medium text-slate-800">{selectedSubmission.executorName}</span>
                    </div>
                  )}

                  {selectedSubmission.specialInstructions && (
                    <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 sm:col-span-2">
                      <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-1">
                        Client's Confidential Instructions
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed italic">
                        "{selectedSubmission.specialInstructions}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Uploaded Documents & Google Drive Links */}
                <div className="pt-4 border-t border-slate-200">
                  {/* Dedicated Organized Drive Folder Card */}
                  <div className="mb-4 p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 flex-shrink-0">
                        <Folder className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                          Organized Google Drive Folder
                        </span>
                        <span className="text-xs font-semibold text-slate-800 truncate block font-mono">
                          {selectedSubmission.driveFolderName || selectedSubmission.folderName || `${selectedSubmission.refId} - ${selectedSubmission.fullName}`}
                        </span>
                      </div>
                    </div>
                    <a
                      href={selectedSubmission.driveFolderUrl || 'https://drive.google.com/drive/folders/1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold transition-colors shadow-sm flex-shrink-0"
                    >
                      <span>Open Folder</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-amber-700" />
                      <span>Uploaded Client Documents ({selectedSubmission.documents?.length || 1})</span>
                    </span>
                    <a
                      href="https://drive.google.com/drive/folders/1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-500 hover:text-slate-700 inline-flex items-center gap-1"
                    >
                      <span>All Drive Vault</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="space-y-2">
                    {selectedSubmission.documents?.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-amber-50/30 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 truncate pr-2">
                          <FileText className="w-5 h-5 text-amber-700 flex-shrink-0" />
                          <div className="truncate">
                            <span className="text-sm font-semibold text-slate-900 block truncate">
                              {doc.name}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                              {doc.size || 'Encrypted File'} • Google Drive Cloud Storage
                            </span>
                          </div>
                        </div>

                        <a
                          href={doc.driveUrl || 'https://drive.google.com/drive/folders/1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-sm flex-shrink-0"
                        >
                          <Eye className="w-3.5 h-3.5 text-amber-700" />
                          <span>View Doc</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
                Select a client submission to view full details and documents.
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
