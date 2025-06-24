import { FilterType, VacancyType, selectedApplicant } from "@modules/Vacancies/types";

export const selectedDataVal: VacancyType = {
  id: 0,
  applicantId: 0,
  position: "",
  workplace: "",
  department: "",
  company: "",
  branch: "",
  positionLevel: "",
  hiringManager: "",
  vacancyType: "",
  division: "",
  section: "",
  experienceLevel: "",
  employmentType: "",
  jobDescription: "",
  requirements: [],
  skills: [],
  benefits: [],
  desirable: [],
  dateCreated: "",
  datePublish: "",
  dateEnd: "",
  interviewer: "",
  quantity: 0,
  status: "",
  vacancyDuration: {
    start: "",
    end: "",
    from: ""
  },
  mustHaveSkills: [],
  qualification: ""
};

export const filterVal: FilterType = {
  dateFrom: '',
  dateTo: '',
  postedDate: null,
  jobTitle: '',
  vacancy: [],
  company: [],
  interviewer: [],
  status: [],
  department: [],
  employmentType: [],
  workplaceType: [],
  experienceLevel: [],
}

export const cleanFilterVal: FilterType = {
  dateFrom: '',
  dateTo: '',
  postedDate: null,
  jobTitle: '',
  vacancy: [],
  company: [],
  interviewer: [],
  status: [],
  department: [],
  employmentType: [],
  workplaceType: [],
  experienceLevel: [],
}

export const selectedApplicantInitial: selectedApplicant = {
  nameResponse: {
    firstName: '',
    lastName: '',
    formalName: '',
  },
  contact: {
    emailAddress: '',
    mobileNo: '',
  },
  applicationMovements: [
    {
      status: {
        name: '',
      },
    },
  ],
  addresses: [
    {
      zipCode: {
        name: '',
      },
    },
  ],
  id: 0,
  applicantId: 0,
  position: '',
  email: '',
  phone: '',
  skills: '',
  remarks: '',
  applicationDate: '',
  isJobOffer: '',
};
