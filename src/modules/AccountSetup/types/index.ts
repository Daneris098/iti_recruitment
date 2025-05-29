export enum Step {
  profile,
  organization,
  hiring,
}

export enum Submodule {
  profile = "profile",
  organization = "organization",
  hiring = "hiring",
}

export interface AccountSetupState {
  activeStepper: number;
  accountSetupForm: accountSetupForm;
  alert: string;

  setAlert: (alert: string) => void;
  setAccountSetupForm: (form: accountSetupForm) => void;
  setActiveStepper: (activeStepper: number) => void;

  forms: Record<string, Record<string, any>>;
  updateForm: (formKey: string, values: Record<string, any>) => void;
  getForm: (formKey: string) => Record<string, any> | undefined;
}
export interface company {
  id: number;
  code: string;
  name: string;
}

export interface branch {
  id: number;
  code: string;
  name: string;
  location: string;
  area: string;
  status: string;
  description: string;
}

export interface division {
  id: number;
  code: string;
  name: string;
  status: string;
  description: string;
}

export interface interviewStage {
  id: number;
  name: string;
}
export interface interviewer {
  id: number;
  name: string;
}

export enum AlertType {
  save = "save",
  saved = "saved",
  nextStep = "nextStep",
}

/* Stepper Parents */

export interface profile {
  name: {
    lastName: string;
    firstName: string;
    middleName: string;
    suffix: string;
  };
}

export interface SubModuleRef {
  submit: () => void;
}

export interface organization {
  companyList: company[];
  branchList: branch[];
  divisionList: division[];
}
export interface hiring {
  offerResponsePeriod: number | null;
  applicationSettings: {
    allowReApply: boolean | null;
    alloweReApplyAfer: number | null;
  };
  interviewStages: interviewStage[];
  interviewers: interviewer[];
}

export interface accountSetupForm {
  profile: profile;
  organization: organization;
  hiring: hiring;
}
