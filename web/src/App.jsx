import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Toast from './components/Toast';
import UploaderModule from './components/UploaderModule';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedError, setFeedError] = useState(null);
  const [pipelineStatus, setPipelineStatus] = useState('checking');
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.error || data.message || `Request failed (${response.status})`);
      }
      if (data.posts && Array.isArray(data.posts)) {
        setPosts(data.posts);
        setFeedError(null);
        setPipelineStatus('online');
      }
    } catch (err) {
      console.error('Fetch posts error:', err);
      setFeedError(err.message || 'Unable to reach the automation pipeline.');
      setPipelineStatus('offline');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 15000);
    return () => clearInterval(interval);
  }, [fetchPosts]);

  return (
    <>
      {/* Ambient background glow orbs */}
      <div className="glow-orb glow-1" />
      <div className="glow-orb glow-2" />
      <div className="glow-orb glow-3" />

      <Header pipelineStatus={pipelineStatus} />

      <main className="main-layout">
        <UploaderModule
          posts={posts}
          loading={loading}
          error={feedError}
          onRefresh={fetchPosts}
          onUploadSuccess={fetchPosts}
          onToast={addToast}
        />
      </main>

      <Toast toasts={toasts} />
    </>
  );
}
