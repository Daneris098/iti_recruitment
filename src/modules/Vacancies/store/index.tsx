import { create } from "zustand";
import { ApplicantState, DataTableState, VacancyType, VacancyState, FilterType, FilterState, selectedApplicant, Action, DataTableState2 } from "@modules/Vacancies/types";
import { filterVal, selectedDataVal, selectedApplicantInitial } from "@src/modules/Vacancies/values";


export const VacancyStore = create<VacancyState>((set) => ({
  selectedVacancy: selectedDataVal,
  applicationFormModal: false,
  alert: '',
  action: Action.Null,
  selectedCompanyId: '',
  selectedBranchId: '',
  selectedDivisionId: '',
  selectedDepartmentId: '',
  selectedSectionId: '',

  setSelectedCompanyId: (selectedCompanyId: string) => set({ selectedCompanyId: selectedCompanyId }),
  setSelectedBranchId: (selectedBranchId: string) => set({ selectedBranchId: selectedBranchId }),
  setSelectedDivisionId: (selectedDivisionId: string) => set({ selectedDivisionId: selectedDivisionId }),
  setSelectedDepartmentId: (selectedDepartmentId: string) => set({ selectedDepartmentId: selectedDepartmentId }),
  setSelectedSectionId: (selectedSectionId: string) => set({ selectedSectionId: selectedSectionId }),
  setAction: (action: Action) => set({ action: action }),
  setAlert: (alert: string) => set({ alert: alert }),
  setApplicationFormModal: (applicationFormModal: boolean) => set({ applicationFormModal: applicationFormModal }),
  setSelectedVacancy: (selectedData: VacancyType) => set({ selectedVacancy: selectedData }),
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

// export const ApplicantStore = create<ApplicantState>((set) => ({
//   selectedData: selectedDataVal,
//   loading: false,
//   isViewApplicant: false,
//   selectedApplicant: selectedApplicantInitial,

//   setSelectedApplicant: (selectedApplicant: selectedApplicant) => set({ selectedApplicant: selectedApplicant }),
//   setIsViewApplicant: (isViewApplicant: boolean) => set({ isViewApplicant: isViewApplicant }),
//   setLoading: (loading: boolean) => set({ loading: loading }),
//   setSelectedData: (selected_data: VacancyType) => set({ selectedData: selected_data }),
// }));
export const ApplicantStore = create<ApplicantState>((set) => ({
  selectedData: selectedDataVal,
  loading: false,
  isViewApplicant: false,
  selectedApplicant: selectedApplicantInitial,
  maxLength: 0,

  // Methods to update state
  setMaxLength: (maxLength: number) => set({ maxLength }),
  setSelectedApplicant: (selectedApplicant: selectedApplicant) => set({ selectedApplicant }),
  setIsViewApplicant: (isViewApplicant: boolean) => set({ isViewApplicant }),
  setLoading: (loading: boolean) => set({ loading }),
  setSelectedData: (selected_data: VacancyType) => set({ selectedData: selected_data }),
}));

export const DataTableStore = create<DataTableState>((set) => ({
  time: '',
  search: '',
  totalRecords: 0,
  page: 1,
  pageSize: 15,
  sortStatus: { columnAccessor: 'id', direction: 'desc' },

  setSortStatus: (status: any) => set({ sortStatus: status }),
  setTime: (time: string) => set({ time: time }),
  setSearch: (search: string) => set({ search: search }),
  setTotalRecords: (total: number) => set({ totalRecords: total }),
  setPage: (page: number) => set({ page }),
  setPageSize: (size: number) => set({ pageSize: size }),
}));

export const ViewApplicantsDataTableStore = create<DataTableState2>((set) => ({
  time: '',
  search: '',
  totalRecords: 0,
  page: 1,
  pageSize: 10,
  sortStatus: { columnAccessor: 'guid', direction: 'desc' },
  counts: {},

  setCounts: (counts: { [key: string]: number }) => set({ counts }),
  setTime: (time: string) => set({ time: time }),
  setSearch: (search: string) => set({ search: search }),
  setTotalRecords: (total: number) => set({ totalRecords: total }),
  setPage: (page: number) => set({ page }),
  setPageSize: (size: number) => set({ pageSize: size }),
  setSortStatus: (status: any) => set({ sortStatus: status }),
}));

interface DateRangeState {
  value: [Date | null, Date | null];
  setValue: (newValue: [Date | null, Date | null]) => void;
}

export const useDateRangeStore = create<DateRangeState>((set) => ({
  value: [null, null],
  setValue: (newValue) => set({ value: newValue }),
}));

interface ApplicantId {
  id: number
  setApplicantId: (id: number) => void
}
export const useApplicantIdStore = create<ApplicantId>((set) => ({
  id: 0,
  setApplicantId: (id) => set({ id }),
}))


interface OptionItem {
  id: number;
  value: string;
  label: string;
}

interface AppState {
  companies: OptionItem[];
  departments: OptionItem[];
  interviewers: OptionItem[];
  status: OptionItem[];
  vacancies: OptionItem[];

  setCompanies: (companies: OptionItem[]) => void;
  setDepartments: (departments: OptionItem[]) => void;
  setInterviewers: (interviewers: OptionItem[]) => void;
  setStatus: (status: OptionItem[]) => void;
  setVacancies: (vacancies: OptionItem[]) => void;
}

export const FilterItemsStore = create<AppState>((set) => ({
  companies: [
    { id: 1, value: 'Company A', label: 'Company A' },
    { id: 2, value: 'Company B', label: 'Company B' },
    { id: 3, value: 'Company C', label: 'Company C' },
    { id: 4, value: 'Company D', label: 'Company D' },
  ],
  departments: [
    { id: 1, value: 'HR', label: 'HR' },
    { id: 2, value: 'Engineering', label: 'Engineering' },
    { id: 3, value: 'Marketing', label: 'Marketing' },
  ],
  interviewers: [
    { id: 1, value: 'Alice', label: 'Alice' },
    { id: 2, value: 'Bob', label: 'Bob' },
  ],
  status: [
    { id: 1, value: 'Pending', label: 'Pending' },
    { id: 2, value: 'Interviewed', label: 'Interviewed' },
    { id: 3, value: 'Hired', label: 'Hired' },
  ],
  vacancies: [
    { id: 1, value: 'Frontend Dev', label: 'Frontend Dev' },
    { id: 2, value: 'Backend Dev', label: 'Backend Dev' },
  ],

  setCompanies: (companies) => set({ companies }),
  setDepartments: (departments) => set({ departments }),
  setInterviewers: (interviewers) => set({ interviewers }),
  setStatus: (status) => set({ status }),
  setVacancies: (vacancies) => set({ vacancies }),
}));