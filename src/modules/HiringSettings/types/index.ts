import ExcelJS from "exceljs";
export interface DataTableRef {
  saveAll: () => void;
  cancelAll: () => void;
}
export interface DataTableRefs {
  customFeedback: React.RefObject<DataTableRef>;
  interviewers: React.RefObject<DataTableRef>;
  interviewStages: React.RefObject<DataTableRef>;
  applicationSource: React.RefObject<DataTableRef>;

  offerResponsePeriod?: React.RefObject<DataTableRef>;
  applicationSettings?: React.RefObject<DataTableRef>;
  jobOfferTemplate?: React.RefObject<DataTableRef>;
}

export enum Operation {
  add = 'add',
  edit = 'edit',
  noOperation = 'null',
}

export type feedback = {
  id: number;
  feedback: string;
  fieldStatus?: string;
};

export type interviewStage = {
  id: number;
  stageName: string;
  status: string;
  fieldStatus?: string;
  lastModified: string;
};

export type applicationSource = {
  id: number;
  sourceName: string;
  status: string;
  fieldStatus? : string;
  lastModified: string;
};

export type interviewer = {
  id: number;
  name: string;
  status: string;
  fieldStatus? : string;
  lastModified: string;
};

export interface HiringSettingsState {
  alert: string;
  activePanel: panel;
  validationMessage: string,

  setValidationMessage: (validationMessage: string) => void;
  setActivePanel: (activePanel: panel) => void;
  setAlert: (alert: string) => void;
}

export interface FeedbackStoreState {
  applicantFeedback: feedback[];
  hiringFeedback: feedback[];

  setApplicantFeedback: (applicantFeedback: feedback[]) => void;
  setHiringFeedback: (hiringFeedback: feedback[]) => void;
}

export interface vacancyForm {
  positionTitle: string;
  company: string;
  branch: string;
  division: string;
  department: string;
  section: string;
  employmentType: string;
  workplaceType: string;
  vacancyType: string;
  experienceLevel: string;
  duration: {
    start: string;
    end: string;
  }
  noOfOpenPosition: number;
  jobDescription: string;
  mustHaveSkills: string[];
  qualification: string;
}


export interface InterviewStageseState {
  interviewStage: interviewStage[];
  setInterviewStage: (interviewStage: interviewStage[]) => void;
}
export interface InterviewerState {
  interviewers: interviewer[];
  setInterviewers: (interviewers: interviewer[]) => void;
}
export interface ApplicationSourceState {
  applicationSources: applicationSource[];
  setApplicationSources: (applicationSources: applicationSource[]) => void;
}

export enum AlertType {
  saved = 'saved',
  cancel = 'Cancel',
  cancellled = 'Cancelled',
  validation = 'Validation'
}

export enum title {
  companyList = 'Company List',
  branch = 'Branch',
  section = 'Section',
  division = 'Division',
  positionLevel = 'Position Level',
  departments = 'Departments',
}

export enum description {
  customFeedback = 'Custom Feedback',
  offerResponsePeriod = 'Offer Response Period',
  applicationSettings = 'Application Settings',
  interviewStages = 'Interview Stages',
  interviewers = 'Interviewers',
  applicationSource = 'Application Source',
  jobOfferTemplate = 'Job Offer Template',
}

export enum panel {
  customFeedback = 'customFeedback',
  offerResponsePeriod = 'offerResponsePeriod',
  applicationSettings = 'applicationSettings',
  interviewStages = 'interviewStages',
  interviewers = 'interviewers',
  applicationSource = 'applicationSource',
  jobOfferTemplate = 'jobOfferTemplate',
}

export const columns = {
  companyList: [
    { accessor: 'name', title: 'Name', sortable: true },
    { accessor: 'code', title: 'Code', sortable: true },
  ],
  branch: [
    { accessor: 'code', title: 'Code', sortable: true },
    { accessor: 'name', title: 'Name', sortable: true },
    { accessor: 'location', title: 'Location', sortable: true },
    { accessor: 'area', title: 'Area', sortable: true },
    { accessor: 'description', title: 'Description', sortable: true },
    { accessor: 'status', title: 'Status', sortable: true },
  ],
  section: [
    { accessor: 'code', title: 'Code', sortable: true },
    { accessor: 'name', title: 'Name', sortable: true },
    { accessor: 'division', title: 'Division', sortable: true },
    { accessor: 'department', title: 'Department', sortable: true },
    { accessor: 'description', title: 'Description', sortable: true },
    { accessor: 'status', title: 'Status', sortable: true },
  ],
  division: [
    { accessor: 'code', title: 'Code', sortable: true },
    { accessor: 'name', title: 'Name', sortable: true },
    { accessor: 'description', title: 'Description', sortable: true },
    { accessor: 'status', title: 'Status', sortable: true },
  ],
  positionLevel: [
    { accessor: 'code', title: 'Code', sortable: true },
    { accessor: 'name', title: 'Name', sortable: true },
    { accessor: 'description', title: 'Description', sortable: true },
    { accessor: 'status', title: 'Status', sortable: true },
  ],
  departments: [
    { accessor: 'code', title: 'Code', sortable: true },
    { accessor: 'name', title: 'Name', sortable: true },
    { accessor: 'departmentHead', title: 'Department Head', sortable: true },
    { accessor: 'division', title: 'Division', sortable: true },
    { accessor: 'description', title: 'Description', sortable: true },
    { accessor: 'status', title: 'Status', sortable: true },
  ],
};

export type SpreadsheetCell = {
  value: string;
  readOnly?: boolean;
  className?: string;
};

export type ExportOptions = {
    sheetName?: string;
    fileName?: string;
    data: SpreadsheetCell[][];
    image?: string; // base64 or URL
    customStylingFn?: (worksheet: ExcelJS.Worksheet) => void;
};