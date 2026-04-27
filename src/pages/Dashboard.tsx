import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bell, Flame } from 'lucide-react';
import { fetchSlots } from '../api/slotsApi';
import type { SlotDetail } from '../api/slotsApi';
import BookingOverlay from '../components/BookingOverlay';
import Sidebar from '../components/Sidebar';
import SkeletonLoader from '../components/SkeletonLoader';
import SlotCard from '../components/SlotCard';
import SlotDetailModal from '../components/SlotDetailModal';
import { useUiStore } from '../store/uiStore.ts';
import { getEarliestSlotDate, getSlotCountLabel } from '../utils/slotDates';
import './Dashboard.css';

const EMPTY_SLOTS: SlotDetail[] = [];

const Dashboard: React.FC = () => {
  const { selectedCity, setSelectedCity, bookingData, setBookingData } = useUiStore();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const previousAvailableLocations = useRef<Set<string> | null>(null);

  const { data, isLoading, isError, dataUpdatedAt } = useQuery({
    queryKey: ['slots'],
    queryFn: fetchSlots,
    refetchInterval: selectedCity || bookingData ? 5000 : 30000,
    staleTime: 10000,
  });

  const slots = data?.slotDetails ?? EMPTY_SLOTS;

  useEffect(() => {
    const availableLocations = new Set(
      slots.filter((slot) => slot.slots > 0).map((slot) => slot.visa_location),
    );
    const previousLocations = previousAvailableLocations.current;
    previousAvailableLocations.current = availableLocations;

    if (!previousLocations || dataUpdatedAt === 0) {
      return;
    }

    const newlyAvailableLocation = [...availableLocations].find(
      (location) => !previousLocations.has(location),
    );

    if (!newlyAvailableLocation) {
      return;
    }

    const showToastTimer = window.setTimeout(() => {
      setToast({ message: `${newlyAvailableLocation} has a new slot available.`, type: 'success' });
    }, 0);
    const hideToastTimer = window.setTimeout(() => setToast(null), 4000);

    return () => {
      window.clearTimeout(showToastTimer);
      window.clearTimeout(hideToastTimer);
    };
  }, [dataUpdatedAt, slots]);

  const bestSlot = useMemo(() => {
    return [...slots]
      .filter((slot) => slot.slots > 0 && getEarliestSlotDate(slot.start_date, slot.available_dates))
      .sort((a, b) => {
        const leftDate = getEarliestSlotDate(a.start_date, a.available_dates);
        const rightDate = getEarliestSlotDate(b.start_date, b.available_dates);

        return (
          (leftDate?.date.getTime() ?? Number.MAX_SAFE_INTEGER) -
          (rightDate?.date.getTime() ?? Number.MAX_SAFE_INTEGER)
        );
      })[0];
  }, [slots]);
  const bestSlotDate = bestSlot ? getEarliestSlotDate(bestSlot.start_date, bestSlot.available_dates) : null;

  const handleCardClick = (location: string) => {
    setSelectedCity(location);
  };

  const selectedSlotData = selectedCity
    ? slots.find((slot) => slot.visa_location === selectedCity)
    : null;

  return (
    <div className="dashboard-layout">
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          <Bell size={16} />
          <span>{toast.message}</span>
        </div>
      )}

      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>Good evening.</h1>
          <p className="subtitle">Here are your fastest available slots.</p>
        </div>

        {bestSlot && bestSlotDate && (
          <button
            className="best-slot-banner glow-effect"
            onClick={() => handleCardClick(bestSlot.visa_location)}
          >
            <div className="best-slot-content">
              <Flame className="best-slot-icon" size={24} />
              <div className="best-slot-text">
                <div className="best-slot-meta">
                  <span className="best-slot-label">Earliest Slot Available</span>
                  <span className="best-slot-city">- {bestSlot.visa_location}</span>
                </div>
                <h2 className="best-slot-value-hero">{bestSlotDate.label}</h2>
              </div>
            </div>
            <div className="best-slot-badge">{getSlotCountLabel(bestSlot.slots)}</div>
          </button>
        )}

        {isError && (
          <div className="error-state">
            Failed to fetch live slots. Showing cached data if available.
          </div>
        )}

        <div className="slots-grid">
          {isLoading ? (
            <SkeletonLoader count={6} />
          ) : (
            slots.map((slot) => (
              <SlotCard
                key={slot.visa_location}
                slot={slot}
                onClick={handleCardClick}
                lastUpdated={dataUpdatedAt}
              />
            ))
          )}
        </div>
      </div>

      <div className="dashboard-sidebar">
        <Sidebar slots={slots} onCityClick={handleCardClick} />
      </div>

      {selectedCity && selectedSlotData && (
        <SlotDetailModal
          city={selectedCity}
          earliestDate={selectedSlotData.start_date}
          availableDates={selectedSlotData.available_dates}
          slotsCount={selectedSlotData.slots}
        />
      )}

      {bookingData && (
        <BookingOverlay
          city={bookingData.city}
          date={bookingData.date}
          onClose={() => setBookingData(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
