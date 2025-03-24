import { create } from "zustand";
import { HomeState, VacancyType, FilterType, ApplicationState, ApplicationForm, FilterState } from "@modules/HomePublic/types";
import { ApplicationFormVal, filterVal, selectedDataVal } from "@src/modules/HomePublic/values";
import { ApplicationFormVal as ApplicationFormCleanVal } from "@src/modules/HomePublic/values/cleanState";

export const HomeStore = create<HomeState>((set) => ({
  selectedData: selectedDataVal,
  applicationFormModal: false,
  alert: '',
  alertBody: '',

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

