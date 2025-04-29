export interface VacancyState {
  selectedVacancy: VacancyType;
  applicationFormModal: boolean;
  alert: string;
  action: Action,

  setAction: (action: Action) => void;
  setAlert: (alert: string) => void;
  setApplicationFormModal: (applicationFormModal: boolean) => void;
  setSelectedVacancy: (selectedData: VacancyType) => void;
}
export type FilterState = {
  filter: FilterType;
  isFiltered: boolean;
  filterDrawer: boolean;
  clearFilter: boolean;

  setFilter: (filter: FilterType) => void;
  setIsFiltered: (isFiltered: boolean) => void;
  setFilterDrawer: (filterDrawer: boolean) => void;
  setClearFilter: (clearFilter: boolean) => void;
}

export interface FilterType {
  dateFrom?: string;
  dateTo?: string;
  postedDate: string | null;
  company: string[];
  vacancy: string[];
  interviewer: string[];
  department: string[];
  status: string[];
  jobTitle: string;
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
  mustHaveSkills: string[];
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
  isViewApplicant: boolean,
  selectedApplicant: selectedApplicant,

  setSelectedApplicant: (setSelectedApplicant: any) => void;
  setIsViewApplicant: (isViewApplicant: boolean) => void;
  setSelectedData: (action: VacancyType) => void;
  setLoading: (loading: boolean) => void;
}

export interface DataTableState {
  time: string,
  search: string,
  totalRecords: number;
  page: number;
  pageSize: number;
  sortStatus: { columnAccessor: string; direction: 'asc' | 'desc' };

  setTime: (time: string) => void;
  setSearch: (action: string) => void;
  setTotalRecords: (total: number) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSortStatus: (status: { columnAccessor: string; direction: 'asc' | 'desc' }) => void;
}
export interface DataTableState2 {
  time: string,
  search: string,
  totalRecords: number;
  page: number;
  pageSize: number;
  sortStatus: { columnAccessor: string; direction: 'asc' | 'desc' };
  counts: { [key: string]: number };

  setCounts: (counts: { [key: string]: number }) => void;
  setTime: (time: string) => void;
  setSearch: (action: string) => void;
  setTotalRecords: (total: number) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSortStatus: (status: { columnAccessor: string; direction: 'asc' | 'desc' }) => void;
}

export enum ActionTitle {
  New = 'Add Vacancy',
  Edit = 'Edit Vacancy'
}

export enum ActionButtonTitle {
  New = 'ADD',
  Edit = 'UPDATE'
}

export enum AlertType {
  vacancyAddedSuccesfull = 'vacancyAddedSuccesfull',
  closeVacancy = 'closeVacancy',
  closeSuccessfully = 'closeSuccessfully',
  updateSuccessfully = 'updateSuccessfully',
}

export interface selectedApplicant {
  Applicant_Name: string,
  Position: string,
  Status: string,
  Email: string,
  Phone: string,
  Skills: string,
  Remarks: string,
  Application_Date: string
}


export interface Candidate {
    name: string | null;
    id: number | null;
    status: string | null;
}

export interface StageGroup {
    id: number;
    applied: Candidate[];
    forInterview: Candidate[];
    offered: Candidate[];
    hired: Candidate[];
    archived: Candidate[];
}

export enum Action {
  Edit = 'Edit',
  New = 'New',
  Null = 'null'
}

export enum Stage {
  Applied = 'applied',
  ForInterview = 'forInterview',
  Offered = 'offered',
  Hired = 'hired',
  Archived = 'archived'
}