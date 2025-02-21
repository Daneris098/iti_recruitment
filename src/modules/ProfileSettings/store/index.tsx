import { create } from "zustand";
import { ProfileSettingsState } from "@modules/ProfileSettings/types";


export const ProfileSettingsStore = create<ProfileSettingsState>((set) => ({
  alert: '',
  activePanel: '',

  setActivePanel: (activePanel: string) => set({ activePanel: activePanel }),
  setAlert: (alert: string) => set({ alert: alert }),
}));

