import React from 'react';
import { X } from 'lucide-react';
import { useUiStore } from '../store/uiStore.ts';
import { getSlotCountLabel, getSlotDateSummaries } from '../utils/slotDates';
import './SlotDetailModal.css';

interface SlotDetailModalProps {
  city: string;
  earliestDate?: string;
  availableDates?: string[];
  slotsCount: number;
}

const SlotDetailModal: React.FC<SlotDetailModalProps> = ({ city, earliestDate, availableDates, slotsCount }) => {
  const { setSelectedCity, setBookingData } = useUiStore();

  const handleClose = () => {
    setSelectedCity(null);
  };

  const handleBookSlot = (date: string) => {
    setBookingData({ city, date });
  };

  const datesToRender = getSlotDateSummaries(earliestDate, availableDates, slotsCount);
  const primaryDate = datesToRender[0];
  const hasDetailedDateList = Boolean(availableDates?.length);
  const getDateBadgeLabel = (slotCount?: number) => {
    if (slotCount !== undefined) {
      return getSlotCountLabel(slotCount);
    }

    return hasDetailedDateList ? 'Available' : 'Earliest date';
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content glass-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2>{city}</h2>
          <p className="modal-subtitle">Earliest available standard slot</p>
          <div className="modal-primary-date">{primaryDate ? primaryDate.label : 'No standard slots'}</div>
          {slotsCount > 0 && (
            <div className="modal-total-count">{getSlotCountLabel(slotsCount)} reported</div>
          )}
        </div>

        <div className="dates-list">
          {datesToRender.length === 0 ? (
            <div className="date-row standard-row">
              <span className="date-text">Check back later</span>
            </div>
          ) : (
            datesToRender.map((dateSummary) => (
              <button
                key={dateSummary.key}
                className="date-row standard-row clickable-row"
                onClick={() => handleBookSlot(dateSummary.key)}
              >
                <span className="date-text">{dateSummary.label}</span>
                <span className="slots-badge">
                  {getDateBadgeLabel(dateSummary.slotCount)}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SlotDetailModal;
