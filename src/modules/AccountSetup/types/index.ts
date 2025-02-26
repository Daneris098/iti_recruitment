export enum Step {
  profile,
  organization,
  hiring,
}

export interface AccountSetupState {
  activeStepper: number;
  form: form;
  alert: string;

  setAlert: (alert: string) => void;
  setForm: (form: form) => void;
  setActiveStepper: (activeStepper: number) => void;
}
export interface company {
  id: number
  code: string
  name: string
}

export interface branch {
  id: number
  code: string
  name: string
  location: string
  area: string
  status: string
  description: string
}

export interface division {
  id: number
  code: string
  name: string
  status: string
  description: string
}

export interface interviewStage {
  id: number
  name: string
}
export interface interviewer {
  id: number
  name: string
}

export enum AlertType {
  save = 'save',
  saved = 'saved',
  nextStep = 'nextStep',
}

/* Stepper Parents */

export interface profile {
  name: {
    lastName: string
    fisrtName: string
    middleName: string
    suffix: string
  }
}
export interface organization {
  companyList: company[]
  branchList: branch[]
  divisionList: division[]
}
export interface hiring {
  offerResponsePeriod: number
  applicationSettings: {
    allowReApply: boolean
    alloweReApplyAfer: number
  }
  interviewStages: interviewStage[]
  interviewers: interviewer[]
}

export interface form {
  profile: profile
  organization: organization
  hiring: hiring
}