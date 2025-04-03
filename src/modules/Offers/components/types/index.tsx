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
  activeTab: string | null;

  setAlert: (alert: string) => void;
  setModal: (modal: boolean) => void;
  setClearFilter: (clearFilter: boolean) => void;
  setSelectedData: (selectedData: OfferType) => void;
  setFilterDrawer: (filterDrawer: boolean) => void;
  setIsFiltered: (isFiltered: boolean) => void;
  setFilter: (filter: AllJobOffersFilterType) => void;
  setActiveTab: (tab: string | null) => void;
}

export interface AllJobOffersFilterType {
  status: string[];
  interviewer: string;
  department: string ;
  vacancy: string;
  id: string;
  applicantName: string;
  dateFrom: string | null;
  dateTo: string | null;
  dateLastUpdatedFrom: string | null;
  dateLastUpdatedTo: string | null;
  remarks: string[];
}