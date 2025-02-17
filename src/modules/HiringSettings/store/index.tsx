import { create } from "zustand";
import { feedback, HiringSettingsState, panel, FeedbackStoreState } from "@modules/HiringSettings/types";
import { initialData, PAGE_SIZE } from "../values";

export const HiringSettingsStore = create<HiringSettingsState>((set) => ({
  alert: '',
  activePanel: panel.customFeedback,

  setActivePanel: (activePanel: string) => set({ activePanel: activePanel }),
  setAlert: (alert: string) => set({ alert: alert }),
}));


export const FeedbackStore = create<FeedbackStoreState>((set) => ({
  applicantFeedback : initialData.slice(0, PAGE_SIZE),
  setApplicantFeedback: (applicantFeedback: feedback[]) => set({ applicantFeedback: applicantFeedback }),
}));

