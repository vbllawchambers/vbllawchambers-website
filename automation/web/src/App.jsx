import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Toast from './components/Toast';
import UploaderModule from './components/UploaderModule';
import SubmissionsModule from './components/SubmissionsModule';
import { Lock, KeyRound, AlertCircle, Scale, Share2, FileText } from 'lucide-react';

export default function App() {
  const [authToken, setAuthToken] = useState(() => sessionStorage.getItem('vbl_admin_token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(sessionStorage.getItem('vbl_admin_token')));
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeTab, setActiveTab] = useState('submissions'); // 'submissions' | 'uploader'

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedError, setFeedError] = useState(null);
  const [pipelineStatus, setPipelineStatus] = useState('checking');
  const [channels, setChannels] = useState([]);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!passcode) return;

    setIsVerifying(true);
    setAuthError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid chambers passkey.');
      }

      sessionStorage.setItem('vbl_admin_token', data.token);
      setAuthToken(data.token);
      setIsAuthenticated(true);
      setPasscode('');
      addToast('Authenticated successfully as Chambers Admin', 'success');
    } catch (err) {
      setAuthError(err.message || 'Authentication failed.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('vbl_admin_token');
    setAuthToken('');
    setIsAuthenticated(false);
    setPosts([]);
    addToast('Logged out of Chambers Suite', 'info');
  };

  const fetchPosts = useCallback(async () => {
    if (!authToken && !sessionStorage.getItem('vbl_admin_token')) {
      setLoading(false);
      return;
    }

    const currentToken = authToken || sessionStorage.getItem('vbl_admin_token');

    try {
      const response = await fetch('/api/posts', {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.status === 401) {
        handleLogout();
        throw new Error('Session expired. Please sign in again.');
      }

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.error || data.message || `Request failed (${response.status})`);
      }
      if (data.posts && Array.isArray(data.posts)) {
        setPosts(data.posts);
        setFeedError(null);
        setPipelineStatus(data.offline ? 'standby' : 'online');
      }

      // Which channels can actually publish. Fetched alongside the calendar so
      // the suite never implies reach the chambers does not have.
      try {
        const chRes = await fetch('/api/channels', {
          headers: { Authorization: `Bearer ${currentToken}` }
        });
        if (chRes.ok) {
          const chData = await chRes.json();
          if (Array.isArray(chData.channels)) setChannels(chData.channels);
        }
      } catch {
        // Channel status is informational; its absence must not break the feed.
      }
    } catch (err) {
      if (!err.message?.includes('standby') && !err.message?.includes('ECONNREFUSED')) {
        console.warn('Fetch posts status:', err.message);
      }
      setFeedError(err.message || 'Automation pipeline in standby mode.');
      setPipelineStatus('standby');
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
      const interval = setInterval(fetchPosts, 15000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchPosts]);

  // If unauthenticated, show restricted login modal
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F8FAFC',
        padding: '24px',
        position: 'relative'
      }}>
        <div className="glow-orb glow-1" />
        <div className="glow-orb glow-2" />

        <div style={{
          maxWidth: '420px',
          width: '100%',
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '36px',
          boxShadow: '0 12px 32px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
          border: '1px solid #E2E8F0',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#0F2942',
            color: '#B48A22',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px',
            boxShadow: '0 4px 14px rgba(15, 41, 66, 0.2)'
          }}>
            <Scale size={30} />
          </div>

          <h2 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#0F2942',
            marginBottom: '4px',
            letterSpacing: '0.02em'
          }}>
            VBL LAW CHAMBERS
          </h2>
          <p style={{
            fontSize: '0.8rem',
            color: '#64748B',
            marginBottom: '24px',
            fontWeight: 500
          }}>
            Publishing Suite &amp; Automation Console
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#475569',
                marginBottom: '6px'
              }}>
                Chambers Master Passcode
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => { setPasscode(e.target.value); setAuthError(null); }}
                  placeholder="Enter secret passcode..."
                  required
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 38px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                />
                <Lock size={16} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94A3B8'
                }} />
              </div>
            </div>

            {authError && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                borderRadius: '8px',
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                color: '#DC2626',
                fontSize: '0.8rem',
                fontWeight: 600,
                textAlign: 'left'
              }}>
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: '#0F2942',
                color: '#FFFFFF',
                fontSize: '0.9rem',
                fontWeight: 600,
                border: 'none',
                cursor: isVerifying ? 'wait' : 'pointer',
                transition: 'background 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <KeyRound size={16} />
              <span>{isVerifying ? 'Verifying...' : 'Unlock Chambers Suite'}</span>
            </button>
          </form>

          <p style={{
            marginTop: '24px',
            fontSize: '0.72rem',
            color: '#94A3B8'
          }}>
            Restricted to authorized advocates &amp; legal administrators.
          </p>
        </div>

        <Toast toasts={toasts} />
      </div>
    );
  }

  return (
    <>
      {/* Ambient background glow orbs */}
      <div className="glow-orb glow-1" />
      <div className="glow-orb glow-2" />
      <div className="glow-orb glow-3" />

      <Header pipelineStatus={pipelineStatus} onLogout={handleLogout} />

      <main className="main-layout" style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 20px' }}>
        {/* Module Switcher Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <div style={{
            background: '#FFFFFF',
            padding: '4px',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            display: 'inline-flex',
            boxShadow: '0 2px 8px rgba(15, 41, 66, 0.05)',
            gap: '4px'
          }}>
            <button
              type="button"
              onClick={() => setActiveTab('submissions')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'submissions' ? '#0F2942' : 'transparent',
                color: activeTab === 'submissions' ? '#FFFFFF' : '#64748B',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <FileText size={16} />
              <span>Client Will Submissions</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('uploader')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'uploader' ? '#0F2942' : 'transparent',
                color: activeTab === 'uploader' ? '#FFFFFF' : '#64748B',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Share2 size={16} />
              <span>Social Publishing Suite</span>
            </button>
          </div>
        </div>

        {/* Publishing channel status. Shows what can actually publish right
            now: a channel without credentials is listed as unavailable rather
            than quietly omitted, so the calendar never implies more reach than
            the chambers has. */}
        {activeTab !== 'submissions' && channels.length > 0 && (
          <div
            style={{
              display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center',
              padding: '12px 16px', marginBottom: '16px',
              background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px'
            }}
          >
            <span style={{
              fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.05em', color: '#64748B', marginRight: '4px'
            }}>
              Publishing channels
            </span>
            {channels.map((c) => (
              <span
                key={c.id}
                title={c.connected
                  ? `${c.label}${c.account ? ` — ${c.account}` : ''}${c.native ? ' (native adapter)' : ` (via ${c.via})`}`
                  : `${c.label} unavailable — ${c.requires || c.via}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '999px',
                  background: c.connected ? '#ECFDF5' : '#F1F5F9',
                  color: c.connected ? '#065F46' : '#64748B',
                  border: `1px solid ${c.connected ? '#A7F3D0' : '#E2E8F0'}`
                }}
              >
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: c.connected ? '#10B981' : '#CBD5E1'
                }} />
                {c.label}
                {c.connected && c.account ? (
                  <span style={{ fontWeight: 400, opacity: 0.75 }}>{c.account}</span>
                ) : null}
              </span>
            ))}
          </div>
        )}

        {activeTab === 'submissions' ? (
          <SubmissionsModule onToast={addToast} />
        ) : (
          <UploaderModule
            posts={posts}
            loading={loading}
            error={feedError}
            onRefresh={fetchPosts}
            onUploadSuccess={fetchPosts}
            onToast={addToast}
          />
        )}
      </main>

      <Toast toasts={toasts} />
    </>
  );
}
