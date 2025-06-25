export interface VacancyState {
  selectedVacancy: VacancyType;
  applicationFormModal: boolean;
  alert: string;
  action: Action;
  selectedCompanyId: string;
  selectedBranchId: string;
  selectedDivisionId: string;
  selectedDepartmentId: string;
  selectedSectionId: string;
  selectedVacancyApplicantCount: applicantCount;

  setSelectedVacancyApplicantCount: (data: applicantCount) => void;
  setSelectedCompanyId: (action: string) => void;
  setSelectedBranchId: (action: string) => void;
  setSelectedDivisionId: (action: string) => void;
  setSelectedDepartmentId: (action: string) => void;
  setSelectedSectionId: (action: string) => void;
  setAction: (action: Action) => void;
  setAlert: (alert: string) => void;
  setApplicationFormModal: (applicationFormModal: boolean) => void;
  setSelectedVacancy: (selectedData: VacancyType) => void;
}

export type applicantCount = {
  applied: number,
  forInterview: number,
  offered: number,
  hired: number,
  archived: number,
}

export type Components = {
  ViewApplicantsModal: boolean;

  setViewApplicantModal: (ViewApplicantsModal: boolean) => void;
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
};

export interface FilterType {
  dateFrom?: string;
  dateTo?: string;
  postedDate: string | null;
  company: any;
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
  applicantId: number;
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
  dateEnd: string;
  interviewer: string;
  quantity: number;
  status: string;
  vacancyDuration: {
    start: string;
    end: string;
    from: string;
  };
  mustHaveSkills: string[];
  qualification: string;
  branchObj: any
  divisionObj: any
  departmentObj: any
  sectionObj: any
}

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
    direction: "asc" | "desc";
  };
}

export interface ApplicantState {
  selectedData: VacancyType;
  loading: boolean;
  isViewApplicant: boolean;
  selectedApplicant: selectedApplicant;
  maxLength: number;


  setMaxLength: (maxLength: number) => void;
  setSelectedApplicant: (setSelectedApplicant: any) => void;
  setIsViewApplicant: (isViewApplicant: boolean) => void;
  setSelectedData: (action: VacancyType) => void;
  setLoading: (loading: boolean) => void;
}
export interface DataTableState {
  time: string;
  search: string;
  totalRecords: number;
  page: number;
  pageSize: number;
  sortStatus: { columnAccessor: string; direction: "asc" | "desc" };

  setTime: (time: string) => void;
  setSearch: (action: string) => void;
  setTotalRecords: (total: number) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSortStatus: (status: { columnAccessor: string; direction: "asc" | "desc" }) => void;
}
export interface DataTableState2 {
  time: string;
  search: string;
  totalRecords: number;
  page: number;
  pageSize: number;
  sortStatus: { columnAccessor: string; direction: "asc" | "desc" };
  counts: { [key: string]: number };

  setCounts: (counts: { [key: string]: number }) => void;
  setTime: (time: string) => void;
  setSearch: (action: string) => void;
  setTotalRecords: (total: number) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSortStatus: (status: { columnAccessor: string; direction: "asc" | "desc" }) => void;
}

export enum ActionTitle {
  New = "Add Vacancy",
  Edit = "Edit Vacancy",
}

export enum ActionButtonTitle {
  New = "ADD",
  Edit = "UPDATE",
}

export enum AlertType {
  vacancyAddedSuccesfull = "vacancyAddedSuccesfull",
  closeVacancy = "closeVacancy",
  closeSuccessfully = "closeSuccessfully",
  updateSuccessfully = "updateSuccessfully",
}

export interface selectedApplicant {
  nameResponse: {
    firstName: string;
    lastName: string;
    formalName: string;
  };
  contact: {
    emailAddress: string;
    mobileNo: string;
  };
  applicationMovements: {
    status: { name: string };
  }[];
  addresses: {
    zipCode: {
      name: string;
    };
  }[];

  id: number;
  applicantId: number;
  position: string;
  email: string;
  phone: string;
  skills: string;
  remarks: string;
  applicationDate: string;
  isJobOffer: string;
}

export interface Candidate {
  applicantId: number;
  name: string | null;
  id: number | null;
  status: string | null;
  // position: string;
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
  Edit = "Edit",
  New = "New",
  Null = "null",
}

export enum Stage {
  Applied = "applied",
  ForInterview = "forInterview",
  Offered = "offered",
  Hired = "hired",
  Archived = "archived",
}
