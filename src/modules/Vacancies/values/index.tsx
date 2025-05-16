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

export const selectedApplicantInitial: selectedApplicant = {
  applicantId: 0,
  Applicant_Name: '',
  Email: '',
  Position: '',
  Skills: '',
  Status: '',
  Remarks: '',
  Phone: '',
  Application_Date: '',
  id: 0
}