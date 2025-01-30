export const selectedDataVal = {
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

export const filterVal = {
  dateFrom: '',
  dateTo: '',
  postedDate: null,
  jobTitle: '',
  department: [],
  employmentType: [],
  workplaceType: [],
  experienceLevel: [],
}


export const GeneralInformationVal = {
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
