import { EducationBackground, GeneralInformation, EmploymentRecord, FamilyBackground, Reference, ApplicationForm, EducationalAndEmployment } from "@modules/HomePublic/types";

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
      livingArrangement: ''
    },
    governmentIdOrNumber: {
      sssNo: '',
      gsisNo: '',
      pagibigNo: '',
      philhealthNo: '',
      tinNo: '',
      rdoCode: '',
      driversLicense: '',
      passport: '',
    },
    dateOfBirth: '',
    placeOfBirth: '',
    age: 0,
    gender: '',
    height: null,
    weight: null,
    civilStatus: '',
    religion: '',
    mobileNumber: '',
    workingEmailAddress: '',
    landlineNumber: ''
  }
};

export const GeneralInformationVal2: GeneralInformation = {
  firstChoice: 'Web Developer',
  secondChoice: 'Mobile Developer',
  desiredSalary: 40000,
  startDateAvailability: '2025-03-02',
  personalInformation: {
    fullname: {
      firstName: 'Jane',
      middleName: 'N/A',
      lastName: 'Cooper',
      suffix: 'N/A'
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
    mobileNumber: '93872283802',
    workingEmailAddress: 'jane@microsoft.com',
    landlineNumber: '+44 20 7123 4567'
  }
};


export const educationBackgroundVal: EducationBackground[] = [{
  id: 0,
  nameOfSchool: '',
  educationalLevel: '',
  course: '',
  yearsAttended: {
    from: null,
    to: null,
  },
  professionalLicenses: '',
  certfications: '',
}];

export const employmentRecordVal: EmploymentRecord[] = [{
  id: 0,
  employerCompany: '',
  location: '',
  positionHeld: '',
  inclusiveDate: {
    from: null,
    to: null
  },
  salary: 0,
  reasonForLeaving: '',
}];

export const educationBackgroundVal2: EducationBackground[] = [{
  id: 1,
  nameOfSchool: 'UP',
  educationalLevel: 'Bachelor Degree',
  course: 'Computer Science',
  yearsAttended: {
    from: new Date('Wed Jan 01 2020 00:00:00 GMT+0800 (Philippine Standard Time)'),
    to: new Date('Wed Jan 01 2024 00:00:00 GMT+0800 (Philippine Standard Time)'),
  },
  professionalLicenses: 'AWS Practitioner',
  certfications: '',
}];

export const employmentRecordVal2: EmploymentRecord[] = [{
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

export const educationAndEmploymentVal2: EducationalAndEmployment = {
  educationBackground: educationBackgroundVal2,
  employmentRecord: employmentRecordVal2
}

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
  otherInformation: {
    specialTechnicalSkills: '',
    isConvictedCrimeDetails: '',
    isBeenHospitalizedDetails: '',
    medicalConditionDetails: '',
    relativeWorkingWithUsDetails: '',
  },
};

export const familyBackgroundVal2: FamilyBackground = {
  father: {
    fullname: 'Melandro Jr.Taguinoid',
    age: 70,
    occupation: 'Graphic Designer',
    contactNumber: '+255 555-0118',
  },
  mother: {
    fullname: 'Darlene Taguinoid',
    age: 60,
    occupation: 'Neurologist',
    contactNumber: '60234567854',
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
  applicationSource:
  {
    employeeReferal: false,
    jobStreet: false,
    headHunter: false,
    wordOfMouth: false,
    walkin: false,
    others: false,
  },
};

export const referenceValue2: Reference = {
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
  },
};


export const ApplicationFormVal: ApplicationForm = {
  generalInformation: GeneralInformationVal2,
  educationAndEmployment: educationAndEmploymentVal2,
  familyBackground: familyBackgroundVal2,
  reference: referenceValue2,
  photo: ''
}
