import { create } from "zustand";
import { HomeState, VacancyType, FilterType, ApplicationState } from "@modules/Home/types";
import { filterVal, GeneralInformationVal, selectedDataVal } from "@src/modules/Home/values";

export const HomeStore = create<HomeState>((set) => ({
  selectedData: selectedDataVal,
  filterDrawer: false,
  filter: filterVal,
  clearFilter: false,
  isFiltered: false,
  applicationFormModal: false,

  setApplicationFormModal: (applicationFormModal: boolean) => set({ applicationFormModal: applicationFormModal }),
  setClearFilter: (clearFilter: boolean) => set({ clearFilter: clearFilter }),
  setFilter: (filter: FilterType) => set({ filter: filter }),
  setSelectedData: (selectedData: VacancyType) => set({ selectedData: selectedData }),
  setFilterDrawer: (filterDrawer: boolean) => set({ filterDrawer: filterDrawer }),
  setIsFiltered: (isFiltered: boolean) => set({ isFiltered: isFiltered }),
}));


export const ApplicationStore = create<ApplicationState>((set) => ({
  activeStepper: 0,
  ApplicationForm: {
    generalInformation: GeneralInformationVal
  },

  setActiveStepper: (activeStepper: number) => set({ activeStepper: activeStepper }),
}));

