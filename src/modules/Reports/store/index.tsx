import { create } from "zustand";
import { ReportState } from "@modules/Reports/types";


export const ReportStore = create<ReportState>((set) => ({
  selectedReport: null,
  alert: null,
  isPreview: false,

  setIsPreview: (isPreview) => set({ isPreview }),
  setAlert: (alert) => set({ alert }),
  setSelectedReport: (selectedReport) => set({ selectedReport }),
}));
