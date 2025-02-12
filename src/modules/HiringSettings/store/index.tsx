import { create } from "zustand";
import { HiringSettingsState, panel } from "@modules/HiringSettings/types";

export const HiringSettingsStore = create<HiringSettingsState>((set) => ({
  alert: '',
  activePanel: panel.applicationSettings,

  setActivePanel: (activePanel: string) => set({ activePanel: activePanel }),
  setAlert: (alert: string) => set({ alert: alert }),
}));

