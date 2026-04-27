import React from 'react';
import { Bell } from 'lucide-react';
import type { SlotDetail } from '../api/slotsApi';
import { getSlotCountLabel, getSlotDateSummaries } from '../utils/slotDates';
import './SlotCard.css';

interface SlotCardProps {
  slot: SlotDetail;
  onClick: (location: string) => void;
  lastUpdated: number;
}

const SlotCard: React.FC<SlotCardProps> = ({ slot, onClick, lastUpdated }) => {
  const isAvailable = slot.slots > 0;
  const createdTime = new Date(slot.createdon).getTime();
  const isCreatedTimeValid = Number.isFinite(createdTime);
  const shouldFlash = isCreatedTimeValid && lastUpdated > 0 && createdTime > lastUpdated - 30000;
  const dateSummaries = getSlotDateSummaries(slot.start_date, slot.available_dates, slot.slots);
  const primaryDate = dateSummaries[0];

  const formattedDate = isAvailable
    ? primaryDate?.label ?? 'Slots available'
    : 'No slots right now';

  const updatedMins =
    isCreatedTimeValid && lastUpdated > 0
      ? Math.max(0, Math.floor((lastUpdated - createdTime) / 60000))
      : 0;
  const updatedText = updatedMins <= 0 ? 'Updated just now' : `Updated ${updatedMins}m ago`;

  return (
    <div 
      className={`slot-card ${isAvailable ? 'available' : 'unavailable'} ${shouldFlash ? 'flash-update' : ''}`}
      onClick={() => onClick(slot.visa_location)}
    >
      <div className="card-header">
        <h3 className="city-name-muted">{slot.visa_location}</h3>
        {isAvailable ? (
          <div className="badge available-badge">
            <span className="slot-status-dot animate-pulse"></span>
            {getSlotCountLabel(slot.slots)}
          </div>
        ) : (
          <div className="badge unavailable-badge">
            <span className="slot-status-dot gray-dot"></span>
            Full
          </div>
        )}
      </div>

      <div className="card-body">
        <div className="date-display-hero">
          {formattedDate}
        </div>
        
        {isAvailable && dateSummaries.length > 1 && (
          <div className="next-dates-preview">
            <span className="next-label">Available:</span>
            <div className="dates-chips">
              {dateSummaries.slice(1, 6).map((dateSummary) => (
                <span key={dateSummary.key} className="next-date-tag">
                  {dateSummary.shortLabel}
                </span>
              ))}
              {dateSummaries.length > 6 && (
                <span className="more-count">+{dateSummaries.length - 6} more</span>
              )}
            </div>
          </div>
        )}

        {!isAvailable && (
          <p className="empty-state-text">No slots found. We'll notify you instantly.</p>
        )}
      </div>

      <div className="card-footer">
        <span className={`updated-text ${shouldFlash ? 'text-flash' : ''}`}>{updatedText}</span>
        
        {!isAvailable && (
          <div className="card-action-cue">
            <Bell size={12} />
            Notify Me
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotCard;
