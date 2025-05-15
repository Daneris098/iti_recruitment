import { applicantKeys } from "@modules/Applicants/keys/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    applicationMovementHired,
    applicationMovementArchive, applicationMovementForTransfer,
    applicationMovementOffered, applicationMovementForInterview,
} from "@modules/Applicants/api/userService";

export const usePOSTArchive = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            applicantId,
            file,
            feedback,
            applicantFeedback,
            comments,
            order = 1,
        }: {
            applicantId: number;
            file: File | null;
            feedback: string;
            applicantFeedback: string;
            comments: string;
            order?: number;
        }) => {

            const formData = new FormData();

            if (file) {
                formData.append("FileAttachment", file);
            }
            if (feedback) {
                formData.append("HiringTeamFeedback", feedback);
            }
            if (applicantFeedback) {
                formData.append("ApplicantFeedback", applicantFeedback);
            }

            formData.append("Order", order.toString());
            formData.append("Comment", comments);

            formData.append("Order", order.toString());
            formData.append("Comment", comments);

            return await applicationMovementArchive.postById(applicantId, formData)
        }, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },
        onError: (error) => {
            console.error("Failed to save feedback", error);
        },
    });
};

export const usePOSTOffer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            applicantId,
            queryParams,
        }: {
            applicantId: number;
            queryParams: Record<string, any>;
        }) => applicationMovementOffered.postById(applicantId, queryParams),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },
        onError: (error) => {
            console.error("Error submitting offer", error)
        }
    });
}
export const usePOSTForInterview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            applicantId,
            queryParams,
        }: {
            applicantId: number;
            queryParams: Record<string, any>;
        }) => {
            return await applicationMovementForInterview.postById(applicantId, queryParams);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },

        onError: (error) => {
            console.error("Error Scheduling interview.", error);
        },
    });
};

export const useCreateHired = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            applicantId,
            dateStart,
            file,
            order = 1,
        }: {
            applicantId: number;
            dateStart: string;
            file: File | null;
            order?: number;
        }) => {
            const formData = new FormData();

            formData.append("DateStart", dateStart);
            formData.append("Order", order.toString());
            formData.append("FileAttachment", file!);

            return await applicationMovementHired.postById(applicantId, formData)
        }, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },
        onError: (error) => {
            console.error("Failed to save feedback", error);
        },
    })
}

export const useCreateForTransfer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            applicantIds
        }: {
            applicantIds: number[];
        }) => {
            return await applicationMovementForTransfer.transferApplicants(applicantIds);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },
        onError: (error) => {
            console.error("Failed to transfer applicants", error);
        },
    });
};
