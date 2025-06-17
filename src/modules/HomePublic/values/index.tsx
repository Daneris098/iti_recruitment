import { EducationBackground, FilterType, GeneralInformation, VacancyType, EmploymentRecord, FamilyBackground, Reference, ApplicationForm, EducationalAndEmployment } from "@modules/HomePublic/types";
import { educationAndEmploymentVal2, familyBackgroundVal2, GeneralInformationVal2, referenceValue2 } from "./cleanState";

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
  firstChoice: 'Web Developer',
  secondChoice: 'Mobile Developer',
  desiredSalary: 40000,
  startDateAvailability: '2025-03-02',
  personalInformation: {
    fullname: {
      firstName: 'Jane',
      middleName: '',
      lastName: 'Cooper',
      suffix: ''
    },
    presentAddress: {
      unitNo: '0001',
      houseNo: '0987',
      street: 'Urban',
      subdivision: 'Deca Homes',
      barangay: '3',
      city: 'Caloocan City',
      zipCode: '1400',
      livingArrangement: 'OWNED'
    },
    permanentAddress: {
      unitNo: '0001',
      houseNo: '0987',
      street: 'Urban',
      subdivision: 'Deca Homes',
      barangay: '3',
      city: 'Caloocan City',
      zipCode: '1400',
      livingArrangement: 'OWNED'
    },
    governmentIdOrNumber: {
      sssNo: '1123457789',
      gsisNo: '1123457789',
      pagibigNo: '1123457789',
      philhealthNo: '1123457789',
      tinNo: '1123457789',
      rdoCode: '1123457789',
      driversLicense: '1123457789',
      passport: '1123457789',
    },
    dateOfBirth: '2000-03-01',
    placeOfBirth: 'Quezon City, PH',
    age: 20,
    gender: 'Female',
    height: 5.6,
    weight: 60,
    civilStatus: 'Single',
    religion: 'Roman Catholic',
    mobileNumber: 0,
    workingEmailAddress: 'jane@microsoft.com',
    landlineNumber: '+44 20 7123 4567'
  }
};

export const educationBackgroundVal: EducationBackground[] = [{
  id: 1,
  nameOfSchool: 'UP',
  educationalLevel: 'Bachelor Degree',
  course: 'Computer Science',
  yearsAttended: {
    from: new Date('Wed Jan 01 2020 00:00:00 GMT+0800 (Philippine Standard Time)'),
    to: new Date('Wed Jan 01 2024 00:00:00 GMT+0800 (Philippine Standard Time)'),
  },
  professionalLicenses: 'AWS Practitioner',
  certifications: '',
}];

export const employmentRecordVal: EmploymentRecord[] = [{
  id: 1,
  employerCompany: 'Microsoft',
  location: 'Quezon City',
  positionHeld: 'Senior Consultant',
  inclusiveDate: {
    from: '2016-01-02',
    to: '2020-01-02'
  },
  salary: 50000,
  reasonForLeaving: 'Better Opportunity',
}];

export const educationAndEmploymentVal: EducationalAndEmployment = {
  educationBackground: educationBackgroundVal,
  employmentRecord: employmentRecordVal
}

export const familyBackgroundVal: FamilyBackground = {
  father: {
    fullname: 'Melandro Jr.Taguinoid',
    age: 70,
    occupation: 'Graphic Designer',
    contactNumber: '255 555-0118',
  },
  mother: {
    fullname: 'Darlene Taguinoid',
    age: 60,
    occupation: 'Neurologist',
    contactNumber: '60',
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
  otherInformation: {
    specialTechnicalSkills: '',
    isConvictedCrimeDetails: 'No',
    isBeenHospitalizedDetails: 'No',
    medicalConditionDetails: 'No',
    relativeWorkingWithUsDetails: 'No',
  },
};

export const referenceValue: Reference = {
  characterReference: [
    {
      fullname: 'Mary Ann Santiago',
      company: 'Intellismart',
      positionHeld: 'Project Manager',
      ContactNo: '+63 94 7744 3626',
    },
  ],
  employmentReference: [
    {
      fullname: 'Shane Santiago',
      company: 'Intellismart',
      positionHeld: 'Project Manager',
      ContactNo: '+63 94 7744 3626',
    },
  ],
  applicationSource:
  {
    employeeReferal: false,
    jobStreet: false,
    headHunter: false,
    wordOfMouth: false,
    walkin: false,
    others: false,
    description: ''
  },
};


export const ApplicationFormVal: ApplicationForm = {
  generalInformation: GeneralInformationVal,
  educationAndEmployment: educationAndEmploymentVal,
  familyBackground: familyBackgroundVal,
  reference: referenceValue,
  photo: ''
}

export const ApplicationFormValClean: ApplicationForm = {
  generalInformation: GeneralInformationVal2,
  educationAndEmployment: educationAndEmploymentVal2,
  familyBackground: familyBackgroundVal2,
  reference: referenceValue2,
  photo: ''
}
