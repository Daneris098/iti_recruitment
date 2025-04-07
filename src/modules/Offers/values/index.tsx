import { AllJobOffersFilterType, OfferType } from '@modules/Offers/components/types';

// export const filterVal: AllJobOffersFilterType = {
//     id: "",
//     applicantName: "",
//     dateFrom: "",
//     dateTo: "",
//     dateLastUpdatedFrom: "",
//     dateLastUpdatedTo: "",
//     remarks: ""
// }

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