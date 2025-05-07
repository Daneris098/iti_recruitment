import { apiClient } from "@shared/services/apiClient";
import { BaseService } from "@shared/services/baseService";
import { ApplicantResponse, ApplicantResponseById, ApplicationMovementOffered, ApplicationMovementForInterview, ApplicationMovementHired } from "@modules/Applicants/types";

export const userService = new BaseService<ApplicantResponse>(
    apiClient,
    "/recruitment/applicants"
);

export const applicantsByIdService = {
    getById: (idOrGuid: string | number) =>
        apiClient.get<ApplicantResponseById>(`/recruitment/applicants/${idOrGuid}`),
};

export const applicationMovementArchive = {
    postById: (idOrGuid: number, formData: FormData) =>
        apiClient.post(`/recruitment/applicants/${idOrGuid}/archive`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
}

export const applicationMovementOffered = {
    postById: (idOrGuid: string | number, data: Record<string, any>) =>
        apiClient.post<ApplicationMovementOffered>(`/recruitment/applicants/${idOrGuid}/job-offer`, null, { params: data })
}

export const applicationMovementForInterview = {
    postById: (id: number, data: Record<string, any>) =>
        apiClient.post<ApplicationMovementForInterview>(`/recruitment/applicants/${id}/schedule/interview`, null, { params: data })
}

export const applicationMovementHired = {
    postById: (id: number, data: FormData) =>
        apiClient.post<ApplicationMovementHired>(`/recruitment/applicants/${id}/hire`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
};

export const applicationMovementForTransfer = {
    transferApplicants: (applicantIds: number[]) =>
        apiClient.post(`recruitment/applicants/transfer`, { applicantIds }, {
            headers: {
                "Content-Type": "application/json",
            },
        })
}
