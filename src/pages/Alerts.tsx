import React from 'react';
import { Bell, Shield, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Alerts.css';

const Alerts: React.FC = () => {
  const navigate = useNavigate();

  const handlePremiumClick = () => {
    navigate('/pricing');
  };

  return (
    <div className="alerts-page">
      <div className="alerts-header">
        <h1>Smart Alerts</h1>
        <p className="subtitle">Get notified the second a slot opens.</p>
      </div>

      <div className="alerts-grid">
        <div className="glass-panel alert-card active-card">
          <div className="alert-icon-wrapper whatsapp">
            <Smartphone size={24} />
          </div>
          <div className="alert-info">
            <h3>WhatsApp Alerts</h3>
            <p>Receive instant notifications on your phone.</p>
          </div>
          <button className="status-badge active">Active</button>
        </div>

        <div className="glass-panel alert-card premium-trigger" onClick={handlePremiumClick}>
          <div className="alert-icon-wrapper telegram">
            <Bell size={24} />
          </div>
          <div className="alert-info">
            <h3>Telegram Bot</h3>
            <p>Connect our bot for lightning fast pings.</p>
          </div>
          <button className="status-badge">Premium Only</button>
        </div>

        <div className="glass-panel alert-card premium-trigger" onClick={handlePremiumClick}>
          <div className="alert-icon-wrapper email">
            <Shield size={24} />
          </div>
          <div className="alert-info">
            <h3>Email Digests</h3>
            <p>Get a daily summary of slot trends.</p>
          </div>
          <button className="status-badge">Coming Soon</button>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
