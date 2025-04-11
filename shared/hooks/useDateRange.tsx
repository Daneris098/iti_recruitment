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
  Offervalue: [Date | null, Date | null];
  setOfferValue: (newValue: [Date | null, Date | null]) => void;
}

export const useJobOfferDateRangeStore = create<JobOfferDateRangeState>((set) => ({
  Offervalue: [null, null],
  setOfferValue: (newValue) => set({ Offervalue: newValue }),
}));

interface GeneratedOffer {
  generatedOfferValue: [Date | null, Date | null];
  setGeneratedOfferValue: (newValue: [Date | null, Date | null]) => void;
}

export const useGeneratedOfferStore = create<GeneratedOffer>((set) => ({
  generatedOfferValue: [null, null],
  setGeneratedOfferValue: (newValue) => set({ generatedOfferValue: newValue }),
}));
interface Archived {
  archivedValue: [Date | null, Date | null];
  setArchivedValue: (newValue: [Date | null, Date | null]) => void;
}

export const useArchivedStore = create<Archived>((set) => ({
  archivedValue: [null, null],
  setArchivedValue: (newValue) => set({ archivedValue: newValue }),
}));

interface DateUpdatedState {
  dateUpdatedValue: [Date | null, Date | null];
  setDateUpdatedValue: (newValue: [Date | null, Date | null]) => void;
}

export const useDateUpdatedStore = create<DateUpdatedState>((set) => ({
  dateUpdatedValue: [null, null],
  setDateUpdatedValue: (newValue) => set({ dateUpdatedValue: newValue }),
}));

