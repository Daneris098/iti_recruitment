import { AllJobOffersFilterType, OfferType } from '@src/modules/Offers/types';

export const filterVal: AllJobOffersFilterType = {
  id: "",
  applicantName: "",
  dateFrom: null,
  dateTo: null,
  dateLastUpdatedFrom: null,
  dateLastUpdatedTo: null,
  remarks: [],
  company: [],
  status: [],
  department: "",
  interviewer: "",
  vacancy: "",
}

export const selectedDataVal: OfferType = {
  JobOffers: "",
  Generated: "",
  Accepted: "",
  Archived: ""
};