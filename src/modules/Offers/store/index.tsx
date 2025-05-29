import { sortBy } from "lodash";
import { create } from "zustand";
import { filterVal, selectedDataVal } from '@modules/Offers/values';
import { AllJobOffersFilterType, FilterState, OfferType, JobOffersStore, SortState } from "@src/modules/Offers/types";


//#region FETCH
export const useJobOfferStore = create<JobOffersStore>((set) => ({
  records: [],
  loadCandidates: (data) => set({ records: data }),
}));

//#region SORT
export const useSortStore = create<SortState>((set, get) => ({
  columnAccessor: "id",
  direction: "asc",
  sortedRecords: [],

  setSort: (column, records) => {
    set((state) => {
      const newDirection =
        state.columnAccessor === column && state.direction === "asc" ? "desc" : "asc";

      const sorted = sortBy(records, column);
      const updatedRecords = newDirection === "desc" ? sorted.reverse() : sorted;

      return {
        columnAccessor: column,
        direction: newDirection,
        sortedRecords: updatedRecords,
      };
    });
  },

  setRecords: (records) => {
    const { columnAccessor, direction } = get();
    const sorted = sortBy(records, columnAccessor);
    set({ sortedRecords: direction === "desc" ? sorted.reverse() : sorted });
  },
}))

//#region FILTER
// For Filtering
export const FilterStore = create<FilterState>((set) => ({
  selectedData: selectedDataVal,
  filterDrawer: false,
  filter: filterVal,
  clearFilter: false,
  isFiltered: false,
  modal: false,
  alert: '',
  activeTab: "All_offers",

  setAlert: (alert: string) => set({ alert: alert }),
  setModal: (modal: boolean) => set({ modal: modal }),
  setClearFilter: (clearFilter: boolean) => set({ clearFilter: clearFilter }),
  setSelectedData: (selectedData: OfferType) => set({ selectedData: selectedData }),
  setFilterDrawer: (filterDrawer: boolean) => set({ filterDrawer: filterDrawer }),
  setIsFiltered: (isFiltered: boolean) => set({ isFiltered: isFiltered }),
  setFilter: (filter: AllJobOffersFilterType) => set({ filter: filter }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
// end of filtering

interface ApplicantId {
  id: number
  setApplicantId: (id: number) => void
}

export const useViewAcceptedOfferId = create<ApplicantId>((set) => ({
  id: 0,
  setApplicantId: (id) => set({ id }),
}))
