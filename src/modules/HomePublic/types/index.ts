export type VacancyType = {
  id: number;
  position: string;
  workplace: string;
  department: string;
  experienceLevel: string;
  employmentType: string;
  jobDescription: string;
  requirements: string[];
  skills: string[];
  benefits: string[];
  desirable: string[];
  dateCreated: string;
};

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

export interface HomeState {
  selectedData: VacancyType;
  applicationFormModal: boolean;
  alert: string;
  alertBody: string;

  setAlertBody: (alertBody: string) => void;
  setAlert: (alert: string) => void;
  setApplicationFormModal: (applicationFormModal: boolean) => void;
  setSelectedData: (selectedData: VacancyType) => void;
}

export interface PhotoRef {
  retakePhoto: () => void;
  upload: () => void;
  skip: () => void;
}

export interface ApplicationState {
  activeStepper: number;
  submit: boolean;
  applicationForm: ApplicationForm
  isPhotoCaptured: boolean;
  isPhotoCapture: boolean;

  setIsPhotoCapture: (submit: boolean) => void;
  setIsPhotoCaptured: (submit: boolean) => void;
  setSubmit: (submit: boolean) => void;
  setApplicationForm: (applicationForm: ApplicationForm) => void;
  setActiveStepper: (activeStepper: number) => void;
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

export interface EmploymentRecord {
  id: number;
  employerCompany: string;
  location: string;
  positionHeld: string;
  inclusiveDate: {
    from: string | null;
    to: string | null;
  };
  salary: number;
  reasonForLeaving: string;
}

export interface GeneralInformation {
  firstChoice: string;
  secondChoice: string;
  desiredSalary: number;
  startDateAvailability: string;

  personalInformation: {
    fullname: {
      firstName: string;
      middleName: string;
      lastName: string;
      suffix: string;
    }
    presentAddress: {
      unitNo: string;
      houseNo: string;
      street: string;
      subdivision: string;
      barangay: string;
      city: string;
      zipCode: string;
      livingArrangement: string;
    }
    permanentAddress: {
      unitNo: string;
      houseNo: string;
      street: string;
      subdivision: string;
      barangay: string;
      city: string;
      zipCode: string;
      livingArrangement: string;
    }
    governmentIdOrNumber: {
      sssNo: string;
      gsisNo: string;
      pagibigNo: string;
      philhealthNo: string;
      tinNo: string;
      rdoCode: string;
      driversLicense: string;
      passport: string;
    }
    dateOfBirth: string;
    placeOfBirth: string;
    age: number;
    gender: string;
    height: number | null;
    weight: number | null;
    civilStatus: string;
    religion: string;
    mobileNumber: string;
    workingEmailAddress: string;
    landlineNumber: string;
  }
}

export interface EducationBackground {
  id: number;
  nameOfSchool: string;
  educationalLevel: string;
  course: string;
  yearsAttended: {
    from: Date | string | null;
    to: Date | string | null;
  }
  professionalLicenses: string;
  certfications: string;
}

export interface Siblings {
  fullname: string;
  age: number;
  occupation: string;
  contactNumber: string;
}

export interface FamilyBackground {
  father: {
    fullname: string;
    age: number;
    occupation: string;
    contactNumber: string;
  }
  mother: {
    fullname: string;
    age: number;
    occupation: string;
    contactNumber: string;
  }

  siblings: Siblings[]

  spouse?: {
    fullname: string;
    age: number;
    occupation: string;
    contactNumber: string;
  }
  children: {
    numberOfChildren: number;
    ageRange: string;
  }

  otherInformation: {
    specialTechnicalSkills: string;
    isConvictedCrimeDetails: string;
    isBeenHospitalizedDetails: string;
    medicalConditionDetails: string;
    relativeWorkingWithUsDetails: string;
  }
}

export interface CharacterReference {
  fullname: string;
  company: string;
  positionHeld: string;
  ContactNo: string;
}

export interface EmploymentReference {
  fullname: string;
  company: string;
  positionHeld: string;
  ContactNo: string;
}

export interface ApplicationSource {
  employeeReferal: boolean;
  jobStreet: boolean;
  headHunter: boolean;
  wordOfMouth: boolean;
  walkin: boolean;
  others: boolean;
}

export interface Reference {
  characterReference: CharacterReference[]
  employmentReference: EmploymentReference[]
  applicationSource: ApplicationSource
}

export interface EducationalAndEmployment {
  educationBackground: EducationBackground[];
  employmentRecord: EmploymentRecord[];
}

export interface ApplicationForm {
  generalInformation: GeneralInformation;
  educationAndEmployment: EducationalAndEmployment;
  familyBackground: FamilyBackground;
  reference: Reference;
  photo: string;
}

export enum Step {
  GeneralInformation,
  EducationalAndEmployment,
  FamilyAndOther,
  Reference,
  Photo,
  Preview,
  Oath
}

export enum AlertType {
  applicationSuccesfull = 'applicationSuccessfull',
  cancelApplication = 'cancelApplication',
  cancelledApplication = 'cancelledApplication',
  submitResponse = 'submitResponse',
}