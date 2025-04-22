import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applicationMovements, userService } from "@modules/Applicants/api/userService";
import { applicantKeys } from "@modules/Applicants/keys/queryKeys";
import { Applicants } from "@modules/Applicants/types"

const formatApplicant = (applicant: any): Applicants => {
    const position = applicant.positionsApplied?.find(() => true);

    const movement = applicant.applicationMovements?.[applicant.applicationMovements.length - 1];
    return {
        id: applicant.id,
        applicantName: `${applicant.nameResponse.firstName} ${applicant.nameResponse.lastName}`,
        applicationDate: new Date(applicant.dateApplied).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }),
        Phone: applicant.contact.mobileNo,
        Email: applicant.contact.emailAddress,
        Position: position?.name,
        Status: movement?.status?.name,
        page: 0,
        pageSize: 0,
        total: 0
    }
}

export const useApplicants = (params?: Record<string, any>) => {
    // debugger;
    return useQuery({
        queryKey: applicantKeys.list(params),
        queryFn: () => userService.getAll(params),
        select: (data) => data.items.map(formatApplicant)
    })

}

export const useMovementArchive = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            applicantId,
            queryParams,
        }: {
            applicantId: number;
            queryParams: Record<string, any>;
        }) => {
            return await applicationMovements.postById(applicantId, queryParams);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },
        onError: (error) => {
            console.error("Failed to save feedback:", error);
        },
    });
};
