export interface VacancyState {
  selectedVacancy: VacancyType;
  filterDrawer: boolean;
  filter: FilterType;
  clearFilter: boolean;
  isFiltered: boolean;
  applicationFormModal: boolean;
  alert: string;
  action: string,

  setAction: (action: string) => void;
  setAlert: (alert: string) => void;
  setApplicationFormModal: (applicationFormModal: boolean) => void;
  setClearFilter: (clearFilter: boolean) => void;
  setFilter: (filter: FilterType) => void;
  setSelectedVacancy: (selectedData: VacancyType) => void;
  setFilterDrawer: (filterDrawer: boolean) => void;
  setIsFiltered: (isFiltered: boolean) => void;
}

export interface FilterType {
  dateFrom?: string;
  dateTo?: string;
  postedDate: string | null;
  jobTitle: string;
  department: string[];
  employmentType: string[];
  workplaceType: string[];
  experienceLevel: string[];
}


export interface VacancyType {
  id: number;
  position: string;
  workplace: string;
  department: string;
  company: string;
  branch: string;
  positionLevel: string;
  vacancyType: string;
  division: string;
  section: string;
  hiringManager: string;
  experienceLevel: string;
  employmentType: string;
  jobDescription: string;
  requirements: string[];
  skills: string[];
  benefits: string[];
  desirable: string[];
  dateCreated: string;
  datePublish: string;
  interviewer: string;
  quantity: number;
  status: string;
  vacancyDuration: {
    start: string;
    end: string;
    from: string;
  }
  mustHaveSkills: string;
  qualification: string;
};


export interface FormData {
  title: string;
  amount: number;
}


export interface FetchExpensesParams {
  page: number;
  pageSize: number;
  search: string;
  sortStatus: {
    columnAccessor: string;
    direction: 'asc' | 'desc';
  };
}


export interface ApplicantState {
  selectedData: VacancyType,
  loading: boolean,

  setSelectedData: (action: VacancyType) => void;
  setLoading: (loading: boolean) => void;
}

export interface DataTableState {
  search: string,
  totalRecords: number;
  page: number;
  pageSize: number;
  sortStatus: { columnAccessor: string; direction: 'asc' | 'desc' };

  setSearch: (action: string) => void;
  setTotalRecords: (total: number) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSortStatus: (status: { columnAccessor: string; direction: 'asc' | 'desc' }) => void;
}



export enum AlertType {
  vacancyAddedSuccesfull = 'vacancyAddedSuccesfull',
}