
export interface HiringSettingsState {
  alert: string;
  activePanel: string;

  setActivePanel: (activePanel: string) => void;
  setAlert: (alert: string) => void;
}

export type feedback = {
  id: number;
  feedback: string;
};
export interface FeedbackStoreState {
  applicantFeedback: feedback[];
  hiringFeedback: feedback[];
  setApplicantFeedback: (applicantFeedback: feedback[]) => void;
  setHiringFeedback: (hiringFeedback: feedback[]) => void;
}

export type interviewStage = {
  id: number;
  stageName: string;
  status: string;
  lastModified: string;
};
export interface InterviewStageseState {
  interviewStage: interviewStage[];
  setInterviewStage: (interviewStage: interviewStage[]) => void;
}

export type interviewer = {
  id: number;
  name: string;
  status: string;
  lastModified: string;
};
export interface InterviewerState {
  interviewers: interviewer[];
  setInterviewers: (interviewers: interviewer[]) => void;
}

export enum AlertType {
  saved = 'saved',
  cancel = 'Cancel',
  cancellled = 'Cancelled',
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
  jobOfferTemplate = 'Job Offer Template',
}

export enum panel {
  customFeedback = 'customFeedback',
  offerResponsePeriod = 'offerResponsePeriod',
  applicationSettings = 'applicationSettings',
  interviewStages = 'interviewStages',
  interviewers = 'interviewers',
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