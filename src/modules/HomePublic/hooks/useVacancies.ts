import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@src/api";
import { DataTableStore } from "@src/modules/Vacancies/store";
import { VacancyType } from "@src/modules/Vacancies/types";
import { FilterStore } from "@src/modules/HomePublic/store";

export const useVacancies = () => {
    const { filter, isFiltered, setIsFiltered } = FilterStore();
    const {
        page,
        pageSize,
        sortStatus,
        setTime
    } = DataTableStore();

    const fetchData = async () => {
        try {
            let url = "recruitment/vacancies";

            if (filter.jobTitle) {
                // url += `?Name=${filter.jobTitle}`;
            }
            if (filter.postedDate) {
                // url += `?Name=${filter.jobTitle}`;
            }
            if (filter.department.length) {
                // url += `?Name=[${filter.jobTitle}]`;
            }
            if (filter.employmentType.length) {
                // url += `?Name=[${filter.employmentType}]`;
            }
            if (filter.workplaceType.length) {
                // url += `?Name=[${filter.workplaceType}]`;
            }
            if (filter.experienceLevel.length) {
                // url += `?Name=[${filter.experienceLevel}]`;
            }

            const startTime = performance.now();
            const res = await axiosInstance.get(url);

            if (res.status === 200 && Array.isArray(res.data.items)) {
                const mapped = res.data.items.map((item: any) => ({
                    ...item,
                    mustHaveSkills: item.skills,
                    company: item.companyResponse.name,
                    branch: item.branchResponse.name,
                    division: item.divisionResponse.name,
                    experienceLevel: item.experienceLevelResponse.name,
                    vacancyType: item.vacancyTypeResponse.name,
                    section: item.sectionResponse.name,
                    employmentType: item.employmentTypeResponse.name,
                    workplace: item.workplaceTypeResponse.name,
                    vacancyDuration: { start: item.vacancyDurationResponse.dateStart, end: item.vacancyDurationResponse.dateEnd },
                    id: item.id,
                    position: item.positionTitleResponse,
                    datePublish: item.vacancyDurationResponse?.dateStart,
                    interviewer: "N/A",
                    department: item.departmentResponse?.name || "-",
                    quantity: item.availableSlot,
                    totalApplicant: item.availableSlot,
                    status: "Published",
                }));
                const endTime = performance.now();
                const executionTime = (endTime - startTime) / 1000;
                setTime(executionTime.toFixed(3).toString());
                return mapped;
            } else {
                console.error("Unexpected response format:", res.data);
                return [];
            }
        } catch (error: any) {
            console.error("Error fetching data:", error.response || error);
            throw error;
        }
    };

    return useQuery<VacancyType[]>({
        queryKey: ["recruitment/vacancies", { page, pageSize, sortStatus, isFiltered }],
        queryFn: fetchData,
        staleTime: 60 * 1000, // Data is fresh for 5 minutes
    });
};
