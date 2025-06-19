import axios, { AxiosResponse } from "axios";
import { apiClient } from "@shared/services/apiClient";
import { ApplicantResponse } from "@modules/Shared/types";
import { BaseService } from "@shared/services/baseService";
import { ApplicantResponseById } from "@modules/Shared/types";
import { ViewApplicantById } from "@src/modules/Applicants/types";
import { formatApplicantById } from "../../hooks/useSharedApplicants";


export const applicantsByIdService = {
    getById: (idOrGuid: string | number, token?: string | null) =>
        apiClient.get<ApplicantResponseById>(
            `/recruitment/applicants/${idOrGuid}`,
            {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            }
        ),
};

export const viewApplicantOfferService = {
    getById: (idOrGuid: string | number) =>
        apiClient.get<ApplicantResponseById>(`recruitment/applicants/${idOrGuid}`),
}

export const useViewInterviewStagesHiring = new BaseService<ApplicantResponse>(apiClient, "/recruitment/hiring/interview-stages");

export const useViewInterviewersService = new BaseService<ApplicantResponse>(apiClient, "/recruitment/hiring/interviewers");

export const applicantByIdService = {
    /**
     * GET /recruitment/applicants/{id}
     * @returns ViewApplicantById (already formatted)
     */
    getById: async (
        id: string | number,
        token?: string | null
    ): Promise<ViewApplicantById> => {
        try {
            const res: AxiosResponse<ApplicantResponseById> = await axios.get(
                `/api/recruitment/applicants/${id}`,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                }
            );
            return formatApplicantById(res);        // <-- mapped shape
        } catch (err) {
            console.error("Error fetching applicant:", err);
            throw err;
        }
    },
};

// services/getApplicantById.ts
export const getApplicantById = async (
    id: number | string,
    token?: string | null
): Promise<ViewApplicantById> => {
    const res = await axios.get(`/api/recruitment/applicants/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return formatApplicantById(res.data);
};
