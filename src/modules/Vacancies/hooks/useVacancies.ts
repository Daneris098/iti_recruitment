import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@src/api";
import { VacancyType } from "@src/modules/Vacancies/types";
import { FilterStore, DataTableStore, FilterItemsStore } from "@modules/Vacancies/store";
import dayjs from 'dayjs';

export const useVacancies = () => {
    const { page, pageSize, sortStatus, setTime, setTotalRecords } = DataTableStore();

    const { filter, isFiltered } = FilterStore();
    const { companies, departments, status, vacancies } = FilterItemsStore();

    const formatDate = (dateString: string) => {
        const date = dayjs(dateString, "MMDDYYYY");
        return date.format("YYYY-MM-DD");
    };


    const fetchData = async () => {
        try {
            let url = "recruitment/vacancies";
            const sortVal = `?${sortStatus.direction === "asc" ? "+" : "-"}${sortStatus.columnAccessor}`;
            url += sortVal;
            if (filter.company.length) {
                const filtered = companies
                    .filter((item) => filter.company.includes(item.value))
                    .map((item) => `&CopmpanyIds=${item.id}`)
                    .join("");
                url += filtered;
            }

            if (filter.vacancy.length) {
                const filtered = vacancies
                    .filter((item) => filter.vacancy.includes(item.value))
                    .map((item) => `&VacancyIds=${item.id}`)
                    .join("");
                url += filtered;
            }

            console.log('filter.dateFrom: ', formatDate(String(filter.dateFrom)))

            if (filter.dateFrom) {
                url += `&DateFrom=${formatDate(String(filter.dateFrom))}`;
            }

            if (filter.dateTo) {
                url += `&DateTo=${formatDate(String(filter.dateTo))}`;
            }

            if (filter.department.length) {
                const filtered = departments
                    .filter((item) => filter.department.includes(item.value))
                    .map((item) => `&DepartmentIds=${item.id}`)
                    .join("");
                url += filtered;
            }

            if (filter.status.length) {
                const filtered = status
                    .filter((item) => filter.status.includes(item.value))
                    .map((item) => `&StatusIds=${item.id}`)
                    .join("");
                url += filtered;
            }

            const startTime = performance.now();
            const res = await axiosInstance.get(url, {
                params: {
                    pageSize,
                    page,
                },
            });

            if (res.status === 200 && Array.isArray(res.data.items)) {
                const mapped = res.data.items.map((item: any) => ({
                    ...item,
                    mustHaveSkills: item.skills,
                    company: item.company.name,
                    branch: item.branch.name,
                    branchObj: [{ ...item.branch, value: item.branch.id, label: item.branch.name }],
                    divisionObj: [{ ...item.division, value: item.division.id, label: item.division.name }],
                    departmentObj: [{ ...item.department, value: item.department.id, label: item.department.name }],
                    sectionObj: [{ ...item.section, value: item.section.id, label: item.section.name }],
                    division: item.division.name,
                    experienceLevel: item.experienceLevel.name,
                    vacancyType: item.vacancyType.name,
                    section: item.section.name,
                    employmentType: item.employmentType.name,
                    workplace: item.workplaceType.name,
                    vacancyDuration: { start: item.vacancyDuration.dateStart, end: item.vacancyDuration.dateEnd },
                    id: item.id,
                    position: item.position,
                    datePublish: item.dateCreated,
                    dateEnd: item.vacancyDuration?.dateEnd,
                    interviewer: "N/A",
                    department: item.department?.name || "-",
                    quantity: item.availableSlot,
                    totalApplicant: item.totalApplicants,
                    status: item.status.name,
                }));
                console.log('mapped: ', mapped)
                setTotalRecords(res.data.total)
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
        queryKey: ["recruitment/vacancies", { page, pageSize, sortStatus, filter, isFiltered }],
        queryFn: fetchData,
        staleTime: 60 * 1000, // Data is fresh for 5 minutes
    });
};
