import React from "react";

//#region OFFER
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


//#region FILTER
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
  dateGenerated?: any;
  dateLastUpdated?: any;
  dateArchived?: any;
}

//#region PDF PROPS
export interface PDFProps {
  applicantId: number;
  applicantName: string;
  position: string;
  department: string;
  remarks: string;
  salaryMonthly: string;
  salaryYearly: string;
  noteSalary: string;
  meritIncrease: string;
  descriptionVL: string;
  descriptionSL: string;
  descriptionBL: string;
  benefitPaternity: string;
  benefitMaternity: string;
  descriptionTranspo: string;
  acknowledgement: string;
}

export interface ExtendedPDFProps extends Partial<PDFProps> {
  status: string;
  applicantId?: number;
}

export type JobOfferRecord = Partial<PDFProps> & {
  status: "Pending" | "Accepted" | "Archived" | string;
  id?: string;
  applicantName: string;
  dateGenerated?: string;
  dateLastUpdated?: string;
  attachments: string | null | React.ReactNode;
};

//#region ROW
export interface Row {
  status: string;
  attachments: string | null | React.ReactNode;
}

//#region TABKEYs
export type TabKey = "Pending" | "Accepted" | "All_offers" | "Archived";

export enum TABSKey {
  Pending = "Pending",
  Accepted = "Accepted",
  Archived = "Archived",
  AllOffers = "All_offers",
}

//#region SORT
export interface SortState {
  columnAccessor: string;
  direction: "asc" | "desc";
  sortedRecords: JobOffersColumns[];

  setSort: (column: string, records: JobOffersColumns[]) => void;
  setRecords: (records: JobOffersColumns[]) => void;
}

export interface JobOffersColumns {
  id: string;
  applicantName: string;
  dateGenerated: string;
  dateLastUpdated: string;
  remarks: string;
  status: string;
  attachments: string | React.ReactNode;
}

export interface JobOffersStore {
  records: JobOffersColumns[];
  loadCandidates: (data: JobOffersColumns[]) => void;
}