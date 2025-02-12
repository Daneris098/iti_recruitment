import { create } from "zustand";
import { OrganizationSettingsState } from "@modules/OrganizationSettings/types";
import { panel } from "@modules/OrganizationSettings/types"

export const OrganizationSettingsStore = create<OrganizationSettingsState>((set) => ({
  alert: '',
  activePanel: panel.companyList,

  setActivePanel: (activePanel: string) => set({ activePanel: activePanel }),
  setAlert: (alert: string) => set({ alert: alert }),
}));

