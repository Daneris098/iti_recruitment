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
  datePublish: string;
  interviewer: string;
  quantity: number;
  status: string;
  vacancyDuration: {
    start: string;
    from: string;
  }
  mustHaveSkills: string;
  qualification: string;
};