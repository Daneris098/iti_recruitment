import { create } from "zustand";
import { DialogState, DataTableState, VacancyType, VacancyState, FilterType } from "@modules/Vacancies/types";
import { filterVal, selectedDataVal } from "@src/modules/Vacancies/values";


export const Vacancytore = create<VacancyState>((set) => ({
  selectedData: selectedDataVal,
  filterDrawer: false,
  filter: filterVal,
  clearFilter: false,
  isFiltered: false,
  applicationFormModal: false,
  alert: '',

  setAlert: (alert: string) => set({ alert: alert }),
  setApplicationFormModal: (applicationFormModal: boolean) => set({ applicationFormModal: applicationFormModal }),
  setClearFilter: (clearFilter: boolean) => set({ clearFilter: clearFilter }),
  setFilter: (filter: FilterType) => set({ filter: filter }),
  setSelectedData: (selectedData: VacancyType) => set({ selectedData: selectedData }),
  setFilterDrawer: (filterDrawer: boolean) => set({ filterDrawer: filterDrawer }),
  setIsFiltered: (isFiltered: boolean) => set({ isFiltered: isFiltered }),
}));


export const DialogStore = create<DialogState>((set) => ({
  action: '',
  selectedData: selectedDataVal,
  loading: false,

  setLoading: (loading:boolean) => set({ loading: loading }),
  setSelectedData: (selected_data: VacancyType) => set({ selectedData: selected_data }),
  setAction: (action: string) => set({ action: action }),
}));

export const DataTableStore = create<DataTableState>((set) => ({
  search: '',
  totalRecords: 0,
  page: 1,
  pageSize: 20,
  sortStatus: { columnAccessor: 'createdAt', direction: 'desc' },

  setSearch: (search: string) => set({ search: search }),
  setTotalRecords: (total:number) => set({ totalRecords: total }),
  setPage: (page:number) => set({ page }),
  setPageSize: (size:number) => set({ pageSize: size }),
  setSortStatus: (status:any) => set({ sortStatus: status }),
}));

