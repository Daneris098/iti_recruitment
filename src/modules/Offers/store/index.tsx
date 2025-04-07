import jobOfferCandidates from "@modules/Offers/values/response/offers.json"
import { create } from "zustand";
import { sortBy } from "lodash";
import { AllJobOffersFilterType, FilterState, OfferType } from "@src/modules/Offers/types";
import { filterVal, selectedDataVal } from '@modules/Offers/values';
// fetching
interface JobOffersColumns {
  id: string;
  Applicant_Name: string;
  Date_Generated: string;
  Date_Last_Updated: string;
  Remarks: string;
  Status: string;
  Attachments: string;
}

interface JobOffersStore {
  records: JobOffersColumns[];
  loadCandidates: () => void;
}

export const useJobOfferStore = create<JobOffersStore>((set) => ({
  records: [],
  loadCandidates: () => set({ records: jobOfferCandidates }),
}))

// end of fetching

// sorting
interface SortState {
  columnAccessor: string;
  direction: "asc" | "desc";
  sortedRecords: JobOffersColumns[];

  setSort: (column: string, records: JobOffersColumns[]) => void;
  setRecords: (records: JobOffersColumns[]) => void;
}

export const useSortStore = create<SortState>((set, get) => ({
  columnAccessor: "Remarks",
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
// end of sorting

//pagination
interface PaginationState {
  page: number;
  pageSize: number;
  setPageSize: (size: number) => void;
  setPage: (page: number) => void;
  getPaginatedRecords: (records: JobOffersColumns[]) => JobOffersColumns[];
}

export const usePaginationStore = create<PaginationState>((set, get) => ({
  page: 1,
  pageSize: 10,

  setPage: (page) => set({ page }),
  setPageSize: (size) => set({ pageSize: size }),

  getPaginatedRecords: (records) => {
    const { page, pageSize } = get();
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return records.slice(startIndex, endIndex);
  },
}));
//end of pagination


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