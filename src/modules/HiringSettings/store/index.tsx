import { create } from "zustand";
import { feedback, HiringSettingsState, panel, FeedbackStoreState, InterviewStageseState, interviewStage, InterviewerState, interviewer, ApplicationSourceState, applicationSource } from "@modules/HiringSettings/types";
import { applicantInitialData, hiringInitialData, PAGE_SIZE, interviewStagesInitialData, interviewerInitialData, applicationSourcesInitialData } from "../values";

export const HiringSettingsStore = create<HiringSettingsState>((set) => ({
  alert: '',
  activePanel: panel.customFeedback,
  validationMessage: '',

  setValidationMessage: (validationMessage: string) => set({ validationMessage: validationMessage }),
  setActivePanel: (activePanel: panel) => set({ activePanel: activePanel }),
  setAlert: (alert: string) => set({ alert: alert }),
}));


export const FeedbackStore = create<FeedbackStoreState>((set) => ({
  applicantFeedback: applicantInitialData.slice(0, PAGE_SIZE),
  hiringFeedback: hiringInitialData.slice(0, PAGE_SIZE),
  sortStatusApplicant: { columnAccessor: 'id', direction: false },
  sortStatusHiring: { columnAccessor: 'id', direction: false },

  setSortStatusApplicant: (status: any) => set({ sortStatusApplicant: status }),
  setSortStatusHiring: (status: any) => set({ sortStatusHiring: status }),
  setApplicantFeedback: (applicantFeedback: feedback[]) => set({ applicantFeedback: applicantFeedback }),
  setHiringFeedback: (hiringFeedback: feedback[]) => set({ hiringFeedback: hiringFeedback }),
}));

export const InteviewStagesStore = create<InterviewStageseState>((set) => ({
  interviewStage: interviewStagesInitialData,
  sortStatus: { columnAccessor: 'id', direction: 'desc' },

  setSortStatus: (status: any) => set({ sortStatus: status }),
  setInterviewStage: (interviewStage: interviewStage[]) => set({ interviewStage: interviewStage }),
}));

export const InteviewerStore = create<InterviewerState>((set) => ({
  interviewers: interviewerInitialData,
  sortStatus: { columnAccessor: 'id', direction: 'desc' },

  setSortStatus: (status: any) => set({ sortStatus: status }),
  setInterviewers: (interviewers: interviewer[]) => set({ interviewers: interviewers }),
}));

export const ApplicationSourceStore = create<ApplicationSourceState>((set) => ({
  applicationSources: applicationSourcesInitialData,
  setApplicationSources: (applicationSources: applicationSource[]) => set({ applicationSources: applicationSources }),
}));