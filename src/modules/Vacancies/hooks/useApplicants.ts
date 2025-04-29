import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@src/api";
import { ViewApplicantsDataTableStore } from "@src/modules/Vacancies/store";
import { Candidate, StageGroup, VacancyType } from "@src/modules/Vacancies/types";
export const useApplicants = () => {
    const {
        search,
        page,
        pageSize,
        sortStatus,
        setTotalRecords,
        setTime,
        setCounts
    } = ViewApplicantsDataTableStore();

    const fetchData = async () => {
        try {
            const startTime = performance.now();
            const appliedResponse = await axiosInstance.get('recruitment/applicants', {
                params: {
                    pageSize,
                    page,
                    sortBy: sortStatus.columnAccessor,
                    StatusIds: 1,
                },
            });
            const forInterviewResponse = await axiosInstance.get('recruitment/applicants', {
                params: {
                    pageSize,
                    page,
                    sortBy: sortStatus.columnAccessor,
                    StatusIds: 2,
                },
            });
            const offeredResponse = await axiosInstance.get('recruitment/applicants', {
                params: {
                    pageSize,
                    page,
                    sortBy: sortStatus.columnAccessor,
                    StatusIds: 3,
                },
            });
            const hiredResponse = await axiosInstance.get('recruitment/applicants', {
                params: {
                    pageSize,
                    page,
                    sortBy: sortStatus.columnAccessor,
                    StatusIds: 5,
                },
            });
            const archivedResponse = await axiosInstance.get('recruitment/applicants', {
                params: {
                    pageSize,
                    page,
                    sortBy: sortStatus.columnAccessor,
                    StatusIds: 4,
                },
            });

            // if (res.status === 200 && Array.isArray(res.data.items)) {
                // console.log('response: ', res);
                // setTotalRecords(res.data.total);

                // Data manipulation logic
                const stageGroup: StageGroup = {
                    id: 1,
                    applied: [],
                    forInterview: [],
                    offered: [],
                    archived: [],
                    hired: [],
                };

                appliedResponse.data.items.forEach((item: any, index: number) => {
                    const applicantStatus: string = item.applicationMovements[item.applicationMovements.length - 1]?.status.name ?? '';
                    const firstName: string = item.nameResponse.firstName ?? '';

                    const candidate: Candidate = {
                        name: firstName,
                        id: index + 1,
                        status: applicantStatus
                    };
                    stageGroup.applied.push(candidate);
                });
                console.log('appliedResponse: ', appliedResponse)

                forInterviewResponse.data.items.forEach((item: any, index: number) => {
                    const applicantStatus: string = item.applicationMovements[item.applicationMovements.length - 1]?.status.name ?? '';
                    const firstName: string = item.nameResponse.firstName ?? '';

                    const candidate: Candidate = {
                        name: firstName,
                        id: index + 1,
                        status: applicantStatus
                    };
                    stageGroup.forInterview.push(candidate);
                });
                console.log('forInterviewResponse: ', forInterviewResponse)

                offeredResponse.data.items.forEach((item: any, index: number) => {
                    const applicantStatus: string = item.applicationMovements[item.applicationMovements.length - 1]?.status.name ?? '';
                    const firstName: string = item.nameResponse.firstName ?? '';

                    const candidate: Candidate = {
                        name: firstName,
                        id: index + 1,
                        status: applicantStatus
                    };
                    stageGroup.offered.push(candidate);
                });
                console.log('offeredResponse: ', offeredResponse)

                hiredResponse.data.items.forEach((item: any, index: number) => {
                    const applicantStatus: string = item.applicationMovements[item.applicationMovements.length - 1]?.status.name ?? '';
                    const firstName: string = item.nameResponse.firstName ?? '';

                    const candidate: Candidate = {
                        name: firstName,
                        id: index + 1,
                        status: applicantStatus
                    };
                    stageGroup.hired.push(candidate);
                });
                console.log('hiredResponse: ', hiredResponse)

                archivedResponse.data.items.forEach((item: any, index: number) => {
                    const applicantStatus: string = item.applicationMovements[item.applicationMovements.length - 1]?.status.name ?? '';
                    const firstName: string = item.nameResponse.firstName ?? '';

                    const candidate: Candidate = {
                        name: firstName,
                        id: index + 1,
                        status: applicantStatus
                    };
                    stageGroup.archived.push(candidate);
                });
                console.log('archivedResponse: ', archivedResponse)

                // Find the maximum length of any stage
                const maxLength = Math.max(
                    stageGroup.applied.length,
                    stageGroup.forInterview.length,
                    stageGroup.offered.length,
                    stageGroup.hired.length,
                    stageGroup.archived.length
                );

                // Fill the stages with null candidates to match the maximum length
                const fillWithNullCandidates = (stage: Candidate[], length: number): Candidate[] => {
                    const fillCount = length - stage.length;
                    const nullCandidates = Array(fillCount).fill({ name: null, id: null, status: null });
                    return [...stage, ...nullCandidates];
                };

                stageGroup.applied = fillWithNullCandidates(stageGroup.applied, maxLength);
                stageGroup.forInterview = fillWithNullCandidates(stageGroup.forInterview, maxLength);
                stageGroup.offered = fillWithNullCandidates(stageGroup.offered, maxLength);
                stageGroup.hired = fillWithNullCandidates(stageGroup.hired, maxLength);
                stageGroup.archived = fillWithNullCandidates(stageGroup.archived, maxLength);

                const stageGroups: StageGroup[] = [stageGroup];
                const transformed = transformStageGroups(stageGroups);

                // Calculate counts of valid candidates in each stage
                const stages = ['applied', 'archived', 'forInterview', 'hired', 'offered'];
                const stageCounts = stages.reduce((acc, stage) => {
                    const items = (stageGroup as any)[stage] || [];
                    const validItems = items.filter((item: any) => item.name !== null && item.id !== null && item.status !== null);
                    acc[stage] = validItems.length;
                    return acc;
                }, {} as { [key: string]: number });

                // Set the manipulated data
                 setCounts(stageCounts);
                // setVacancyRecords(transformed);
                console.log('stageCounts: ', stageCounts)
                return transformed; // Return the original data as well
            // }
            // else {
            //     console.error("Unexpected response format:", res.data);
            //     return [];
            // }
        } catch (error: any) {
            console.error("Error fetching data:", error.response || error);
            throw error;
        }
    };

    const transformStageGroups = (stageGroups: any) => {
        if (!Array.isArray(stageGroups) || stageGroups.length === 0) return [];

        const group = stageGroups[0]; // Access the object with all stage arrays
        const keys = ['applied', 'forInterview', 'offered', 'hired', 'archived'];
        const length = group.applied.length; // assuming all arrays are the same length

        const result = Array.from({ length }, (_, index) => {
            const vacancy: any = { id: index + 1 };

            keys.forEach(key => {
                vacancy[key] = group[key]?.[index] ?? null;
            });

            return vacancy;
        });

        return result;
    }

    return useQuery<VacancyType[]>({
        queryKey: ["recruitment/applicants", { page, pageSize, sortStatus }],
        queryFn: fetchData,
        staleTime: 60 * 1000, // Data is fresh for 5 minutes
    });
};
