import { create } from "zustand";
import { feedback, HiringSettingsState, panel, FeedbackStoreState, InterviewStageseState, interviewStage, InterviewerState, interviewer, ApplicationSourceState, applicationSource } from "@modules/HiringSettings/types";
import { applicantInitialData, hiringInitialData, PAGE_SIZE, interviewStagesInitialData, interviewerInitialData, applicationSourcesInitialData } from "../values";

export const HiringSettingsStore = create<HiringSettingsState>((set) => ({
  alert: '',
  activePanel: panel.customFeedback,

  setActivePanel: (activePanel: panel) => set({ activePanel: activePanel }),
  setAlert: (alert: string) => set({ alert: alert }),
}));


export const FeedbackStore = create<FeedbackStoreState>((set) => ({
  applicantFeedback: applicantInitialData.slice(0, PAGE_SIZE),
  hiringFeedback: hiringInitialData.slice(0, PAGE_SIZE),
  setApplicantFeedback: (applicantFeedback: feedback[]) => set({ applicantFeedback: applicantFeedback }),
  setHiringFeedback: (hiringFeedback: feedback[]) => set({ hiringFeedback: hiringFeedback }),
}));

export const InteviewStagesStore = create<InterviewStageseState>((set) => ({
  interviewStage: interviewStagesInitialData,
  setInterviewStage: (interviewStage: interviewStage[]) => set({ interviewStage: interviewStage }),
}));

export const InteviewerStore = create<InterviewerState>((set) => ({
  interviewers: interviewerInitialData,
  setInterviewers: (interviewers: interviewer[]) => set({ interviewers: interviewers }),
}));

export const ApplicationSourceStore = create<ApplicationSourceState>((set) => ({
  applicationSources: applicationSourcesInitialData,
  setApplicationSources: (applicationSources: applicationSource[]) => set({ applicationSources: applicationSources }),
}));