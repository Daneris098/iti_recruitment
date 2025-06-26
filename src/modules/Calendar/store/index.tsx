/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 20, 2025
 */

import { create } from "zustand";
//--- Calendar Types
import { CalendarStoreType, RescheduleStoreType, EventInfo, MonthYearStoreType, EventDetails } from "../assets/Types";
import { initialDetails } from "../assets/values";
const getTodayFormatted = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

export const useCalendarStore = create<CalendarStoreType>((set) => ({
  onViewEvent: false,
  onViewResched: false,
  onViewApplicant: false,
  onViewUpdate: false,
  onViewFilter: false,
  onMonthYear: false,
  currentDate: getTodayFormatted(),
  details: initialDetails,
  filterDepartmentIds: [],
  filterCompanyId: [],
  filterInterviewer: [],

  setDetails: (date: EventDetails) => set({ details: date }),
  setCurrentDate: (date: boolean) => set({ currentDate: date }),
  setFilterDepartmentIds: (data: number[]) => set({ filterDepartmentIds: data }),
  setFilterCompanyId: (data: number[]) => set({ filterCompanyId: data }),
  setFilterInterviewer: (data: number[]) => set({ filterInterviewer: data }),
  setOnMonthYear: (my: boolean) => set({ onMonthYear: my }),
  setOnViewFilter: (filter: boolean) => set({ onViewFilter: filter }),
  setOnViewEvent: (event: boolean) => set({ onViewEvent: event }),
  setOnViewResched: (resched: boolean) => set({ onViewResched: resched }),
  setOnViewApplicant: (applicant: boolean) => set({ onViewApplicant: applicant }),
  setOnViewUpdate: (update: boolean) => set({ onViewUpdate: update }),

  checkedItems: [] as string[],

  toggleCheckedItem: (name: string) =>
    set((state) => ({
      checkedItems: state.checkedItems.includes(name) ? state.checkedItems.filter((item) => item !== name) : [...state.checkedItems, name],
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
  readyToUpdate: false,
  setDate: (date: Date) => set({ date: date }),
  setTime: (time: Date) => set({ time: time }),
  setInterviewer: (interviewer: string) => set({ interviewer: interviewer }),
  setReadyToUpdate: (ready) => set({ readyToUpdate: ready }),
}));

export const useMonthYearStore = create<MonthYearStoreType>((set) => ({
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  day: new Date(),

  setMonth: (month: number) => set({ month: month }),
  setYear: (year: number) => set({ year: year }),
  setDay: (day: Date) => set({ day: day }),
}));
