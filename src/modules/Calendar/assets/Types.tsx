/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 20, 2025
 */

export interface ModalViewEventProps {
  eventInfo: EventInfo;
}

export interface ModalViewApplicantProps {
  downloadBtn?(): void;
}

export interface CalendarStoreType {
  onViewEvent: boolean;
  onViewResched: boolean;
  onViewApplicant: boolean;
  onViewUpdate: boolean;
  onViewFilter: boolean;
  onMonthYear: boolean;
  currentDate: any;
  filterDepartmentIds: number[];
  filterCompanyId: number[];
  filterInterviewer: number[];
  details: EventDetails;

  setDetails(any: EventDetails): void;
  setCurrentDate(date: any): void;
  setFilterDepartmentIds(data: number[]): void;
  setFilterCompanyId(data: number[]): void;
  setFilterInterviewer(data: number[]): void;
  setOnMonthYear(my: boolean): void;
  setOnViewFilter(filter: boolean): void;
  setOnViewEvent(event: boolean): void;
  setOnViewResched(sched: boolean): void;
  setOnViewApplicant(app: boolean): void;
  setOnViewUpdate(update: boolean): void;

  checkedItems: string[];
  toggleCheckedItem: (name: string) => void;

  eventInfo: EventInfo;
  setEventInfo: (eventInfo: EventInfo) => void;

  calendarAdd: boolean;
  setCalendarAdd(add: boolean): void;
}

export interface EventInfo {
  publicId: string;
  sourceId: string;
  title: string;
  extendedProps?: object;
}

export interface RescheduleStoreType {
  date: Date;
  time: Date;
  interviewer: string;
  readyToUpdate: boolean;

  setDate(date: Date): void;
  setTime(time: Date): void;
  setInterviewer(int: string): void;
  setReadyToUpdate: (ready: boolean) => void;
}

export interface MonthYearStoreType {
  month: number;
  year: number;
  day: Date;

  setMonth(month: number): void;
  setYear(year: number): void;
  setDay(day: Date): void;
}

interface Position {
  [key: string]: any; // Adjust if specific fields are known
}

interface Person {
  id: number;
  name: string;
}

interface Applicant extends Person {
  position: Position;
}

interface InterviewStage {
  id: number;
  name: string;
}

export interface EventDetails {
  scheduleId: number;
  date: string;
  time: string;
  applicant: Applicant;
  interviewer: Person;
  interviewStage: InterviewStage;
}
