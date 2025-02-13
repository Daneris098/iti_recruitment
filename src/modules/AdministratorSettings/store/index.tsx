import { create } from "zustand";
import { DialogState, AdministratorSettingsState } from "@modules/AdministratorSettings/types";
import { panel } from "@modules/AdministratorSettings/types"

export const AdministratorSettingsStore = create<AdministratorSettingsState>((set) => ({
  alert: '',
  activePanel: panel.userAccounts,

  setActivePanel: (activePanel: string) => set({ activePanel: activePanel }),
  setAlert: (alert: string) => set({ alert: alert }),
}));


export const DialogStore = create<DialogState>((set) => ({
  action: '',
  loading: false,

  setLoading: (loading: boolean) => set({ loading: loading }),
  setAction: (action: string) => set({ action: action }),
}));
