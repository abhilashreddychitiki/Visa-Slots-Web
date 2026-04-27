import { create } from 'zustand';

interface UiState {
  selectedCity: string | null;
  setSelectedCity: (city: string | null) => void;
  bookingData: { city: string; date: string } | null;
  setBookingData: (data: { city: string; date: string } | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  selectedCity: null,
  setSelectedCity: (city) => set({ selectedCity: city }),
  bookingData: null,
  setBookingData: (data) => set({ bookingData: data }),
}));
