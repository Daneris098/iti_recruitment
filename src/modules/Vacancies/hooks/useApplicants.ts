import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@src/api";
import { ViewApplicantsDataTableStore, ApplicantStore } from "@src/modules/Vacancies/store";
import { Candidate, StageGroup, VacancyType } from "@src/modules/Vacancies/types";
export const useApplicants = () => {
    const {
        page,
        pageSize,
        sortStatus,
        setTime,
        setCounts
    } = ViewApplicantsDataTableStore();
    const { selectedData, selectedApplicant, setSelectedApplicant } = ApplicantStore();

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

            const stageGroup: StageGroup = {
                id: 1,
                applied: [],
                forInterview: [],
                offered: [],
                archived: [],
                hired: [],
            };

            appliedResponse.data.items.forEach((item: any) => {
                const positionAppliedId = item.positionsApplied[0].id;
                const applicantStatus: string = item.applicationMovements[item.applicationMovements.length - 1]?.status.name ?? '';
                const firstName: string = item.nameResponse.firstName ?? '';
                const applicantId: number = item.id;
                const candidate: Candidate = {
                    name: firstName,
                    id: item.id,
                    status: applicantStatus,
                    applicantId: applicantId,

                };
                if (positionAppliedId == selectedData.id) {
                    stageGroup.applied.push(candidate);
                }

                if (selectedApplicant.applicantId === applicantId) {
                    setSelectedApplicant(candidate);
                }
            });

            forInterviewResponse.data.items.forEach((item: any) => {
                const positionAppliedId = item.positionsApplied[0].id;
                const applicantStatus: string = item.applicationMovements[item.applicationMovements.length - 1]?.status.name ?? '';
                const firstName: string = item.nameResponse.firstName ?? '';
                const applicantId: number = item.id;
                const candidate: Candidate = {
                    name: firstName,
                    id: item.id,
                    status: applicantStatus,
                    applicantId: applicantId,
                };
                if (positionAppliedId == selectedData.id) {
                    stageGroup.forInterview.push(candidate);
                }
                if (selectedApplicant.applicantId === applicantId) {
                    setSelectedApplicant(candidate);
                }
            });

            offeredResponse.data.items.forEach((item: any) => {
                const positionAppliedId = item.positionsApplied[0].id;
                const applicantStatus: string = item.applicationMovements[item.applicationMovements.length - 1]?.status.name ?? '';
                const firstName: string = item.nameResponse.firstName ?? '';
                const applicantId: number = item.id;
                const candidate: Candidate = {
                    name: firstName,
                    id: item.id,
                    status: applicantStatus,
                    applicantId: applicantId,
                };
                if (positionAppliedId == selectedData.id) {
                    stageGroup.offered.push(candidate);
                }
                if (selectedApplicant.applicantId === applicantId) {
                    setSelectedApplicant(candidate);
                }
            });

            hiredResponse.data.items.forEach((item: any) => {
                const positionAppliedId = item.positionsApplied[0].id;
                const applicantStatus: string = item.applicationMovements[item.applicationMovements.length - 1]?.status.name ?? '';
                const firstName: string = item.nameResponse.firstName ?? '';
                const applicantId: number = item.id;
                const candidate: Candidate = {
                    name: firstName,
                    id: item.id,
                    status: applicantStatus,
                    applicantId: applicantId,
                };
                if (positionAppliedId == selectedData.id) {
                    stageGroup.hired.push(candidate);
                }
                if (selectedApplicant.applicantId === applicantId) {
                    setSelectedApplicant(candidate);
                }
            });

            archivedResponse.data.items.forEach((item: any) => {
                const positionAppliedId = item.positionsApplied[0].name;
                const applicantStatus: string = item.applicationMovements[item.applicationMovements.length - 1]?.status.name ?? '';
                const firstName: string = item.nameResponse.firstName ?? '';
                const applicantId: number = item.id;
                const candidate: Candidate = {
                    name: firstName,
                    id: item.id,
                    status: applicantStatus,
                    applicantId: applicantId,
                };
                if (positionAppliedId == selectedData.id) {
                    stageGroup.archived.push(candidate);
                }
                if (applicantId === applicantId) {
                    setSelectedApplicant(candidate.applicantId);
                }
            });

            // Find the maximum length of any stage
            const maxLength = Math.max(
                stageGroup.applied.length,
                stageGroup.forInterview.length,
                stageGroup.offered.length,
                stageGroup.hired.length,
                stageGroup.archived.length
            );

            const fillWithNullCandidates = (stage: Candidate[], length: number): Candidate[] => {
                const fillCount = length - stage.length;
                const nullCandidates = Array(fillCount).fill({ id: null });
                return [...stage, ...nullCandidates];
            };

            stageGroup.applied = fillWithNullCandidates(stageGroup.applied, maxLength);
            stageGroup.forInterview = fillWithNullCandidates(stageGroup.forInterview, maxLength);
            stageGroup.offered = fillWithNullCandidates(stageGroup.offered, maxLength);
            stageGroup.hired = fillWithNullCandidates(stageGroup.hired, maxLength);
            stageGroup.archived = fillWithNullCandidates(stageGroup.archived, maxLength);

            const stageGroups: StageGroup[] = [stageGroup];
            const transformed = transformStageGroups(stageGroups);
            const stages = ['applied', 'archived', 'forInterview', 'hired', 'offered'];
            const stageCounts = stages.reduce((acc, stage) => {
                const items = (stageGroup as any)[stage];
                const validItems = items.filter((item: any) => {
                    return (
                        item.id != null
                    )
                });
                acc[stage] = validItems.length;
                return acc;
            }, {} as { [key: string]: number });

            setCounts(stageCounts);
            const endTime = performance.now();
            const executionTime = (endTime - startTime) / 1000;
            setTime(executionTime.toFixed(3).toString());
            return transformed;
        } catch (error: any) {
            console.error("Error fetching data:", error.response || error);
            throw error;
        }
    };

    const transformStageGroups = (stageGroups: any) => {
        if (!Array.isArray(stageGroups) || stageGroups.length === 0) return [];

        const group = stageGroups[0];
        const keys = ['applied', 'forInterview', 'offered', 'hired', 'archived'];
        const length = group.applied.length;
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
        queryKey: ["recruitment/applicants", { page, pageSize, sortStatus, selectedData }],
        queryFn: fetchData,
        staleTime: 60 * 1000,
    });
};
