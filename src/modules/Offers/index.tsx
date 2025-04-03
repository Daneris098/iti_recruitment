// import { AllJobOffersFilterType, OfferType } from '@modules/Offers/components/types';
import JobOffers from "@modules/Offers/components/pages/jobOffers"

// export const filterVal: AllJobOffersFilterType = {
//     interviewer: "",
//     department: "",
//     vacancy: "",
//     id: "",
//     applicantName: "",
//     dateFrom: "",
//     dateTo: "",
//     dateLastUpdatedFrom: "",
//     dateLastUpdatedTo: "",
//     remarks: "",
//     status: ""
// }

// export const selectedDataVal: OfferType = {
//     JobOffers: "",
//     Generated: "",
//     Accepted: "",
//     Archived: ""
// };

export default function index() {
    return (
        <>
            <JobOffers />
        </>
    )
}