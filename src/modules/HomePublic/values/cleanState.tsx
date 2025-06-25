import { EducationBackground, GeneralInformation, EmploymentRecord, FamilyBackground, Reference, ApplicationForm, EducationalAndEmployment } from "@modules/HomePublic/types";

export const GeneralInformationVal: GeneralInformation = {
  firstChoice: "",
  secondChoice: "",
  desiredSalary: 0,
  startDateAvailability: "",
  personalInformation: {
    fullname: {
      firstName: "",
      middleName: "",
      lastName: "",
      suffix: "",
    },
    presentAddress: {
      unitNo: "",
      houseNo: "",
      street: "",
      subdivision: "",
      barangay: "",
      city: "",
      zipCode: "",
      livingArrangement: "",
    },
    permanentAddress: {
      unitNo: "",
      houseNo: "",
      street: "",
      subdivision: "",
      barangay: "",
      city: "",
      zipCode: "",
      livingArrangement: "",
    },
    governmentIdOrNumber: {
      sssNo: "",
      gsisNo: "",
      pagibigNo: "",
      philhealthNo: "",
      tinNo: "",
      rdoCode: "",
      driversLicense: "",
      passport: "",
    },
    dateOfBirth: "",
    placeOfBirth: "",
    age: 0,
    gender: "",
    height: null,
    weight: null,
    civilStatus: "",
    religion: "",
    mobileNumber: 0,
    workingEmailAddress: "",
    landlineNumber: "",
  },
};

export const GeneralInformationVal2: GeneralInformation = {
  firstChoice: "",
  secondChoice: "",
  desiredSalary: 40000,
  // startDateAvailability: '2025-03-02',/
  startDateAvailability: "",
  personalInformation: {
    fullname: {
      firstName: "Jane",
      middleName: "",
      lastName: "Cooper",
      suffix: "",
    },
    presentAddress: {
      unitNo: "0001",
      houseNo: "0987",
      street: "Urban",
      subdivision: "Deca Homes",
      barangay: "",
      city: "",
      zipCode: "1400",
      livingArrangement: "OWNED",
    },
    permanentAddress: {
      unitNo: "0001",
      houseNo: "0987",
      street: "Urban",
      subdivision: "Deca Homes",
      barangay: "",
      city: "",
      zipCode: "1400",
      livingArrangement: "OWNED",
    },

    governmentIdOrNumber: {
      sssNo: "1234567890",
      gsisNo: "12345678901",
      pagibigNo: "98765432109",
      driversLicense: "DLN12345678",
      philhealthNo: "123456789012",
      passport: "PA1234567890",
      tinNo: "123456789",
      rdoCode: "041",
    },

    dateOfBirth: "2000-03-01",
    placeOfBirth: "Quezon City, PH",
    age: 30,
    gender: "Female",
    height: 5.6,
    weight: 60,
    civilStatus: "Single",
    religion: "Roman Catholic",
    mobileNumber: 0,
    workingEmailAddress: "",
    landlineNumber: "",
  },
};

export const educationBackgroundVal: EducationBackground[] = [
  {
    id: 0,
    nameOfSchool: "",
    educationalLevel: "",
    course: "",
    yearsAttended: {
      from: null,
      to: null,
    },
    professionalLicenses: "",
    certifications: "",
  },
];

export const employmentRecordVal: EmploymentRecord[] = [
  {
    id: 0,
    employerCompany: "",
    location: "",
    positionHeld: "",
    inclusiveDate: {
      from: null,
      to: null,
    },
    salary: 0,
    reasonForLeaving: "",
  },
];

export const educationBackgroundVal2: EducationBackground[] = [
  {
    id: 1,
    nameOfSchool: "UP",
    educationalLevel: "Bachelor Degree",
    course: "Computer Science",
    yearsAttended: {
      from: new Date("Wed Jan 01 2020 00:00:00 GMT+0800 (Philippine Standard Time)"),
      to: new Date("Wed Jan 01 2024 00:00:00 GMT+0800 (Philippine Standard Time)"),
    },
    professionalLicenses: "AWS Practitioner",
    certifications: "",
  },
];

export const employmentRecordVal2: EmploymentRecord[] = [
  {
    id: 1,
    employerCompany: "Microsoft",
    location: "Quezon City",
    positionHeld: "Senior Consultant",
    inclusiveDate: {
      from: "2016-01-02",
      to: "2020-01-02",
    },
    salary: 50000,
    reasonForLeaving: "Better Opportunity",
  },
];

export const educationAndEmploymentVal: EducationalAndEmployment = {
  educationBackground: educationBackgroundVal,
  employmentRecord: employmentRecordVal,
};

export const educationAndEmploymentVal2: EducationalAndEmployment = {
  educationBackground: educationBackgroundVal2,
  employmentRecord: employmentRecordVal,
};

export const familyBackgroundVal: FamilyBackground = {
  father: {
    fullname: "",
    age: 0,
    occupation: "",
    contactNumber: "",
  },
  mother: {
    fullname: "",
    age: 0,
    occupation: "",
    contactNumber: "",
  },
  siblings: [
    {
      fullname: "",
      age: 0,
      occupation: "",
      contactNumber: "",
    },
  ],
  spouse: {
    fullname: "",
    age: 0,
    occupation: "",
    contactNumber: "",
  },
  children: {
    numberOfChildren: 0,
    ageRange: {
      min: 0,
      max: 0,
    },
  },
  otherInformation: {
    specialTechnicalSkills: "",
    isConvictedCrimeDetails: "",
    isBeenHospitalizedDetails: "",
    medicalConditionDetails: "",
    relativeWorkingWithUsDetails: "",
  },
};

export const familyBackgroundVal2: FamilyBackground = {
  father: {
    fullname: "Melandro Jr.Taguinoid",
    age: 70,
    occupation: "Graphic Designer",
    contactNumber: "25555501184",
  },
  mother: {
    fullname: "Darlene Taguinoid",
    age: 60,
    occupation: "Neurologist",
    contactNumber: "60234567854",
  },
  siblings: [
    {
      fullname: "",
      age: 0,
      occupation: "",
      contactNumber: "",
    },
  ],
  spouse: {
    fullname: "",
    age: 0,
    occupation: "",
    contactNumber: "",
  },
  children: {
    numberOfChildren: 0,
    ageRange: {
      min: 0,
      max: 0,
    },
  },
  otherInformation: {
    specialTechnicalSkills: "",
    isConvictedCrimeDetails: "No",
    isBeenHospitalizedDetails: "No",
    medicalConditionDetails: "No",
    relativeWorkingWithUsDetails: "No",
  },
};

export const referenceValue: Reference = {
  characterReference: [
    {
      fullname: "",
      company: "",
      positionHeld: "",
      ContactNo: "",
    },
  ],
  employmentReference: [
    {
      fullname: "",
      company: "",
      positionHeld: "",
      ContactNo: "",
    },
  ],
  applicationSource: {
    employeeReferal: false,
    jobStreet: false,
    headHunter: false,
    wordOfMouth: false,
    walkin: false,
    others: false,
    description: "",
  },
};

export const referenceValue2: Reference = {
  characterReference: [
    {
      fullname: "Mary Ann Santiago",
      company: "Intellismart",
      positionHeld: "Project Manager",
      ContactNo: "09234586758",
    },
  ],
  employmentReference: [
    {
      fullname: "",
      company: "",
      positionHeld: "",
      ContactNo: "",
    },
  ],
  applicationSource: {
    employeeReferal: false,
    jobStreet: false,
    headHunter: false,
    wordOfMouth: false,
    walkin: false,
    others: false,
    description: "",
  },
};

export const ApplicationFormVal: ApplicationForm = {
  generalInformation: GeneralInformationVal,
  educationAndEmployment: educationAndEmploymentVal,
  familyBackground: familyBackgroundVal,
  reference: referenceValue,
  photo: "",
};
