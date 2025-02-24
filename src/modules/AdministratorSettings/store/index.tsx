import { create } from "zustand";
import { DialogState, AdministratorSettingsState, user } from "@modules/AdministratorSettings/types";
import { panel } from "@modules/AdministratorSettings/types"
import { selectedDataInitialVal } from "@modules/AdministratorSettings/value";

export const AdministratorSettingsStore = create<AdministratorSettingsState>((set) => ({
  alert: '',
  activePanel: panel.userAccounts,
  selectedUser: selectedDataInitialVal,

  setSelectedUser: (selectedUser: user) => set({ selectedUser: selectedUser }),
  setActivePanel: (activePanel: string) => set({ activePanel: activePanel }),
  setAlert: (alert: string) => set({ alert: alert }),
}));


export const DialogStore = create<DialogState>((set) => ({
  action: '',
  loading: false,

  setLoading: (loading: boolean) => set({ loading: loading }),
  setAction: (action: string) => set({ action: action }),
}));
