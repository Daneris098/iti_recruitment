import { create } from "zustand";

interface DateRangeState {
  value: [Date | null, Date | null];
  setValue: (newValue: [Date | null, Date | null]) => void;
}

export const useDateRangeStore = create<DateRangeState>((set) => ({
  value: [null, null],
  setValue: (newValue) => set({ value: newValue }),
}));
