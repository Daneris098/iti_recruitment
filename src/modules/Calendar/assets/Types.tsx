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

  setOnViewEvent(event: boolean): void;
  setOnViewResched(sched: boolean): void;
  setOnViewApplicant(app: boolean): void;

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

  setDate(date: Date): void;
  setTime(time: Date): void;
  setInterviewer(int: string): void;
}
