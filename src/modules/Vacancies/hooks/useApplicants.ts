import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@src/api";
import { ViewApplicantsDataTableStore } from "@src/modules/Vacancies/store";
import { VacancyType } from "@src/modules/Vacancies/types";
export const useApplicants = () => {
    const {
        search,
        page,
        pageSize,
        sortStatus,
        setTotalRecords,
        setTime
    } = ViewApplicantsDataTableStore();

    const fetchData = async () => {
        try {
            const startTime = performance.now();
            const res = await axiosInstance.get('recruitment/applicants', {
                params: {
                    page,
                    sortBy: sortStatus.columnAccessor,
                },
            });

            if (res.status === 200 && Array.isArray(res.data.items)) {
                // console.log('response: ', res)
                setTotalRecords(res.data.total)
                // const mapped = res.data.items.map((item: any) => ({
                //     ...item,
                //     mustHaveSkills: item.skills,
                //     company: item.companyResponse.name,
                //     branch: item.branchResponse.name,
                //     division: item.divisionResponse.name,
                //     experienceLevel: item.experienceLevelResponse.name,
                //     vacancyType: item.vacancyTypeResponse.name,
                //     section: item.sectionResponse.name,
                //     employmentType: item.employmentTypeResponse.name,
                //     workplace: item.workplaceTypeResponse.name,
                //     vacancyDuration: { start: item.vacancyDurationResponse.dateStart, end: item.vacancyDurationResponse.dateEnd },
                //     id: item.id, 
                //     position: item.positionTitleResponse,
                //     datePublish: item.vacancyDurationResponse?.dateStart,
                //     interviewer: "N/A",
                //     department: item.departmentResponse?.name || "-",
                //     quantity: item.availableSlot,
                //     totalApplicant: item.availableSlot,
                //     status: "Published",
                // }));
                // console.log('mappedOrigin : ', mapped)
                // const endTime = performance.now();
                // const executionTime = (endTime - startTime) / 1000;
                // setTime(executionTime.toFixed(3).toString());
                return res.data.items;
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
        queryKey: ["recruitment/applicants", { page, pageSize, sortStatus }],
        queryFn: fetchData,
        staleTime: 60 * 1000, // Data is fresh for 5 minutes
    });
};
