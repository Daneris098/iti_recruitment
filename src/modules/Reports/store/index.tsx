import { create } from "zustand";
import { ReportState } from "@modules/Reports/types";

export const ReportStore = create<ReportState>((set, get) => ({
  selectedReport: null,
  alert: null,
  isPreview: false,

  setIsPreview: (isPreview) => set({ isPreview }),
  setAlert: (alert) => set({ alert }),
  setSelectedReport: (selectedReport) => set({ selectedReport }),
  forms: {},

  updateForm: (formKey, values) =>
    set((state) => ({
      forms: {
        ...state.forms,
        [formKey]: values,
      },
    })),

  getForm: (formKey) => get().forms[formKey],
}));
