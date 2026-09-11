import React, { useState, useEffect, useCallback } from 'react';
import {
  FileText,
  Search,
  Filter,
  RefreshCw,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Lock,
  Download,
  ShieldCheck,
  User,
  MapPin,
  FolderOpen
} from 'lucide-react';

const STATUS_OPTIONS = [
  'All',
  'New Submission',
  'Under Scrutiny',
  'Consultation Scheduled',
  'Ready for Attestation',
  'Completed'
];

export default function SubmissionsModule({ onToast }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/will-submissions');
      if (!res.ok) {
        throw new Error(`Failed to fetch submissions (${res.status})`);
      }
      const data = await res.json();
      if (data && Array.isArray(data.submissions)) {
        setSubmissions(data.submissions);
        if (!selectedSubmission && data.submissions.length > 0) {
          setSelectedSubmission(data.submissions[0]);
        } else if (selectedSubmission) {
          // Keep current selection fresh
          const match = data.submissions.find(s => s.refId === selectedSubmission.refId);
          if (match) setSelectedSubmission(match);
        }
      }
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setError(err.message || 'Unable to load submissions from API');
    } finally {
      setLoading(false);
    }
  }, [selectedSubmission]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleStatusUpdate = async (refId, newStatus) => {
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/will-submissions/${refId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Status update failed');
      const data = await res.json();
      
      setSubmissions(prev => prev.map(s => s.refId === refId ? { ...s, status: newStatus } : s));
      if (selectedSubmission && selectedSubmission.refId === refId) {
        setSelectedSubmission(prev => ({ ...prev, status: newStatus }));
      }
      if (onToast) onToast(`Updated ${refId} status to "${newStatus}"`, 'success');
    } catch (err) {
      console.error('Status update error:', err);
      if (onToast) onToast(`Failed to update status: ${err.message}`, 'error');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const filtered = submissions.filter(sub => {
    const matchesFilter = filterStatus === 'All' || sub.status === filterStatus;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesFilter;
    const matchesSearch =
      (sub.fullName && sub.fullName.toLowerCase().includes(q)) ||
      (sub.refId && sub.refId.toLowerCase().includes(q)) ||
      (sub.phone && sub.phone.includes(q)) ||
      (sub.city && sub.city.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New Submission':
        return { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' };
      case 'Under Scrutiny':
        return { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' };
      case 'Consultation Scheduled':
        return { bg: '#F3E8FF', text: '#6B21A8', border: '#E9D5FF' };
      case 'Ready for Attestation':
      case 'Completed':
        return { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0' };
      default:
        return { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header & Search Bar */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '20px 24px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(180, 138, 34, 0.1)',
            color: '#B48A22',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F2942', margin: 0 }}>
              Client Will Submissions &amp; Scrutiny
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
              Real-time repository of testamentary instructions and uploaded title deeds from clients
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, ref ID, phone..."
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="button"
            onClick={fetchSubmissions}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              background: '#F8FAFC',
              color: '#475569',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {STATUS_OPTIONS.map(st => {
          const isSelected = filterStatus === st;
          const count = st === 'All' ? submissions.length : submissions.filter(s => s.status === st).length;
          return (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: isSelected ? '1px solid #0F2942' : '1px solid #E2E8F0',
                background: isSelected ? '#0F2942' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#475569',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{st}</span>
              <span style={{
                fontSize: '0.7rem',
                padding: '1px 6px',
                borderRadius: '10px',
                background: isSelected ? 'rgba(255,255,255,0.2)' : '#F1F5F9',
                color: isSelected ? '#FFFFFF' : '#64748B'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Master Detail Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
        alignItems: 'start'
      }}>
        {/* Submissions List Column */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxHeight: '750px',
          overflowY: 'auto',
          paddingRight: '4px'
        }}>
          {filtered.length === 0 ? (
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '40px 20px',
              textAlign: 'center',
              border: '1px solid #E2E8F0',
              color: '#64748B'
            }}>
              <AlertCircle size={32} style={{ margin: '0 auto 12px', color: '#94A3B8' }} />
              <p style={{ fontWeight: 600, color: '#0F2942', marginBottom: '4px' }}>No submissions match filter</p>
              <p style={{ fontSize: '0.8rem' }}>Try clearing your search query or selecting "All".</p>
            </div>
          ) : (
            filtered.map(sub => {
              const isSelected = selectedSubmission && selectedSubmission.refId === sub.refId;
              const badge = getStatusBadge(sub.status);
              const docCount = (sub.documents || []).length;

              return (
                <div
                  key={sub.refId}
                  onClick={() => setSelectedSubmission(sub)}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '16px',
                    border: isSelected ? '2px solid #B48A22' : '1px solid #E2E8F0',
                    boxShadow: isSelected ? '0 4px 14px rgba(180, 138, 34, 0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: '#B48A22',
                      fontSize: '0.9rem',
                      letterSpacing: '0.02em'
                    }}>
                      {sub.refId}
                    </span>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '12px',
                      background: badge.bg,
                      color: badge.text,
                      border: `1px solid ${badge.border}`
                    }}>
                      {sub.status}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F2942', margin: '0 0 4px 0' }}>
                    {sub.fullName}
                  </h3>

                  <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 8px 0' }}>
                    {sub.serviceLabel || sub.serviceType}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
                    <span>{sub.phone}</span>
                    <span>{docCount} {docCount === 1 ? 'Doc' : 'Docs'}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Submission Inspector */}
        {selectedSubmission ? (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.06)'
          }}>
            {/* Inspector Top Bar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '16px',
              marginBottom: '20px'
            }}>
              <div>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#B48A22',
                  display: 'block'
                }}>
                  {selectedSubmission.refId}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  Logged: {selectedSubmission.date}
                </span>
              </div>

              {/* Status Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>Status:</span>
                <select
                  value={selectedSubmission.status}
                  disabled={updatingStatus}
                  onChange={e => handleStatusUpdate(selectedSubmission.refId, e.target.value)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    background: '#F8FAFC',
                    color: '#0F2942',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="New Submission">New Submission</option>
                  <option value="Under Scrutiny">Under Scrutiny</option>
                  <option value="Consultation Scheduled">Consultation Scheduled</option>
                  <option value="Ready for Attestation">Ready for Attestation</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Client Particulars Grid */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#64748B',
                marginBottom: '12px'
              }}>
                Testator &amp; Family Information
              </h4>

              <div style={{
                background: '#F8FAFC',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #E2E8F0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                fontSize: '0.85rem'
              }}>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Full Name:</span>
                  <strong style={{ color: '#0F2942' }}>{selectedSubmission.fullName}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Parent / Spouse:</span>
                  <span style={{ color: '#0F2942' }}>{selectedSubmission.parentSpouseName || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Age:</span>
                  <span style={{ color: '#0F2942' }}>{selectedSubmission.age || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>City / Location:</span>
                  <span style={{ color: '#0F2942' }}>{selectedSubmission.city || 'Kavali'}</span>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Residential Address:</span>
                  <span style={{ color: '#0F2942' }}>{selectedSubmission.address || 'Confidential on file'}</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Actions */}
            <div style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '20px'
            }}>
              <a
                href={`https://wa.me/${selectedSubmission.phone ? selectedSubmission.phone.replace(/[^0-9]/g, '') : ''}?text=Hello%20${encodeURIComponent(selectedSubmission.fullName)},%20this%20is%20VBL%20Law%20Chambers%20regarding%20your%20Will%20submission%20${encodeURIComponent(selectedSubmission.refId)}.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  minWidth: '150px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  background: '#25D366',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(37, 211, 102, 0.2)'
                }}
              >
                <MessageCircle size={16} />
                <span>WhatsApp Client</span>
              </a>

              <a
                href={`tel:${selectedSubmission.phone}`}
                style={{
                  flex: 1,
                  minWidth: '150px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  background: '#0F2942',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  textDecoration: 'none'
                }}
              >
                <Phone size={16} />
                <span>Call ({selectedSubmission.phone})</span>
              </a>
            </div>

            {/* Declared Asset Schedules */}
            {selectedSubmission.assetTypes && selectedSubmission.assetTypes.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#64748B',
                  marginBottom: '8px'
                }}>
                  Declared Asset Categories
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedSubmission.assetTypes.map((ast, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(180, 138, 34, 0.1)',
                        color: '#92400E',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: '1px solid rgba(180, 138, 34, 0.25)'
                      }}
                    >
                      {ast}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Special Client Notes */}
            {selectedSubmission.specialInstructions && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#64748B',
                  marginBottom: '8px'
                }}>
                  Testator Instructions &amp; Intent Notes
                </h4>
                <div style={{
                  background: '#FEF9C3',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #FEF08A',
                  fontSize: '0.85rem',
                  color: '#854D0E',
                  lineHeight: '1.5'
                }}>
                  {selectedSubmission.specialInstructions}
                </div>
              </div>
            )}

            {/* Uploaded Documents List */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#64748B',
                  margin: 0
                }}>
                  Uploaded Title Deeds &amp; Verification Docs
                </h4>
                <a
                  href="https://drive.google.com/drive/folders/1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.75rem',
                    color: '#B48A22',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <FolderOpen size={13} />
                  <span>Chambers Drive Vault</span>
                </a>
              </div>

              {selectedSubmission.documents && selectedSubmission.documents.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedSubmission.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                        <Lock size={15} style={{ color: '#B48A22', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'monospace', color: '#0F2942', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {doc.name}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{doc.size}</span>
                        {doc.url ? (
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              background: '#0F2942',
                              color: '#FFFFFF',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              textDecoration: 'none'
                            }}
                          >
                            <Download size={12} />
                            <span>Download</span>
                          </a>
                        ) : (
                          <a
                            href={doc.driveUrl || 'https://drive.google.com/drive/folders/1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz'}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              background: '#F1F5F9',
                              color: '#0F2942',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              textDecoration: 'none'
                            }}
                          >
                            <ExternalLink size={12} />
                            <span>Drive</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '16px', borderRadius: '8px', background: '#F8FAFC', border: '1px solid #E2E8F0', fontSize: '0.8rem', color: '#64748B', textAlign: 'center' }}>
                  No digital files attached. Physical verification scheduled.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '40px 20px',
            textAlign: 'center',
            border: '1px solid #E2E8F0',
            color: '#64748B'
          }}>
            Select a submission to inspect particulars.
          </div>
        )}
      </div>
    </div>
  );
}
