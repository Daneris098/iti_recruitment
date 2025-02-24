/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 20, 2025
 */

import { create } from "zustand";
//--- Calendar Types
import {
  CalendarStoreType,
  RescheduleStoreType,
  EventInfo,
} from "../assets/Types";

export const useCalendarStore = create<CalendarStoreType>((set) => ({
  onViewEvent: false,
  onViewResched: false,
  onViewApplicant: false,

  setOnViewEvent: (event: boolean) => set({ onViewEvent: event }),
  setOnViewResched: (resched: boolean) => set({ onViewResched: resched }),
  setOnViewApplicant: (applicant: boolean) =>
    set({ onViewApplicant: applicant }),

  checkedItems: [] as string[],

  toggleCheckedItem: (name: string) =>
    set((state) => ({
      checkedItems: state.checkedItems.includes(name)
        ? state.checkedItems.filter((item) => item !== name)
        : [...state.checkedItems, name],
    })),

  eventInfo: {
    publicId: "",
    sourceId: "",
    title: "",
  },
  setEventInfo: (eventInfo: EventInfo) => set({ eventInfo: eventInfo! }),

  calendarAdd: false,
  setCalendarAdd: (add: boolean) => set({ calendarAdd: add }),
}));

export const useRescheduleStore = create<RescheduleStoreType>((set) => ({
  date: new Date(),
  time: new Date(),
  interviewer: "",
  setDate: (date: Date) => set({ date: date }),
  setTime: (time: Date) => set({ time: time }),
  setInterviewer: (interviewer: string) => set({ interviewer: interviewer }),
}));
