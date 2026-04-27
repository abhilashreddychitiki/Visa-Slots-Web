import React from 'react';
import { Check, Crown, Shield, X, Zap } from 'lucide-react';
import './Pricing.css';

const Pricing: React.FC = () => {
  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <span className="premium-badge">PREMIUM PLANS</span>
        <h1>Find your perfect plan</h1>
        <p className="subtitle">Choose the level of speed and automation you need.</p>
      </div>

      <div className="pricing-grid">
        <div className="glass-panel pricing-card">
          <div className="card-accent free-accent"></div>
          <div className="card-top">
            <span className="plan-name">FREE</span>
            <div className="price-box">
              <span className="price-main">$0</span>
              <span className="price-sub">/forever</span>
            </div>
          </div>
          <div className="card-action">
            <button className="pricing-btn outline">Current Plan</button>
          </div>
          <div className="feature-group">
            <div className="feature-item">
              <Check size={18} className="icon-check" />
              <span>Real-time slots info</span>
            </div>
            <div className="feature-item">
              <Check size={18} className="icon-check" />
              <span>View screenshots</span>
            </div>
            <div className="feature-item">
              <Check size={18} className="icon-check" />
              <span>Browser extension</span>
            </div>
            <div className="feature-item disabled">
              <X size={18} className="icon-x" />
              <span>No alerts included</span>
            </div>
          </div>
        </div>

        <div className="glass-panel pricing-card">
          <div className="card-accent alert-60-accent"></div>
          <div className="card-top">
            <span className="plan-name">ALERTS-60</span>
            <div className="price-box">
              <span className="price-main">$24.99</span>
              <span className="price-sub">/60 days</span>
            </div>
          </div>
          <div className="card-action">
            <button className="pricing-btn primary">Upgrade Now</button>
          </div>
          <div className="feature-group">
            <div className="feature-item">
              <Check size={18} className="icon-check" />
              <span>Real-time slots info</span>
            </div>
            <div className="feature-item">
              <Check size={18} className="icon-check" />
              <span>Slot Start Date info</span>
            </div>
            <div className="feature-item">
              <Check size={18} className="icon-check" />
              <span>60 Days of alerts</span>
            </div>
            <div className="feature-item">
              <Check size={18} className="icon-check" />
              <span>Instant WhatsApp</span>
            </div>
          </div>
        </div>

        <div className="glass-panel pricing-card featured">
          <div className="card-accent alert-90-accent"></div>
          <div className="popular-tag">Most Popular</div>
          <div className="card-top">
            <span className="plan-name">ALERTS-90</span>
            <div className="price-box">
              <span className="price-main">$29.99</span>
              <span className="price-sub">/90 days</span>
            </div>
          </div>
          <div className="card-action">
            <button className="pricing-btn primary glow">Upgrade Now</button>
          </div>
          <div className="feature-group">
            <div className="feature-item">
              <Check size={18} className="icon-check" />
              <span>Everything in Alerts-60</span>
            </div>
            <div className="feature-item">
              <Check size={18} className="icon-check" />
              <span>90 Days of alerts</span>
            </div>
            <div className="feature-item">
              <Check size={18} className="icon-check" />
              <span>Priority polling</span>
            </div>
            <div className="feature-item">
              <Check size={18} className="icon-check" />
              <span>Telegram Bot Access</span>
            </div>
          </div>
        </div>

        <div className="glass-panel pricing-card stress-free-card">
          <div className="card-accent stress-accent"></div>
          <div className="card-top">
            <div className="stress-name-wrapper">
              <Crown size={20} className="text-orange" />
              <span className="plan-name orange-text">STRESS FREE</span>
            </div>
            <div className="price-box">
              <span className="price-main">$75+</span>
              <span className="price-sub">per booking</span>
            </div>
          </div>
          <div className="card-action">
            <button className="pricing-btn accent">Book My Slot</button>
          </div>
          <div className="feature-group">
            <div className="feature-item">
              <Shield size={18} className="text-orange" />
              <span>100% Refund Guarantee</span>
            </div>
            <div className="feature-item">
              <Zap size={18} className="text-orange" />
              <span>24/7 Live Monitoring</span>
            </div>
            <div className="feature-item">
              <Shield size={18} className="text-orange" />
              <span>Expert Support Team</span>
            </div>
            <div className="feature-item">
              <Check size={18} className="text-orange" />
              <span>Trusted Agency Service</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pricing-links">
        <div className="links-row">
          <a href="#">View Sample Alert</a>
          <span className="dot">-</span>
          <a href="#">How it works</a>
          <span className="dot">-</span>
          <a href="#">FAQs</a>
          <span className="dot">-</span>
          <a href="#">Community vs Agents</a>
        </div>
        <p className="footer-note">We are fighting the "Agent's Unfair Advantage" together.</p>
      </div>
    </div>
  );
};

export default Pricing;
