import React from 'react';
import { Calendar } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Layout.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout-container">
      {/* Persistent Top Navigation */}
      <header className="top-nav">
        <div className="nav-content">
          {/* Left: Logo */}
          <div className="nav-logo">
            <Calendar className="logo-icon" size={24} />
            <span className="logo-text">Visa Slots</span>
          </div>
          
          {/* Center: Tabs */}
          <nav className="nav-tabs">
            <NavLink to="/" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>Dashboard</NavLink>
            <NavLink to="/alerts" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>Alerts</NavLink>
          </nav>

          {/* Right: Controls & Profile */}
          <div className="nav-actions">
            <div className="visa-selector">
              <select className="visa-select">
                <option value="B1/B2">B1/B2</option>
                <option value="F1/F2">F1/F2</option>
                <option value="H1B/H4">H1B/H4</option>
                <option value="L1/L2">L1/L2</option>
              </select>
            </div>
            <button className="icon-btn">
              <span className="bell-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                <span className="unread-dot"></span>
              </span>
            </button>
            <button className="profile-btn">
              <div className="avatar">U</div>
            </button>
          </div>
        </div>
      </header>

      <main className="layout-main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
