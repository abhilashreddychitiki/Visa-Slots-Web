import React from 'react';
import { X, ChevronDown, Check } from 'lucide-react';
import './BookingOverlay.css';

interface BookingOverlayProps {
  city: string;
  date: string;
  onClose: () => void;
}

const BookingOverlay: React.FC<BookingOverlayProps> = ({ city, date, onClose }) => {
  return (
    <div className="booking-backdrop" onClick={onClose}>
      <div className="booking-container glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="booking-content">
          <h1 className="booking-title">Estimate your service fee</h1>
          
          <div className="booking-form-grid">
            <div className="form-section main-details">
              <h3>Visa Application Details</h3>
              
              <div className="input-row">
                <div className="input-group">
                  <label>Application Country</label>
                  <div className="custom-select">
                    <span>India</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
                <div className="input-group">
                  <label>Visa Type</label>
                  <div className="custom-select">
                    <span>B1/B2</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Appointment Type</label>
                  <div className="custom-select">
                    <span>Regular</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
                <div className="input-group">
                  <label>Total Applicants</label>
                  <input type="number" defaultValue={1} className="custom-input" />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Preferred Biometrics Locations</label>
                  <div className="custom-select">
                    <span>Any Location</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
                <div className="input-group">
                  <label>Preferred Consular Locations</label>
                  <div className="custom-select">
                    <span>{city}</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Preferred Slot Start Date</label>
                  <input type="date" defaultValue={date} className="custom-input" />
                </div>
                <div className="input-group">
                  <label>Preferred Slot End Date</label>
                  <input type="date" defaultValue="2026-08-05" className="custom-input" />
                </div>
              </div>
            </div>

            <div className="form-section fee-summary">
              <div className="fee-card">
                <h3>Service Fee</h3>
                <p className="fee-description">
                  The cost to book a Regular visa appointment for 1 applicants in 5 locations within 100 day-window is
                </p>
                <div className="fee-amount">
                  <span className="currency">$</span>
                  <span className="price">75</span>
                </div>
                <button className="pay-now-btn">
                  Pay Now
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="booking-footer">
            <div className="benefit">
              <Check size={16} className="text-orange" />
              <span>Track the progress online</span>
            </div>
            <div className="benefit">
              <Check size={16} className="text-orange" />
              <span>Dedicated human assistance</span>
            </div>
            <div className="benefit">
              <Check size={16} className="text-orange" />
              <span>100% Refund</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingOverlay;
