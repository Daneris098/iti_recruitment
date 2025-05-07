export interface OfferColumns {
  applicantName: string;
  applicationDateFrom: string | null;
  applicationDateTo: string | null;
  dateLastUpdatedFrom: string | null;
  dateLastUpdatedTo: string | null;
  position: string;
  status: string;
}

export type OfferType = {
  JobOffers: string;
  Generated: string;
  Accepted: string;
  Archived: string;
};


export interface FilterState {
  selectedData: OfferType;
  filterDrawer: boolean;
  filter: AllJobOffersFilterType;
  clearFilter: boolean;
  isFiltered: boolean;
  modal: boolean;
  alert: string;
  activeTab: TabKey;

  setAlert: (alert: string) => void;
  setModal: (modal: boolean) => void;
  setClearFilter: (clearFilter: boolean) => void;
  setSelectedData: (selectedData: OfferType) => void;
  setFilterDrawer: (filterDrawer: boolean) => void;
  setIsFiltered: (isFiltered: boolean) => void;
  setFilter: (filter: AllJobOffersFilterType) => void;
  setActiveTab: (tab: TabKey | undefined) => void;
}

export interface AllJobOffersFilterType {
  status: string[];
  interviewer: string;
  company: string[];
  department: string;
  vacancy: string;
  filterId: string;
  applicantName: string;
  dateFrom: string | null;
  dateTo: string | null;
  dateLastUpdatedFrom: string | null;
  dateLastUpdatedTo: string | null;
  remarks: string[];
  dateRange?: [string | null, string | null];
}
export interface PDFProps {
  Applicant_Name: string;
  Position: string;
  Department: string;
  Remarks: string;
  Salary_Monthly: string;
  Salary_Yearly: string;
  Note_Salary: string;
  Merit_Increase: string;
  Description_VL: string;
  Description_SL: string;
  Description_BL: string;
  Benefit_Paternity: string;
  Benefit_Maternity: string;
  Description_Transpo: string;
  Acknowledgement: string;
}

export interface Row {
    Status: string;
    Attachments: string | null;
}

export type TabKey = "Pending" | "Accepted" | "All_offers" | "Archived";

export type JobOfferRecord = Partial<PDFProps> & {
  Status: "Pending" | "Accepted" | "Archived" | string;
  id?: string;
  Date_Generated?: string;
  Date_Last_Updated?: string;
  Attachments: string | null;
};

