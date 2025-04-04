import { create } from "zustand";

interface DateRangeState {
  value: [Date | null, Date | null];
  setValue: (newValue: [Date | null, Date | null]) => void;
}

export const useDateRangeStore = create<DateRangeState>((set) => ({
  value: [null, null],
  setValue: (newValue) => set({ value: newValue }),
}));
interface JobOfferDateRangeState {
  value: [Date | null, Date | null];
  setValue: (newValue: [Date | null, Date | null]) => void;
}

export const useJobOfferDateRangeStore = create<JobOfferDateRangeState>((set) => ({
  value: [null, null],
  setValue: (newValue) => set({ value: newValue }),
}));

interface GeneratedOffer {
  value: [Date | null, Date | null];
  setValue: (newValue: [Date | null, Date | null]) => void;
}

export const useGeneratedOfferStore = create<GeneratedOffer>((set) => ({
  value: [null, null],
  setValue: (newValue) => set({ value: newValue }),
}));


interface Archived {
  value: [Date | null, Date | null];
  setValue: (newValue: [Date | null, Date | null]) => void;
}

export const useArchivedStore = create<Archived>((set) => ({
  value: [null, null],
  setValue: (newValue) => set({ value: newValue }),
}));
