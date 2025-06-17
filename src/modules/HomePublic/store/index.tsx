import { create } from "zustand";
import { HomeState, VacancyType, FilterType, ApplicationState, ApplicationForm, FilterState, Barangay } from "@modules/HomePublic/types";
import { filterVal, selectedDataVal } from "@src/modules/HomePublic/values";
import { ApplicationFormVal as ApplicationFormCleanVal } from "@src/modules/HomePublic/values/cleanState";

export const HomeStore = create<HomeState>((set) => ({
  selectedData: selectedDataVal,
  applicationFormModal: false,
  alert: "",
  alertBody: "",
  barangays: [{ id: 1, value: 'BRGY 12', label: 'BRGY 12' }],
  barangays2: [{ id: 1, value: 'BRGY 12', label: 'BRGY 12' }],
  sameAsPresent: false,
  isFromPortal: false,

  setIsFromPortal: (isFromPortal: boolean) => set({ isFromPortal: isFromPortal }),
  setSameAsPresent: (sameAsPresent: boolean) => set({ sameAsPresent: sameAsPresent }),
  setBarangays: (barangays: Barangay[]) => set({ barangays: barangays }),
  setBarangays2: (barangays: Barangay[]) => set({ barangays2: barangays }),
  setAlertBody: (alertBody: string) => set({ alertBody: alertBody }),
  setAlert: (alert: string) => set({ alert: alert }),
  setApplicationFormModal: (applicationFormModal: boolean) => set({ applicationFormModal: applicationFormModal }),
  setSelectedData: (selectedData: VacancyType) => set({ selectedData: selectedData }),
}));

export const FilterStore = create<FilterState>((set) => ({
  clearFilter: false,
  filter: filterVal,
  filterDrawer: false,
  isFiltered: false,

  setClearFilter: (clearFilter: boolean) => set({ clearFilter: clearFilter }),
  setFilter: (filter: FilterType) => set({ filter: filter }),
  setFilterDrawer: (filterDrawer: boolean) => set({ filterDrawer: filterDrawer }),
  setIsFiltered: (isFiltered: boolean) => set({ isFiltered: isFiltered }),

  storedFilters: {},
  setStoredFilters: (filter: Record<string, any>) => set({ storedFilters: filter }),

  searchParams: "",
  setSearchParams: (searchParams: string) => set({ searchParams: searchParams }),
}));

export const ApplicationStore = create<ApplicationState>((set) => ({
  activeStepper: 0,
  applicationForm: ApplicationFormCleanVal,
  submit: false,
  isPhotoCaptured: false,
  isPhotoCapture: false,
  submitLoading: false,

  setSubmitLoading: (submitLoading: boolean) => set({ submitLoading: submitLoading }),
  setIsPhotoCapture: (isPhotoCapture: boolean) => set({ isPhotoCapture: isPhotoCapture }),
  setIsPhotoCaptured: (isPhotoCaptured: boolean) => set({ isPhotoCaptured: isPhotoCaptured }),
  setSubmit: (submit: boolean) => set({ submit: submit }),
  setApplicationForm: (applicationForm: ApplicationForm) => set({ applicationForm: applicationForm }),
  setActiveStepper: (activeStepper: number) => set({ activeStepper: activeStepper }),
}));
