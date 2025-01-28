export type JobType = {
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


export interface JobState {
  selectedData: JobType;
  filterDrawer: boolean;
  filter: FilterType;
  clearFilter: boolean
  isFiltered: boolean

  setClearFilter: (clearFilter: boolean) => void;
  setFilter: (filter: FilterType) => void;
  setSelectedData: (selectedData: JobType) => void;
  setFilterDrawer: (filterDrawer: boolean) => void;
  setIsFiltered: (isFiltered: boolean) => void;
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
