import { create } from "zustand";
import { JobState, JobType, FilterType } from "@modules/Home/types";
import { filterVal, selectedDataVal } from "@src/modules/Home/values";

export const HomeStore = create<JobState>((set) => ({
  selectedData: selectedDataVal,
  filterDrawer: false,
  filter: filterVal,
  clearFilter: false,
  isFiltered: false,
  applicationForm: false,
  activeStepper: 0,

  setActiveStepper: (activeStepper: number) => set({ activeStepper: activeStepper }),
  setApplicationForm: (applicationForm: boolean) => set({ applicationForm: applicationForm }),
  setClearFilter: (clearFilter: boolean) => set({ clearFilter: clearFilter }),
  setFilter: (filter: FilterType) => set({ filter: filter }),
  setSelectedData: (selectedData: JobType) => set({ selectedData: selectedData }),
  setFilterDrawer: (filterDrawer: boolean) => set({ filterDrawer: filterDrawer }),
  setIsFiltered: (isFiltered: boolean) => set({ isFiltered: isFiltered }),
}));
