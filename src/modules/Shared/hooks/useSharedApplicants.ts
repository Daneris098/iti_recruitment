import { useQuery } from "@tanstack/react-query";
import {
    ArchiveForm,
    HiredForm, OfferForm,
    Applicant, ForInterviewForm,
    TransferApplicationPositionForm
} from "@modules/Shared/types";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { ViewApplicantById } from "@modules/Applicants/types"
import { sharedApplicantKeys } from "@src/modules/Shared/keys/queryKeys";
import { applicantsByIdService } from "@modules/Shared/components/api/UserService"
import { useSharedUserService, useSharedTransferredPosition } from "@modules/Shared/api/useSharedUserService";
import {
    applicationMovementHired,
    applicationMovementArchive, applicationMovementForTransfer,
    applicationMovementOffered, applicationMovementForInterview,
    transferApplicantPosition
} from "@modules/Applicants/api/userService";
import { applicantKeys } from "@modules/Applicants/keys/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payloadMapper } from "@modules/Shared/utils/payloadMapper";

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
    } = applicant.data;

    const [address] = addresses;
    const presentAddress = formatAddress(address);
    const applicantAge = getApplicantCurrentAge(birthDate);
    const [firstPositionApplied, secondPositionApplied] = positionsApplied;
    const mapComments = applicationMovements.map((item: any) => item.comment)
    const mapApplicationMovements = applicationMovements.map((item: any) => item.status.name);

    return {
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
            movements: mapApplicationMovements
        },
        commentsByID: mapComments
    };
};

export const useApplicantsById = (id: string | number) => {
    return useQuery({
        queryKey: sharedApplicantKeys.lists(),
        queryFn: () => applicantsByIdService.getById(id),
        select: (data) => formatApplicantById(data),
    });
};

export const formatApplicant = (applicant: any, page: number, pageSize: number, total: number): Applicant => {
    const mapComments = applicant.applicationMovements.map((item: any) => item.comment);
    const position = applicant.positionsApplied?.[applicant.positionsApplied.length - 1];
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
        applicationDate: new Date(applicant.dateApplied).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }),
        phone: applicant.contact.mobileNo,
        email: applicant.contact.emailAddress,
        position: position?.name,
        status: movement?.status?.name,
        page,
        pageSize,
        total,
        movement: mapApplicationMovements,
        comments: mapComments,
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
                    position: item.positionTitleResponse,
                    company: item.companyResponse,
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


export const useApplicants = (
    page: number = 0,
    pageSize: number = 0,
    filters: Record<string, any> = {},
    setTime?: (time: number) => void
) => {
    return useQuery({
        queryKey: sharedApplicantKeys.list({ page, pageSize, ...filters }),
        queryFn: async () => {
            const start = performance.now();
            const data = await useSharedUserService.getAll({ page, pageSize, ...filters });
            const end = performance.now();

            if (setTime) {
                const seconds = (end - start) / 1000;
                setTime(seconds);
            }

            return {
                applicants: data.items.map(item =>
                    formatApplicant(item, data.page, data.pageSize, data.total)
                ),
                page: data.page,
                pageSize: data.pageSize,
                total: data.total,
                items: data.items,
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
