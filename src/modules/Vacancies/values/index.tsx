import { FilterType, VacancyType } from "@modules/Vacancies/types";

export const selectedDataVal: VacancyType = {
  id: 0,
  position: "",
  workplace: "",
  department: "",
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
    from: ""
  },
  mustHaveSkills: "",
  qualification: ""
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

