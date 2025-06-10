import {
    ArchiveForm,
    HiredForm, OfferForm,
    Applicant, ForInterviewForm,
    TransferApplicationPositionForm
} from "@modules/Shared/types";
import {
    applicationMovementHired, transferApplicantPosition,
    applicationMovementArchive, applicationMovementForTransfer,
    applicationMovementOffered, applicationMovementForInterview,
} from "@modules/Applicants/api/userService";
import {
    applicantsByIdService,
    viewApplicantOfferService, useViewInterviewStagesHiring,
} from "@modules/Shared/components/api/UserService";
import {
    useSharedUserService, useGetPositionLevels, useGetDepartments,
    useSharedTransferredPosition, useSharedViewAcceptedOffer
} from "@modules/Shared/api/useSharedUserService";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { ViewApplicantById } from "@modules/Applicants/types"
import { applicantKeys } from "@modules/Applicants/keys/queryKeys";
import { payloadMapper } from "@modules/Shared/utils/payloadMapper";
import { sharedApplicantKeys } from "@src/modules/Shared/keys/queryKeys";
import { useMutation, useQueryClient, useQuery, useQueries } from "@tanstack/react-query";

const formatAddress = (address?: {
    houseNo?: string;
    subdivision?: string;
    street?: string;
    city?: { name?: string };
}) => {
    if (!address) return '';

    return [
        address.houseNo,
        address.subdivision,
        address.street,
        address.city?.name
    ].filter(Boolean).join(', ');
}

function getApplicantCurrentAge(dateString: string): number {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const formatApplicantById = (applicant: any): ViewApplicantById => {

    const {
        family, skills,
        applicationMovements,
        questionnaire, characterReferences,
        positionsApplied, addresses, birthDate, birthPlace, gender, height,
        weight, religion, civilStatus, identification, educations, previousEmployments,
        nameResponse
    } = applicant.data;

    const [address] = addresses;
    const presentAddress = formatAddress(address);
    const applicantAge = getApplicantCurrentAge(birthDate);
    const [firstPositionApplied, secondPositionApplied] = positionsApplied;
    const mapComments = applicationMovements.map((item: any) => item.comment)
    const mapApplicationMovements = applicationMovements.map((item: any) => item.status.name);
    const dateApplied = applicationMovements.map((item: any) =>
        DateTimeUtils.dateDefaultToHalfMonthWord(item.audit.date));

    return {
        name: nameResponse.normalName,
        generalInformation: {
            firstChoice: firstPositionApplied.name,
            secondChoice: secondPositionApplied.name,
            desiredSalary: firstPositionApplied.salary,
            startAvailability: DateTimeUtils.dateDefaultToWord(firstPositionApplied.availableDateStart),
            presentAddress,
            permanentAddress: presentAddress,
            dateOfBirth: DateTimeUtils.dateDefaultToWord(birthDate),
            placeOfBirth: birthPlace,
            age: applicantAge,
            gender: gender.name,
            height,
            weight,
            religion: religion.name,
            civilStatus: civilStatus.name,
            skills: skills.map((skill: any) => skill.keyword),
        },
        governmentIdInformation: {
            gsisNo: identification.gsisNo,
            sssNo: identification.sssNo,
            philhealthNo: identification.phicNo,
            pagIbigNo: identification.hdmfNo,
            tinNo: identification.tinNo,
            rdoCode: identification.rdoCode,
            passport: identification.passportNo
        },
        education: {
            primary: {
                name: educations[0].school,
                course: educations[0].course,
                educationalLevel: educations[0].level.name,
                startDate: DateTimeUtils.dateDefaultToHalfWord(educations[0].yearFrom),
                endDate: DateTimeUtils.dateDefaultToHalfWord(educations[0].yearTo),
            },
        },
        employmentRecord: {
            firstEmployment: {
                employerName: previousEmployments[0].company,
                location: previousEmployments[0].location,
                positionHeld: previousEmployments[0].position,
                startDate: previousEmployments[0].dateFrom,
                endDate: previousEmployments[0].dateTo,
                reasonForLeaving: previousEmployments[0].reason
            },
            secondEmployment: {
                employerName: previousEmployments[1].company,
                location: previousEmployments[1].location,
                positionHeld: previousEmployments[1].position,
                startDate: DateTimeUtils.dateDefaultToHalfWord(previousEmployments[1].dateFrom),
                endDate: DateTimeUtils.dateDefaultToHalfWord(previousEmployments[1].dateTo),
                reasonForLeaving: previousEmployments[1].reason
            }
        },
        familyBackground: {
            father: {
                name: family.father.name,
                age: family.father.age,
                occupation: family.father.occupation,
                contact: family.father.contactNo
            },
            mother: {
                name: family.mother.name,
                age: family.mother.age,
                occupation: family.mother.occupation,
                contact: family.mother.contactNo
            },
            siblings: [
                {
                    name: family.siblings[0]?.name ?? "N/A",
                    age: family.siblings[0]?.age ?? "N/A",
                    occupation: family.siblings[0]?.occupation ?? "N/A",
                    contact: family.siblings[0]?.contactNo ?? "N/A"
                },
                {
                    name: family.siblings[1]?.name ?? "N/A",
                    age: family.siblings[1]?.age ?? "N/A",
                    occupation: family.siblings[1]?.occupation ?? "N/A",
                    contact: family.siblings[1]?.contactNo ?? "N/A"
                }
            ],
        },
        otherInformation: {
            specialSkills: {
                skill: skills[0].keyword
            },

            conviction: {
                answer: questionnaire[0].answer
            },
            medicalHistory: {
                answer: questionnaire[2].answer
            },
            familyEmployed: {
                answer: questionnaire[3].answer
            }
        },
        characterReference: {
            firstReference: {
                employerName: characterReferences[0].company,
                referrer: characterReferences[0].name,
                location: characterReferences[0].location,
                positionHeld: characterReferences[0].position,
                startDate: characterReferences[0].dateFrom,
                endDate: characterReferences[0].dateTo,
                reasonForLeaving: characterReferences[0].reason,
                contact: characterReferences[0].contactNo
            },
            secondReference: {
                employerName: characterReferences[1].company,
                referrer: characterReferences[1].name,
                location: characterReferences[1].location,
                positionHeld: characterReferences[1].position,
                startDate: characterReferences[1].dateFrom,
                endDate: characterReferences[1].dateTo,
                reasonForLeaving: characterReferences[1].reason,
                contact: characterReferences[0].contactNo
            }
        },
        employmentReferences: {
            info: {
                employerName: characterReferences[0].company,
                referrer: characterReferences[0].name,
                location: characterReferences[0].location,
                positionHeld: characterReferences[0].position,
                startDate: characterReferences[0].dateFrom,
                endDate: characterReferences[0].dateTo,
                reasonForLeaving: characterReferences[0].reason,
                contact: characterReferences[0].contactNo
            }
        },
        applicationMovements: {
            movements: mapApplicationMovements,
            movementLastModifiedDate: dateApplied
        },
        commentsByID: mapComments
    };
};

export const useApplicantsById = (id: string | number) => {
    return useQuery({
        queryKey: sharedApplicantKeys.detail(id),
        queryFn: () => applicantsByIdService.getById(id),
        select: (data) => formatApplicantById(data),
        enabled: !!id,
        staleTime: 0,
        structuralSharing: false
    });
};

export const useViewOfferedApplicants = (id: string | number) => {
    return useQuery({
        queryKey: sharedApplicantKeys.lists(),
        queryFn: () => viewApplicantOfferService.getById(id),
        select: (data) => formatApplicantById(data),
    })
}

export const formatApplicant = (
    applicant: any,
    page: number,
    pageSize: number,
    total: number,
): Applicant => {
    const dateApplied = applicant.dateApplied;
    const location = applicant.addresses?.[0]?.zipCode?.name;
    const firstTwoPositions = applicant.positionsApplied?.slice(0, 2) || [];
    const positionNames = firstTwoPositions.map((pos: any) => pos.name).join(", ");
    const mapComments = applicant.applicationMovements.map((item: any) => item.comment);
    const singlePosition = applicant.positionsApplied?.[applicant.positionsApplied.length - 1] || null;
    const mapApplicationMovements = applicant.applicationMovements.map((item: any) => item.status.name);

    let movement;
    if (applicant.applicationMovements?.length === 1) {
        movement = applicant.applicationMovements[0];
    } else if (applicant.applicationMovements?.length > 1) {
        movement = applicant.applicationMovements[applicant.applicationMovements.length - 1];
    }

    return {
        id: applicant.id,
        applicantName: `${applicant.nameResponse.firstName} ${applicant.nameResponse.lastName}`,
        applicationDate: DateTimeUtils.dateDefaultToHalfMonthWord(dateApplied),
        phone: applicant.contact.mobileNo,
        email: applicant.contact.emailAddress,
        position: positionNames,
        status: movement?.status?.name,
        page,
        pageSize,
        total,
        movement: mapApplicationMovements,
        comments: mapComments,
        generalApplicant: applicant,
        location,
        singlePosition,
    };
};

export const useTransferPositionLookup = (
    page: number = 0,
    pageSize: number = 0,
    filters: Record<string, any> = {},
    setTime?: (time: number) => void
) => {
    const queryResult = useQuery({
        queryKey: sharedApplicantKeys.list({ page, pageSize, ...filters }),
        queryFn: async () => {
            const start = performance.now();
            const data = await useSharedTransferredPosition.getAll({ page, pageSize, ...filters });
            const end = performance.now();

            if (setTime) {
                const seconds = (end - start) / 1000;
                setTime(seconds);
            }
            return {
                jobOpenings: data.items.map(item => ({
                    id: item.id,
                    position: item.position,
                    company: item.company,
                    slots: item.availableSlot,
                })),
                page: data.page,
                pageSize: data.pageSize,
                total: data.total,
                items: data.items,
            };
        },
        staleTime: 60 * 1000,
    });

    return {
        ...queryResult,
        data: queryResult.data?.jobOpenings,
        total: queryResult.data?.total,
        allVacancies: queryResult.data?.items
    };
};

export const useViewInterviewStages = (
) => {
    return useQuery({
        queryKey: sharedApplicantKeys.list({
        }),
        queryFn: async () => {
            const apiFilters: Record<string, any> = {
            };
            const data = await useViewInterviewStagesHiring.getAll(apiFilters);
            const stages = data.items.map((item: any) => ({
                id: item.id,
                name: item.name,
                sequenceNo: item.sequenceNo,
                isActive: item.isActive,
            }));

            return {
                stages,
                total: data.total,
            };
        },
    });
};

export const useViewPositionLevels = () => {
    return useQuery({
        queryKey: ['position-levels'],
        queryFn: async () => {
            const apiFilters: Record<string, any> = {};

            const data = await useGetPositionLevels.getAll(apiFilters);

            return data.items;
        }
    })
}

export const useViewDepartments = () => {
    return useQuery({
        queryKey: ['departments'],
        queryFn: async () => {
            const departmentFilters: Record<string, any> = {};

            const data = await useGetDepartments.getAll(departmentFilters);

            return data.items
        }
    })
}

const DEFAULT_FETCH_ALL_PAGE = 1;
const DEFAULT_FETCH_ALL_PAGE_SIZE = 60;

export const useViewAcceptedOffer = (ids: (string | number)[]) => {
    return useQueries({
        queries: ids.map(id => ({
            queryKey: ['accepted-offer', id],
            queryFn: async () => {
                return await useSharedViewAcceptedOffer.getAcceptedOfferId(id);
            },
            enabled: !!id,
        })),
    });
};

export const useSingleAcceptedOffer = (id: string | number) => {
    return useQuery({
        queryKey: ['accepted-offer', id],
        queryFn: async () => await useSharedViewAcceptedOffer.getAcceptedOfferId(id),
        enabled: !!id,
    });
};

export const useApplicants = (
    page: number = 1,
    pageSize: number = 30,
    filters: Record<string, any> = {},
    setTime?: (time: number) => void,
    fetchAll: boolean = false,
) => {
    return useQuery({
        queryKey: sharedApplicantKeys.list({
            page: fetchAll ? DEFAULT_FETCH_ALL_PAGE : page,
            pageSize: fetchAll ? DEFAULT_FETCH_ALL_PAGE_SIZE : pageSize,
            ...filters,
        }),
        queryFn: async () => {
            const start = performance.now();

            const apiFilters: Record<string, any> = {
                ...filters,
                page: fetchAll ? DEFAULT_FETCH_ALL_PAGE : page,
                pageSize: fetchAll ? DEFAULT_FETCH_ALL_PAGE_SIZE : pageSize,
            };

            const data = await useSharedUserService.getAll(apiFilters);
            const end = performance.now();

            if (setTime) setTime((end - start) / 1000);

            const applicants = data.items.map(item =>
                formatApplicant(item, page, pageSize, data.total)
            );

            return {
                applicants,
                total: data.total,
                page,
                pageSize,
            };
        },
        staleTime: 60 * 1000,
    });
};

export const usePOSTArchive = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: ArchiveForm) => {
            const { ApplicantId, ...rest } = payload
            const keyMap = {
                File: "FileAttachment",
                Feedback: "HiringTeamFeedback",
                ApplicantFeedback: "ApplicantFeedback"
            };

            const formData = payloadMapper(rest, new FormData(), "", keyMap)

            return await applicationMovementArchive.postById(payload.ApplicantId, formData);

        }, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },
        onError: (error) => {
            console.error("Failed to save feedback", error);
        },
    });
};

export const useCreateOffer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: OfferForm) => {
            const formData = payloadMapper(payload)

            return applicationMovementOffered.postById(payload.ApplicantId, formData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },

        onError: (error) => {
            console.error("Error scheduling interview.", error);
        },
    })
}

export const usePOSTForInterview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: ForInterviewForm) => {

            payload.Time = payload.Time.split(":").length === 2 ? `${payload.Time}:00` : payload.Time;
            payload.Date = typeof payload.Date === "string" ? new Date(payload.Date).toLocaleDateString("en-CA") : DateTimeUtils.dateDashToDefaultAddDay(payload.Date);

            const formData = payloadMapper(payload);

            return await applicationMovementForInterview.postById(payload.ApplicantId, formData)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },

        onError: (error) => {
            console.error("Error scheduling interview.", error);
        },
    });
};

export const useCreateHired = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: HiredForm) => {
            const formData = payloadMapper(payload);

            return await applicationMovementHired.postById(payload.ApplicantId, formData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },
        onError: (error) => {
            console.error("Failed to save feedback", error);
        },
    })
}

export const useTransferApplicantPosition = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: TransferApplicationPositionForm) => {

            const formData = payloadMapper(payload);

            return await transferApplicantPosition.transferApplicantPositions(payload.applicantId, formData)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },
        onError: (error) => {
            console.error("Failed to transfer applicants", error);
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

