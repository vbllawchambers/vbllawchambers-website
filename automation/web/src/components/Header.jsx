import React from 'react';
import { Scale, Table, Folder, LogOut } from 'lucide-react';

const STATUS_COPY = {
  checking: { label: 'Checking…', className: 'status-checking' },
  online: { label: 'Pipeline Active', className: 'status-online' },
  standby: { label: 'Pipeline Standby', className: 'status-checking' },
  offline: { label: 'Pipeline Standby', className: 'status-offline' }
};

export default function Header({ pipelineStatus = 'checking', onLogout }) {
  const { label, className } = STATUS_COPY[pipelineStatus] || STATUS_COPY.checking;

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand-group">
          <div className="brand-logo">
            <Scale size={24} />
          </div>
          <div className="brand-text">
            <h1 className="brand-title">VBL LAW CHAMBERS</h1>
            <p className="brand-subtitle">Advocate Digital Presence & Social Automation • Kavali, AP</p>
          </div>
        </div>

        <div className="header-actions">
          <div className={`system-status ${className}`}>
            <span className={`status-dot ${pipelineStatus === 'online' ? 'pulsing' : ''}`}></span>
            <span className="status-text">{label}</span>
          </div>
          <a
            href="https://docs.google.com/spreadsheets/d/14NFIyGUMg4hcTZ3hTIZklayVYstvxvpOesesgpEF72M/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            id="btn-open-sheet"
          >
            <Table size={15} />
            <span className="btn-secondary-label">Google Sheet</span>
          </a>
          <a
            href="https://drive.google.com/drive/folders/1UoiIg3W-0G2cLEuMbmoxGoEFb-8uSaG9"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            id="btn-open-drive"
          >
            <Folder size={15} />
            <span className="btn-secondary-label">Drive Folder</span>
          </a>
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="btn-secondary"
              id="btn-logout"
              title="Lock Chambers Session"
              style={{ cursor: 'pointer' }}
            >
              <LogOut size={15} />
              <span className="btn-secondary-label">Lock</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
