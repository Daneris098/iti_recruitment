import { apiClient } from "@shared/services/apiClient";
import { FeedbackBody } from '@src/modules/Shared/types';
import { ApplicationMovementHired } from "@modules/Applicants/types";

export const applicationMovementArchive = {
    postById: (idOrGuid: number, formData: FormData) =>
        apiClient.post(`/recruitment/applicants/${idOrGuid}/archive`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
}

export const applicationMovementOffered = {
    postById: (idOrGuid: number, formData: FormData) =>
        apiClient.post(`/recruitment/applicants/${idOrGuid}/job-offer`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
}

export const applicationMovementForInterview = {
    postById: (id: number, formData: FormData) =>
        apiClient.post(`/recruitment/applicants/${id}/schedule/interview`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
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

export const transferApplicantPosition = {
    transferApplicantPositions: (jobOpeningsId: number, data: FormData) =>
        apiClient.post(`recruitment/applicants/${jobOpeningsId}/transfer-position`, data, {
            headers: {
                "Content-Type": "application/json",
            }
        })
}

export const useUpdateFeedbacks = {
    updateFeedback: (body: FeedbackBody) =>
        apiClient.post("recruitment/hiring/feedbacks", body, {
            headers: { "Content-Type": "application/json" },
        }),
};
