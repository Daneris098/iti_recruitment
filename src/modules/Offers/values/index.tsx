import { AllJobOffersFilterType, OfferType } from '@src/modules/Offers/types';

export const filterVal: AllJobOffersFilterType = {
  id: "",
  applicantName: "",
  remarks: [],
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
