import { create } from "zustand";
import { OrganizationSettingsState } from "@modules/AdministratorSettings/types";
import { panel } from "@modules/AdministratorSettings/types"

export const OrganizationSettingsStore = create<OrganizationSettingsState>((set) => ({
  alert: '',
  activePanel: panel.userAccounts,

  setActivePanel: (activePanel: string) => set({ activePanel: activePanel }),
  setAlert: (alert: string) => set({ alert: alert }),
}));

