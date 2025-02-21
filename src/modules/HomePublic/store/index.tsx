import { create } from "zustand";
import { HomeState, VacancyType, FilterType, ApplicationState, ApplicationForm, FilterState } from "@modules/HomePublic/types";
import { ApplicationFormVal, filterVal, selectedDataVal } from "@src/modules/HomePublic/values";

export const HomeStore = create<HomeState>((set) => ({
  selectedData: selectedDataVal,
  applicationFormModal: false,
  alert: '',
  
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
  applicationForm: ApplicationFormVal,
  submit: false,
  isPhotoCaptured: false,
  isPhotoCapture: false,


  setIsPhotoCapture: (isPhotoCapture: boolean) => set({ isPhotoCapture: isPhotoCapture }),
  setIsPhotoCaptured: (isPhotoCaptured: boolean) => set({ isPhotoCaptured: isPhotoCaptured }),
  setSubmit: (submit: boolean) => set({ submit: submit }),
  setApplicationForm: (applicationForm: ApplicationForm) => set({ applicationForm: applicationForm }),
  setActiveStepper: (activeStepper: number) => set({ activeStepper: activeStepper }),
}));

