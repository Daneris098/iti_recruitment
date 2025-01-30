import { EducationBackground, FilterType, GeneralInformation, VacancyType, EmploymentRecord, FamilyBackground, Reference, ApplicationForm } from "@modules/Home/types";

export const selectedDataVal: VacancyType = {
  id: 0,
  position: "",
  workplace: "",
  employmentType: "",
  experienceLevel: "",
  department: "",
  jobDescription: "",
  requirements: [],
  benefits: [],
  desirable: [],
  skills: [],
  dateCreated: ''
};

export const filterVal: FilterType = {
  dateFrom: '',
  dateTo: '',
  postedDate: null,
  jobTitle: '',
  department: [],
  employmentType: [],
  workplaceType: [],
  experienceLevel: [],
}

export const GeneralInformationVal: GeneralInformation = {
  firstChoice: '',
  secondChoice: '',
  desiredSalary: 0,
  startDateAvailability: '',
  personalInformation: {
    fullname: {
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: ''
    },
    presentAddress: {
      unitNo: '',
      houseNo: '',
      street: '',
      subdivision: '',
      barangay: '',
      city: '',
      zipCode: '',
      livingArrangement: ''
    },
    permanentAddress: {
      unitNo: '',
      houseNo: '',
      street: '',
      subdivision: '',
      barangay: '',
      city: '',
      zipCode: '',
      addressType: ''
    },
    dateOfBirth: '',
    placeOfBirth: '',
    age: 0,
    sex: '',
    height: '',
    weight: '',
    civilStatus: '',
    religion: '',
    mobileNumber: '',
    workingEmailAddress: '',
    landlineNumber: ''
  }
};

export const educationBackgroundVal: EducationBackground = {
  nameOfSchool: '',
  educationalLevel: '',
  course: '',
  yearsAttended: {
    from: '',
    to: '',
  },
  professionalLiscenses: '',
  certfications: '',
};

export const employmentRecordVal: [EmploymentRecord] = [{
  employerCompany: '',
  location: '',
  positionHeld: '',
  inclusiveDate: {
    from: '',
    to: '',
  },
  salary: '',
  reasonForLeaving: '',
}];

export const familyBackgroundVal: FamilyBackground = {
  father: {
    fullname: '',
    age: 0,
    occupation: '',
    contactNumber: '',
  },
  mother: {
    fullname: '',
    age: 0,
    occupation: '',
    contactNumber: '',
  },
  siblings: [
    {
      fullname: '',
      age: 0,
      occupation: '',
      contactNumber: '',
    },
  ],
  spouse: {
    fullname: '',
    age: 0,
    occupation: '',
    contactNumber: '',
  },
  children: {
    numberOfChildren: 0,
    ageRange: '',
  },
  governmentIdOrNumber: {
    sssNo: '',
    pagibigNo: '',
    philheathNo: '',
    tinNo: '',
    driversLiscence: '',
    passport: '',
  },
  otherInformation: {
    specialTechnicalSkills: '',
    isConvictedCrimeDetails: '',
    isBeenHospitalizedDetails: '',
    medicalConditionDetails: '',
    relativeWorkingWithUsDetails: '',
  },
};

export const referenceValue: Reference = {
  characterReference: [
    {
      fullname: '',
      company: '',
      positionHeld: '',
      ContactNo: '',
    },
  ],
  employmentReference: [
    {
      fullname: '',
      company: '',
      positionHeld: '',
      ContactNo: '',
    },
  ],
  applicationSource: [
    {
      employeeRefereal: false,
      jobStreet: false,
      headHunter: false,
      wordOfMouth: false,
      walkin: false,
      others: false,
    },
  ],
};


export const ApplicationFormVal: ApplicationForm = {
  generalInformation: GeneralInformationVal,
  educationBackground: educationBackgroundVal,
  employmentRecord: employmentRecordVal,
  familyBackground: familyBackgroundVal,
  reference: referenceValue,
  photo: null
}
