import { create } from "zustand";
import { DialogState, AdministratorSettingsState, user, UserForm } from "@modules/AdministratorSettings/types";
import { panel, DataTableState, ResetCredentialForm } from "@modules/AdministratorSettings/types";
import { selectedDataInitialVal, UserFormVal, ResetCredentialFormVal } from "@modules/AdministratorSettings/value";

export const AdministratorSettingsStore = create<AdministratorSettingsState>((set) => ({
  alert: "",
  activePanel: panel.userAccounts,
  selectedUser: selectedDataInitialVal,
  newlyAddedUser: UserFormVal,
  resetCredentials: ResetCredentialFormVal,

  emailError: "",
  setEmailError: (emailError: string) => set({ emailError: emailError }),

  usernameError: "",
  setUsernameError: (usernameError: string) => set({ usernameError: usernameError }),

  setResetCredentials: (resetCredentials: ResetCredentialForm) => set({ resetCredentials: resetCredentials }),
  setNewlyAddedUser: (newlyAddedUser: UserForm) => set({ newlyAddedUser: newlyAddedUser }),
  setSelectedUser: (selectedUser: user) => set({ selectedUser: selectedUser }),
  setActivePanel: (activePanel: string) => set({ activePanel: activePanel }),
  setAlert: (alert: string) => set({ alert: alert }),
}));

export const DialogStore = create<DialogState>((set) => ({
  action: "",
  loading: false,

  setLoading: (loading: boolean) => set({ loading: loading }),
  setAction: (action: string) => set({ action: action }),
}));

export const DataTableStore = create<DataTableState>((set) => ({
  time: "",
  search: "",
  totalRecords: 0,
  page: 1,
  pageSize: 10,
  sortStatus: { columnAccessor: "guid", direction: "desc" },

  setTime: (time: string) => set({ time: time }),
  setSearch: (search: string) => set({ search: search }),
  setTotalRecords: (total: number) => set({ totalRecords: total }),
  setPage: (page: number) => set({ page }),
  setPageSize: (size: number) => set({ pageSize: size }),
  setSortStatus: (status: any) => set({ sortStatus: status }),
}));
