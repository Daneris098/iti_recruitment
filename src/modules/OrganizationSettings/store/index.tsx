import { create } from "zustand";
import { Panel } from "../assets/Enum";

type FormValues = Record<string, any>;

interface OrganizationSettingsState {
  alert: string;
  activePanel: string;
  action: string;
  reroute: boolean;
  validationMessage: string;

  setValidationMessage: (validationMessage: string) => void;
  setReroute: (reroute: boolean) => void;
  setAction: (action: string) => void;
  setActivePanel: (activePanel: string) => void;
  setAlert: (alert: string) => void;

  expandedIds: number[];
  toggleExpand: (id: number) => void;
  setExpanded: (ids: number[] | ((prev: number[]) => number[])) => void;
  reset: () => void;

  forms: Record<string, FormValues>;
  updateForm: (formKey: string, values: FormValues) => void;
  getForm: (formKey: string) => FormValues | undefined;

  addOrg: boolean;
  setAddOrg: (addOrg: boolean) => void;

  newRows: any[];
  setNewRows: (newRows: any[]) => void;

  sortBy: string;
  setSortBy: (value: string) => void;
  ascDesc: boolean;
  setAscDesc: (value: boolean) => void;
  toggleAscDesc: () => void;

  time: string;
  setTime: (value: string) => void;
  page: number;
  setPage: (value: number) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
}

export const OrganizationSettingsStore = create<OrganizationSettingsState>((set, get) => ({
  alert: "",
  activePanel: Panel.companyList,
  action: "",
  reroute: true,
  validationMessage: "",

  setReroute: (reroute: boolean) => set({ reroute: reroute }),
  setAction: (action: string) => set({ action: action }),
  setActivePanel: (activePanel: string) => set({ activePanel: activePanel }),
  setAlert: (alert: string) => set({ alert: alert }),
  setValidationMessage: (validationMessage: string) => set({ validationMessage: validationMessage }),

  expandedIds: [],

  toggleExpand: (id) => {
    const { expandedIds } = get();
    set({
      expandedIds: expandedIds.includes(id) ? expandedIds.filter((i) => i !== id) : [id],
    });
  },

  setExpanded: (ids) => {
    if (typeof ids === "function") {
      set((state) => ({
        expandedIds: ids(state.expandedIds),
      }));
    } else {
      set({ expandedIds: ids });
    }
  },

  reset: () => set({ expandedIds: [] }),
  forms: {},

  updateForm: (formKey, values) =>
    set((state) => ({
      forms: {
        ...state.forms,
        [formKey]: values,
      },
    })),

  getForm: (formKey) => get().forms[formKey],

  addOrg: false,
  setAddOrg: (add: boolean) => set({ addOrg: add }),

  newRows: [],
  setNewRows: (row: any[]) => set({ newRows: row }),

  sortBy: "", // default
  setSortBy: (value) => set({ sortBy: value }),
  ascDesc: true, // or false as default
  setAscDesc: (value) => set({ ascDesc: value }),
  toggleAscDesc: () => set((state) => ({ ascDesc: !state.ascDesc })),

  time: "",
  setTime: (value: string) => set({ time: value }),

  page: 1,
  setPage: (value: number) => set({ page: value }),
  pageSize: 15,
  setPageSize: (value: number) => set({ pageSize: value }),
}));
