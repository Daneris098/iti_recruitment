import { apiClient } from "@shared/services/apiClient";
import { ApplicantResponseById } from "@modules/Shared/types";

export const applicantsByIdService = {
    getById: (idOrGuid: string | number) =>
        apiClient.get<ApplicantResponseById>(`/recruitment/applicants/${idOrGuid}`),
};

export const viewApplicantOfferService = {
    getById: (idOrGuid: string | number) =>
        apiClient.get<ApplicantResponseById>(`recruitment/applicants/${idOrGuid}`),
}